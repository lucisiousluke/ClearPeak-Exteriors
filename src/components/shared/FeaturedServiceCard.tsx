import * as React from "react";
import { Link } from "gatsby";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
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
        className="group relative flex flex-col gap-5 overflow-hidden rounded-3xl border border-ink-100 bg-white p-7 shadow-soft transition-shadow duration-300 hover:shadow-lift md:flex-row md:items-center md:justify-between md:gap-8"
      >
        <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-brand transition-transform duration-300 group-hover:scale-x-100" />

        <div className="flex items-start gap-5">
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
          </div>
        </div>

        <div className="flex flex-none items-center gap-4 self-start md:flex-col md:items-end md:gap-2 md:self-center md:text-right">
          {priceLabel && <span className="text-sm font-semibold text-aqua-600">{priceLabel}</span>}
          <span className="flex items-center gap-1 font-display text-sm font-bold text-ink-800 transition-colors group-hover:text-aqua-600">
            Learn More <FiArrowRight size={14} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default FeaturedServiceCard;
