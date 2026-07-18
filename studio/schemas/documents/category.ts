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
    {
      name: "icon",
      title: "Icon Name",
      description:
        "Shown next to this category's header in the homepage services section. A Feather icon name (e.g. FiHome) or Font Awesome 6 icon name (e.g. FaBuilding). Browse names at react-icons.github.io/react-icons.",
      type: "string",
      hidden: ({ parent }: { parent?: { appliesTo?: string } }) => parent?.appliesTo !== "Service",
    },
    {
      name: "order",
      title: "Sort Order",
      description: "Controls the order this category appears in on the homepage, lowest first.",
      type: "number",
      hidden: ({ parent }: { parent?: { appliesTo?: string } }) => parent?.appliesTo !== "Service",
    },
  ],
};
