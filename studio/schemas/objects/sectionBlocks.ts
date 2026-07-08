// Homepage section blocks. Most of these are content-less "markers" — the
// actual content lives in a shared document (Why Choose Us, Trust Badges &
// Stats, Global CTA) or a shared "Section Headings" field plus a collection
// (Services, Testimonials, Gallery, etc.) — the block just says "render this
// section here" and its position in the array controls the page order.
// processBlock is the exception: its content isn't shared anywhere else, so
// it carries its own fields.

const marker = (name: string, title: string, description: string) => ({
  name,
  title,
  type: "object",
  fields: [
    // Sanity object types need at least one field even if unused.
    { name: "note", title: "Note (not shown on site)", type: "string", description },
  ],
  preview: {
    prepare() {
      return { title };
    },
  },
});

export const trustBadgesBlock = marker(
  "trustBadgesBlock",
  "Trust Badges & Stats",
  "Content comes from the shared Trust Badges & Stats document."
);

export const servicesBlock = marker(
  "servicesBlock",
  "Services Grid",
  "Shows all Service documents. Heading text comes from Section Headings → Services Section."
);

export const beforeAfterBlock = marker(
  "beforeAfterBlock",
  "Before / After Slider",
  "Shows all Before & After documents. Heading text comes from Section Headings → Before/After Section."
);

export const galleryBlock = marker(
  "galleryBlock",
  "Gallery Preview",
  "Shows a preview of Gallery Item documents. Heading text comes from Section Headings → Gallery Section."
);

export const whyChooseUsBlock = marker(
  "whyChooseUsBlock",
  "Why Choose Us",
  "Content comes from the shared Why Choose Us Section document."
);

export const reviewsBlock = marker(
  "reviewsBlock",
  "Customer Reviews",
  "Shows Testimonial documents. Heading text comes from Section Headings → Reviews Section."
);

export const serviceAreasBlock = marker(
  "serviceAreasBlock",
  "Service Areas Map",
  "Shows all Service Area documents. Heading text comes from Section Headings → Service Areas Section."
);

export const blogPreviewBlock = marker(
  "blogPreviewBlock",
  "Blog Preview",
  "Shows recent Blog Post documents. Heading text comes from Section Headings → Blog Section."
);

export const faqBlock = marker(
  "faqBlock",
  "FAQ Accordion",
  "Shows the sitewide FAQ list. Heading text comes from Section Headings → Homepage FAQ Section."
);

export const processBlock = {
  name: "processBlock",
  title: "Process Steps (\"How It Works\")",
  type: "object",
  fields: [
    { name: "eyebrow", title: "Eyebrow Badge", type: "string" },
    { name: "title", title: "Title", type: "string" },
    { name: "description", title: "Description", type: "text", rows: 2 },
    { name: "steps", title: "Process Steps", type: "array", of: [{ type: "iconCard" }] },
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }: { title?: string }) {
      return { title: title ? `Process Steps: ${title}` : "Process Steps (\"How It Works\")" };
    },
  },
};

export const sectionBlockTypes = [
  trustBadgesBlock,
  servicesBlock,
  beforeAfterBlock,
  galleryBlock,
  whyChooseUsBlock,
  reviewsBlock,
  processBlock,
  serviceAreasBlock,
  blogPreviewBlock,
  faqBlock,
];
