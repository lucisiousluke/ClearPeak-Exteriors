export default {
  name: "globalCta",
  title: "Global CTA",
  type: "document",
  fields: [
    { name: "headline", title: "Headline", type: "string" },
    { name: "subtext", title: "Subtext", type: "text", rows: 2 },
    { name: "primaryCta", title: "Primary CTA", type: "ctaButton" },
    { name: "secondaryCta", title: "Secondary CTA", type: "ctaButton" },
  ],
  preview: {
    select: { title: "headline" },
    prepare({ title }: { title?: string }) {
      return { title: title || "Global CTA" };
    },
  },
};
