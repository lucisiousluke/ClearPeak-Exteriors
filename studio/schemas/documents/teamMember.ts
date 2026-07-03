export default {
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "role", title: "Role / Title", type: "string" },
    { name: "photo", title: "Photo", type: "image", options: { hotspot: true } },
    { name: "bio", title: "Bio", type: "text", rows: 3 },
    { name: "order", title: "Sort Order", type: "number" },
  ],
};
