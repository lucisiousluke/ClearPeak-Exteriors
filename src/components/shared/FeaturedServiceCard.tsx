import * as React from "react";
import { Link } from "gatsby";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Badge } from "~/components/ui";
import type { Service } from "~/types";

interface FeaturedServiceCardProps {
  service: Service;
}

/**
 * Wide card used when a category has exactly one service in it — gives a
 * standalone offering (e.g. Commercial) real presence instead of looking
 * like an awkward leftover single tile in a grid.
 */
export const FeaturedServiceCard: React.FC<FeaturedServiceCardProps> = ({ service }) => {
  const Icon = service.icon;
  const priceLabel = service.customQuote ? "Custom Quote" : service.startingPrice ? `From ${service.startingPrice}` : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
    >
      <Link
        to={`/services/${service.slug}`}
        className="group relative flex flex-col gap-5 overflow-hidden rounded-3xl border border-ink-100 bg-white p-7 shadow-soft transition-shadow duration-300 hover:shadow-lift md:flex-row md:items-center md:gap-8"
      >
        <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-brand transition-transform duration-300 group-hover:scale-x-100" />

        <span className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-400 opacity-0 transition-all duration-300 group-hover:bg-gradient-brand group-hover:text-on-primary group-hover:opacity-100">
          <FiArrowUpRight size={14} />
        </span>

        <div className="flex items-start gap-5 pr-10">
          <span className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-gradient-brand text-on-primary shadow-glow transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
            <Icon size={22} />
          </span>
          <div>
            <h3 className="font-display text-lg font-bold text-ink-800">{service.name}</h3>
            <p className="mt-1.5 max-w-md text-sm leading-relaxed text-ink-500">{service.tagline}</p>
            {service.idealFor && service.idealFor.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {service.idealFor.map((tag) => (
                  <Badge key={tag} variant="aqua" className="px-3 py-1 text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            {priceLabel && <p className="mt-4 text-sm font-semibold text-aqua-600">{priceLabel}</p>}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default FeaturedServiceCard;
