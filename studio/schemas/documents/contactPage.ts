export default {
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    { name: "headline", title: "Headline", type: "string" },
    { name: "subheadline", title: "Subheadline", type: "text", rows: 2 },
  ],
  preview: {
    select: { title: "headline" },
    prepare({ title }: { title?: string }) {
      return { title: title || "Contact Page" };
    },
  },
};
