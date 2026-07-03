export default {
  name: "galleryItem",
  title: "Gallery Item",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "image", title: "Image", type: "image", options: { hotspot: true }, validation: (Rule: any) => Rule.required() },
    { name: "category", title: "Category", type: "reference", to: [{ type: "category" }] },
    { name: "service", title: "Related Service", type: "reference", to: [{ type: "service" }] },
    { name: "serviceArea", title: "Location", type: "reference", to: [{ type: "serviceArea" }] },
    { name: "order", title: "Sort Order", type: "number" },
  ],
};
