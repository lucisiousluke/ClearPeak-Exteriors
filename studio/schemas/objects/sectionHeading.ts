export default {
  name: "sectionHeading",
  title: "Section Heading",
  type: "object",
  fields: [
    { name: "eyebrow", title: "Eyebrow Badge", type: "string" },
    { name: "title", title: "Title", type: "string" },
    { name: "description", title: "Description", type: "text", rows: 2 },
  ],
  preview: {
    select: { title: "title", subtitle: "eyebrow" },
  },
};
