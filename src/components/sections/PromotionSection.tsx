import * as React from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiTag } from "react-icons/fi";
import { Container, Button } from "~/components/ui";
import { useActivePromotion } from "~/hooks/useActivePromotion";

export const PromotionSection: React.FC = () => {
  const promo = useActivePromotion("Homepage Section");

  // Renders nothing until there's an active promo for this placement — no
  // empty section/awkward gap if this block is on the page but unused.
  if (!promo) return null;

  return (
    <section className="py-6">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-5 rounded-4xl bg-gradient-brand-2 px-8 py-10 text-center text-white shadow-glow-pink md:flex-row md:justify-between md:text-left"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-white/20">
              <FiTag size={22} />
            </span>
            <p className="font-display text-xl font-bold md:text-2xl">{promo.message}</p>
          </div>
          {promo.cta?.label && (
            <Button as="a" href={promo.cta.url} variant="white" size="md" icon={<FiArrowRight />} className="flex-none">
              {promo.cta.label}
            </Button>
          )}
        </motion.div>
      </Container>
    </section>
  );
};

export default PromotionSection;
