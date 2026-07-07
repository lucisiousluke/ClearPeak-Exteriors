export default {
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    { name: "heroEyebrow", title: "Hero Eyebrow Badge", type: "string" },
    { name: "heroHeadline", title: "Hero Headline", type: "string" },
    { name: "heroHighlight", title: "Hero Headline Highlight", type: "string", description: "The gradient-colored line" },
    { name: "heroSubheadline", title: "Hero Subheadline", type: "text", rows: 3 },
    { name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } },
    { name: "heroPrimaryCta", title: "Hero Primary CTA", type: "ctaButton" },
    { name: "heroSecondaryCta", title: "Hero Secondary CTA", type: "ctaButton" },
    {
      name: "trustBadges",
      title: "Trust Badges",
      type: "array",
      of: [{ type: "string" }],
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
    { name: "finalCtaHeadline", title: "Final CTA Headline", type: "string" },
    { name: "finalCtaSubtext", title: "Final CTA Subtext", type: "text", rows: 2 },
    { name: "seo", title: "SEO", type: "seo" },
  ],
  preview: {
    select: { title: "heroHeadline", subtitle: "heroHighlight" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return { title: title ? `${title} ${subtitle ?? ""}`.trim() : "Homepage" };
    },
  },
};
