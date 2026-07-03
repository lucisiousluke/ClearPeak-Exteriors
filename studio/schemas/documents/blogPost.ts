export default {
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule: any) => Rule.required() },
    { name: "excerpt", title: "Excerpt", type: "text", rows: 3 },
    { name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } },
    { name: "category", title: "Category", type: "reference", to: [{ type: "category" }] },
    { name: "author", title: "Author", type: "reference", to: [{ type: "author" }] },
    { name: "publishedAt", title: "Published Date", type: "datetime" },
    { name: "readTime", title: "Read Time", type: "string", description: "e.g. 5 min read" },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    },
    { name: "seo", title: "SEO", type: "seo" },
  ],
};
