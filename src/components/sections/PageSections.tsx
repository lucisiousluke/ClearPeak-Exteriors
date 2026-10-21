import * as React from "react";
import TrustBadges from "~/components/sections/TrustBadges";
import Services from "~/components/sections/Services";
import BeforeAfter from "~/components/sections/BeforeAfter";
import Gallery from "~/components/sections/Gallery";
import WhyChooseUs from "~/components/sections/WhyChooseUs";
import Reviews from "~/components/sections/Reviews";
import Process from "~/components/sections/Process";
import ServiceAreas from "~/components/sections/ServiceAreas";
import BlogPreview from "~/components/sections/BlogPreview";
import FAQ from "~/components/sections/FAQ";
import PromotionSection from "~/components/sections/PromotionSection";
import type { PageSection } from "~/types";

// Maps each block type from a page's "sections" array to the component that
// renders it. Order and presence are entirely controlled by that array
// (editable in the Studio) — this file just knows HOW to render each block,
// not in what order or how many.
const renderSection = (
  section: PageSection,
  key: string,
  compactGallery: boolean,
  headingAs: "h1" | "h2"
): React.ReactNode => {
  switch (section.type) {
    case "trustBadgesBlock":
      return <TrustBadges key={key} />;
    case "servicesBlock":
      return <Services key={key} />;
    case "beforeAfterBlock":
      return <BeforeAfter key={key} headingAs={headingAs} />;
    case "galleryBlock":
      return (
        <Gallery
          key={key}
          compact={compactGallery}
          showHeading={section.showHeading}
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
          showFilters={section.showFilters}
          limit={section.limit}
          headingAs={headingAs}
        />
      );
    case "whyChooseUsBlock":
      return <WhyChooseUs key={key} />;
    case "reviewsBlock":
      return <Reviews key={key} />;
    case "processBlock":
      return (
        <Process
          key={key}
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
          steps={section.steps}
        />
      );
    case "serviceAreasBlock":
      return <ServiceAreas key={key} />;
    case "blogPreviewBlock":
      return <BlogPreview key={key} />;
    case "faqBlock":
      return <FAQ key={key} />;
    case "promotionBlock":
      return <PromotionSection key={key} />;
    default:
      return null;
  }
};

interface PageSectionsProps {
  sections: PageSection[];
  // Homepage shows a 6-item gallery preview; the Gallery page shows the
  // full filterable grid.
  compactGallery?: boolean;
  // For pages with no heading of their own (e.g. Gallery): the first
  // section's heading becomes the page's H1.
  firstHeadingAsH1?: boolean;
}

const hasH1Heading = (s: PageSection) =>
  s.type === "beforeAfterBlock" || (s.type === "galleryBlock" && s.showHeading !== false);

export const PageSections: React.FC<PageSectionsProps> = ({ sections, compactGallery = false, firstHeadingAsH1 = false }) => {
  const h1Index = firstHeadingAsH1 ? sections.findIndex(hasH1Heading) : -1;
  return (
    <>
      {sections.map((section, i) =>
        renderSection(section, `${section.type}-${i}`, compactGallery, i === h1Index ? "h1" : "h2")
      )}
    </>
  );
};

export default PageSections;
