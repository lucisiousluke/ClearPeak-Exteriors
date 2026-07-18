import * as React from "react";
import { FiArrowRight } from "react-icons/fi";
import { Container, Section, SectionHeading, Button } from "~/components/ui";
import { ServiceCard } from "~/components/shared/ServiceCard";
import { services } from "~/data/services";
import { homepage } from "~/data/homepage";
import { siteContent } from "~/data/siteContent";

export const Services: React.FC = () => {
  const { eyebrow, title, description } = siteContent.servicesSection;

  // Homepage → Featured Services controls which tiles show here and in what
  // order (drag to reorder in the Studio). Falls back to every service in
  // its default order when that field is left empty.
  const featuredServices = homepage.featuredServiceSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is (typeof services)[number] => Boolean(s));
  const displayedServices = featuredServices.length > 0 ? featuredServices : services;

  return (
    <Section background="soft" id="services">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedServices.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Button as="a" href="/services" variant="outline" icon={<FiArrowRight />}>
            View All Services
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export default Services;
