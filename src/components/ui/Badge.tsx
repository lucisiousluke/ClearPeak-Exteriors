import * as React from "react";
import clsx from "clsx";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "aqua" | "pink" | "coral" | "success" | "white";
}

const variantClass: Record<NonNullable<BadgeProps["variant"]>, string> = {
  aqua: "bg-aqua-50 text-aqua-700",
  pink: "bg-pink-50 text-pink-700",
  coral: "bg-coral-50 text-coral-700",
  success: "bg-success-50 text-success-600",
  white: "bg-white/90 text-ink-800",
};

export const Badge: React.FC<BadgeProps> = ({ variant = "aqua", className, children, ...rest }) => (
  <span
    className={clsx(
      "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold tracking-tight",
      variantClass[variant],
      className
    )}
    {...rest}
  >
    {children}
  </span>
);

export default Badge;
