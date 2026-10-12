import { sectionBlockTypes } from "../objects/sectionBlocks";

export default {
  name: "galleryPage",
  title: "Gallery Page",
  type: "document",
  fields: [
    {
      name: "sections",
      title: "Page Sections",
      description:
        "Drag to reorder, add/remove sections. This controls what appears between the page heading and the closing CTA, and in what order. Removing a section only hides it from this page — its content (e.g. Before & After documents) is kept, so you can add it back anytime.",
      type: "array",
      of: sectionBlockTypes.map((t) => ({ type: t.name })),
      // Matches the page's original hardcoded layout, so creating this
      // document doesn't change the live page until a section is edited.
      initialValue: [
        { _type: "beforeAfterBlock", _key: "beforeAfter" },
        { _type: "galleryBlock", _key: "gallery" },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: "Gallery Page" };
    },
  },
};
