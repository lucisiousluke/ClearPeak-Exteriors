export default {
  name: "beforeAfter",
  title: "Before & After",
  type: "document",
  description:
    "Each document here is one slide in the homepage \"Real Results\" before/after slider (the section titled under Shared Sections → Section Headings). Create a new one to add a slide, or edit an existing one to change its images.",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    {
      name: "beforeImage",
      title: "Before Image",
      type: "image",
      options: { hotspot: true },
      description: "Shown on the left / \"before\" side of the slider.",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "afterImage",
      title: "After Image",
      type: "image",
      options: { hotspot: true },
      description: "Shown on the right / \"after\" side of the slider.",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "service",
      title: "Related Service",
      type: "reference",
      to: [{ type: "service" }],
      description: "Shown as the small badge/tag next to the slide title (e.g. \"Pressure Washing\").",
    },
    { name: "serviceArea", title: "Location", type: "reference", to: [{ type: "serviceArea" }] },
    {
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
      description: "Turn on to include this slide in the homepage slider. Slides not featured still exist as documents but won't show on the homepage.",
    },
    {
      name: "order",
      title: "Sort Order",
      type: "number",
      description: "Controls the order slides appear in on the homepage, lowest first. Leave blank to fall back to creation date.",
    },
  ],
  preview: {
    select: { title: "title", subtitle: "service.name", media: "beforeImage", featured: "featured" },
    prepare({ title, subtitle, media, featured }: { title?: string; subtitle?: string; media?: unknown; featured?: boolean }) {
      return {
        title: title || "Untitled",
        subtitle: `${featured ? "★ On homepage" : "Not on homepage"}${subtitle ? ` · ${subtitle}` : ""}`,
        media,
      };
    },
  },
};
