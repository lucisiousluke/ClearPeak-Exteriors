export default {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    { name: "name", title: "Service Name", type: "string", validation: (Rule: any) => Rule.required() },
    {
      name: "slug",
      title: "Slug (controls the page URL)",
      type: "slug",
      description:
        "This is what creates the link for this service — the card on the homepage and everywhere else links to /services/[this-slug]. Changing it changes the page's actual web address, so any existing links or bookmarks to the old URL will break.",
      options: { source: "name" },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "icon",
      title: "Icon Name",
      type: "string",
      description:
        "A Feather icon name (e.g. FiZap) or a Font Awesome 6 icon name (e.g. FaHouse). Browse names at react-icons.github.io/react-icons — use the \"Fi\" set or the \"Fa6\" set.",
    },
    { name: "tagline", title: "Tagline", type: "string" },
    { name: "description", title: "Description", type: "text", rows: 4 },
    { name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } },
    {
      name: "customQuote",
      title: "Custom Quote (no set price)",
      type: "boolean",
      initialValue: false,
      description: "Turn on to show \"Custom Quote\" instead of a starting price — hides the Starting Price field below.",
    },
    {
      name: "startingPrice",
      title: "Starting Price",
      type: "string",
      description: "Shown as \"From {this}\" — enter just the amount, e.g. $149.",
      hidden: ({ parent }: { parent?: { customQuote?: boolean } }) => Boolean(parent?.customQuote),
    },
    {
      name: "estimate",
      title: "Estimate Calculator Pricing",
      type: "object",
      description:
        "How this service is priced on the /estimate calculator. Leave \"Show in Calculator\" off (or the rate empty) to keep it out of the calculator.",
      options: { collapsible: true, collapsed: true },
      hidden: ({ parent }: { parent?: { customQuote?: boolean } }) => Boolean(parent?.customQuote),
      fields: [
        { name: "enabled", title: "Show in Calculator", type: "boolean", initialValue: false },
        {
          name: "basis",
          title: "Priced By",
          type: "string",
          initialValue: "homeSize",
          options: {
            layout: "radio",
            list: [
              { title: "Home size (uses the customer's home square footage)", value: "homeSize" },
              { title: "Area of this surface (square feet the customer enters)", value: "area" },
              { title: "Length (linear feet the customer enters — e.g. fences)", value: "linear" },
              { title: "Flat price", value: "flat" },
            ],
          },
        },
        {
          name: "rate",
          title: "Rate",
          type: "number",
          description:
            "Dollars per square foot (home size / area), per linear foot (length), or the full price (flat). E.g. 0.18 = 18¢ per sq ft.",
          validation: (Rule: any) => Rule.min(0),
        },
        {
          name: "minimum",
          title: "Minimum Price",
          type: "number",
          description: "The estimate never goes below this for this service — usually the same as the Starting Price.",
          validation: (Rule: any) => Rule.min(0),
        },
        {
          name: "typicalSize",
          title: "Typical Size",
          type: "number",
          description:
            "Area/Length only: the number pre-filled for customers who don't know theirs (e.g. 600 sq ft for a 2-car driveway).",
          hidden: ({ parent }: { parent?: { basis?: string } }) => parent?.basis !== "area" && parent?.basis !== "linear",
        },
        {
          name: "sizeHint",
          title: "Size Hint",
          type: "string",
          description: "Area/Length only: short help under the size input, e.g. \"2-car driveway ≈ 600 sq ft\".",
          hidden: ({ parent }: { parent?: { basis?: string } }) => parent?.basis !== "area" && parent?.basis !== "linear",
        },
      ],
    },
    { name: "featured", title: "Featured on Homepage", type: "boolean", initialValue: false },
    { name: "benefits", title: "Benefits", type: "array", of: [{ type: "string" }] },
    { name: "process", title: "Process Steps", type: "array", of: [{ type: "string" }] },
    {
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [{ type: "reference", to: [{ type: "faq" }] }],
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      options: { filter: 'appliesTo == "Service"' },
      description:
        "Groups this service under a category heading in the homepage's \"Full-Service Exterior Cleaning\" section. Services without a category are grouped under \"Other Services\" at the end. If a category ends up with only one service in it, that service gets a wide featured card instead of a small tile — see \"Ideal For\" below.",
    },
    {
      name: "idealFor",
      title: "Ideal For (tags)",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Short tags shown only when this service is the sole member of its category and gets the wide featured-card treatment (e.g. \"Office Buildings\", \"Retail\", \"HOAs\"). Ignored otherwise.",
    },
    {
      name: "order",
      title: "Sort Order",
      type: "number",
      description: "Controls the order this service appears in within its category, lowest first.",
    },
    { name: "seo", title: "SEO", type: "seo" },
  ],
};
