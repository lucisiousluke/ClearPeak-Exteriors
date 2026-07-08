export default {
  name: "homepage",
  title: "Homepage",
  type: "document",
  fieldsets: [
    { name: "hero", title: "Hero Section", options: { collapsible: true, collapsed: false } },
    {
      name: "process",
      title: "Process Section (\"How It Works\")",
      options: { collapsible: true, collapsed: true },
    },
  ],
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
      name: "trustBadges",
      title: "Trust Badges (small text row under hero buttons)",
      type: "array",
      of: [{ type: "string" }],
      fieldset: "hero",
    },
    {
      name: "processEyebrow",
      title: "Eyebrow Badge",
      type: "string",
      fieldset: "process",
    },
    { name: "processTitle", title: "Title", type: "string", fieldset: "process" },
    { name: "processDescription", title: "Description", type: "text", rows: 2, fieldset: "process" },
    { name: "processSteps", title: "Process Steps", type: "array", of: [{ type: "iconCard" }], fieldset: "process" },
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
    { name: "finalCtaHeadline", title: "Final CTA Headline (unused — see Global CTA)", type: "string" },
    { name: "finalCtaSubtext", title: "Final CTA Subtext (unused — see Global CTA)", type: "text", rows: 2 },
    { name: "seo", title: "SEO", type: "seo" },
  ],
  preview: {
    select: { title: "heroHeadline", subtitle: "heroHighlight" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return { title: title ? `${title} ${subtitle ?? ""}`.trim() : "Homepage" };
    },
  },
};
