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
      <PageSections sections={galleryPage.sections} firstHeadingAsH1 />
      <FinalCTA />
    </Layout>
  );
};

export default GalleryPage;

export const Head: HeadFC = () => (
  <SEO
    title="Exterior Cleaning Photo Gallery | Denver, CO"
    description="Browse real exterior cleaning projects across the Denver Metro — house and roof soft washing, concrete, decks, fences and more from ClearPeak Exterior."
    pathname="/gallery"
  />
);
