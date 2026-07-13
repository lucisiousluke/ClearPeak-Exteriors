import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { motion } from "framer-motion";
import Layout from "~/components/layout/Layout";
import SEO from "~/components/shared/SEO";
import { Container, Section, SectionHeading, Photo, Card } from "~/components/ui";
import TrustBadges from "~/components/sections/TrustBadges";
import WhyChooseUs from "~/components/sections/WhyChooseUs";
import Reviews from "~/components/sections/Reviews";
import FinalCTA from "~/components/sections/FinalCTA";
import { aboutPage } from "~/data/aboutPage";

const AboutPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <section className="relative overflow-hidden bg-soft py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-gradient-mesh" />
        <Container className="relative grid items-center gap-14 lg:grid-cols-2">
          <div>
            <h1 className="font-display text-display-md font-bold text-ink-800 md:text-display-lg">
              {aboutPage.heroHeadline} <span className="text-gradient-brand">{aboutPage.heroHighlight}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-500">{aboutPage.heroBody}</p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="aspect-[4/3] overflow-hidden rounded-4xl shadow-lift"
          >
            <Photo src={aboutPage.heroImage} alt="ClearPeak Exteriors team" wrapperClassName="h-full w-full" />
          </motion.div>
        </Container>
      </section>

      <TrustBadges />

      <Section background="white">
        <Container>
          <SectionHeading eyebrow={aboutPage.valuesEyebrow} title={aboutPage.valuesTitle} />
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {aboutPage.values.map((v) => (
              <Card key={v.title}>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-on-primary shadow-glow">
                  <v.icon size={22} />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-ink-800">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{v.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <WhyChooseUs />
      <Reviews />
      <FinalCTA />
    </Layout>
  );
};

export default AboutPage;

export const Head: HeadFC = () => (
  <SEO
    title="About Us"
    description="Learn about ClearPeak Exteriors — Denver Metro's locally owned, fully insured exterior cleaning company."
    pathname="/about"
  />
);
