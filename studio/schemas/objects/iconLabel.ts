export default {
  name: "iconLabel",
  title: "Icon + Label",
  type: "object",
  fields: [
    {
      name: "icon",
      title: "Icon",
      type: "string",
      description: "A react-icons/fi (Feather) icon name, e.g. FiShield, FiHome.",
      validation: (Rule: any) => Rule.required().regex(/^Fi[A-Z][A-Za-z0-9]*$/, { name: "a Feather icon name starting with Fi" }),
    },
    { name: "label", title: "Label", type: "string", validation: (Rule: any) => Rule.required() },
  ],
  preview: {
    select: { title: "label", subtitle: "icon" },
  },
};
