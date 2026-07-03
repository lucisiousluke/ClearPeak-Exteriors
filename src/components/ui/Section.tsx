import * as React from "react";
import clsx from "clsx";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
  background?: "white" | "soft" | "ink" | "gradient";
  id?: string;
}

const backgroundClass: Record<NonNullable<SectionProps["background"]>, string> = {
  white: "bg-white",
  soft: "bg-soft",
  ink: "bg-ink-800 text-white",
  gradient: "bg-gradient-brand-3",
};

export const Section: React.FC<SectionProps> = ({
  as: Tag = "section",
  background = "white",
  className,
  children,
  ...rest
}) => {
  const Component = Tag as React.ElementType;
  return (
    <Component
      className={clsx("relative py-20 md:py-28 overflow-hidden", backgroundClass[background], className)}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Section;
