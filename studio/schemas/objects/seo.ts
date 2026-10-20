// Reusable SEO object — attach to any document that renders its own page.
// Every field is optional: anything left blank falls back to the page's
// built-in title/description, then to Site Settings → Default SEO.
// Length limits are warnings, not errors, so they never block publishing.
export default {
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    {
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description:
        "The blue headline in Google results and the browser tab. Used exactly as written — aim for 50–60 characters with your main keyword near the start. Leave blank to use the page's title.",
      validation: (Rule: any) => Rule.max(60).warning("Over 60 characters — Google will likely cut this off."),
    },
    {
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description:
        "The gray summary under the headline in Google results. Aim for 120–160 characters that make someone want to click. Leave blank to use the page's default (for blog posts, the Excerpt).",
      validation: (Rule: any) => [
        Rule.max(160).warning("Over 160 characters — Google will likely cut this off."),
        Rule.min(70).warning("Under 70 characters — consider adding a bit more detail."),
      ],
    },
    {
      name: "ogImage",
      title: "Social Share Image",
      type: "image",
      options: { hotspot: true },
      description:
        "Shown when this page is shared on Facebook, iMessage, LinkedIn, etc. Cropped to 1200×630 — use the hotspot to keep the important part in frame. Leave blank to use the page's main image.",
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Short description of the image.",
        },
      ],
    },
    {
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      initialValue: false,
      description: "Keeps this page out of Google and the sitemap. Leave off unless you have a specific reason.",
    },
  ],
};
