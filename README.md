# ClearPeak Exteriors

Denver Metro's premium residential & commercial exterior cleaning company. Marketing site built with Gatsby, TypeScript, Tailwind CSS, and Framer Motion, deployed on Netlify.

## Stack

- **Gatsby 5** + **TypeScript** — static site generation, dynamic service/city/blog pages via `gatsby-node.ts`
- **Tailwind CSS** — brand theme (Electric Aqua / Miami Pink / Coral) in `tailwind.config.ts`
- **Framer Motion** — scroll reveals, hover states, before/after slider, carousels
- **react-icons** — icon system (Feather set)
- **Sanity.io** — live CMS at project `vgi0saae` / dataset `production`, Studio deployed at
  [clearpeak-exteriors.sanity.studio](https://clearpeak-exteriors.sanity.studio) — see `studio/README.md`
- **Netlify** — hosting, forms (`/contact`), and deploy config in `netlify.toml`

## Getting started

```bash
npm install
npm run develop   # fetches latest Sanity content, then http://localhost:8000
npm run build      # fetches latest Sanity content, then production build to /public
npm run typecheck
```

## Editing content

Content lives in Sanity, not in the repo. Log in at
[clearpeak-exteriors.sanity.studio](https://clearpeak-exteriors.sanity.studio) to edit services, service areas,
testimonials, FAQs, blog posts, and the gallery/before-after library. `src/data/*.ts` (except `site.ts` and
`images.ts`) is **auto-generated** from Sanity by `scripts/fetch-sanity-content.mjs` — it reruns automatically
before every `npm run develop` / `npm run build` (and therefore every Netlify deploy), so edits published in the
Studio show up on the next build. Don't hand-edit the generated files; edit in the Studio and run
`npm run sync:sanity` if you want to refresh them locally without a full build.

Site-wide settings, navigation, footer, and homepage hero copy also exist as Sanity singletons
(`siteSettings`, `navigation`, `footer`, `homepage`, `globalCta`) but aren't wired into the generator yet — the
site still reads those from `src/data/site.ts`. Ask to have that wired up if you want to edit them from the
Studio too.

## Project structure

```
src/
  components/
    ui/         reusable primitives (Button, Card, Section, Container, Accordion, ...)
    layout/      Header, Footer, Layout, floating quote button, mobile call bar
    sections/    homepage sections (Hero, Services, Reviews, Process, FAQ, ...)
    shared/      SEO, ServiceCard, ReviewCard, BeforeAfterSlider, Lightbox
  data/          Sanity-generated content (services, cities, testimonials, blog posts, gallery) + static site.ts/images.ts
  templates/     page templates for services, service areas, and blog posts
  pages/         static routes (index, services, service-areas, gallery, about, contact, blog, 404)
  types/         shared TypeScript interfaces
studio/          Sanity Studio (schemas + config), deployed at clearpeak-exteriors.sanity.studio
scripts/         fetch-sanity-content.mjs (build-time content sync), seed-sanity.ts (one-time placeholder seed)
```

## Content

Editable content is sourced from Sanity (see "Editing content" above). Photography uses Sanity's CDN once
uploaded via the Studio, with an automatic gradient fallback if any image URL ever fails to load — see
`src/components/ui/Photo.tsx`.

## Pages generated

- 10 service pages: `/services/[slug]`
- 10 service-area pages: `/service-areas/[slug]`
- 8 blog posts: `/blog/[slug]`
- Static: `/`, `/services`, `/service-areas`, `/gallery`, `/blog`, `/about`, `/contact`
