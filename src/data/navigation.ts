// Static nav/footer link structure. Not yet Sanity-driven — the "navigation"
// and "footer" documents in the Studio are seeded but unused; wire them into
// scripts/fetch-sanity-content.mjs if you want these editable from the CMS.
export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export const footerLinks = {
  services: [
    { label: "Pressure Washing", href: "/services/pressure-washing" },
    { label: "House Soft Washing", href: "/services/house-soft-washing" },
    { label: "Window Cleaning", href: "/services/window-cleaning" },
    { label: "Roof Cleaning", href: "/services/roof-cleaning" },
    { label: "Concrete Cleaning", href: "/services/concrete-cleaning" },
    { label: "Commercial Services", href: "/services/commercial-services" },
  ],
  areas: [
    { label: "Denver", href: "/service-areas/denver" },
    { label: "Littleton", href: "/service-areas/littleton" },
    { label: "Highlands Ranch", href: "/service-areas/highlands-ranch" },
    { label: "Castle Rock", href: "/service-areas/castle-rock" },
    { label: "Parker", href: "/service-areas/parker" },
    { label: "Aurora", href: "/service-areas/aurora" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};
