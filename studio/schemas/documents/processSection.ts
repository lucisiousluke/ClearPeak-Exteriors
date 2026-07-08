export default {
  name: "processSection",
  title: "Process Section",
  type: "document",
  fields: [
    { name: "eyebrow", title: "Eyebrow Badge", type: "string" },
    { name: "title", title: "Title", type: "string" },
    { name: "description", title: "Description", type: "text", rows: 2 },
    { name: "steps", title: "Process Steps", type: "array", of: [{ type: "iconCard" }] },
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }: { title?: string }) {
      return { title: title || "Process Section" };
    },
  },
};
