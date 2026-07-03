import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Photo } from "~/components/ui";
import type { GalleryItem } from "~/types";

interface LightboxProps {
  items: GalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ items, activeIndex, onClose, onNavigate }) => {
  const item = activeIndex !== null ? items[activeIndex] : null;

  React.useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((activeIndex + 1) % items.length);
      if (e.key === "ArrowLeft") onNavigate((activeIndex - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, items.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {item && activeIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/90 p-4 md:p-10"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Close lightbox"
          >
            <FiX size={22} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((activeIndex - 1 + items.length) % items.length);
            }}
            className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 md:left-8"
            aria-label="Previous image"
          >
            <FiChevronLeft size={24} />
          </button>

          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="max-h-[80vh] w-full max-w-4xl overflow-hidden rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Photo src={item.image} alt={item.title} wrapperClassName="aspect-[4/3] w-full" />
            <div className="bg-white p-5">
              <p className="font-display text-lg font-bold text-ink-800">{item.title}</p>
              <p className="text-sm text-ink-500">{item.category}</p>
            </div>
          </motion.div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((activeIndex + 1) % items.length);
            }}
            className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 md:right-8"
            aria-label="Next image"
          >
            <FiChevronRight size={24} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
