import type { GatsbyConfig } from "gatsby";

const siteUrl = process.env.URL || process.env.DEPLOY_URL || "https://www.clearpeakexteriors.com";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "ClearPeak Exterior | Denver's Premium Exterior Cleaning Company",
    description:
      "Denver Metro's premium exterior cleaning company. Pressure washing, soft washing, window cleaning, roof & concrete cleaning. Fully insured, locally owned, five-star rated.",
    siteUrl,
    author: "ClearPeak Exterior",
    phone: "(720) 555-0182",
    email: "hello@clearpeakexteriors.com",
  },
  trailingSlash: "never",
  // Output path is deliberately outside src/ — Gatsby's dev-server watcher
  // monitors src/ to trigger rebuilds, and the default output path
  // (src/gatsby-types.d.ts) sits inside that watched tree. Every rebuild
  // regenerates the file, which the watcher then sees as a source change,
  // triggering another rebuild — an infinite loop. Keeping the generated
  // types outside src/ breaks that cycle.
  graphqlTypegen: {
    typesOutputPath: "gatsby-types.d.ts",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "ClearPeak Exterior",
        short_name: "ClearPeak",
        start_url: "/",
        background_color: "#FFFFFF",
        theme_color: "#22D3EE",
        display: "standalone",
        icon: "src/images/ClearPeak-Exterior-favicon.png",
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        excludes: ["/404", "/404.html"],
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap-index.xml`,
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
  ],
};

export default config;
