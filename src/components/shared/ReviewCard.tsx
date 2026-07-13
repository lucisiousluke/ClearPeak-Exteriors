import * as React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { Card, StarRating, Badge } from "~/components/ui";
import type { Testimonial } from "~/types";

interface ReviewCardProps {
  review: Testimonial;
  className?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, className }) => {
  return (
    <Card className={`flex h-full flex-col ${className ?? ""}`}>
      <div className="flex items-start justify-between">
        <StarRating rating={review.rating} />
        <FaQuoteLeft className="text-aqua-100" size={28} />
      </div>
      <p className="mt-5 flex-1 text-base leading-relaxed text-ink-700">"{review.quote}"</p>
      <div className="mt-6 flex items-center gap-3">
        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-gradient-brand font-display text-sm font-bold text-on-primary">
          {review.avatarInitials}
        </span>
        <div>
          <p className="font-display text-sm font-bold text-ink-800">{review.name}</p>
          <p className="text-xs text-ink-400">{review.location}</p>
        </div>
        <Badge variant="aqua" className="ml-auto">
          {review.service}
        </Badge>
      </div>
    </Card>
  );
};

export default ReviewCard;
