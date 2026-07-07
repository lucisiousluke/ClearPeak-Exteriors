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
  preview: {
    select: { links: "mainLinks" },
    prepare({ links }: { links?: unknown[] }) {
      return {
        title: "Site Navigation",
        subtitle: `${links?.length ?? 0} nav link${links?.length === 1 ? "" : "s"}`,
      };
    },
  },
};
