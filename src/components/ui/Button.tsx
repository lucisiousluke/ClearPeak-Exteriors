import * as React from "react";
import clsx from "clsx";
import { motion, type HTMLMotionProps } from "framer-motion";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

interface ButtonOwnProps {
  variant?: Variant;
  size?: Size;
  as?: "button" | "a";
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

type ButtonProps = ButtonOwnProps &
  Omit<HTMLMotionProps<"button"> & HTMLMotionProps<"a">, keyof ButtonOwnProps>;

const variantClass: Record<Variant, string> = {
  primary:
    "bg-gradient-brand text-on-primary shadow-glow hover:shadow-glow-pink",
  secondary:
    "bg-gradient-brand-2 text-on-accent shadow-glow-pink hover:brightness-105",
  outline:
    "border-2 border-ink-800 text-ink-800 hover:bg-ink-800 hover:text-white",
  ghost: "text-ink-800 hover:bg-ink-100/60",
  white: "bg-white text-ink-800 shadow-soft hover:shadow-lift",
};

const sizeClass: Record<Size, string> = {
  // "lg" previously used `py-4.5`, which isn't a real Tailwind spacing step
  // (the default scale has no 4.5) — it silently produced zero vertical
  // padding, which is why "lg" CTAs across the site rendered thinner than
  // the "sm" header button instead of bigger.
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-base",
  lg: "px-9 py-5 text-lg",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  as = "button",
  href,
  icon,
  iconPosition = "right",
  disabled,
  type = "button",
  className,
  children,
  ...rest
}) => {
  const classes = clsx(
    "group relative inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold tracking-tight transition-all duration-300",
    variantClass[variant],
    sizeClass[size],
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="transition-transform duration-300 group-hover:-translate-x-0.5">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>
      )}
    </>
  );

  const motionProps = {
    whileHover: { scale: 1.03, y: -2 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 20 },
  };

  if (as === "a" && href) {
    return (
      <motion.a href={href} className={classes} {...motionProps} {...(rest as HTMLMotionProps<"a">)}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={classes}
      {...motionProps}
      {...(rest as HTMLMotionProps<"button">)}
    >
      {content}
    </motion.button>
  );
};

export default Button;
