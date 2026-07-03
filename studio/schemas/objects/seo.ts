// Reusable SEO object — attach to any document that renders its own page.
export default {
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    { name: "metaTitle", title: "Meta Title", type: "string", validation: (Rule: any) => Rule.max(60) },
    {
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      validation: (Rule: any) => Rule.max(160),
    },
    { name: "ogImage", title: "Social Share Image", type: "image", options: { hotspot: true } },
    { name: "noIndex", title: "Hide from search engines", type: "boolean", initialValue: false },
  ],
};
