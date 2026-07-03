export default {
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    { name: "question", title: "Question", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "answer", title: "Answer", type: "text", rows: 4, validation: (Rule: any) => Rule.required() },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["General", "Pricing", "Scheduling", "Service-Specific"] },
    },
    { name: "order", title: "Sort Order", type: "number" },
  ],
};
