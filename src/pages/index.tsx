import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "~/components/layout/Layout";
import SEO from "~/components/shared/SEO";
import Hero from "~/components/sections/Hero";
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
import FinalCTA from "~/components/sections/FinalCTA";
import PromotionSection from "~/components/sections/PromotionSection";
import { homepage } from "~/data/homepage";
import type { HomepageSection } from "~/types";

// Maps each block type from homepage.sections to the component that renders
// it. Order and presence are entirely controlled by that array (editable in
// the Studio) — this file just knows HOW to render each block, not in what
// order or how many.
const renderSection = (section: HomepageSection, key: string): React.ReactNode => {
  switch (section.type) {
    case "trustBadgesBlock":
      return <TrustBadges key={key} />;
    case "servicesBlock":
      return <Services key={key} />;
    case "beforeAfterBlock":
      return <BeforeAfter key={key} />;
    case "galleryBlock":
      return <Gallery key={key} compact />;
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

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Hero />
      {homepage.sections.map((section, i) => renderSection(section, `${section.type}-${i}`))}
      <FinalCTA />
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <SEO
    title="ClearPeak Exteriors | Denver's Premium Exterior Cleaning Company"
    description="Denver Metro's premium exterior cleaning company. Pressure washing, soft washing, window cleaning, roof & concrete cleaning. Fully insured, locally owned, five-star rated."
    structuredData={{
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      name: "ClearPeak Exteriors",
      description: "Denver Metro's premium exterior cleaning company.",
      areaServed: "Denver Metro Area, CO",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "312",
      },
    }}
  />
);
