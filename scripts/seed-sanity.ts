// One-time (idempotent) seed script — pushes the current placeholder content
// from src/data/*.ts into the Sanity dataset so the Studio isn't empty.
//
// Run via: npm run seed:sanity (uses the Sanity CLI's stored login token)
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

function resolveToken(): string | undefined {
  if (process.env.SANITY_AUTH_TOKEN) return process.env.SANITY_AUTH_TOKEN;
  try {
    const config = JSON.parse(readFileSync(join(homedir(), ".config/sanity/config.json"), "utf-8"));
    return config.authToken;
  } catch {
    return undefined;
  }
}
import { services } from "../src/data/services";
import { cities } from "../src/data/cities";
import { testimonials } from "../src/data/testimonials";
import { faqs as globalFaqs } from "../src/data/faqs";
import { blogPosts } from "../src/data/blogPosts";
import { galleryItems, beforeAfterItems } from "../src/data/gallery";
import { site } from "../src/data/site";
import { navLinks } from "../src/data/navigation";
import { images } from "../src/data/images";

const client = createClient({
  projectId: "vgi0saae",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: resolveToken(),
  useCdn: false,
});

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const randKey = () => Math.random().toString(36).slice(2, 10);

const toPortableText = (paragraphs: string[]) =>
  paragraphs.map((text) => ({
    _type: "block",
    _key: randKey(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: randKey(), text, marks: [] }],
  }));

const imageAssetCache = new Map<string, { _type: "reference"; _ref: string }>();

async function uploadImage(url: string, filename: string) {
  if (imageAssetCache.has(url)) return imageAssetCache.get(url)!;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch image ${url}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, { filename });
  const ref = { _type: "reference" as const, _ref: asset._id };
  imageAssetCache.set(url, ref);
  return ref;
}

async function imageField(url: string, filename: string) {
  return { _type: "image", asset: await uploadImage(url, filename) };
}

async function run() {
  console.log(`Seeding project vgi0saae/production...`);

  // --- Author ---
  await client.createOrReplace({
    _id: "author-clearpeak-team",
    _type: "author",
    name: "ClearPeak Team",
    slug: { _type: "slug", current: "clearpeak-team" },
    bio: "The ClearPeak Exteriors crew — sharing tips on keeping Colorado homes looking their best.",
  });
  console.log("✓ Author");

  // --- Categories (blog categories + gallery categories, deduped) ---
  const categoryTitles = Array.from(
    new Set([...blogPosts.map((p) => p.category), ...galleryItems.map((g) => g.category)])
  );
  const categoryIds = new Map<string, string>();
  for (const title of categoryTitles) {
    const id = `category-${slugify(title)}`;
    categoryIds.set(title, id);
    await client.createOrReplace({
      _id: id,
      _type: "category",
      title,
      slug: { _type: "slug", current: slugify(title) },
    });
  }
  console.log(`✓ ${categoryTitles.length} categories`);

  // --- FAQs (global sitewide list + per-service, deduped by question) ---
  // Global FAQs are tagged category "General" and drive the homepage FAQ
  // accordion; per-service FAQs are tagged "Service-Specific" so they don't
  // bloat that list. `faqIds` maps question -> doc id for both pools.
  const faqEntries = new Map<string, { question: string; answer: string; scope: "global" | "service" }>();
  for (const f of globalFaqs) faqEntries.set(f.question, { ...f, scope: "global" });
  for (const s of services)
    for (const f of s.faqs) if (!faqEntries.has(f.question)) faqEntries.set(f.question, { ...f, scope: "service" });
  const faqIds = new Map<string, string>();
  for (const [question, faq] of faqEntries) {
    const id = `faq-${slugify(question).slice(0, 60)}`;
    faqIds.set(question, id);
    await client.createOrReplace({
      _id: id,
      _type: "faq",
      question: faq.question,
      answer: faq.answer,
      category: faq.scope === "global" ? "General" : "Service-Specific",
    });
  }
  console.log(`✓ ${faqEntries.size} FAQs`);

  // --- Services ---
  const serviceIds = new Map<string, string>();
  for (const s of services) {
    const id = `service-${s.slug}`;
    serviceIds.set(s.name, id);
    await client.createOrReplace({
      _id: id,
      _type: "service",
      name: s.name,
      slug: { _type: "slug", current: s.slug },
      icon: s.icon.name,
      tagline: s.tagline,
      description: s.description,
      heroImage: await imageField(s.heroImage, `${s.slug}-hero.jpg`),
      startingPrice: s.startingPrice,
      featured: !!s.featured,
      benefits: s.benefits,
      process: s.process,
      faqs: s.faqs.map((f) => ({ _type: "reference", _ref: faqIds.get(f.question), _key: randKey() })),
    });
    console.log(`  ✓ service: ${s.name}`);
  }

  // --- Service Areas (cities) ---
  for (const c of cities) {
    await client.createOrReplace({
      _id: `serviceArea-${c.slug}`,
      _type: "serviceArea",
      name: c.name,
      slug: { _type: "slug", current: c.slug },
      county: c.county,
      blurb: c.blurb,
      heroImage: await imageField(c.heroImage, `${c.slug}-hero.jpg`),
      zipCodes: c.zipCodes,
      neighborhoods: c.neighborhoods,
      geo: { _type: "geopoint", lat: c.lat, lng: c.lng },
    });
    console.log(`  ✓ serviceArea: ${c.name}`);
  }

  // --- Testimonials ---
  for (const t of testimonials) {
    await client.createOrReplace({
      _id: `testimonial-${slugify(t.name)}`,
      _type: "testimonial",
      name: t.name,
      location: t.location,
      rating: t.rating,
      quote: t.quote,
      service: serviceIds.has(t.service) ? { _type: "reference", _ref: serviceIds.get(t.service) } : undefined,
      source: "Google",
      featured: true,
    });
    console.log(`  ✓ testimonial: ${t.name}`);
  }

  // --- Blog Posts ---
  for (const p of blogPosts) {
    await client.createOrReplace({
      _id: `blogPost-${p.slug}`,
      _type: "blogPost",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      excerpt: p.excerpt,
      heroImage: await imageField(p.heroImage, `${p.slug}-hero.jpg`),
      category: { _type: "reference", _ref: categoryIds.get(p.category) },
      author: { _type: "reference", _ref: "author-clearpeak-team" },
      publishedAt: new Date(p.date).toISOString(),
      readTime: p.readTime,
      body: toPortableText(p.content),
    });
    console.log(`  ✓ blogPost: ${p.title}`);
  }

  // --- Gallery Items ---
  for (const g of galleryItems) {
    await client.createOrReplace({
      _id: `galleryItem-${g.id}`,
      _type: "galleryItem",
      title: g.title,
      image: await imageField(g.image, `${g.id}.jpg`),
      category: { _type: "reference", _ref: categoryIds.get(g.category) },
    });
  }
  console.log(`✓ ${galleryItems.length} gallery items`);

  // --- Before/After ---
  for (const b of beforeAfterItems) {
    await client.createOrReplace({
      _id: `beforeAfter-${b.id}`,
      _type: "beforeAfter",
      title: b.title,
      beforeImage: await imageField(b.beforeImage, `${b.id}-before.jpg`),
      afterImage: await imageField(b.afterImage, `${b.id}-after.jpg`),
      service: serviceIds.has(b.service) ? { _type: "reference", _ref: serviceIds.get(b.service) } : undefined,
      featured: true,
    });
  }
  console.log(`✓ ${beforeAfterItems.length} before/after pairs`);

  // --- Site Settings (singleton) ---
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: site.name,
    tagline: site.tagline,
    phone: site.phone,
    email: site.email,
    address: site.address.street,
    city: site.address.city,
    state: site.address.state,
    zip: site.address.zip,
    hours: site.hours,
    googleReviewUrl: site.social.google,
    facebookUrl: site.social.facebook,
    instagramUrl: site.social.instagram,
  });
  console.log("✓ Site settings");

  // --- Navigation (singleton) ---
  await client.createOrReplace({
    _id: "navigation",
    _type: "navigation",
    mainLinks: navLinks.map((l) => ({ _type: "navLink", _key: randKey(), label: l.label, url: l.href })),
    headerCta: { _type: "ctaButton", label: "Get Free Estimate", url: "/contact", style: "primary" },
  });
  console.log("✓ Navigation");

  // --- Footer (singleton) ---
  // Link data is inlined here (rather than imported from src/data/footer,
  // which is itself generated FROM this document) to avoid a circular
  // dependency between the seed script and its own output.
  const footerLinkGroups = {
    services: [
      { label: "Pressure Washing", href: "/services/pressure-washing" },
      { label: "House Soft Washing", href: "/services/house-soft-washing" },
      { label: "Window Cleaning", href: "/services/window-cleaning" },
      { label: "Roof Cleaning", href: "/services/roof-cleaning" },
      { label: "Concrete Cleaning", href: "/services/concrete-cleaning" },
      { label: "Commercial Services", href: "/services/commercial-services" },
    ],
    areas: [
      { label: "Denver", href: "/service-areas/denver" },
      { label: "Littleton", href: "/service-areas/littleton" },
      { label: "Highlands Ranch", href: "/service-areas/highlands-ranch" },
      { label: "Castle Rock", href: "/service-areas/castle-rock" },
      { label: "Parker", href: "/service-areas/parker" },
      { label: "Aurora", href: "/service-areas/aurora" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Gallery", href: "/gallery" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  };

  await client.createOrReplace({
    _id: "footer",
    _type: "footer",
    description:
      "Denver Metro's premium exterior cleaning company — pressure washing, soft washing, window cleaning, and more.",
    columns: [
      {
        _type: "footerColumn",
        _key: randKey(),
        heading: "Services",
        links: footerLinkGroups.services.map((l) => ({ _type: "footerLink", _key: randKey(), label: l.label, url: l.href })),
      },
      {
        _type: "footerColumn",
        _key: randKey(),
        heading: "Service Areas",
        links: footerLinkGroups.areas.map((l) => ({ _type: "footerLink", _key: randKey(), label: l.label, url: l.href })),
      },
      {
        _type: "footerColumn",
        _key: randKey(),
        heading: "Company",
        links: footerLinkGroups.company.map((l) => ({ _type: "footerLink", _key: randKey(), label: l.label, url: l.href })),
      },
    ],
    legalLinks: [
      { _type: "legalLink", _key: randKey(), label: "Privacy Policy", url: "/privacy-policy" },
      { _type: "legalLink", _key: randKey(), label: "Terms of Service", url: "/terms" },
    ],
  });
  console.log("✓ Footer");

  // --- Global CTA (singleton) ---
  await client.createOrReplace({
    _id: "globalCta",
    _type: "globalCta",
    headline: "Ready to Refresh Your Home?",
    subtext: "Get a free, no-obligation estimate today and see why Denver homeowners trust ClearPeak Exteriors.",
    primaryCta: { _type: "ctaButton", label: "Get My Free Quote", url: "/contact", style: "white" },
    secondaryCta: { _type: "ctaButton", label: "Call Today", url: site.phoneHref, style: "outline" },
  });
  console.log("✓ Global CTA");

  // --- Homepage (singleton) ---
  const featuredServiceIds = services.filter((s) => s.featured).map((s) => serviceIds.get(s.name)!);
  await client.createOrReplace({
    _id: "homepage",
    _type: "homepage",
    heroEyebrow: "Now Booking — Denver Metro",
    heroHeadline: "Bring Your Home",
    heroHighlight: "Back to Life.",
    heroSubheadline:
      "Denver's premium exterior cleaning company specializing in pressure washing, soft washing, window cleaning, and exterior restoration.",
    heroPrimaryCta: { _type: "ctaButton", label: "Get Free Estimate", url: "/contact", style: "primary" },
    heroSecondaryCta: { _type: "ctaButton", label: "View Our Work", url: "/gallery", style: "white" },
    trustBadges: ["Fully Insured", "Locally Owned", "Satisfaction Guaranteed", "Five-Star Rated"],
    featuredServices: featuredServiceIds.map((id) => ({ _type: "reference", _ref: id, _key: randKey() })),
    featuredTestimonials: testimonials
      .slice(0, 3)
      .map((t) => ({ _type: "reference", _ref: `testimonial-${slugify(t.name)}`, _key: randKey() })),
    finalCtaHeadline: "Ready to Refresh Your Home?",
    finalCtaSubtext: "Get a free, no-obligation estimate today and see why Denver homeowners trust ClearPeak Exteriors.",
  });
  console.log("✓ Homepage");

  // --- Contact Page (singleton) ---
  const contactFormFields = [
    { name: "name", label: "Full Name", fieldType: "text", placeholder: "Jane Doe", required: true, width: "half" },
    {
      name: "phone",
      label: "Phone Number",
      fieldType: "tel",
      placeholder: "(720) 555-0100",
      required: true,
      width: "half",
    },
    {
      name: "email",
      label: "Email Address",
      fieldType: "email",
      placeholder: "jane@example.com",
      required: true,
      width: "full",
    },
    { name: "service", label: "Service Needed", fieldType: "select", dynamicOptionsSource: "services", width: "half" },
    { name: "city", label: "City", fieldType: "select", dynamicOptionsSource: "cities", width: "half" },
    {
      name: "message",
      label: "Additional Details",
      fieldType: "textarea",
      placeholder: "Tell us about your project...",
      width: "full",
    },
  ].map((f) => ({ _type: "formField", _key: randKey(), ...f }));

  await client.createOrReplace({
    _id: "contactPage",
    _type: "contactPage",
    headline: "Let's Get Your Free Estimate",
    subheadline:
      "Fill out the form and we'll respond within one business hour with a free, no-obligation quote.",
    formFields: contactFormFields,
  });
  console.log("✓ Contact page");

  // --- Why Choose Us Section (singleton) ---
  await client.createOrReplace({
    _id: "whyChooseUsSection",
    _type: "whyChooseUsSection",
    eyebrow: "Why ClearPeak",
    title: "Higher Standards, Better Results",
    description:
      "We built ClearPeak to be the exterior cleaning company Denver homeowners actually recommend to their neighbors.",
    reasons: [
      {
        icon: "FiTool",
        title: "Professional Equipment",
        description: "Commercial-grade pressure washers and soft-wash systems calibrated for every surface type.",
      },
      {
        icon: "FiFeather",
        title: "Eco-Friendly Products",
        description: "Biodegradable cleaning solutions that are safe for your family, pets, and landscaping.",
      },
      {
        icon: "FiClock",
        title: "Fast Response",
        description: "Most estimate requests are answered within one business hour, with flexible scheduling.",
      },
      {
        icon: "FiHeart",
        title: "Premium Customer Service",
        description: "Friendly, communicative crews who treat your property like their own.",
      },
      {
        icon: "FiDollarSign",
        title: "Transparent Pricing",
        description: "Upfront, itemized quotes with no hidden fees or last-minute upsells.",
      },
      {
        icon: "FiTarget",
        title: "Attention to Detail",
        description: "From tracks and sills to corners and edges, we don't cut corners — literally.",
      },
      {
        icon: "FiHome",
        title: "Locally Owned",
        description: "Proudly Denver-based and invested in the community we serve every day.",
      },
    ].map((r) => ({ _type: "iconCard", _key: randKey(), ...r })),
  });
  console.log("✓ Why Choose Us section");

  // --- Process Section (singleton) ---
  await client.createOrReplace({
    _id: "processSection",
    _type: "processSection",
    eyebrow: "How It Works",
    title: "Simple, Start to Finish",
    description: "No hassle, no surprises — just a straightforward path to a beautifully clean exterior.",
    steps: [
      {
        icon: "FiClipboard",
        title: "Request Quote",
        description: "Tell us about your property and the services you need. Get a transparent, free estimate fast.",
      },
      {
        icon: "FiCalendar",
        title: "Schedule",
        description: "Pick a date and time that works for you — including evenings and weekends.",
      },
      {
        icon: "FiDroplet",
        title: "We Clean",
        description: "Our insured, professional crew arrives on time and treats your property with care.",
      },
      {
        icon: "FiSmile",
        title: "Enjoy",
        description: "Step back and enjoy a home that looks brand new — backed by our satisfaction guarantee.",
      },
    ].map((s) => ({ _type: "iconCard", _key: randKey(), ...s })),
  });
  console.log("✓ Process section");

  // --- Trust Badges & Stats (singleton) ---
  await client.createOrReplace({
    _id: "trustBadgesSection",
    _type: "trustBadgesSection",
    badges: [
      { icon: "FiShield", label: "Fully Insured" },
      { icon: "FiHome", label: "Locally Owned" },
      { icon: "FiThumbsUp", label: "Satisfaction Guaranteed" },
      { icon: "FiStar", label: "Five-Star Rated" },
    ].map((b) => ({ _type: "iconLabel", _key: randKey(), ...b })),
    stats: [
      { value: 3200, suffix: "+", label: "Homes Cleaned", decimal: false },
      { value: 4.9, suffix: "★", label: "Average Rating", decimal: true },
      { value: 10, suffix: "+", label: "Cities Served", decimal: false },
      { value: 8, suffix: " yrs", label: "In Business", decimal: false },
    ].map((s) => ({ _type: "statItem", _key: randKey(), ...s })),
  });
  console.log("✓ Trust badges & stats");

  // --- About Page (singleton) ---
  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    heroHeadline: "Colorado-Owned.",
    heroHighlight: "Customer-Obsessed.",
    heroBody:
      "ClearPeak Exteriors was founded on a simple idea: Denver Metro homeowners deserve an exterior cleaning company that shows up on time, does the job right, and treats every property like their own. Since then, we've grown into one of the area's most trusted names in residential and commercial exterior care.",
    heroImage: await imageField(images.coupleOutdoor, "about-hero.jpg"),
    valuesEyebrow: "What Drives Us",
    valuesTitle: "Built on Trust, Backed by Results",
    values: [
      {
        icon: "FiTarget",
        title: "Our Mission",
        description:
          "To help every Denver Metro homeowner and business take pride in how their property looks — through honest, high-quality exterior cleaning.",
      },
      {
        icon: "FiHeart",
        title: "Our Values",
        description:
          "Integrity, craftsmanship, and genuine care for our customers' homes and the environment guide every job we take on.",
      },
      {
        icon: "FiShield",
        title: "Our Promise",
        description: "Fully insured, transparent pricing, and a satisfaction guarantee on every single service we provide.",
      },
    ].map((v) => ({ _type: "iconCard", _key: randKey(), ...v })),
  });
  console.log("✓ About page");

  // --- Section Headings (singleton) ---
  await client.createOrReplace({
    _id: "siteContent",
    _type: "siteContent",
    servicesSection: {
      _type: "sectionHeading",
      eyebrow: "What We Do",
      title: "Full-Service Exterior Cleaning",
      description:
        "From your roofline to your driveway, we've got every exterior surface covered — with the equipment, expertise, and care to do it right.",
    },
    beforeAfterSection: {
      _type: "sectionHeading",
      eyebrow: "Real Results",
      title: "See the ClearPeak Difference",
      description: "Drag the slider to see the transformation. These are real results from real Denver Metro properties.",
    },
    gallerySection: {
      _type: "sectionHeading",
      eyebrow: "Our Work",
      title: "A Portfolio of Transformations",
      description:
        "Browse real projects across the Denver Metro area — filter by service to find exactly what you're looking for.",
    },
    reviewsSection: {
      _type: "sectionHeading",
      eyebrow: "Reviews",
      title: "Loved by Homeowners Across Denver",
      description: "",
    },
    serviceAreasSection: {
      _type: "sectionHeading",
      eyebrow: "Where We Work",
      title: "Proudly Serving the Denver Metro Area",
      description: "Click your city to see local pricing, neighborhoods we serve, and service availability.",
    },
    blogSection: {
      _type: "sectionHeading",
      eyebrow: "From the Blog",
      title: "Tips, Guides & Local Know-How",
      description: "Practical advice on keeping your Colorado home looking its best, all year long.",
    },
    faqSection: {
      _type: "sectionHeading",
      eyebrow: "FAQ",
      title: "Frequently Asked Questions",
      description: "",
    },
  });
  console.log("✓ Section headings");

  console.log("\nSeed complete.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
