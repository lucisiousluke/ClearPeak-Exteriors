export default {
  name: "trustBadgesSection",
  title: "Trust Badges & Stats",
  type: "document",
  fields: [
    { name: "badges", title: "Trust Badges (icon + label row)", type: "array", of: [{ type: "iconLabel" }] },
    { name: "stats", title: "Stats Row", type: "array", of: [{ type: "statItem" }] },
  ],
  preview: {
    prepare() {
      return { title: "Trust Badges & Stats" };
    },
  },
};
