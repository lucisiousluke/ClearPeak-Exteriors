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

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Hero />
      <TrustBadges />
      <Services />
      <BeforeAfter />
      <Gallery compact />
      <WhyChooseUs />
      <Reviews />
      <Process />
      <ServiceAreas />
      <BlogPreview />
      <FAQ />
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
