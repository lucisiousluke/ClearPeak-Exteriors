import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { FiArrowRight, FiHome } from "react-icons/fi";
import Layout from "~/components/layout/Layout";
import SEO from "~/components/shared/SEO";
import { Container, Button } from "~/components/ui";

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-soft">
        <div className="pointer-events-none absolute inset-0 bg-gradient-mesh" />
        <Container className="relative text-center">
          <p className="font-display text-8xl font-bold text-gradient-brand">404</p>
          <h1 className="mt-4 font-display text-3xl font-bold text-ink-800 md:text-4xl">
            Looks like this page got pressure washed away.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-ink-500">
            The page you're looking for doesn't exist. Let's get you back on track.
          </p>
          <div className="mt-8 flex justify-center">
            <Button as="a" href="/" icon={<FiHome />} iconPosition="left">
              Back to Home
            </Button>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <SEO title="Page Not Found" noIndex />;
