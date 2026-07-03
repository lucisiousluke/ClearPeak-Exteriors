import type { GatsbyNode } from "gatsby";
import path from "path";
import { services } from "./src/data/services";
import { cities } from "./src/data/cities";
import { blogPosts } from "./src/data/blogPosts";

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "src"),
      },
    },
  });
};

export const createPages: GatsbyNode["createPages"] = async ({ actions }) => {
  const { createPage } = actions;

  const serviceTemplate = path.resolve("./src/templates/service.tsx");
  services.forEach((service) => {
    createPage({
      path: `/services/${service.slug}`,
      component: serviceTemplate,
      context: { slug: service.slug },
    });
  });

  const cityTemplate = path.resolve("./src/templates/city.tsx");
  cities.forEach((city) => {
    createPage({
      path: `/service-areas/${city.slug}`,
      component: cityTemplate,
      context: { slug: city.slug },
    });
  });

  const blogPostTemplate = path.resolve("./src/templates/blogPost.tsx");
  blogPosts.forEach((post) => {
    createPage({
      path: `/blog/${post.slug}`,
      component: blogPostTemplate,
      context: { slug: post.slug },
    });
  });
};
