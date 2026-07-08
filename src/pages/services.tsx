import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "~/components/layout/Layout";
import SEO from "~/components/shared/SEO";
import { Container, Section, SectionHeading } from "~/components/ui";
import { ServiceCard } from "~/components/shared/ServiceCard";
import FinalCTA from "~/components/sections/FinalCTA";
import { services } from "~/data/services";
import { siteContent } from "~/data/siteContent";

const ServicesPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Section background="soft" className="pt-16 md:pt-20">
        <Container>
          <SectionHeading
            eyebrow={siteContent.servicesSection.eyebrow}
            title={siteContent.servicesSection.title}
            description={siteContent.servicesSection.description}
          />
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
        </Container>
      </Section>
      <FinalCTA />
    </Layout>
  );
};

export default ServicesPage;

export const Head: HeadFC = () => (
  <SEO
    title="All Services"
    description="Explore ClearPeak Exteriors' full range of residential and commercial exterior cleaning services in the Denver Metro area."
    pathname="/services"
  />
);
