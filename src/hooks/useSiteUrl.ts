import { useStaticQuery, graphql } from "gatsby";

// Absolute site origin (no trailing slash), for structured data URLs.
export const useSiteUrl = (): string => {
  const data = useStaticQuery(graphql`
    query SiteUrlQuery {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);
  return data.site.siteMetadata.siteUrl;
};
