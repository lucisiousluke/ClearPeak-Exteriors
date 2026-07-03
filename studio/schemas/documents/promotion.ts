export default {
  name: "promotion",
  title: "Promotion",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "message", title: "Banner Message", type: "string" },
    { name: "cta", title: "CTA Button", type: "ctaButton" },
    { name: "startDate", title: "Start Date", type: "date" },
    { name: "endDate", title: "End Date", type: "date" },
    { name: "active", title: "Active", type: "boolean", initialValue: true },
    {
      name: "placement",
      title: "Placement",
      type: "string",
      options: { list: ["Top Banner", "Homepage Section", "Popup"] },
    },
  ],
};
