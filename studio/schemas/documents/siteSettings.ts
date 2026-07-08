export default {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    { name: "siteName", title: "Site Name", type: "string", initialValue: "ClearPeak Exteriors" },
    { name: "tagline", title: "Tagline", type: "string" },
    { name: "logo", title: "Logo", type: "image" },
    { name: "phone", title: "Phone Number", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "address", title: "Street Address", type: "string" },
    { name: "city", title: "City", type: "string" },
    { name: "state", title: "State", type: "string" },
    { name: "zip", title: "Zip Code", type: "string" },
    { name: "hours", title: "Business Hours", type: "string" },
    { name: "rating", title: "Average Rating", type: "number", description: "e.g. 4.9", validation: (Rule: any) => Rule.min(0).max(5) },
    { name: "reviewCount", title: "Review Count", type: "number", description: "e.g. 312" },
    { name: "googleReviewUrl", title: "Google Reviews URL", type: "url" },
    { name: "facebookUrl", title: "Facebook URL", type: "url" },
    { name: "instagramUrl", title: "Instagram URL", type: "url" },
    { name: "defaultSeo", title: "Default SEO", type: "seo" },
  ],
  preview: {
    select: { title: "siteName", subtitle: "phone" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return { title: title || "Site Settings", subtitle };
    },
  },
};
