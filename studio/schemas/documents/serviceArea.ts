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
