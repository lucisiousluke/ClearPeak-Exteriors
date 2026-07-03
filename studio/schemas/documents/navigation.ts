export default {
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    {
      name: "mainLinks",
      title: "Main Nav Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "navLink",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "url", title: "URL", type: "string" },
          ],
        },
      ],
    },
    { name: "headerCta", title: "Header CTA Button", type: "ctaButton" },
  ],
};
