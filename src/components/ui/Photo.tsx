import * as React from "react";
import clsx from "clsx";

interface PhotoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  wrapperClassName?: string;
  gradient?: "brand" | "brand-2" | "brand-3";
}

const gradientClass: Record<NonNullable<PhotoProps["gradient"]>, string> = {
  brand: "bg-gradient-brand",
  "brand-2": "bg-gradient-brand-2",
  "brand-3": "bg-gradient-brand-3",
};

/**
 * Image wrapper that falls back to a tasteful brand gradient-mesh panel
 * if the source photo fails to load (keeps layout intentional, never a
 * broken-image icon).
 */
export const Photo: React.FC<PhotoProps> = ({
  src,
  alt,
  className,
  wrapperClassName,
  gradient = "brand",
  loading = "lazy",
  ...rest
}) => {
  const [errored, setErrored] = React.useState(false);

  return (
    <div className={clsx("relative overflow-hidden", wrapperClassName)}>
      {errored ? (
        <div
          className={clsx(
            "absolute inset-0 bg-gradient-mesh",
            gradientClass[gradient],
            "opacity-90"
          )}
          role="img"
          aria-label={alt}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          onError={() => setErrored(true)}
          className={clsx("h-full w-full object-cover", className)}
          {...rest}
        />
      )}
    </div>
  );
};

export default Photo;
