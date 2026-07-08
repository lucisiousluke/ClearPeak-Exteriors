export default {
  name: "iconCard",
  title: "Icon Card",
  type: "object",
  fields: [
    {
      name: "icon",
      title: "Icon",
      type: "string",
      description: "A react-icons/fi (Feather) icon name, e.g. FiTool, FiClipboard, FiHeart.",
      validation: (Rule: any) => Rule.required().regex(/^Fi[A-Z][A-Za-z0-9]*$/, { name: "a Feather icon name starting with Fi" }),
    },
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "description", title: "Description", type: "text", rows: 2 },
  ],
  preview: {
    select: { title: "title", subtitle: "icon" },
  },
};
