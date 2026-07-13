import * as React from "react";
import { Link } from "gatsby";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiArrowRight } from "react-icons/fi";
import { useActivePromotion } from "~/hooks/useActivePromotion";

const dismissKey = (title: string) => `clearpeak-promo-dismissed:${title}`;

export const TopPromoBanner: React.FC = () => {
  const promo = useActivePromotion("Top Banner");
  const [dismissed, setDismissed] = React.useState(true);

  React.useEffect(() => {
    if (!promo) return;
    setDismissed(sessionStorage.getItem(dismissKey(promo.title)) === "1");
  }, [promo]);

  if (!promo || dismissed) return null;

  const isInternal = promo.cta?.url?.startsWith("/");

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "auto" }}
        exit={{ height: 0 }}
        className="relative overflow-hidden bg-gradient-brand text-on-primary"
      >
        <div className="mx-auto flex max-w-8xl flex-wrap items-center justify-center gap-3 px-6 py-2.5 text-center text-sm font-semibold">
          <span>{promo.message}</span>
          {promo.cta?.label &&
            (isInternal ? (
              <Link to={promo.cta.url} className="inline-flex items-center gap-1 underline underline-offset-2">
                {promo.cta.label} <FiArrowRight size={14} />
              </Link>
            ) : (
              <a href={promo.cta.url} className="inline-flex items-center gap-1 underline underline-offset-2">
                {promo.cta.label} <FiArrowRight size={14} />
              </a>
            ))}
        </div>
        <button
          onClick={() => {
            sessionStorage.setItem(dismissKey(promo.title), "1");
            setDismissed(true);
          }}
          className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 hover:bg-white/30"
          aria-label="Dismiss promotion"
        >
          <FiX size={14} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default TopPromoBanner;
