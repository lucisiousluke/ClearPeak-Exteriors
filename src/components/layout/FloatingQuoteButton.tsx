import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageCircle, FiX, FiArrowRight } from "react-icons/fi";
import { Link } from "gatsby";

export const FloatingQuoteButton: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-24 right-5 z-40 hidden md:bottom-8 md:block">
      <AnimatePresence>
        {visible && open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-72 rounded-3xl border border-ink-100 bg-white p-6 shadow-lift"
          >
            <p className="font-display text-lg font-bold text-ink-800">Ready for a free estimate?</p>
            <p className="mt-2 text-sm text-ink-500">
              Tell us a bit about your project and we'll get back to you within one business hour.
            </p>
            <Link
              to="/contact"
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-5 py-3 font-display text-sm font-semibold text-white shadow-glow"
            >
              Get My Free Quote <FiArrowRight />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen((v) => !v)}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-brand text-white shadow-glow"
            aria-label="Get a free quote"
          >
            {open ? <FiX size={26} /> : <FiMessageCircle size={26} />}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingQuoteButton;
