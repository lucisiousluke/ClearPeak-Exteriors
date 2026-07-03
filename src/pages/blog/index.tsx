import * as React from "react";
import { Link } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import Layout from "~/components/layout/Layout";
import SEO from "~/components/shared/SEO";
import { Container, Section, SectionHeading, Photo, Badge } from "~/components/ui";
import FinalCTA from "~/components/sections/FinalCTA";
import { blogPosts } from "~/data/blogPosts";

const BlogIndexPage: React.FC<PageProps> = () => {
  const [featured, ...rest] = blogPosts;

  return (
    <Layout>
      <Section background="soft" className="pt-16 md:pt-20">
        <Container>
          <SectionHeading
            eyebrow="Blog"
            title="Tips, Guides & Local Know-How"
            description="Practical advice on keeping your Colorado home's exterior looking its best, all year long."
          />

          <Link
            to={`/blog/${featured.slug}`}
            className="group mt-14 grid gap-8 overflow-hidden rounded-4xl border border-ink-100 bg-white shadow-soft transition-shadow hover:shadow-lift lg:grid-cols-2"
          >
            <Photo
              src={featured.heroImage}
              alt={featured.title}
              wrapperClassName="w-full"
              className="aspect-[16/10] w-full transition-transform duration-500 group-hover:scale-105 lg:aspect-auto lg:h-full"
            />
            <div className="flex flex-col justify-center p-8 md:p-12">
              <Badge variant="pink" className="w-fit">
                {featured.category}
              </Badge>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-ink-800">{featured.title}</h2>
              <p className="mt-4 text-ink-500">{featured.excerpt}</p>
              <span className="mt-6 flex items-center gap-1 font-semibold text-aqua-600">
                Read the article <FiArrowUpRight />
              </span>
            </div>
          </Link>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {rest.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft transition-shadow hover:shadow-lift"
                >
                  <Photo
                    src={post.heroImage}
                    alt={post.title}
                    wrapperClassName="w-full"
                    className="aspect-[16/10] w-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <Badge variant="aqua" className="w-fit">
                      {post.category}
                    </Badge>
                    <h3 className="mt-4 font-display text-lg font-bold leading-snug text-ink-800">{post.title}</h3>
                    <p className="mt-3 flex-1 text-sm text-ink-500">{post.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between text-xs text-ink-400">
                      <span>{post.readTime}</span>
                      <span className="flex items-center gap-1 font-semibold text-aqua-600">
                        Read more <FiArrowUpRight />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
      <FinalCTA />
    </Layout>
  );
};

export default BlogIndexPage;

export const Head: HeadFC = () => (
  <SEO
    title="Blog"
    description="Tips, guides, and local know-how for keeping your Colorado home's exterior looking its best."
    pathname="/blog"
  />
);
