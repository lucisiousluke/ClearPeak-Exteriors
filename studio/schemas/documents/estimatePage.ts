// Page-wide settings for the /estimate calculator. Per-service rates live on
// each Service document under "Estimate Calculator Pricing".
const percent = (name: string, title: string, description: string) => ({
  name,
  title,
  type: "number",
  description,
  validation: (Rule: any) => Rule.min(0).max(100),
});

export default {
  name: "estimatePage",
  title: "Estimate Calculator Page",
  type: "document",
  fields: [
    { name: "headline", title: "Headline", type: "string" },
    { name: "subheadline", title: "Subheadline", type: "text", rows: 2 },
    percent(
      "rangeSpread",
      "Range Spread (%)",
      "Customers see a price range, not one number. 15 shows the estimate as 15% below to 15% above."
    ),
    percent("twoStoryUpcharge", "2-Story Upcharge (%)", "Added to home-size services for 2-story homes."),
    percent("threeStoryUpcharge", "3+ Story Upcharge (%)", "Added to home-size services for homes with 3 or more stories."),
    percent("moderateUpcharge", "Moderate Buildup Upcharge (%)", "Added when the customer picks \"Moderate\" condition."),
    percent("heavyUpcharge", "Heavy Buildup Upcharge (%)", "Added when the customer picks \"Heavy\" condition."),
    {
      name: "bundleMinServices",
      title: "Bundle Discount — Minimum Services",
      type: "number",
      description: "How many services the customer must pick to get the bundle discount. Leave empty for no bundle discount.",
      validation: (Rule: any) => Rule.min(2),
    },
    percent("bundleDiscount", "Bundle Discount (%)", "Taken off the total once the minimum number of services is picked."),
    {
      name: "disclaimer",
      title: "Disclaimer",
      type: "text",
      rows: 3,
      description: "Shown under the estimate.",
    },
  ],
  preview: {
    prepare() {
      return { title: "Estimate Calculator Page" };
    },
  },
};
