import * as React from "react";
import { FiArrowRight } from "react-icons/fi";
import type { IconType } from "react-icons";
import { Container, Section, SectionHeading, Button } from "~/components/ui";
import { ServiceCard } from "~/components/shared/ServiceCard";
import { FeaturedServiceCard } from "~/components/shared/FeaturedServiceCard";
import { services } from "~/data/services";
import { homepage } from "~/data/homepage";
import { siteContent } from "~/data/siteContent";
import type { Service } from "~/types";

interface CategoryGroup {
  name: string;
  icon?: IconType;
  services: Service[];
}

export const Services: React.FC = () => {
  const { eyebrow, title, description } = siteContent.servicesSection;

  // Homepage → Featured Services optionally narrows down WHICH services show
  // here (curate a subset in the Studio) — but it's a filter only, not an
  // order. `services` already arrives pre-sorted by category then in-category
  // order, and that's what actually controls layout, so we filter down to
  // the featured set while keeping that sort intact rather than switching to
  // whatever order items happen to sit in the featured list.
  const featuredSlugs = new Set(homepage.featuredServiceSlugs);
  const displayedServices = featuredSlugs.size > 0 ? services.filter((s) => featuredSlugs.has(s.slug)) : services;

  // Services already arrive pre-sorted (category order, then in-category
  // order) from the generator — grouping here just needs to preserve that
  // order, not re-sort it.
  const categories: CategoryGroup[] = [];
  for (const service of displayedServices) {
    const name = service.category || "Other Services";
    let group = categories.find((c) => c.name === name);
    if (!group) {
      group = { name, icon: service.categoryIcon, services: [] };
      categories.push(group);
    }
    group.services.push(service);
  }

  return (
    <Section background="soft" id="services">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="mt-12">
          {categories.map((category, categoryIndex) => (
            <div key={category.name} className={categoryIndex > 0 ? "mt-14" : ""}>
              <div className="mb-5 flex items-center gap-2.5">
                {category.icon && (
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-aqua-50 text-aqua-600">
                    <category.icon size={14} />
                  </span>
                )}
                <h3 className="font-display text-base font-bold tracking-tight text-ink-700">{category.name}</h3>
                <div className="h-px flex-1 bg-ink-100" />
              </div>

              {category.services.length === 1 ? (
                <FeaturedServiceCard service={category.services[0]} />
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {category.services.map((service, index) => (
                    <ServiceCard key={service.slug} service={service} index={index} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button as="a" href="/services" variant="outline" icon={<FiArrowRight />}>
            View All Services
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export default Services;
