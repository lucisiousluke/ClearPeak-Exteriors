import * as React from "react";
import clsx from "clsx";
import { motion, type HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
  hover?: boolean;
  glass?: boolean;
  padding?: "sm" | "md" | "lg";
}

const paddingClass: Record<NonNullable<CardProps["padding"]>, string> = {
  sm: "p-5",
  md: "p-8",
  lg: "p-10",
};

export const Card: React.FC<CardProps> = ({
  hover = true,
  glass = false,
  padding = "md",
  className,
  children,
  ...rest
}) => {
  return (
    <motion.div
      className={clsx(
        "rounded-3xl border border-ink-100/60 bg-white shadow-soft",
        glass && "glass",
        paddingClass[padding],
        className
      )}
      whileHover={hover ? { y: -8, boxShadow: "0 20px 40px -12px rgba(23,43,77,0.18)" } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default Card;
