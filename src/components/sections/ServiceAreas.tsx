import * as React from "react";
import { Link } from "gatsby";
import { motion } from "framer-motion";
import { FiMapPin, FiArrowRight } from "react-icons/fi";
import { Container, Section, SectionHeading } from "~/components/ui";
import { cities } from "~/data/cities";
import { siteContent } from "~/data/siteContent";

export const ServiceAreas: React.FC = () => {
  const [hovered, setHovered] = React.useState<string | null>(null);
  const { eyebrow, title, description } = siteContent.serviceAreasSection;

  return (
    <Section background="white">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-4xl bg-gradient-mesh shadow-soft">
            <div className="absolute inset-0 bg-gradient-brand-3 opacity-10" />
            <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
              <circle cx="200" cy="200" r="180" fill="none" stroke="#00D4FF" strokeOpacity="0.15" strokeWidth="1" />
              <circle cx="200" cy="200" r="130" fill="none" stroke="#FF4FA3" strokeOpacity="0.15" strokeWidth="1" />
              <circle cx="200" cy="200" r="80" fill="none" stroke="#FF7A59" strokeOpacity="0.15" strokeWidth="1" />
            </svg>
            {cities.map((city, i) => {
              const angle = (i / cities.length) * Math.PI * 2;
              const radius = 34 + (i % 3) * 6;
              const x = 50 + radius * Math.cos(angle);
              const y = 50 + radius * Math.sin(angle);
              const isHovered = hovered === city.slug;
              return (
                <Link
                  key={city.slug}
                  to={`/service-areas/${city.slug}`}
                  onMouseEnter={() => setHovered(city.slug)}
                  onMouseLeave={() => setHovered(null)}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <motion.span
                    animate={{ scale: isHovered ? 1.3 : 1 }}
                    className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gradient-brand shadow-glow"
                  />
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink-800 px-3 py-1 text-xs font-semibold text-white shadow-lift"
                    >
                      {city.name}
                    </motion.span>
                  )}
                </Link>
              );
            })}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-4 py-2 text-center shadow-lift">
              <p className="font-display text-xs font-bold text-ink-800">Denver Metro</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {cities.map((city) => (
              <Link
                key={city.slug}
                to={`/service-areas/${city.slug}`}
                onMouseEnter={() => setHovered(city.slug)}
                onMouseLeave={() => setHovered(null)}
                className={`group flex items-center justify-between rounded-2xl border px-5 py-4 transition-all duration-200 ${
                  hovered === city.slug
                    ? "border-transparent bg-gradient-brand text-on-primary shadow-glow"
                    : "border-ink-100 bg-white text-ink-700 hover:border-aqua-200"
                }`}
              >
                <span className="flex items-center gap-2 font-display text-sm font-semibold">
                  <FiMapPin size={16} /> {city.name}
                </span>
                <FiArrowRight
                  size={16}
                  className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                />
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ServiceAreas;
