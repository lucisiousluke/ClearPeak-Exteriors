import { sectionBlockTypes } from "../objects/sectionBlocks";

export default {
  name: "homepage",
  title: "Homepage",
  type: "document",
  fieldsets: [{ name: "hero", title: "Hero Section", options: { collapsible: true, collapsed: false } }],
  fields: [
    { name: "heroEyebrow", title: "Hero Eyebrow Badge", type: "string", fieldset: "hero" },
    { name: "heroHeadline", title: "Hero Headline", type: "string", fieldset: "hero" },
    {
      name: "heroHighlight",
      title: "Hero Headline Highlight",
      type: "string",
      description: "The gradient-colored line",
      fieldset: "hero",
    },
    { name: "heroSubheadline", title: "Hero Subheadline", type: "text", rows: 3, fieldset: "hero" },
    { name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true }, fieldset: "hero" },
    { name: "heroPrimaryCta", title: "Hero Primary CTA", type: "ctaButton", fieldset: "hero" },
    { name: "heroSecondaryCta", title: "Hero Secondary CTA", type: "ctaButton", fieldset: "hero" },
    {
      name: "heroBadge",
      title: "Hero Floating Badge (pink tag on the hero photo)",
      type: "string",
      description: "Short callout shown on the small pink badge overlaid on the hero image, e.g. \"Same-Week Availability\".",
      fieldset: "hero",
    },
    {
      name: "trustBadges",
      title: "Trust Badges (small text row under hero buttons)",
      type: "array",
      of: [{ type: "string" }],
      fieldset: "hero",
    },
    {
      name: "sections",
      title: "Page Sections",
      description:
        "Drag to reorder, add/remove/duplicate sections. This controls what appears between the Hero and the closing CTA, and in what order.",
      type: "array",
      of: sectionBlockTypes.map((t) => ({ type: t.name })),
    },
    {
      name: "featuredServices",
      title: "Featured Services",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    },
    {
      name: "featuredTestimonials",
      title: "Featured Testimonials",
      type: "array",
      of: [{ type: "reference", to: [{ type: "testimonial" }] }],
    },
    { name: "seo", title: "SEO", type: "seo" },
  ],
  preview: {
    select: { title: "heroHeadline", subtitle: "heroHighlight" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return { title: title ? `${title} ${subtitle ?? ""}`.trim() : "Homepage" };
    },
  },
};
