import * as React from "react";
import { motion } from "framer-motion";
import { Container, Section, SectionHeading, Badge } from "~/components/ui";
import { BeforeAfterSlider } from "~/components/shared/BeforeAfterSlider";
import { beforeAfterItems } from "~/data/gallery";
import { siteContent } from "~/data/siteContent";

export const BeforeAfter: React.FC = () => {
  const [active, setActive] = React.useState(0);
  const item = beforeAfterItems[active];
  const { eyebrow, title, description } = siteContent.beforeAfterSection;

  return (
    <Section background="white">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_320px]">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <BeforeAfterSlider beforeImage={item.beforeImage} afterImage={item.afterImage} />
            <div className="mt-5 flex items-center justify-between">
              <h3 className="font-display text-xl font-bold text-ink-800">{item.title}</h3>
              <Badge variant="coral">{item.service}</Badge>
            </div>
          </motion.div>

          <div className="flex flex-row gap-3 overflow-x-auto lg:flex-col lg:overflow-visible">
            {beforeAfterItems.map((b, i) => (
              <button
                key={b.id}
                onClick={() => setActive(i)}
                className={`flex-none rounded-2xl border-2 px-5 py-4 text-left transition-all duration-200 lg:flex-auto ${
                  i === active
                    ? "border-transparent bg-gradient-brand text-on-primary shadow-glow"
                    : "border-ink-100 bg-white text-ink-700 hover:border-aqua-200"
                }`}
              >
                <p className="font-display text-sm font-bold">{b.title}</p>
                <p className={`mt-1 text-xs ${i === active ? "text-on-primary/80" : "text-ink-400"}`}>{b.service}</p>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default BeforeAfter;
