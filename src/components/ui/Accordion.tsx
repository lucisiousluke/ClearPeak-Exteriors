import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import clsx from "clsx";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, isOpen, onToggle }) => (
  <div className="border-b border-ink-100">
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-4 py-6 text-left"
      aria-expanded={isOpen}
    >
      <span className="font-display text-lg font-semibold text-ink-800">{question}</span>
      <motion.span
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.25 }}
        className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gradient-brand text-white"
      >
        <FiPlus size={18} />
      </motion.span>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <p className="pb-6 pr-12 leading-relaxed text-ink-500">{answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

interface AccordionProps {
  items: { question: string; answer: string }[];
  className?: string;
  allowMultiple?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ items, className, allowMultiple = false }) => {
  const [openIndexes, setOpenIndexes] = React.useState<number[]>([0]);

  const toggle = (index: number) => {
    setOpenIndexes((prev) => {
      const isOpen = prev.includes(index);
      if (allowMultiple) {
        return isOpen ? prev.filter((i) => i !== index) : [...prev, index];
      }
      return isOpen ? [] : [index];
    });
  };

  return (
    <div className={clsx("divide-y-0", className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.question}
          question={item.question}
          answer={item.answer}
          isOpen={openIndexes.includes(index)}
          onToggle={() => toggle(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
