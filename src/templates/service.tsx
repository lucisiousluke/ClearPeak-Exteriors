import * as React from "react";
import { Link } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheck, FiChevronRight } from "react-icons/fi";
import Layout from "~/components/layout/Layout";
import SEO from "~/components/shared/SEO";
import { Container, Section, SectionHeading, Button, Badge, Photo } from "~/components/ui";
import { ServiceCard } from "~/components/shared/ServiceCard";
import FAQ from "~/components/sections/FAQ";
import FinalCTA from "~/components/sections/FinalCTA";
import { services, getServiceBySlug } from "~/data/services";

interface ServicePageContext {
  slug: string;
}

const ServiceTemplate: React.FC<PageProps<object, ServicePageContext>> = ({ pageContext }) => {
  const service = getServiceBySlug(pageContext.slug)!;
  const Icon = service.icon;
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <Layout>
      <section className="relative overflow-hidden bg-soft py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-gradient-mesh" />
        <Container className="relative">
          <nav className="mb-8 flex items-center gap-2 text-sm text-ink-400">
            <Link to="/" className="hover:text-aqua-600">
              Home
            </Link>
            <FiChevronRight size={14} />
            <Link to="/services" className="hover:text-aqua-600">
              Services
            </Link>
            <FiChevronRight size={14} />
            <span className="text-ink-600">{service.name}</span>
          </nav>

          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-brand text-on-primary shadow-glow">
                <Icon size={28} />
              </span>
              <h1 className="mt-6 font-display text-display-md font-bold text-ink-800 md:text-display-lg">
                {service.name}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-500">{service.description}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button as="a" href="/contact" variant="secondary" size="sm" icon={<FiArrowRight />}>
                  Get Free Estimate
                </Button>
                {service.customQuote ? (
                  <Badge variant="coral">Custom Quote</Badge>
                ) : (
                  service.startingPrice && <Badge variant="coral">From {service.startingPrice}</Badge>
                )}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] overflow-hidden rounded-4xl shadow-lift"
            >
              <Photo src={service.heroImage} alt={service.name} wrapperClassName="h-full w-full" />
            </motion.div>
          </div>
        </Container>
      </section>

      <Section background="white">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Benefits" title="Why This Service Matters" align="left" className="mx-0" />
              <ul className="mt-8 space-y-4">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-success-50 text-success-600">
                      <FiCheck size={14} />
                    </span>
                    <span className="text-ink-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading eyebrow="Our Process" title="How It Works" align="left" className="mx-0" />
              <div className="mt-8 space-y-6">
                {service.process.map((step, i) => (
                  <div key={step} className="flex items-start gap-4">
                    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gradient-brand-2 font-display text-sm font-bold text-on-accent">
                      {i + 1}
                    </span>
                    <p className="pt-1 text-ink-600">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {service.faqs.length > 0 && <FAQ items={service.faqs} title={`${service.name} FAQs`} />}

      <Section background="soft">
        <Container>
          <SectionHeading eyebrow="Explore More" title="Other Services You May Need" />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      <FinalCTA />
    </Layout>
  );
};

export default ServiceTemplate;

export const Head: HeadFC<object, ServicePageContext> = ({ pageContext }) => {
  const service = getServiceBySlug(pageContext.slug)!;
  return (
    <SEO
      title={`${service.name} in Denver, CO`}
      description={service.description}
      pathname={`/services/${service.slug}`}
      structuredData={{
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: service.name,
        provider: {
          "@type": "LocalBusiness",
          name: "ClearPeak Exterior",
        },
        areaServed: "Denver Metro Area, CO",
        description: service.description,
      }}
    />
  );
};
