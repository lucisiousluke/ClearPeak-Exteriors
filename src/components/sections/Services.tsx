import * as React from "react";
import { Link } from "gatsby";
import { FiArrowRight } from "react-icons/fi";
import { Container, Section, SectionHeading, Button } from "~/components/ui";
import { ServiceCard } from "~/components/shared/ServiceCard";
import { services } from "~/data/services";

export const Services: React.FC = () => {
  return (
    <Section background="soft" id="services">
      <Container>
        <SectionHeading
          eyebrow="What We Do"
          title="Full-Service Exterior Cleaning"
          description="From your roofline to your driveway, we've got every exterior surface covered — with the equipment, expertise, and care to do it right."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
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
