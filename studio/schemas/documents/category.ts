export default {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    {
      name: "appliesTo",
      title: "Applies To",
      type: "string",
      options: { list: ["Blog", "Gallery", "Service"] },
    },
  ],
};
