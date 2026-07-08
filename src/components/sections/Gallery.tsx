import * as React from "react";
import { motion } from "framer-motion";
import { FiZoomIn } from "react-icons/fi";
import { Container, Section, SectionHeading, Photo } from "~/components/ui";
import { Lightbox } from "~/components/shared/Lightbox";
import { galleryItems } from "~/data/gallery";
import { siteContent } from "~/data/siteContent";

const categories = ["All", ...Array.from(new Set(galleryItems.map((g) => g.category)))];

interface GalleryProps {
  compact?: boolean;
}

export const Gallery: React.FC<GalleryProps> = ({ compact = false }) => {
  const [filter, setFilter] = React.useState("All");
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const filtered = React.useMemo(
    () => (filter === "All" ? galleryItems : galleryItems.filter((g) => g.category === filter)),
    [filter]
  );

  const visible = compact ? filtered.slice(0, 6) : filtered;

  return (
    <Section background="soft">
      <Container>
        {!compact && (
          <SectionHeading
            eyebrow={siteContent.gallerySection.eyebrow}
            title={siteContent.gallerySection.title}
            description={siteContent.gallerySection.description}
          />
        )}

        {!compact && (
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  filter === cat
                    ? "bg-gradient-brand text-white shadow-glow"
                    : "bg-white text-ink-600 shadow-soft hover:text-aqua-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {visible.map((item, i) => {
            const globalIndex = galleryItems.findIndex((g) => g.id === item.id);
            return (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                onClick={() => setActiveIndex(globalIndex)}
                className="group relative mb-5 block w-full overflow-hidden rounded-3xl shadow-soft"
              >
                <Photo
                  src={item.image}
                  alt={item.title}
                  wrapperClassName="w-full"
                  className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink-900/70 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="font-display text-sm font-bold text-white">{item.title}</p>
                  <p className="text-xs text-white/70">{item.category}</p>
                </div>
                <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <FiZoomIn size={16} />
                </span>
              </motion.button>
            );
          })}
        </div>
      </Container>

      <Lightbox
        items={galleryItems}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </Section>
  );
};

export default Gallery;
