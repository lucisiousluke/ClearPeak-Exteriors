import * as React from "react";
import { Link } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import { FiChevronRight, FiClock, FiUser, FiArrowRight } from "react-icons/fi";
import Layout from "~/components/layout/Layout";
import SEO from "~/components/shared/SEO";
import PortableTextBody from "~/components/shared/PortableTextBody";
import { Container, Section, SectionHeading, Badge, Photo, Button } from "~/components/ui";
import FinalCTA from "~/components/sections/FinalCTA";
import { getBlogPostBySlug, blogPosts } from "~/data/blogPosts";
import { useSiteUrl } from "~/hooks/useSiteUrl";

interface BlogPostContext {
  slug: string;
}

const BlogPostTemplate: React.FC<PageProps<object, BlogPostContext>> = ({ pageContext }) => {
  const post = getBlogPostBySlug(pageContext.slug)!;
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <Layout>
      <section className="relative overflow-hidden bg-soft py-20 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-mesh" />
        <Container narrow className="relative">
          <nav className="mb-8 flex items-center gap-2 text-sm text-ink-400">
            <Link to="/" className="hover:text-aqua-600">
              Home
            </Link>
            <FiChevronRight size={14} />
            <Link to="/blog" className="hover:text-aqua-600">
              Blog
            </Link>
          </nav>
          <Badge variant="coral">{post.category}</Badge>
          <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-ink-800 md:text-display-md">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-ink-400">
            <span className="flex items-center gap-2">
              <FiUser /> {post.author}
            </span>
            <span className="flex items-center gap-2">
              <FiClock /> {post.readTime}
            </span>
            <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
          </div>
        </Container>
      </section>

      <Container narrow className="-mt-6 md:-mt-10">
        <div className="aspect-[16/9] overflow-hidden rounded-4xl shadow-lift">
          <Photo src={post.heroImage} alt={post.heroImageAlt || post.title} wrapperClassName="h-full w-full" />
        </div>
      </Container>

      <Section background="white">
        <Container narrow>
          <article>
            <PortableTextBody value={post.body} />
          </article>
        </Container>
      </Section>

      <Section background="soft">
        <Container>
          <SectionHeading eyebrow="Keep Reading" title="More From the Blog" />
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft transition-shadow hover:shadow-lift"
              >
                <Photo
                  src={p.heroImage}
                  alt={p.title}
                  wrapperClassName="w-full"
                  className="aspect-[16/10] w-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-ink-800">{p.title}</h3>
                  <p className="mt-3 text-sm text-ink-500">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-14 flex justify-center">
            <Button as="a" href="/blog" variant="outline" icon={<FiArrowRight />}>
              View All Articles
            </Button>
          </div>
        </Container>
      </Section>

      <FinalCTA />
    </Layout>
  );
};

export default BlogPostTemplate;

// Company-voice bylines ("ClearPeak Team") are an Organization in schema.org
// terms; anything else is treated as a named person.
const isOrganizationAuthor = (name: string) => /clearpeak|team/i.test(name);

export const Head: HeadFC<object, BlogPostContext> = ({ pageContext }) => {
  const post = getBlogPostBySlug(pageContext.slug)!;
  const siteUrl = useSiteUrl();
  const pathname = `/blog/${post.slug}`;
  const url = `${siteUrl}${pathname}`;
  const publisher = { "@type": "Organization", name: "ClearPeak Exterior", url: siteUrl };

  return (
    <SEO
      title={post.title}
      description={post.excerpt}
      pathname={pathname}
      image={post.heroImage}
      imageAlt={post.heroImageAlt || post.title}
      type="article"
      publishedTime={post.publishedAt || undefined}
      modifiedTime={post.updatedAt || undefined}
      structuredData={[
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          ...(post.heroImage ? { image: [post.heroImage] } : {}),
          ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
          ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
          author: post.author
            ? { "@type": isOrganizationAuthor(post.author) ? "Organization" : "Person", name: post.author }
            : publisher,
          publisher,
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          url,
          ...(post.category ? { articleSection: post.category } : {}),
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
            { "@type": "ListItem", position: 3, name: post.title, item: url },
          ],
        },
      ]}
    />
  );
};
