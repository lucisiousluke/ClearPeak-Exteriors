import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "~/components/layout/Layout";
import SEO from "~/components/shared/SEO";
import Hero from "~/components/sections/Hero";
import PageSections from "~/components/sections/PageSections";
import FinalCTA from "~/components/sections/FinalCTA";
import { homepage } from "~/data/homepage";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Hero />
      <PageSections sections={homepage.sections} compactGallery />
      <FinalCTA />
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <SEO
    title="ClearPeak Exterior | Denver's Premium Exterior Cleaning Company"
    description="Denver Metro's premium exterior cleaning company. Pressure washing, soft washing, window cleaning, roof & concrete cleaning. Fully insured, locally owned, five-star rated."
    structuredData={{
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      name: "ClearPeak Exterior",
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
