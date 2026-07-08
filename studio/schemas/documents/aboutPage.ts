export default {
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    { name: "heroHeadline", title: "Hero Headline", type: "string" },
    { name: "heroHighlight", title: "Hero Headline Highlight", type: "string", description: "The gradient-colored part" },
    { name: "heroBody", title: "Hero Body Copy", type: "text", rows: 4 },
    { name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } },
    { name: "valuesEyebrow", title: "Values Eyebrow Badge", type: "string" },
    { name: "valuesTitle", title: "Values Title", type: "string" },
    { name: "values", title: "Value Cards", type: "array", of: [{ type: "iconCard" }] },
    { name: "seo", title: "SEO", type: "seo" },
  ],
  preview: {
    select: { title: "heroHeadline" },
    prepare({ title }: { title?: string }) {
      return { title: title || "About Page" };
    },
  },
};
