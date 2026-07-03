import * as React from "react";
import { motion } from "framer-motion";
import {
  FiTool,
  FiFeather,
  FiClock,
  FiHeart,
  FiDollarSign,
  FiTarget,
  FiHome,
} from "react-icons/fi";
import { Container, Section, SectionHeading, Card } from "~/components/ui";

const reasons = [
  {
    icon: FiTool,
    title: "Professional Equipment",
    description: "Commercial-grade pressure washers and soft-wash systems calibrated for every surface type.",
  },
  {
    icon: FiFeather,
    title: "Eco-Friendly Products",
    description: "Biodegradable cleaning solutions that are safe for your family, pets, and landscaping.",
  },
  {
    icon: FiClock,
    title: "Fast Response",
    description: "Most estimate requests are answered within one business hour, with flexible scheduling.",
  },
  {
    icon: FiHeart,
    title: "Premium Customer Service",
    description: "Friendly, communicative crews who treat your property like their own.",
  },
  {
    icon: FiDollarSign,
    title: "Transparent Pricing",
    description: "Upfront, itemized quotes with no hidden fees or last-minute upsells.",
  },
  {
    icon: FiTarget,
    title: "Attention to Detail",
    description: "From tracks and sills to corners and edges, we don't cut corners — literally.",
  },
  {
    icon: FiHome,
    title: "Locally Owned",
    description: "Proudly Denver-based and invested in the community we serve every day.",
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <Section background="white">
      <Container>
        <SectionHeading
          eyebrow="Why ClearPeak"
          title="Higher Standards, Better Results"
          description="We built ClearPeak to be the exterior cleaning company Denver homeowners actually recommend to their neighbors."
        />

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
