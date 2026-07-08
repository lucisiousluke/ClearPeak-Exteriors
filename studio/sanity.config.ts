import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

const singletonTypes = new Set(["homepage", "siteSettings", "navigation", "footer", "globalCta", "contactPage"]);

export default defineConfig({
  name: "clearpeak-exteriors",
  title: "ClearPeak Exteriors",
  projectId: "vgi0saae",
  dataset: "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Homepage")
              .child(S.document().schemaType("homepage").documentId("homepage")),
            S.listItem()
              .title("Site Settings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.listItem()
              .title("Navigation")
              .child(S.document().schemaType("navigation").documentId("navigation")),
            S.listItem()
              .title("Footer")
              .child(S.document().schemaType("footer").documentId("footer")),
            S.listItem()
              .title("Global CTA")
              .child(S.document().schemaType("globalCta").documentId("globalCta")),
            S.listItem()
              .title("Contact Page")
              .child(S.document().schemaType("contactPage").documentId("contactPage")),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => item.getId() && !singletonTypes.has(item.getId()!)),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // Hide "duplicate"/"delete" actions for singleton documents.
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && !["duplicate", "delete"].includes(action))
        : input,
  },
});
