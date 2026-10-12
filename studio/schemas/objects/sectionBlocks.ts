// Page section blocks (used by the Homepage and Gallery Page). Most of these are content-less "markers" — the
// actual content lives in a shared document (Why Choose Us, Trust Badges &
// Stats, Global CTA) or a shared "Section Headings" field plus a collection
// (Services, Testimonials, Gallery, etc.) — the block just says "render this
// section here" and its position in the array controls the page order.
// processBlock is the exception: its content isn't shared anywhere else, so
// it carries its own fields.
//
// The "about" field below is intentionally read-only with a fixed value —
// earlier this had an editable-looking empty text field, which made the
// block's edit panel look like an empty form inviting input, and made it
// easy to accidentally trigger a delete while trying to close it. Read-only
// text renders as plain gray text, nothing to click into or worry about.

const marker = (name: string, title: string, about: string) => ({
  name,
  title,
  type: "object",
  fields: [
    {
      name: "about",
      title: "About this section",
      type: "string",
      readOnly: true,
      initialValue: about,
    },
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
  "Content comes from the shared Trust Badges & Stats document — nothing to edit here, this just marks where it appears."
);

export const servicesBlock = marker(
  "servicesBlock",
  "Services Grid",
  "Shows all Service documents. Heading text comes from Section Headings → Services Section — nothing to edit here."
);

export const beforeAfterBlock = marker(
  "beforeAfterBlock",
  "Before / After Slider",
  "Shows all Before & After documents. Heading text comes from Section Headings → Before/After Section — nothing to edit here."
);

// Configurable: every field is optional. Left blank, each one falls back to
// the page's default — the Homepage shows a 6-photo preview with no heading
// or filters, the Gallery page shows everything.
export const galleryBlock = {
  name: "galleryBlock",
  title: "Project Gallery",
  type: "object",
  description: "Photos come from Gallery Item documents.",
  fieldsets: [{ name: "heading", title: "Heading", options: { collapsible: true, collapsed: false } }],
  fields: [
    {
      name: "showHeading",
      title: "Show Heading",
      type: "boolean",
      initialValue: true,
      fieldset: "heading",
    },
    {
      name: "eyebrow",
      title: "Eyebrow Badge",
      type: "string",
      description: "Leave blank to use Section Headings → Gallery Section.",
      fieldset: "heading",
      hidden: ({ parent }: { parent?: { showHeading?: boolean } }) => parent?.showHeading === false,
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "Leave blank to use Section Headings → Gallery Section.",
      fieldset: "heading",
      hidden: ({ parent }: { parent?: { showHeading?: boolean } }) => parent?.showHeading === false,
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description: "Leave blank to use Section Headings → Gallery Section.",
      fieldset: "heading",
      hidden: ({ parent }: { parent?: { showHeading?: boolean } }) => parent?.showHeading === false,
    },
    {
      name: "showFilters",
      title: "Show Category Filters",
      type: "boolean",
      initialValue: true,
      description: "The row of buttons (All, House Washing, Concrete…) above the photos.",
    },
    {
      name: "limit",
      title: "Number of Photos",
      type: "number",
      description: "Leave blank to show every photo.",
      validation: (Rule: any) => Rule.min(1).integer(),
    },
  ],
  preview: {
    select: { title: "title", limit: "limit" },
    prepare({ title, limit }: { title?: string; limit?: number }) {
      return {
        title: title ? `Project Gallery: ${title}` : "Project Gallery",
        subtitle: limit ? `${limit} photos` : undefined,
      };
    },
  },
};

export const whyChooseUsBlock = marker(
  "whyChooseUsBlock",
  "Why Choose Us",
  "Content comes from the shared Why Choose Us Section document — nothing to edit here."
);

export const reviewsBlock = marker(
  "reviewsBlock",
  "Customer Reviews",
  "Shows Testimonial documents. Heading text comes from Section Headings → Reviews Section — nothing to edit here."
);

export const serviceAreasBlock = marker(
  "serviceAreasBlock",
  "Service Areas Map",
  "Shows all Service Area documents. Heading text comes from Section Headings → Service Areas Section — nothing to edit here."
);

export const blogPreviewBlock = marker(
  "blogPreviewBlock",
  "Blog Preview",
  "Shows recent Blog Post documents. Heading text comes from Section Headings → Blog Section — nothing to edit here."
);

export const faqBlock = marker(
  "faqBlock",
  "FAQ Accordion",
  "Shows the sitewide FAQ list. Heading text comes from Section Headings → Homepage FAQ Section — nothing to edit here."
);

export const promotionBlock = marker(
  "promotionBlock",
  "Promotion",
  "Shows the active Promotion document(s) with Placement set to \"Homepage Section\" — create/edit those under Promotion. Nothing to edit here."
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
  promotionBlock,
];
