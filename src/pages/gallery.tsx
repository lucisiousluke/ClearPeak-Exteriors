import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "~/components/layout/Layout";
import SEO from "~/components/shared/SEO";
import PageSections from "~/components/sections/PageSections";
import FinalCTA from "~/components/sections/FinalCTA";
import { galleryPage } from "~/data/galleryPage";

const GalleryPage: React.FC<PageProps> = () => {
  return (
    <Layout>
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
