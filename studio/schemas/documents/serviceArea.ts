export default {
  name: "serviceArea",
  title: "Service Area",
  type: "document",
  fields: [
    { name: "name", title: "City Name", type: "string", validation: (Rule: any) => Rule.required() },
    {
      name: "slug",
      title: "Slug (controls the page URL)",
      type: "slug",
      description:
        "This is what creates the link for this city — cards and links to it point to /service-areas/[this-slug]. Changing it changes the page's actual web address, so any existing links or bookmarks to the old URL will break.",
      options: { source: "name" },
      validation: (Rule: any) => Rule.required(),
    },
    { name: "county", title: "County", type: "string" },
    { name: "blurb", title: "Intro Blurb", type: "text", rows: 3 },
    {
      name: "localContent",
      title: "Local Page Content",
      type: "array",
      description:
        "Write-up unique to this city, shown below the intro. Google ranks city pages higher when each one says something specific — local projects you've done, neighborhoods and home styles, local conditions (trees, HOAs, hail, sun exposure), or a customer story. Aim for 200+ words. Leave blank to hide.",
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
              description: "Describes the photo, e.g. \"freshly soft washed brick home in Littleton, CO\".",
            },
          ],
        },
      ],
    },
    { name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } },
    { name: "zipCodes", title: "Zip Codes", type: "array", of: [{ type: "string" }] },
    { name: "neighborhoods", title: "Neighborhoods Served", type: "array", of: [{ type: "string" }] },
    {
      name: "geo",
      title: "Coordinates",
      type: "geopoint",
    },
    {
      name: "localFaqs",
      title: "Local FAQs",
      type: "array",
      of: [{ type: "reference", to: [{ type: "faq" }] }],
    },
    { name: "seo", title: "SEO", type: "seo" },
  ],
};
