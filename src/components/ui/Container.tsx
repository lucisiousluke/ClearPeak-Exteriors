import * as React from "react";
import clsx from "clsx";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements;
  narrow?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  as: Tag = "div",
  narrow = false,
  className,
  children,
  ...rest
}) => {
  const Component = Tag as React.ElementType;
  return (
    <Component
      className={clsx(
        "mx-auto w-full px-6 md:px-10",
        narrow ? "max-w-4xl" : "max-w-8xl",
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Container;
