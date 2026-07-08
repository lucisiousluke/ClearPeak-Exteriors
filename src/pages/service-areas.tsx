import * as React from "react";
import { Link } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import Layout from "~/components/layout/Layout";
import SEO from "~/components/shared/SEO";
import { Container, Section, SectionHeading, Photo } from "~/components/ui";
import FinalCTA from "~/components/sections/FinalCTA";
import { cities } from "~/data/cities";
import { siteContent } from "~/data/siteContent";

const ServiceAreasPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Section background="soft" className="pt-16 md:pt-20">
        <Container>
          <SectionHeading
            eyebrow={siteContent.serviceAreasSection.eyebrow}
            title={siteContent.serviceAreasSection.title}
            description={siteContent.serviceAreasSection.description}
          />
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city) => (
              <Link
                key={city.slug}
                to={`/service-areas/${city.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft transition-shadow hover:shadow-lift"
              >
                <Photo
                  src={city.heroImage}
                  alt={city.name}
                  wrapperClassName="w-full"
                  className="aspect-[16/10] w-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-6">
                  <h3 className="flex items-center gap-2 font-display text-lg font-bold text-ink-800">
                    <FiMapPin className="text-aqua-500" /> {city.name}
                  </h3>
                  <p className="mt-2 text-sm text-ink-500">{city.blurb}</p>
                  <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-aqua-600">
                    View {city.name} services <FiArrowRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <FinalCTA />
    </Layout>
  );
};

export default ServiceAreasPage;

export const Head: HeadFC = () => (
  <SEO
    title="Service Areas"
    description="ClearPeak Exteriors proudly serves Denver, Littleton, Highlands Ranch, Castle Rock, Parker, Aurora, Lakewood, Centennial, Englewood, and Greenwood Village."
    pathname="/service-areas"
  />
);
