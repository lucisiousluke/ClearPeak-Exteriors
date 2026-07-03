export default {
  name: "beforeAfter",
  title: "Before & After",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "beforeImage", title: "Before Image", type: "image", options: { hotspot: true }, validation: (Rule: any) => Rule.required() },
    { name: "afterImage", title: "After Image", type: "image", options: { hotspot: true }, validation: (Rule: any) => Rule.required() },
    { name: "service", title: "Related Service", type: "reference", to: [{ type: "service" }] },
    { name: "serviceArea", title: "Location", type: "reference", to: [{ type: "serviceArea" }] },
    { name: "featured", title: "Featured on Homepage", type: "boolean", initialValue: false },
    { name: "order", title: "Sort Order", type: "number" },
  ],
};
