export default {
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    { name: "name", title: "Customer Name", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "location", title: "Location", type: "string", description: "e.g. Highlands Ranch, CO" },
    { name: "rating", title: "Rating", type: "number", options: { list: [1, 2, 3, 4, 5] }, initialValue: 5 },
    { name: "quote", title: "Quote", type: "text", rows: 4 },
    { name: "service", title: "Service", type: "reference", to: [{ type: "service" }] },
    { name: "avatar", title: "Photo (optional)", type: "image", options: { hotspot: true } },
    { name: "source", title: "Source", type: "string", options: { list: ["Google", "Facebook", "Direct"] } },
    { name: "featured", title: "Featured on Homepage", type: "boolean", initialValue: false },
  ],
};
