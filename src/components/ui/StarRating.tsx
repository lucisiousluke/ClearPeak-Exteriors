import * as React from "react";
import { FaStar } from "react-icons/fa";
import clsx from "clsx";

interface StarRatingProps {
  rating?: number;
  count?: number;
  size?: number;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating = 5,
  count = 5,
  size = 18,
  className,
}) => {
  return (
    <div className={clsx("flex items-center gap-1", className)} aria-label={`${rating} out of ${count} stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <FaStar
          key={i}
          size={size}
          className={i < rating ? "text-coral-500" : "text-ink-100"}
        />
      ))}
    </div>
  );
};

export default StarRating;
