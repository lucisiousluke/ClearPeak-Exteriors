export default {
  name: "brandColors",
  title: "Brand Colors",
  type: "document",
  description:
    "The core brand palette used across gradients, buttons, and icon badges site-wide (e.g. the Why ClearPeak icon badges, the closing CTA banner). Subtle accents like hover-state links and small badge tints are not affected — those stay fixed for readability. Like all content here, changes need a rebuild to go live (a few minutes after publishing).",
  fields: [
    {
      name: "primary",
      title: "Primary (Aqua)",
      type: "color",
      description: "The first stop in the main brand gradient.",
    },
    {
      name: "secondary",
      title: "Secondary (Pink)",
      type: "color",
      description: "The middle/second stop — used most heavily, including the Why ClearPeak icon badges.",
    },
    {
      name: "accent",
      title: "Accent (Coral)",
      type: "color",
      description: "The final stop in the main brand gradient.",
    },
    {
      name: "ink",
      title: "Text (Ink)",
      type: "color",
      description: "Core dark heading/text color.",
    },
  ],
  preview: {
    select: { primary: "primary.hex", secondary: "secondary.hex", accent: "accent.hex" },
    prepare({ primary, secondary, accent }: { primary?: string; secondary?: string; accent?: string }) {
      return { title: "Brand Colors", subtitle: [primary, secondary, accent].filter(Boolean).join(" · ") };
    },
  },
};
