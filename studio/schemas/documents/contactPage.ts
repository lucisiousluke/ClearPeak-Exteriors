export default {
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    { name: "headline", title: "Headline", type: "string" },
    { name: "subheadline", title: "Subheadline", type: "text", rows: 2 },
    {
      name: "formFields",
      title: "Form Fields",
      type: "array",
      of: [{ type: "formField" }],
      description: "Configure the fields shown on the contact form, in order.",
    },
  ],
  preview: {
    select: { title: "headline" },
    prepare({ title }: { title?: string }) {
      return { title: title || "Contact Page" };
    },
  },
};
