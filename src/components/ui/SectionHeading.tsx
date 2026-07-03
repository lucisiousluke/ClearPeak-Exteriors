import * as React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Badge } from "./Badge";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className,
}) => {
  return (
    <div
      className={clsx(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className={clsx("mb-5 flex", align === "center" ? "justify-center" : "justify-start")}
        >
          <Badge variant="aqua">{eyebrow}</Badge>
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className={clsx(
          "font-display text-display-md md:text-display-lg font-bold tracking-tight",
          light ? "text-white" : "text-ink-800"
        )}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={clsx(
            "mt-5 text-lg leading-relaxed",
            light ? "text-white/80" : "text-ink-500"
          )}
        >
          {description}
        </motion.div>
      )}
    </div>
  );
};

export default SectionHeading;
