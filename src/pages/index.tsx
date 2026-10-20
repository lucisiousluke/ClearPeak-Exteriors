import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "~/components/layout/Layout";
import SEO from "~/components/shared/SEO";
import Hero from "~/components/sections/Hero";
import PageSections from "~/components/sections/PageSections";
import FinalCTA from "~/components/sections/FinalCTA";
import { homepage } from "~/data/homepage";
import { site } from "~/data/site";
import { cities } from "~/data/cities";
import { useSiteUrl } from "~/hooks/useSiteUrl";

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

export const Head: HeadFC = () => {
  const siteUrl = useSiteUrl();
  const { address, social } = site;
  const sameAs = [social.facebook, social.instagram, social.google].filter(Boolean);

  return (
    <SEO
      title="ClearPeak Exterior | Denver's Premium Exterior Cleaning Company"
      description="Denver Metro's premium exterior cleaning company. Pressure washing, soft washing, window cleaning, roof & concrete cleaning. Fully insured, locally owned, five-star rated."
      image={homepage.heroImage}
      structuredData={[
        {
          "@context": "https://schema.org",
          "@type": "HomeAndConstructionBusiness",
          "@id": `${siteUrl}/#business`,
          name: site.name,
          description: site.tagline,
          url: siteUrl,
          ...(homepage.heroImage ? { image: homepage.heroImage } : {}),
          ...(site.phone ? { telephone: site.phone } : {}),
          ...(site.email ? { email: site.email } : {}),
          address: {
            "@type": "PostalAddress",
            ...(address.street ? { streetAddress: address.street } : {}),
            ...(address.city ? { addressLocality: address.city } : {}),
            ...(address.state ? { addressRegion: address.state } : {}),
            ...(address.zip ? { postalCode: address.zip } : {}),
            addressCountry: "US",
          },
          areaServed: cities.map((c) => ({ "@type": "City", name: `${c.name}, CO` })),
          ...(sameAs.length ? { sameAs } : {}),
          // Only real numbers from Site Settings — Google penalizes rating
          // markup that doesn't match genuine reviews.
          ...(site.reviewCount > 0 && site.rating > 0
            ? {
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: site.rating,
                  reviewCount: site.reviewCount,
                },
              }
            : {}),
        },
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: site.name,
          url: siteUrl,
        },
      ]}
    />
  );
};
