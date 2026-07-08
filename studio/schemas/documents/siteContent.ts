// Grab-bag singleton for section headings (eyebrow/title/description) shared
// between a homepage section and its standalone listing-page counterpart,
// where duplicating the schema per placement isn't worth the overhead.
export default {
  name: "siteContent",
  title: "Section Headings",
  type: "document",
  fields: [
    {
      name: "servicesSection",
      title: "Services Section",
      type: "sectionHeading",
      description: "Used on the homepage services grid and the standalone /services page.",
    },
    { name: "beforeAfterSection", title: "Before/After Section", type: "sectionHeading" },
    {
      name: "gallerySection",
      title: "Gallery Section",
      type: "sectionHeading",
      description: "Used on the homepage gallery preview and the standalone /gallery page.",
    },
    {
      name: "reviewsSection",
      title: "Reviews Section",
      type: "sectionHeading",
      description: "Description is generated automatically from your live rating/review count.",
    },
    {
      name: "serviceAreasSection",
      title: "Service Areas Section",
      type: "sectionHeading",
      description: "Used on the homepage service-areas map and the standalone /service-areas page.",
    },
    {
      name: "blogSection",
      title: "Blog Section",
      type: "sectionHeading",
      description: "Used on the homepage blog preview and the standalone /blog page.",
    },
    {
      name: "faqSection",
      title: "Homepage FAQ Section",
      type: "sectionHeading",
      description: "Only eyebrow + title are used here.",
    },
  ],
  preview: {
    prepare() {
      return { title: "Section Headings" };
    },
  },
};
