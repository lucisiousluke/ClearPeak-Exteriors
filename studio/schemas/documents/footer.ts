export default {
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    { name: "description", title: "Footer Description", type: "text", rows: 3 },
    {
      name: "columns",
      title: "Link Columns",
      type: "array",
      of: [
        {
          type: "object",
          name: "footerColumn",
          fields: [
            { name: "heading", title: "Heading", type: "string" },
            {
              name: "source",
              title: "Links",
              type: "string",
              description:
                "\"All services\" lists every Service document automatically (same as the Services menu at the top), so it stays correct when you add, rename or remove a service.",
              options: {
                list: [
                  { title: "Manual links", value: "manual" },
                  { title: "All services (automatic)", value: "services" },
                ],
                layout: "radio",
              },
              initialValue: "manual",
            },
            {
              name: "links",
              title: "Manual Links",
              type: "array",
              hidden: ({ parent }: { parent?: { source?: string } }) => parent?.source === "services",
              of: [
                {
                  type: "object",
                  name: "footerLink",
                  fields: [
                    { name: "label", title: "Label", type: "string" },
                    { name: "url", title: "URL", type: "string" },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: { title: "heading", source: "source" },
            prepare({ title, source }: { title?: string; source?: string }) {
              return { title: title || "Column", subtitle: source === "services" ? "All services (automatic)" : "Manual links" };
            },
          },
        },
      ],
    },
    { name: "legalLinks", title: "Legal Links", type: "array", of: [{ type: "object", name: "legalLink", fields: [{ name: "label", title: "Label", type: "string" }, { name: "url", title: "URL", type: "string" }] }] },
  ],
  preview: {
    prepare() {
      return { title: "Site Footer" };
    },
  },
};
