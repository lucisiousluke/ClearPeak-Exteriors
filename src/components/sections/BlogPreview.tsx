import * as React from "react";
import { Link } from "gatsby";
import { motion } from "framer-motion";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { Container, Section, SectionHeading, Photo, Badge, Button } from "~/components/ui";
import { blogPosts } from "~/data/blogPosts";

export const BlogPreview: React.FC = () => {
  const posts = blogPosts.slice(0, 3);

  return (
    <Section background="white">
      <Container>
        <SectionHeading
          eyebrow="From the Blog"
          title="Tips, Guides & Local Know-How"
          description="Practical advice on keeping your Colorado home looking its best, all year long."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft transition-shadow hover:shadow-lift"
              >
                <div className="relative overflow-hidden">
                  <Photo
                    src={post.heroImage}
                    alt={post.title}
                    wrapperClassName="w-full"
                    className="aspect-[16/10] w-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge variant="white" className="absolute left-4 top-4">
                    {post.category}
                  </Badge>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-bold leading-snug text-ink-800">{post.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-500">{post.excerpt}</p>
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

        <div className="mt-14 flex justify-center">
          <Button as="a" href="/blog" variant="outline" icon={<FiArrowRight />}>
            Visit the Blog
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export default BlogPreview;
