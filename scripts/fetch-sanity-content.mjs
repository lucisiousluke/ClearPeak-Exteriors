// Fetches published content from Sanity and regenerates src/data/*.ts.
// Runs automatically before `gatsby develop` / `gatsby build` (see package.json
// "predevelop"/"prebuild"). Safe to fail — if Sanity is unreachable or empty,
// the existing generated files are left in place.
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "../src/data");

const client = createClient({
  projectId: process.env.GATSBY_SANITY_PROJECT_ID || "vgi0saae",
  dataset: process.env.GATSBY_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  // Fresh reads, not CDN-cached: this runs once per build (not per visitor),
  // so the tiny latency cost is worth it — the Sanity CDN can lag ~30-60s
  // behind a publish, and a webhook-triggered build can fire within seconds
  // of that publish, risking a build that bakes in stale content.
  useCdn: false,
});

const builder = imageUrlBuilder(client);
const urlFor = (image) => (image ? builder.image(image).width(1600).height(1200).fit("crop").auto("format").url() : "");
// 1200×630 is the size Facebook/LinkedIn/iMessage previews expect.
const urlForSocial = (image) => (image?.asset ? builder.image(image).width(1200).height(630).fit("crop").auto("format").url() : "");
const urlForSquare = (image) => (image ? builder.image(image).width(800).height(800).fit("crop").auto("format").url() : "");

// Two icon families are supported: Feather ("Fi..." — react-icons/fi) and
// Font Awesome 6 ("Fa..." — react-icons/fa6). We only guard against garbage
// strings by shape, falling back to a safe default so a bad value in Sanity
// never breaks the build.
//
// Font Awesome 5 (react-icons/fa) is deliberately NOT supported: fa and fa6
// both export icons under the same "Fa" name prefix, so a bare name like
// "FaHouse" can't be traced back to one package or the other by pattern
// alone — every "Fa" name is treated as fa6.
const FEATHER_ICON_RE = /^Fi[A-Z][A-Za-z0-9]*$/;
const FA6_ICON_RE = /^Fa[A-Z][A-Za-z0-9]*$/;
const iconFamily = (name) => {
  if (FEATHER_ICON_RE.test(name)) return "fi";
  if (FA6_ICON_RE.test(name)) return "fa6";
  return null;
};
const sanitizeIcon = (name, fallback = "FiCircle") => {
  if (name && iconFamily(name)) return name;
  if (name) console.warn(`Unknown/invalid icon "${name}", falling back to ${fallback}`);
  return fallback;
};
// Builds the import statement(s) needed for a set of already-sanitized icon
// names, splitting across react-icons/fi and react-icons/fa6 as needed.
const iconImports = (names) => {
  const fi = names.filter((n) => iconFamily(n) === "fi");
  const fa6 = names.filter((n) => iconFamily(n) === "fa6");
  let out = "";
  if (fi.length) out += `import {\n  ${fi.join(",\n  ")},\n} from "react-icons/fi";\n`;
  if (fa6.length) out += `import {\n  ${fa6.join(",\n  ")},\n} from "react-icons/fa6";\n`;
  return out;
};

const esc = (str = "") => JSON.stringify(str ?? "");
const arr = (items) => `[${(items || []).map(esc).join(", ")}]`;

// Blog body is kept as Portable Text (headings, lists, bold, links, etc.)
// and rendered on the site by PortableTextBody. Only the non-text members
// are reshaped: images become a plain URL, tables become rows of strings.
// Copying from a local preview (e.g. VS Code's Markdown preview) turns
// "/services/x" into "https://file+.vscode-resource.vscode-cdn.net/services/x",
// and pasting a full site URL works but hard-codes the domain. Both become
// plain site-relative paths; real external links are left alone.
const LOCAL_PREVIEW_HOST_RE = /vscode|localhost|127\.0\.0\.1/i;
const SITE_HOST_RE = /^(www\.)?clearpeakexterior\.com$/i;
let rewrittenLinks = 0;
const normalizeHref = (href) => {
  if (typeof href !== "string") return href;
  let url;
  try {
    url = new URL(href.trim());
  } catch {
    return href; // already relative (or not a URL at all)
  }
  if (url.protocol === "file:" || LOCAL_PREVIEW_HOST_RE.test(url.host) || SITE_HOST_RE.test(url.host)) {
    if (!SITE_HOST_RE.test(url.host)) rewrittenLinks++;
    return `${url.pathname}${url.search}${url.hash}` || "/";
  }
  return href;
};

// GROQ returns null (not undefined) for empty fields, so guard explicitly.
const portableTextForSite = (blocks) =>
  (blocks || [])
    .map((b) => {
      if (b._type === "block" && b.markDefs?.length) {
        return { ...b, markDefs: b.markDefs.map((m) => (m.href ? { ...m, href: normalizeHref(m.href) } : m)) };
      }
      if (b._type === "image") {
        if (!b.asset) return null;
        return {
          _type: "image",
          _key: b._key,
          url: builder.image(b).width(1600).fit("max").auto("format").url(),
          alt: b.alt || "",
        };
      }
      if (b._type === "table") {
        return { _type: "table", _key: b._key, rows: (b.rows || []).map((r) => r.cells || []) };
      }
      return b;
    })
    .filter(Boolean);

const banner = (source) =>
  `// AUTO-GENERATED by scripts/fetch-sanity-content.mjs from Sanity (${source}).\n` +
  `// Do not edit directly — edit content in the Sanity Studio instead, then re-run\n` +
  `// \`npm run sync:sanity\` (or just \`npm run develop\` / \`npm run build\`).\n\n`;

async function fetchServices() {
  const docs = await client.fetch(
    `*[_type == "service"] | order(_createdAt asc) {
      name, "slug": slug.current, icon, tagline, description, heroImage,
      startingPrice, customQuote, featured, benefits, process, idealFor, order,
      "faqs": faqs[]->{question, answer},
      "category": category->{title, icon, order}
    }`
  );
  if (!docs.length) return null;

  // Services group under their category on the homepage; anything without
  // one falls into "Other Services" so nothing silently disappears if a new
  // service is added before it's categorized. Sort is category order, then
  // each service's own order within that category (both default to the
  // bottom when unset, rather than erroring or reshuffling unpredictably).
  const categoryName = (s) => s.category?.title || "Other Services";
  const categoryOrder = (s) => (typeof s.category?.order === "number" ? s.category.order : 9999);
  const serviceOrder = (s) => (typeof s.order === "number" ? s.order : 9999);
  const sorted = [...docs].sort((a, b) => {
    const catDiff = categoryOrder(a) - categoryOrder(b);
    if (catDiff !== 0) return catDiff;
    const nameDiff = categoryName(a).localeCompare(categoryName(b));
    if (nameDiff !== 0) return nameDiff;
    return serviceOrder(a) - serviceOrder(b);
  });

  const usedIcons = Array.from(
    new Set(
      sorted.flatMap((d) => [
        sanitizeIcon(d.icon, "FiZap"),
        ...(d.category?.icon ? [sanitizeIcon(d.category.icon, "FiGrid")] : []),
      ])
    )
  );

  const body = sorted
    .map(
      (s) => `  {
    slug: ${esc(s.slug)},
    name: ${esc(s.name)},
    shortName: ${esc(s.name)},
    icon: ${sanitizeIcon(s.icon, "FiZap")},
    tagline: ${esc(s.tagline)},
    description: ${esc(s.description)},
    heroImage: ${esc(urlFor(s.heroImage))},
    startingPrice: ${esc(s.startingPrice)},
    customQuote: ${!!s.customQuote},
    featured: ${!!s.featured},
    benefits: ${arr(s.benefits)},
    process: ${arr(s.process)},
    faqs: ${JSON.stringify(s.faqs || [])},
    idealFor: ${arr(s.idealFor)},
    category: ${esc(categoryName(s))},
    categoryIcon: ${s.category?.icon ? sanitizeIcon(s.category.icon, "FiGrid") : "undefined"},
  }`
    )
    .join(",\n");

  return (
    banner("service documents") +
    iconImports(usedIcons) +
    `import type { Service } from "~/types";\n\n` +
    `export const services: Service[] = [\n${body}\n];\n\n` +
    `export const getServiceBySlug = (slug: string) => services.find((s) => s.slug === slug);\n`
  );
}

async function fetchCities() {
  const docs = await client.fetch(
    `*[_type == "serviceArea"] | order(_createdAt asc) {
      name, "slug": slug.current, county, blurb, heroImage, zipCodes, neighborhoods, geo, localContent
    }`
  );
  if (!docs.length) return null;

  // "Douglas" → "Douglas County", so sentences built from it read naturally.
  const countyLabel = (county) => {
    const c = (county || "").trim();
    return c && !/county/i.test(c) ? `${c} County` : c;
  };
  // Missing coordinates stay null (and are left out of structured data)
  // instead of silently becoming downtown Denver.
  const coord = (n) => (typeof n === "number" ? n : "null");

  const body = docs
    .map(
      (c) => `  {
    slug: ${esc(c.slug)},
    name: ${esc(c.name)},
    county: ${esc(countyLabel(c.county))},
    blurb: ${esc(c.blurb)},
    heroImage: ${esc(urlFor(c.heroImage))},
    zipCodes: ${arr(c.zipCodes)},
    neighborhoods: ${arr(c.neighborhoods)},
    localContent: ${JSON.stringify(portableTextForSite(c.localContent))},
    lat: ${coord(c.geo?.lat)},
    lng: ${coord(c.geo?.lng)},
  }`
    )
    .join(",\n");

  return (
    banner("serviceArea documents") +
    `import type { City } from "~/types";\n\n` +
    `export const cities: City[] = [\n${body}\n];\n\n` +
    `export const getCityBySlug = (slug: string) => cities.find((c) => c.slug === slug);\n`
  );
}

async function fetchTestimonials() {
  const docs = await client.fetch(
    `*[_type == "testimonial"] | order(_createdAt asc) {
      name, location, rating, quote, "service": service->name
    }`
  );
  // Always writes the file, even with zero documents — the Reviews section
  // reads testimonials.length to decide whether to render at all, so a
  // legitimate zero-testimonial state must produce a real empty array, not
  // silently leave a stale (possibly non-empty) file in place.

  const initials = (name) =>
    name
      .split(" ")
      .map((p) => p[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const body = docs
    .map(
      (t) => `  {
    name: ${esc(t.name)},
    location: ${esc(t.location)},
    rating: ${t.rating ?? 5},
    quote: ${esc(t.quote)},
    service: ${esc(t.service)},
    avatarInitials: ${esc(initials(t.name))},
  }`
    )
    .join(",\n");

  return (
    banner("testimonial documents") +
    `import type { Testimonial } from "~/types";\n\n` +
    `export const testimonials: Testimonial[] = [\n${body}\n];\n`
  );
}

async function fetchFaqs() {
  const docs = await client.fetch(
    `*[_type == "faq" && category == "General"] | order(_createdAt asc) { question, answer }`
  );
  if (!docs.length) return null;

  const body = docs.map((f) => `  { question: ${esc(f.question)}, answer: ${esc(f.answer)} }`).join(",\n");

  return (
    banner('faq documents (category == "General")') +
    `import type { FAQItem } from "~/types";\n\n` +
    `export const faqs: FAQItem[] = [\n${body}\n];\n`
  );
}

async function fetchBlogPosts() {
  const docs = await client.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc) {
      title, "slug": slug.current, excerpt, heroImage, "heroImageAlt": heroImage.alt,
      "category": category->title, "author": author->name,
      publishedAt, _updatedAt, readTime, body
    }`
  );
  if (!docs.length) return null;

  const body = docs
    .map(
      (p) => `  {
    slug: ${esc(p.slug)},
    title: ${esc(p.title)},
    excerpt: ${esc(p.excerpt)},
    category: ${esc(p.category)},
    author: ${esc(p.author)},
    date: ${esc(p.publishedAt ? p.publishedAt.slice(0, 10) : "")},
    publishedAt: ${esc(p.publishedAt || "")},
    updatedAt: ${esc(p._updatedAt || "")},
    readTime: ${esc(p.readTime)},
    heroImage: ${esc(urlFor(p.heroImage))},
    heroImageAlt: ${esc(p.heroImageAlt)},
    body: ${JSON.stringify(portableTextForSite(p.body))},
  }`
    )
    .join(",\n");

  return (
    banner("blogPost documents") +
    `import type { BlogPost } from "~/types";\n\n` +
    `export const blogPosts: BlogPost[] = [\n${body}\n];\n\n` +
    `export const getBlogPostBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);\n`
  );
}

async function fetchGallery() {
  const [galleryDocs, beforeAfterDocs] = await Promise.all([
    client.fetch(
      `*[_type == "galleryItem"] | order(_createdAt asc) { "id": _id, title, "category": category->title, image }`
    ),
    client.fetch(
      `*[_type == "beforeAfter" && featured == true] | order(coalesce(order, 9999) asc, _createdAt asc) { "id": _id, title, "service": service->name, beforeImage, afterImage }`
    ),
  ]);
  if (!galleryDocs.length && !beforeAfterDocs.length) return null;

  const galleryBody = galleryDocs
    .map(
      (g) => `  {
    id: ${esc(g.id)},
    title: ${esc(g.title)},
    category: ${esc(g.category)},
    image: ${esc(urlFor(g.image))},
  }`
    )
    .join(",\n");

  const beforeAfterBody = beforeAfterDocs
    .map(
      (b) => `  {
    id: ${esc(b.id)},
    title: ${esc(b.title)},
    service: ${esc(b.service)},
    beforeImage: ${esc(urlFor(b.beforeImage))},
    afterImage: ${esc(urlFor(b.afterImage))},
  }`
    )
    .join(",\n");

  return (
    banner("galleryItem + beforeAfter documents") +
    `import type { BeforeAfterItem, GalleryItem } from "~/types";\n\n` +
    `export const beforeAfterItems: BeforeAfterItem[] = [\n${beforeAfterBody}\n];\n\n` +
    `export const galleryItems: GalleryItem[] = [\n${galleryBody}\n];\n`
  );
}

const toPhoneHref = (phone = "") => {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  return `tel:+1${digits.length === 10 ? digits : digits.replace(/^1/, "")}`;
};

async function fetchSiteSettings() {
  const s = await client.fetch(`*[_id == "siteSettings"][0]`);
  if (!s) return null;

  return (
    banner("siteSettings document") +
    `export const site = {\n` +
    `  name: ${esc(s.siteName || "ClearPeak Exteriors")},\n` +
    `  tagline: ${esc(s.tagline)},\n` +
    `  phone: ${esc(s.phone)},\n` +
    `  phoneHref: ${esc(toPhoneHref(s.phone))},\n` +
    `  email: ${esc(s.email)},\n` +
    `  address: {\n` +
    `    street: ${esc(s.address)},\n` +
    `    city: ${esc(s.city)},\n` +
    `    state: ${esc(s.state)},\n` +
    `    zip: ${esc(s.zip)},\n` +
    `  },\n` +
    `  social: {\n` +
    `    facebook: ${esc(s.facebookUrl)},\n` +
    `    instagram: ${esc(s.instagramUrl)},\n` +
    `    google: ${esc(s.googleReviewUrl)},\n` +
    `  },\n` +
    `  hours: ${esc(s.hours)},\n` +
    // Not yet editable from Sanity — just an internal route, not content.
    `  quoteFormUrl: "/contact",\n` +
    `  rating: ${typeof s.rating === "number" ? s.rating : 4.9},\n` +
    `  reviewCount: ${typeof s.reviewCount === "number" ? s.reviewCount : 312},\n` +
    `};\n`
  );
}

async function fetchContactPage() {
  const c = await client.fetch(`*[_id == "contactPage"][0]`);
  if (!c) return null;

  const fields = c.formFields || [];
  const fieldsBody = fields
    .map(
      (f) => `  {
    name: ${esc(f.name)},
    label: ${esc(f.label)},
    fieldType: ${esc(f.fieldType)},
    placeholder: ${esc(f.placeholder)},
    required: ${!!f.required},
    width: ${esc(f.width || "full")},
    dynamicOptionsSource: ${esc(f.dynamicOptionsSource || "none")},
    options: ${arr(f.options)},
  }`
    )
    .join(",\n");

  return (
    banner("contactPage document") +
    `import type { ContactFormField } from "~/types";\n\n` +
    `export const contactPage = {\n` +
    `  headline: ${esc(c.headline)},\n` +
    `  subheadline: ${esc(c.subheadline)},\n` +
    `  formFields: [\n${fieldsBody}\n  ] as ContactFormField[],\n` +
    `};\n`
  );
}

const ctaLiteral = (cta) =>
  `{ label: ${esc(cta?.label)}, url: ${esc(cta?.url)}, style: ${esc(cta?.style || "primary")} }`;

// Shared by every document with a "sections" array of section blocks
// (Homepage, Gallery Page) — see studio/schemas/objects/sectionBlocks.ts.
const sectionLiteral = (s) => {
  if (s._type === "processBlock") {
    const steps = s.steps || [];
    return `  {
    type: "processBlock",
    eyebrow: ${esc(s.eyebrow)},
    title: ${esc(s.title)},
    description: ${esc(s.description)},
    steps: [\n${steps.map((st) => `      ${iconCardLiteral(st)}`).join(",\n")}\n    ],
  }`;
  }
  if (s._type === "galleryBlock") {
    // Only emit fields that were actually set, so unset ones fall back to
    // the page's default instead of being forced to false/"".
    const props = [`type: "galleryBlock"`];
    if (typeof s.showHeading === "boolean") props.push(`showHeading: ${s.showHeading}`);
    if (s.eyebrow) props.push(`eyebrow: ${esc(s.eyebrow)}`);
    if (s.title) props.push(`title: ${esc(s.title)}`);
    if (s.description) props.push(`description: ${esc(s.description)}`);
    if (typeof s.showFilters === "boolean") props.push(`showFilters: ${s.showFilters}`);
    if (typeof s.limit === "number" && s.limit > 0) props.push(`limit: ${Math.floor(s.limit)}`);
    return `  { ${props.join(", ")} }`;
  }
  return `  { type: ${esc(s._type)} }`;
};
const sectionIcons = (sections) =>
  Array.from(new Set(sections.flatMap((s) => s.steps || []).map((st) => sanitizeIcon(st.icon))));

async function fetchHomepage() {
  const h = await client.fetch(
    `*[_id == "homepage"][0]{ ..., "featuredServiceSlugs": featuredServices[]->slug.current }`
  );
  if (!h) return null;

  const sections = h.sections || [];
  const usedIcons = sectionIcons(sections);

  return (
    banner("homepage document") +
    iconImports(usedIcons) +
    `import type { HomepageContent } from "~/types";\n\n` +
    `export const homepage: HomepageContent = {\n` +
    `  heroEyebrow: ${esc(h.heroEyebrow)},\n` +
    `  heroHeadline: ${esc(h.heroHeadline)},\n` +
    `  heroHighlight: ${esc(h.heroHighlight)},\n` +
    `  heroSubheadline: ${esc(h.heroSubheadline)},\n` +
    `  heroImage: ${esc(urlFor(h.heroImage))},\n` +
    `  heroPrimaryCta: ${ctaLiteral(h.heroPrimaryCta)},\n` +
    `  heroSecondaryCta: ${ctaLiteral(h.heroSecondaryCta)},\n` +
    `  heroBadge: ${esc(h.heroBadge)},\n` +
    `  trustBadges: ${arr(h.trustBadges)},\n` +
    `  sections: [\n${sections.map(sectionLiteral).join(",\n")}\n  ],\n` +
    `  featuredServiceSlugs: ${arr(h.featuredServiceSlugs)},\n` +
    `};\n`
  );
}

async function fetchGalleryPage() {
  const g = await client.fetch(`*[_id == "galleryPage"][0]`);
  // No document yet — leave the committed default (Before/After + Gallery)
  // in place rather than rendering an empty page.
  if (!g) return null;

  const sections = g.sections || [];

  return (
    banner("galleryPage document") +
    iconImports(sectionIcons(sections)) +
    `import type { PageSection } from "~/types";\n\n` +
    `export const galleryPage: { sections: PageSection[] } = {\n` +
    `  sections: [\n${sections.map(sectionLiteral).join(",\n")}\n  ],\n` +
    `};\n`
  );
}

// Collects every SEO field in the CMS into one lookup keyed by page path,
// which the SEO component reads automatically — pages don't need to know
// whether an override exists. Paths must match the routes in gatsby-node.ts.
async function fetchSeo() {
  const d = await client.fetch(`{
    "defaults": *[_id == "siteSettings"][0].defaultSeo,
    "homepage": *[_id == "homepage"][0]{ seo, heroImage },
    "about": *[_id == "aboutPage"][0]{ seo, heroImage },
    "services": *[_type == "service" && defined(slug.current)]{ "slug": slug.current, seo, heroImage },
    "areas": *[_type == "serviceArea" && defined(slug.current)]{ "slug": slug.current, seo, heroImage },
    "posts": *[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current, seo, heroImage, "heroImageAlt": heroImage.alt }
  }`);

  // Only keep fields that are actually set, so blanks fall through to the
  // page's own title/description instead of overriding them with "".
  const entry = (seo, fallbackImage, fallbackAlt) => {
    const e = {};
    if (seo?.metaTitle) e.metaTitle = seo.metaTitle.trim();
    if (seo?.metaDescription) e.metaDescription = seo.metaDescription.trim();
    const image = urlForSocial(seo?.ogImage) || urlForSocial(fallbackImage);
    if (image) e.ogImage = image;
    const alt = (seo?.ogImage?.asset && seo.ogImage.alt) || fallbackAlt;
    if (alt) e.ogImageAlt = alt;
    if (seo?.noIndex) e.noIndex = true;
    return e;
  };

  const pages = {};
  const add = (path, doc, fallbackAlt) => {
    if (!doc) return;
    const e = entry(doc.seo, doc.heroImage, fallbackAlt);
    if (Object.keys(e).length) pages[path] = e;
  };
  add("/", d.homepage);
  add("/about", d.about);
  (d.services || []).forEach((s) => add(`/services/${s.slug}`, s));
  (d.areas || []).forEach((a) => add(`/service-areas/${a.slug}`, a));
  (d.posts || []).forEach((p) => add(`/blog/${p.slug}`, p, p.heroImageAlt));

  // Sitewide fallback share image: Site Settings → Default SEO, otherwise
  // the homepage hero, so a shared link never shows a broken image.
  const defaults = entry(d.defaults, d.homepage?.heroImage);
  delete defaults.noIndex;

  return (
    banner("siteSettings.defaultSeo + seo fields on homepage, aboutPage, service, serviceArea, blogPost") +
    `import type { SeoEntry } from "../types";\n\n` +
    `export const defaultSeo: SeoEntry = ${JSON.stringify(defaults, null, 2)};\n\n` +
    `export const pageSeo: Record<string, SeoEntry> = ${JSON.stringify(pages, null, 2)};\n`
  );
}

async function fetchGlobalCta() {
  const g = await client.fetch(`*[_id == "globalCta"][0]`);
  if (!g) return null;

  return (
    banner("globalCta document") +
    `import type { GlobalCtaContent } from "~/types";\n\n` +
    `export const globalCta: GlobalCtaContent = {\n` +
    `  headline: ${esc(g.headline)},\n` +
    `  subtext: ${esc(g.subtext)},\n` +
    `  primaryCta: ${ctaLiteral(g.primaryCta)},\n` +
    `  secondaryCta: ${ctaLiteral(g.secondaryCta)},\n` +
    `};\n`
  );
}

async function fetchNavigation() {
  const n = await client.fetch(`*[_id == "navigation"][0]`);
  if (!n) return null;

  const links = (n.mainLinks || [])
    .map((l) => `  { label: ${esc(l.label)}, href: ${esc(l.url)} }`)
    .join(",\n");

  return (
    banner("navigation document") +
    `import type { CtaButton } from "~/types";\n\n` +
    `export const navLinks = [\n${links}\n];\n\n` +
    `export const headerCta: CtaButton = ${ctaLiteral(n.headerCta)};\n`
  );
}

async function fetchFooter() {
  const f = await client.fetch(`*[_id == "footer"][0]`);
  if (!f) return null;

  // An "All services" column is filled in on the site from services.ts, so
  // its leftover manual links (hidden in the Studio) are ignored.
  const columns = (f.columns || [])
    .map((c) =>
      c.source === "services"
        ? `  {\n    heading: ${esc(c.heading)},\n    auto: "services",\n    links: [],\n  }`
        : `  {
    heading: ${esc(c.heading)},
    links: [\n${(c.links || []).map((l) => `      { label: ${esc(l.label)}, href: ${esc(l.url)} }`).join(",\n")}\n    ],
  }`
    )
    .join(",\n");

  const legalLinks = (f.legalLinks || [])
    .map((l) => `  { label: ${esc(l.label)}, href: ${esc(l.url)} }`)
    .join(",\n");

  return (
    banner("footer document") +
    `import type { FooterColumn } from "~/types";\n\n` +
    `export const footerDescription = ${esc(f.description)};\n\n` +
    `export const footerColumns: FooterColumn[] = [\n${columns}\n];\n\n` +
    `export const legalLinks = [\n${legalLinks}\n];\n`
  );
}

const iconCardLiteral = (card) =>
  `{ icon: ${sanitizeIcon(card?.icon)}, title: ${esc(card?.title)}, description: ${esc(card?.description)} }`;

async function fetchWhyChooseUsSection() {
  const w = await client.fetch(`*[_id == "whyChooseUsSection"][0]`);
  if (!w) return null;

  const reasons = w.reasons || [];
  const usedIcons = Array.from(new Set(reasons.map((r) => sanitizeIcon(r.icon))));

  return (
    banner("whyChooseUsSection document") +
    iconImports(usedIcons) +
    `export const whyChooseUsSection = {\n` +
    `  eyebrow: ${esc(w.eyebrow)},\n` +
    `  title: ${esc(w.title)},\n` +
    `  description: ${esc(w.description)},\n` +
    `  reasons: [\n${reasons.map((r) => `    ${iconCardLiteral(r)}`).join(",\n")}\n  ],\n` +
    `};\n`
  );
}

async function fetchTrustBadgesSection() {
  const t = await client.fetch(`*[_id == "trustBadgesSection"][0]`);
  if (!t) return null;

  const badges = t.badges || [];
  const stats = t.stats || [];
  const usedIcons = Array.from(new Set(badges.map((b) => sanitizeIcon(b.icon))));

  const badgesBody = badges
    .map((b) => `    { icon: ${sanitizeIcon(b.icon)}, label: ${esc(b.label)} }`)
    .join(",\n");
  const statsBody = stats
    .map(
      (s) =>
        `    { value: ${Number(s.value) || 0}, suffix: ${esc(s.suffix)}, label: ${esc(s.label)}, decimal: ${!!s.decimal} }`
    )
    .join(",\n");

  return (
    banner("trustBadgesSection document") +
    iconImports(usedIcons) +
    `export const trustBadgesSection = {\n` +
    `  badges: [\n${badgesBody}\n  ],\n` +
    `  stats: [\n${statsBody}\n  ],\n` +
    `};\n`
  );
}

async function fetchAboutPage() {
  const a = await client.fetch(`*[_id == "aboutPage"][0]`);
  if (!a) return null;

  const values = a.values || [];
  const usedIcons = Array.from(new Set(values.map((v) => sanitizeIcon(v.icon))));

  return (
    banner("aboutPage document") +
    iconImports(usedIcons) +
    `export const aboutPage = {\n` +
    `  heroHeadline: ${esc(a.heroHeadline)},\n` +
    `  heroHighlight: ${esc(a.heroHighlight)},\n` +
    `  heroBody: ${esc(a.heroBody)},\n` +
    `  heroImage: ${esc(urlFor(a.heroImage))},\n` +
    `  valuesEyebrow: ${esc(a.valuesEyebrow)},\n` +
    `  valuesTitle: ${esc(a.valuesTitle)},\n` +
    `  values: [\n${values.map((v) => `    ${iconCardLiteral(v)}`).join(",\n")}\n  ],\n` +
    `};\n`
  );
}

const sectionHeadingLiteral = (s) =>
  `{ eyebrow: ${esc(s?.eyebrow)}, title: ${esc(s?.title)}, description: ${esc(s?.description)} }`;

async function fetchSiteContent() {
  const c = await client.fetch(`*[_id == "siteContent"][0]`);
  if (!c) return null;

  return (
    banner("siteContent document") +
    `export const siteContent = {\n` +
    `  servicesSection: ${sectionHeadingLiteral(c.servicesSection)},\n` +
    `  beforeAfterSection: ${sectionHeadingLiteral(c.beforeAfterSection)},\n` +
    `  gallerySection: ${sectionHeadingLiteral(c.gallerySection)},\n` +
    `  reviewsSection: ${sectionHeadingLiteral(c.reviewsSection)},\n` +
    `  serviceAreasSection: ${sectionHeadingLiteral(c.serviceAreasSection)},\n` +
    `  blogSection: ${sectionHeadingLiteral(c.blogSection)},\n` +
    `  faqSection: ${sectionHeadingLiteral(c.faqSection)},\n` +
    `};\n`
  );
}

async function fetchPromotions() {
  // Always writes the file, even with zero documents — components import
  // this unconditionally, so it must exist from the very first run.
  const docs = await client.fetch(
    `*[_type == "promotion"] | order(_createdAt desc) { title, message, cta, startDate, endDate, active, placement }`
  );

  const body = docs
    .map(
      (p) => `  {
    title: ${esc(p.title)},
    message: ${esc(p.message)},
    cta: ${ctaLiteral(p.cta)},
    startDate: ${esc(p.startDate)},
    endDate: ${esc(p.endDate)},
    active: ${!!p.active},
    placement: ${esc(p.placement)},
  }`
    )
    .join(",\n");

  return (
    banner("promotion documents") +
    `import type { Promotion } from "~/types";\n\n` +
    `export const promotions: Promotion[] = [\n${body}\n];\n`
  );
}

const HEX_RE = /^#[0-9a-fA-F]{3,8}$/;
const safeHex = (hex, fallback) => (hex && HEX_RE.test(hex) ? hex : fallback);

// --- WCAG contrast helpers -------------------------------------------------
// Backgrounds always use the exact official brand hex the picker was set to
// — never darkened or otherwise modified. Instead, the TEXT/icon color drawn
// on top of each brand background is chosen automatically (white vs. the
// brand's own Navy/Secondary) to whichever clears WCAG AA (4.5:1). Today
// that resolves to Navy for both Aqua and Coral, but it re-evaluates from
// whatever colors are actually picked, so it can't silently go inaccessible.
function hexToRgb(hex) {
  const m = hex.replace("#", "");
  return { r: parseInt(m.slice(0, 2), 16), g: parseInt(m.slice(2, 4), 16), b: parseInt(m.slice(4, 6), 16) };
}
const rgbTriplet = (hex) => {
  const { r, g, b } = hexToRgb(hex);
  return `${r} ${g} ${b}`;
};
function relativeLuminance({ r, g, b }) {
  const f = (c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function contrastRatio(hexA, hexB) {
  const lA = relativeLuminance(hexToRgb(hexA));
  const lB = relativeLuminance(hexToRgb(hexB));
  const [lighter, darker] = lA > lB ? [lA, lB] : [lB, lA];
  return (lighter + 0.05) / (darker + 0.05);
}
// Picks whichever candidate (white or the brand's dark/navy color) reads
// better on the given background, preferring white on a tie since it's the
// more typical/expected treatment for a bright brand color.
function bestTextColor(bgHex, darkHex) {
  const onWhite = contrastRatio(bgHex, "#FFFFFF");
  const onDark = contrastRatio(bgHex, darkHex);
  return onDark > onWhite ? darkHex : "#FFFFFF";
}

// Written as a plain .ts data module (same pattern as every other piece of
// content here) and injected as an inline <style> tag via gatsby-ssr.tsx.
// A previous version wrote this as a plain imported .css file instead —
// Netlify's persistent Gatsby/webpack build cache doesn't reliably detect
// changes to CSS reached via @import, so edits could silently fail to reach
// production even though the build reported success. Data flowing through
// .ts modules doesn't hit that caching layer.
async function fetchBrandColors() {
  const c = await client.fetch(
    `*[_id == "brandColors"][0]{ "primary": primary.hex, "secondary": secondary.hex, "accent": accent.hex }`
  );
  const primary = safeHex(c?.primary, "#22D3EE");
  const secondary = safeHex(c?.secondary, "#0F172A");
  const accent = safeHex(c?.accent, "#FB7185");
  // Text/icon color to draw on top of each brand background — whichever of
  // white or Secondary/Navy is more readable. Backgrounds stay the exact
  // official hex; only the foreground adapts.
  const onPrimary = bestTextColor(primary, secondary);
  const onAccent = bestTextColor(accent, secondary);

  return (
    banner("brandColors document") +
    `import type { BrandColors } from "~/types";\n\n` +
    `export const brandColors: BrandColors = {\n` +
    `  primary: ${esc(primary)},\n` +
    `  secondary: ${esc(secondary)},\n` +
    `  accent: ${esc(accent)},\n` +
    `  onPrimary: ${esc(onPrimary)},\n` +
    `  onPrimaryRgb: ${esc(rgbTriplet(onPrimary))},\n` +
    `  onAccent: ${esc(onAccent)},\n` +
    `  onAccentRgb: ${esc(rgbTriplet(onAccent))},\n` +
    `};\n`
  );
}

// Navigation, footer and in-text links are free-text URLs in the CMS, so a
// typo or a renamed service silently becomes a 404. Warn about any
// internal link that doesn't match a real page or a netlify.toml redirect.
async function checkInternalLinks() {
  const d = await client.fetch(`{
    "services": *[_type == "service"].slug.current,
    "areas": *[_type == "serviceArea"].slug.current,
    "posts": *[_type == "blogPost"].slug.current,
    "links": [
      ...*[_id == "navigation"][0].mainLinks[].url,
      *[_id == "navigation"][0].headerCta.url,
      ...*[_id == "footer"][0].columns[source != "services"].links[].url,
      ...*[_id == "footer"][0].legalLinks[].url
    ],
    "bodyLinks": [
      ...*[_type == "blogPost"].body[].markDefs[].href,
      ...*[_type == "serviceArea"].localContent[].markDefs[].href
    ]
  }`);

  const pagesDir = path.join(__dirname, "../src/pages");
  const staticPages = readdirSync(pagesDir, { recursive: true })
    .filter((f) => /\.tsx?$/.test(f) && !f.startsWith("404"))
    .map((f) => "/" + f.replace(/\.tsx?$/, "").replace(/(^|\/)index$/, ""))
    .map((p) => (p.length > 1 ? p.replace(/\/$/, "") : "/"));
  const redirects = [...readFileSync(path.join(__dirname, "../netlify.toml"), "utf8").matchAll(/from\s*=\s*"([^"]+)"/g)].map((m) => m[1]);

  const valid = new Set([
    ...staticPages,
    ...(d.services || []).map((s) => `/services/${s}`),
    ...(d.areas || []).map((s) => `/service-areas/${s}`),
    ...(d.posts || []).map((s) => `/blog/${s}`),
  ]);
  const report = (urls, where) => {
    const bad = [
      ...new Set(
        (urls || [])
          .filter((u) => typeof u === "string" && u.startsWith("/"))
          .map((u) => u.split(/[?#]/)[0].replace(/(.)\/$/, "$1"))
          .filter((u) => !valid.has(u))
      ),
    ];
    const redirected = bad.filter((u) => redirects.includes(u));
    const broken = bad.filter((u) => !redirects.includes(u));

    if (broken.length) {
      console.warn(`\n⚠ ${broken.length} ${where} link(s) point to pages that don't exist — fix them in the Studio:`);
      broken.forEach((u) => console.warn(`   ${u}`));
    }
    if (redirected.length) {
      console.warn(`\n⚠ ${redirected.length} ${where} link(s) only work via a redirect — update them in the Studio to the final URL:`);
      redirected.forEach((u) => console.warn(`   ${u}`));
    }
  };
  report(d.links, "Navigation/Footer");
  report((d.bodyLinks || []).map(normalizeHref), "Blog post / city page");
}

async function main() {
  const jobs = [
    ["services.ts", fetchServices],
    ["cities.ts", fetchCities],
    ["testimonials.ts", fetchTestimonials],
    ["faqs.ts", fetchFaqs],
    ["blogPosts.ts", fetchBlogPosts],
    ["gallery.ts", fetchGallery],
    ["site.ts", fetchSiteSettings],
    ["contactPage.ts", fetchContactPage],
    ["homepage.ts", fetchHomepage],
    ["galleryPage.ts", fetchGalleryPage],
    ["globalCta.ts", fetchGlobalCta],
    ["navigation.ts", fetchNavigation],
    ["footer.ts", fetchFooter],
    ["whyChooseUsSection.ts", fetchWhyChooseUsSection],
    ["trustBadgesSection.ts", fetchTrustBadgesSection],
    ["aboutPage.ts", fetchAboutPage],
    ["siteContent.ts", fetchSiteContent],
    ["promotions.ts", fetchPromotions],
    ["brandColors.ts", fetchBrandColors],
    ["seo.ts", fetchSeo],
  ];

  let written = 0;
  for (const [filename, fetcher] of jobs) {
    const content = await fetcher();
    if (content) {
      writeFileSync(path.join(dataDir, filename), content);
      console.log(`✓ wrote src/data/${filename}`);
      written++;
    } else {
      console.log(`- src/data/${filename} unchanged (no Sanity documents found)`);
    }
  }

  console.log(`\nDone. ${written}/${jobs.length} data files refreshed from Sanity.`);
  if (rewrittenLinks) {
    console.warn(
      `\n⚠ Fixed ${rewrittenLinks} link(s) in blog posts / city pages that were pasted with a local preview address ` +
        `(e.g. vscode-resource). The site uses the corrected links; fix them in the Studio when convenient.`
    );
  }
  await checkInternalLinks();
}

main().catch((err) => {
  console.error("Sanity fetch failed:", err.message);
  console.error("Leaving existing src/data/*.ts files in place.");
  process.exit(0); // non-fatal — don't block local dev/build if Sanity is unreachable
});
