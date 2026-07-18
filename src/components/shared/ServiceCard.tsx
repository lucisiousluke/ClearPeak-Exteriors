import * as React from "react";
import { Link } from "gatsby";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import type { Service } from "~/types";

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index = 0 }) => {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 5) * 0.06 }}
    >
      <Link
        to={`/services/${service.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white p-7 shadow-soft transition-shadow duration-300 hover:shadow-lift"
      >
        <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-brand transition-transform duration-300 group-hover:scale-x-100" />
        <div className="flex items-start justify-between">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-on-primary shadow-glow transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
            <Icon size={26} />
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-50 text-ink-400 transition-all duration-300 group-hover:bg-gradient-brand group-hover:text-on-primary">
            <FiArrowUpRight size={16} />
          </span>
        </div>
        <h3 className="mt-6 font-display text-xl font-bold text-ink-800">{service.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{service.tagline}</p>
        {service.customQuote ? (
          <p className="mt-5 text-sm font-semibold text-aqua-600">Custom Quote</p>
        ) : (
          service.startingPrice && (
            <p className="mt-5 text-sm font-semibold text-aqua-600">From {service.startingPrice}</p>
          )
        )}
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
