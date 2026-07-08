export default {
  name: "whyChooseUsSection",
  title: "Why Choose Us Section",
  type: "document",
  fields: [
    { name: "eyebrow", title: "Eyebrow Badge", type: "string" },
    { name: "title", title: "Title", type: "string" },
    { name: "description", title: "Description", type: "text", rows: 2 },
    { name: "reasons", title: "Reason Cards", type: "array", of: [{ type: "iconCard" }] },
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }: { title?: string }) {
      return { title: title || "Why Choose Us Section" };
    },
  },
};
