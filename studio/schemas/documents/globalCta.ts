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
};
