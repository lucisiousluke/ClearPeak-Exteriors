import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { defaultSeo, pageSeo } from "~/data/seo";

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  pathname?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
  noIndex?: boolean;
  type?: "website" | "article";
  // Article-only Open Graph timestamps (ISO strings).
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Renders raw <title>/<meta>/<link> tags for use inside a page's `Head` export.
 * Gatsby's Head API renders directly into <head> at SSR time — it does not
 * use react-helmet's portal mechanism, so plain tags (not <Helmet>) are required.
 *
 * Anything set in the CMS SEO fields for this pathname (src/data/seo.ts)
 * wins over the props, which in turn win over the sitewide defaults — so
 * pages pass sensible built-in values and editors can override per page.
 */
export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image,
  imageAlt,
  pathname = "",
  structuredData,
  noIndex,
  type = "website",
  publishedTime,
  modifiedTime,
}) => {
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
  const cms = pageSeo[pathname || "/"] ?? {};
  // A CMS meta title is used exactly as written (the editor is counting
  // characters); built-in titles get the brand appended.
  const seoTitle = cms.metaTitle || (title.includes("ClearPeak") ? title : `${title} | ClearPeak Exterior`);
  const seoDescription = cms.metaDescription || description || defaultSeo.metaDescription || meta.description;
  const url = `${meta.siteUrl}${pathname}`;
  const seoImage = cms.ogImage || image || defaultSeo.ogImage;
  const seoImageAlt = cms.ogImageAlt || imageAlt || defaultSeo.ogImageAlt || seoTitle;
  const hidden = noIndex || cms.noIndex;
  const schemas = structuredData ? (Array.isArray(structuredData) ? structuredData : [structuredData]) : [];

  return (
    <>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <link rel="canonical" href={url} />
      <meta
        name="robots"
        content={hidden ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1"}
      />

      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="ClearPeak Exterior" />
      {seoImage && <meta property="og:image" content={seoImage} />}
      {seoImage && <meta property="og:image:alt" content={seoImageAlt} />}
      {type === "article" && publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {type === "article" && modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      <meta name="twitter:card" content={seoImage ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      {seoImage && <meta name="twitter:image" content={seoImage} />}
      {seoImage && <meta name="twitter:image:alt" content={seoImageAlt} />}

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </>
  );
};

export default SEO;
