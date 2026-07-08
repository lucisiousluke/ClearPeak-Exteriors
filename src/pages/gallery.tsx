import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "~/components/layout/Layout";
import SEO from "~/components/shared/SEO";
import { Container, Section, SectionHeading } from "~/components/ui";
import BeforeAfter from "~/components/sections/BeforeAfter";
import Gallery from "~/components/sections/Gallery";
import FinalCTA from "~/components/sections/FinalCTA";
import { siteContent } from "~/data/siteContent";

const GalleryPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Section background="soft" className="pb-0 pt-16 md:pt-20">
        <Container>
          <SectionHeading
            eyebrow={siteContent.gallerySection.eyebrow}
            title={siteContent.gallerySection.title}
            description={siteContent.gallerySection.description}
          />
        </Container>
      </Section>
      <BeforeAfter />
      <Gallery />
      <FinalCTA />
    </Layout>
  );
};

export default GalleryPage;

export const Head: HeadFC = () => (
  <SEO
    title="Gallery"
    description="Browse before-and-after transformations and a full project gallery from ClearPeak Exteriors."
    pathname="/gallery"
  />
);
