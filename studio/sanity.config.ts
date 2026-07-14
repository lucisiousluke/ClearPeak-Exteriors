import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { colorInput } from "@sanity/color-input";
import { schemaTypes } from "./schemas";

const singletonTypes = new Set([
  "homepage",
  "siteSettings",
  "navigation",
  "footer",
  "globalCta",
  "contactPage",
  "whyChooseUsSection",
  "trustBadgesSection",
  "aboutPage",
  "siteContent",
  "brandColors",
]);

export default defineConfig({
  name: "clearpeak-exteriors",
  title: "ClearPeak Exterior",
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
              .title("About Page")
              .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
            S.listItem()
              .title("Contact Page")
              .child(S.document().schemaType("contactPage").documentId("contactPage")),
            S.divider(),
            // Content used on more than one page lives here, grouped together
            // so it's clear why these aren't nested under Homepage.
            S.listItem()
              .title("Shared Sections")
              .child(
                S.list()
                  .title("Shared Sections")
                  .items([
                    S.listItem()
                      .title("Section Headings")
                      .child(S.document().schemaType("siteContent").documentId("siteContent")),
                    S.listItem()
                      .title("Why Choose Us Section")
                      .child(S.document().schemaType("whyChooseUsSection").documentId("whyChooseUsSection")),
                    S.listItem()
                      .title("Trust Badges & Stats")
                      .child(S.document().schemaType("trustBadgesSection").documentId("trustBadgesSection")),
                    S.listItem()
                      .title("Global CTA")
                      .child(S.document().schemaType("globalCta").documentId("globalCta")),
                  ])
              ),
            S.divider(),
            S.listItem()
              .title("Navigation")
              .child(S.document().schemaType("navigation").documentId("navigation")),
            S.listItem()
              .title("Footer")
              .child(S.document().schemaType("footer").documentId("footer")),
            S.listItem()
              .title("Site Settings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.listItem()
              .title("Brand Colors")
              .child(S.document().schemaType("brandColors").documentId("brandColors")),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => item.getId() && !singletonTypes.has(item.getId()!)),
          ]),
    }),
    visionTool(),
    colorInput(),
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
