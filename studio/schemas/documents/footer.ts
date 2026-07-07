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
              name: "links",
              title: "Links",
              type: "array",
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
