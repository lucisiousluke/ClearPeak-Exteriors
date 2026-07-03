import * as React from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiPhone } from "react-icons/fi";
import { Container, Button } from "~/components/ui";
import { site } from "~/data/site";

export const FinalCTA: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-brand-animated py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-30" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-10 top-10 h-56 w-56 rounded-full bg-white/10 blur-3xl animate-float"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-float-slow"
      />

      <Container className="relative text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl font-display text-display-md font-bold text-white md:text-display-lg"
        >
          Ready to Refresh Your Home?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-5 max-w-xl text-lg text-white/85"
        >
          Get a free, no-obligation estimate today and see why Denver homeowners trust ClearPeak Exteriors.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button as="a" href="/contact" variant="white" size="lg" icon={<FiArrowRight />}>
            Get My Free Quote
          </Button>
          <Button
            as="a"
            href={site.phoneHref}
            size="lg"
            icon={<FiPhone />}
            iconPosition="left"
            className="bg-ink-900/20 shadow-none hover:bg-ink-900/30"
          >
            Call Today: {site.phone}
          </Button>
        </motion.div>
      </Container>
    </section>
  );
};

export default FinalCTA;
