export default {
  name: "ctaButton",
  title: "CTA Button",
  type: "object",
  fields: [
    { name: "label", title: "Label", type: "string" },
    { name: "url", title: "URL", type: "string", description: "Internal path (/contact) or full URL" },
    {
      name: "style",
      title: "Style",
      type: "string",
      options: { list: ["primary", "secondary", "outline", "white"] },
      initialValue: "primary",
    },
  ],
};
