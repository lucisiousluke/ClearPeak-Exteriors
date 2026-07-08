import * as React from "react";
import { motion } from "framer-motion";
import { Container, Section, SectionHeading } from "~/components/ui";
import type { ProcessBlock } from "~/types";

type ProcessProps = Omit<ProcessBlock, "type">;

export const Process: React.FC<ProcessProps> = ({ eyebrow, title, description, steps }) => {
  return (
    <Section background="ink">
      <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-40" />
      <Container className="relative">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} light />

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-8 hidden h-px w-full bg-gradient-to-r from-white/20 to-transparent lg:block" />
              )}
              <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-brand text-white shadow-glow">
                <step.icon size={26} />
              </span>
              <span className="absolute -top-2 left-10 font-display text-5xl font-bold text-white/10">
                0{i + 1}
              </span>
              <h3 className="mt-6 font-display text-xl font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Process;
