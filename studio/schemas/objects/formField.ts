export default {
  name: "formField",
  title: "Form Field",
  type: "object",
  fields: [
    {
      name: "name",
      title: "Field Name (internal)",
      type: "string",
      description: "No spaces — used as the technical form field name (e.g. name, phone, email, message).",
      validation: (Rule: any) =>
        Rule.required().regex(/^[a-zA-Z0-9_-]+$/, { name: "no spaces or special characters" }),
    },
    { name: "label", title: "Label", type: "string", validation: (Rule: any) => Rule.required() },
    {
      name: "fieldType",
      title: "Field Type",
      type: "string",
      options: {
        list: [
          { title: "Text", value: "text" },
          { title: "Email", value: "email" },
          { title: "Phone", value: "tel" },
          { title: "Long Text", value: "textarea" },
          { title: "Dropdown", value: "select" },
        ],
      },
      initialValue: "text",
      validation: (Rule: any) => Rule.required(),
    },
    { name: "placeholder", title: "Placeholder Text", type: "string" },
    { name: "required", title: "Required Field", type: "boolean", initialValue: false },
    {
      name: "width",
      title: "Width",
      type: "string",
      options: {
        list: [
          { title: "Half Width (sits side-by-side with the next field)", value: "half" },
          { title: "Full Width", value: "full" },
        ],
      },
      initialValue: "full",
    },
    {
      name: "dynamicOptionsSource",
      title: "Dropdown Options Source",
      type: "string",
      description: "Only used when Field Type is Dropdown.",
      options: {
        list: [
          { title: "Custom (use options below)", value: "none" },
          { title: "Services (live list)", value: "services" },
          { title: "Service Areas / Cities (live list)", value: "cities" },
        ],
      },
      initialValue: "none",
      hidden: ({ parent }: any) => parent?.fieldType !== "select",
    },
    {
      name: "options",
      title: "Dropdown Options",
      type: "array",
      of: [{ type: "string" }],
      hidden: ({ parent }: any) => parent?.fieldType !== "select" || parent?.dynamicOptionsSource !== "none",
    },
  ],
  preview: {
    select: { title: "label", subtitle: "fieldType" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return { title: title || "Untitled field", subtitle };
    },
  },
};
