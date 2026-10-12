import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "~/components/layout/Layout";
import SEO from "~/components/shared/SEO";
import { Container, Section, SectionHeading } from "~/components/ui";
import PageSections from "~/components/sections/PageSections";
import FinalCTA from "~/components/sections/FinalCTA";
import { siteContent } from "~/data/siteContent";
import { galleryPage } from "~/data/galleryPage";

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
      <PageSections sections={galleryPage.sections} />
      <FinalCTA />
    </Layout>
  );
};

export default GalleryPage;

export const Head: HeadFC = () => (
  <SEO
    title="Gallery"
    description="Browse before-and-after transformations and a full project gallery from ClearPeak Exterior."
    pathname="/gallery"
  />
);
