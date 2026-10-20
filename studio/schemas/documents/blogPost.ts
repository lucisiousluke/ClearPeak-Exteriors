export default {
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    {
      name: "slug",
      title: "Slug (controls the page URL)",
      type: "slug",
      description:
        "This is what creates the link to this post — it points to /blog/[this-slug]. Changing it changes the page's actual web address, so any existing links or bookmarks to the old URL will break.",
      options: { source: "title" },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description:
        "Short summary shown on the blog listing page. Also used as the Google description unless SEO → Meta Description is filled in.",
      validation: (Rule: any) => Rule.required().warning("Add an excerpt — it's used on the blog page and in Google results."),
    },
    {
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Describes the photo for screen readers and Google, e.g. \"technician soft washing a stucco home in Arvada\".",
          validation: (Rule: any) => Rule.required().warning("Alt text helps this image show up in Google Images."),
        },
      ],
    },
    { name: "category", title: "Category", type: "reference", to: [{ type: "category" }] },
    { name: "author", title: "Author", type: "reference", to: [{ type: "author" }] },
    { name: "publishedAt", title: "Published Date", type: "datetime" },
    { name: "readTime", title: "Read Time", type: "string", description: "e.g. 5 min read" },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
              description: "Describes the photo for screen readers and Google, e.g. \"soft washed stucco home in Littleton, CO\".",
            },
          ],
        },
        {
          type: "table",
          title: "Table",
          description: "The first row is shown as the table's header.",
        },
      ],
    },
    {
      name: "seo",
      title: "SEO",
      type: "seo",
      description: "Optional — controls how this post appears in Google and when shared. Blank fields fall back to the title, excerpt and hero image.",
    },
  ],
};
