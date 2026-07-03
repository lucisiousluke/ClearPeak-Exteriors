import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { motion } from "framer-motion";
import { FiTarget, FiHeart, FiShield } from "react-icons/fi";
import Layout from "~/components/layout/Layout";
import SEO from "~/components/shared/SEO";
import { Container, Section, SectionHeading, Photo, Card } from "~/components/ui";
import TrustBadges from "~/components/sections/TrustBadges";
import WhyChooseUs from "~/components/sections/WhyChooseUs";
import Reviews from "~/components/sections/Reviews";
import FinalCTA from "~/components/sections/FinalCTA";
import { images } from "~/data/images";

const values = [
  {
    icon: FiTarget,
    title: "Our Mission",
    description:
      "To help every Denver Metro homeowner and business take pride in how their property looks — through honest, high-quality exterior cleaning.",
  },
  {
    icon: FiHeart,
    title: "Our Values",
    description:
      "Integrity, craftsmanship, and genuine care for our customers' homes and the environment guide every job we take on.",
  },
  {
    icon: FiShield,
    title: "Our Promise",
    description:
      "Fully insured, transparent pricing, and a satisfaction guarantee on every single service we provide.",
  },
];

const AboutPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <section className="relative overflow-hidden bg-soft py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-gradient-mesh" />
        <Container className="relative grid items-center gap-14 lg:grid-cols-2">
          <div>
            <h1 className="font-display text-display-md font-bold text-ink-800 md:text-display-lg">
              Colorado-Owned. <span className="text-gradient-brand">Customer-Obsessed.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-500">
              ClearPeak Exteriors was founded on a simple idea: Denver Metro homeowners deserve an exterior cleaning
              company that shows up on time, does the job right, and treats every property like their own. Since
              then, we've grown into one of the area's most trusted names in residential and commercial exterior
              care.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="aspect-[4/3] overflow-hidden rounded-4xl shadow-lift"
          >
            <Photo src={images.coupleOutdoor} alt="ClearPeak Exteriors team" wrapperClassName="h-full w-full" />
          </motion.div>
        </Container>
      </section>

      <TrustBadges />

      <Section background="white">
        <Container>
          <SectionHeading eyebrow="What Drives Us" title="Built on Trust, Backed by Results" />
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map((v) => (
              <Card key={v.title}>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow">
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
