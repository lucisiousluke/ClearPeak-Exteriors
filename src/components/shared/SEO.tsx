import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  pathname?: string;
  structuredData?: Record<string, unknown>;
  noIndex?: boolean;
}

/**
 * Renders raw <title>/<meta>/<link> tags for use inside a page's `Head` export.
 * Gatsby's Head API renders directly into <head> at SSR time — it does not
 * use react-helmet's portal mechanism, so plain tags (not <Helmet>) are required.
 */
export const SEO: React.FC<SEOProps> = ({ title, description, image, pathname = "", structuredData, noIndex }) => {
  const data = useStaticQuery(graphql`
    query SEOQuery {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `);

  const meta = data.site.siteMetadata;
  const seoTitle = title.includes("ClearPeak") ? title : `${title} | ClearPeak Exteriors`;
  const seoDescription = description || meta.description;
  const url = `${meta.siteUrl}${pathname}`;
  const seoImage = image || `${meta.siteUrl}/og-image.jpg`;

  return (
    <>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:site_name" content="ClearPeak Exteriors" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />

      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </>
  );
};

export default SEO;
