# ClearPeak Exteriors — Sanity Studio

Live project: `vgi0saae` / dataset `production`. Studio deployed at
[clearpeak-exteriors.sanity.studio](https://clearpeak-exteriors.sanity.studio).

## Working on the Studio

```bash
cd studio
npm install
npm run dev       # local Studio at http://localhost:3333
npm run deploy    # deploy changes to clearpeak-exteriors.sanity.studio
```

Schema changes go in `schemas/`, registered in `schemas/index.ts`, configured in `sanity.config.ts`.

## How content reaches the site

The Gatsby site does **not** query Sanity directly at request time — instead,
`scripts/fetch-sanity-content.mjs` (in the repo root) fetches published documents via GROQ and
regenerates `src/data/services.ts`, `cities.ts`, `testimonials.ts`, `faqs.ts`, `blogPosts.ts`, and
`gallery.ts` as plain TypeScript. This runs automatically via npm's `predevelop`/`prebuild` hooks
before every `npm run develop` / `npm run build`, so Netlify picks up Studio edits on the next deploy
with zero extra config. Run `npm run sync:sanity` from the repo root to refresh those files without a
full build.

`src/data/site.ts` and `src/data/images.ts` are **not** generated — they're still hand-maintained.

## Re-seeding placeholder content

`scripts/seed-sanity.ts` is the one-time script that pushed the original placeholder copy/photos into
this dataset (idempotent — safe to re-run, e.g. after a schema change, via `npm run seed:sanity` from
the repo root). It uses the Sanity CLI's stored login token, so you must be logged in
(`npx sanity login` from `studio/`) with write access to the project.

## Singleton documents

`homepage`, `siteSettings`, `navigation`, `footer`, and `globalCta` are singletons — the desk structure
in `sanity.config.ts` hides "duplicate"/"delete" for these and pins them to fixed document IDs
(`_id: "homepage"`, etc.) so editors always land on the one instance. These are seeded but **not yet**
consumed by the fetch script — the site still reads site-wide settings/nav/footer/hero copy from
`src/data/site.ts`. Wire them into `fetch-sanity-content.mjs` if you want Studio control over that content.

## Schema map

| Schema | Purpose | Wired into site build? |
| --- | --- | --- |
| `service` | The 10 service pages (`/services/[slug]`) | Yes |
| `serviceArea` | The 10 city pages (`/service-areas/[slug]`) | Yes |
| `blogPost` | Blog articles | Yes |
| `testimonial` | Customer reviews | Yes |
| `galleryItem` | Portfolio gallery images | Yes |
| `beforeAfter` | Before/after slider pairs | Yes |
| `faq` | FAQ entries (`category: "General"` = sitewide list; `"Service-Specific"` = per-service) | Yes |
| `category` | Shared categories for blog/gallery | Yes (via reference) |
| `author` | Blog post authors | Yes (via reference) |
| `coupon` | Promotional discounts | No (schema only, no data yet) |
| `teamMember` | About page team bios | No (schema only, no data yet) |
| `promotion` | Site-wide promo banners | No (schema only, no data yet) |
| `homepage` | Hero copy, featured services/testimonials | Seeded, not yet consumed |
| `siteSettings` | Phone, email, address, social links | Seeded, not yet consumed |
| `navigation` | Header nav links + CTA | Seeded, not yet consumed |
| `footer` | Footer link columns | Seeded, not yet consumed |
| `globalCta` | Reusable final-CTA content block | Seeded, not yet consumed |
