export default {
  name: "promotion",
  title: "Promotion",
  type: "document",
  fields: [
    { name: "title", title: "Title (internal, not shown on site)", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "message", title: "Banner Message", type: "string", description: "The actual text shown to visitors." },
    { name: "cta", title: "CTA Button", type: "ctaButton" },
    {
      name: "startDate",
      title: "Start Date",
      type: "date",
      description: "Optional. If set (with or without an End Date), this promo only shows on/after this date.",
    },
    {
      name: "endDate",
      title: "End Date",
      type: "date",
      description: "Optional. If set, this promo automatically stops showing after this date — no need to remember to turn it off.",
    },
    {
      name: "active",
      title: "Active (emergency off switch)",
      type: "boolean",
      initialValue: true,
      description:
        "Turn off to hide this promo immediately, regardless of dates. Leave on and use Start/End Date to schedule it normally.",
    },
    {
      name: "placement",
      title: "Placement",
      type: "string",
      options: {
        list: [
          { title: "Top Banner (bar above the header, every page)", value: "Top Banner" },
          { title: "Homepage Section (block in the homepage's Page Sections list)", value: "Homepage Section" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: { title: "title", subtitle: "placement", active: "active" },
    prepare({ title, subtitle, active }: { title?: string; subtitle?: string; active?: boolean }) {
      return { title: `${active ? "🟢" : "⚪️"} ${title || "Untitled promotion"}`, subtitle };
    },
  },
};
