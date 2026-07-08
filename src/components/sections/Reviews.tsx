import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Container, Section, SectionHeading, StarRating } from "~/components/ui";
import { ReviewCard } from "~/components/shared/ReviewCard";
import { testimonials } from "~/data/testimonials";
import { site } from "~/data/site";
import { siteContent } from "~/data/siteContent";

const GROUP_SIZE = 3;

export const Reviews: React.FC = () => {
  const [page, setPage] = React.useState(0);
  const pageCount = Math.ceil(testimonials.length / GROUP_SIZE);

  const next = () => setPage((p) => (p + 1) % pageCount);
  const prev = () => setPage((p) => (p - 1 + pageCount) % pageCount);

  const visible = testimonials.slice(page * GROUP_SIZE, page * GROUP_SIZE + GROUP_SIZE);

  return (
    <Section background="soft">
      <Container>
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={siteContent.reviewsSection.eyebrow}
            align="left"
            title={siteContent.reviewsSection.title}
            description={
              <span className="flex items-center gap-3">
                <StarRating rating={5} />
                <span className="font-semibold text-ink-700">
                  {site.rating} average from {site.reviewCount}+ Google reviews
                </span>
              </span>
            }
            className="mx-0 text-left"
          />
          <div className="hidden gap-3 md:flex">
            <button
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink-700 shadow-soft hover:text-aqua-600"
              aria-label="Previous reviews"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink-700 shadow-soft hover:text-aqua-600"
              aria-label="Next reviews"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative mt-14 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-3"
            >
              {visible.map((review) => (
                <ReviewCard key={review.name} review={review} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center gap-2 md:hidden">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-2 rounded-full transition-all ${i === page ? "w-8 bg-gradient-brand" : "w-2 bg-ink-100"}`}
              aria-label={`Go to review page ${i + 1}`}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Reviews;
