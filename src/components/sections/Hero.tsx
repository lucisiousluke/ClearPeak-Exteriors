import * as React from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiPlay } from "react-icons/fi";
import { Container, Button, Photo } from "~/components/ui";
import { images } from "~/data/images";
import { homepage } from "~/data/homepage";
import { site } from "~/data/site";

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-soft pb-24 pt-16 md:pb-32 md:pt-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-mesh" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-24 h-64 w-64 rounded-full bg-gradient-brand opacity-20 blur-3xl animate-float"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-gradient-brand-2 opacity-20 blur-3xl animate-float-slow"
      />

      <Container className="relative grid items-center gap-16 lg:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink-700 shadow-soft"
          >
            <span className="flex h-2 w-2 rounded-full bg-success" />
            {homepage.heroEyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-5xl font-bold leading-[1.03] tracking-tight text-ink-800 sm:text-6xl md:text-display-xl"
          >
            {homepage.heroHeadline}
            <br />
            <span className="text-gradient-brand">{homepage.heroHighlight}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-ink-500 md:text-xl"
          >
            {homepage.heroSubheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button as="a" href={homepage.heroPrimaryCta.url} variant={homepage.heroPrimaryCta.style} size="lg" icon={<FiArrowRight />}>
              {homepage.heroPrimaryCta.label}
            </Button>
            <Button
              as="a"
              href={homepage.heroSecondaryCta.url}
              variant={homepage.heroSecondaryCta.style}
              size="lg"
              icon={<FiPlay />}
              iconPosition="left"
            >
              {homepage.heroSecondaryCta.label}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {homepage.trustBadges.map((item) => (
              <div key={item} className="text-sm font-semibold text-ink-600">
                {item}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-4xl shadow-lift">
            <Photo
              src={images.heroHome}
              alt="Beautifully cleaned modern Colorado home exterior"
              wrapperClassName="h-full w-full"
              gradient="brand-3"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute -left-6 bottom-8 rounded-3xl bg-white p-5 shadow-lift md:-left-10"
          >
            <p className="font-display text-3xl font-bold text-gradient-brand">{site.rating}★</p>
            <p className="text-sm font-semibold text-ink-500">{site.reviewCount}+ Google Reviews</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="absolute -right-4 top-8 rounded-2xl bg-gradient-brand-2 px-5 py-3 text-white shadow-glow-pink md:-right-8"
          >
            <p className="font-display text-sm font-bold">Same-Week Availability</p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;
