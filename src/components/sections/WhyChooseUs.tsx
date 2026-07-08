import * as React from "react";
import { motion } from "framer-motion";
import { Container, Section, SectionHeading, Card } from "~/components/ui";
import { whyChooseUsSection } from "~/data/whyChooseUsSection";

export const WhyChooseUs: React.FC = () => {
  const { eyebrow, title, description, reasons } = whyChooseUsSection;

  return (
    <Section background="white">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
            >
              <Card className="h-full">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand-2 text-white shadow-glow-pink">
                  <reason.icon size={22} />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-ink-800">{reason.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{reason.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default WhyChooseUs;
