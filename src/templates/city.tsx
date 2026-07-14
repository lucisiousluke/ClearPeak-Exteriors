import * as React from "react";
import { Link } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import { motion } from "framer-motion";
import { FiArrowRight, FiChevronRight, FiMapPin, FiCheck } from "react-icons/fi";
import Layout from "~/components/layout/Layout";
import SEO from "~/components/shared/SEO";
import { Container, Section, SectionHeading, Button, Photo } from "~/components/ui";
import { ServiceCard } from "~/components/shared/ServiceCard";
import FAQ from "~/components/sections/FAQ";
import Reviews from "~/components/sections/Reviews";
import FinalCTA from "~/components/sections/FinalCTA";
import { services } from "~/data/services";
import { getCityBySlug, cities } from "~/data/cities";
import { faqs } from "~/data/faqs";

interface CityPageContext {
  slug: string;
}

const CityTemplate: React.FC<PageProps<object, CityPageContext>> = ({ pageContext }) => {
  const city = getCityBySlug(pageContext.slug)!;
  const otherCities = cities.filter((c) => c.slug !== city.slug).slice(0, 6);

  const cityFaqs = [
    {
      question: `Do you offer exterior cleaning in ${city.name}, CO?`,
      answer: `Yes — ClearPeak Exterior proudly serves ${city.name} and the surrounding ${city.county} area, including ${city.neighborhoods.slice(0, 3).join(", ")}.`,
    },
    ...faqs.slice(0, 4),
  ];

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
            <Link to="/service-areas" className="hover:text-aqua-600">
              Service Areas
            </Link>
            <FiChevronRight size={14} />
            <span className="text-ink-600">{city.name}</span>
          </nav>

          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink-700 shadow-soft">
                <FiMapPin className="text-aqua-500" /> {city.county}
              </span>
              <h1 className="mt-6 font-display text-display-md font-bold text-ink-800 md:text-display-lg">
                Exterior Cleaning in <span className="text-gradient-brand">{city.name}, CO</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-500">{city.blurb}</p>
              <div className="mt-8">
                <Button as="a" href="/contact" variant="secondary" size="sm" icon={<FiArrowRight />}>
                  Get Free Estimate
                </Button>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] overflow-hidden rounded-4xl shadow-lift"
            >
              <Photo src={city.heroImage} alt={`${city.name}, Colorado`} wrapperClassName="h-full w-full" />
            </motion.div>
          </div>
        </Container>
      </section>

      <Section background="white">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Neighborhoods"
                title={`Areas We Serve in ${city.name}`}
                align="left"
                className="mx-0"
              />
              <div className="mt-8 flex flex-wrap gap-3">
                {city.neighborhoods.map((n) => (
                  <span key={n} className="rounded-full bg-soft px-4 py-2 text-sm font-semibold text-ink-700">
                    {n}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-sm text-ink-400">
                Zip codes served: {city.zipCodes.join(", ")}
              </p>
            </div>
            <div>
              <SectionHeading eyebrow="Local Promise" title="Why Homeowners Choose Us" align="left" className="mx-0" />
              <ul className="mt-8 space-y-4">
                {[
                  `Fast, reliable scheduling throughout ${city.name}`,
                  "Fully insured, locally owned & operated",
                  "Free, transparent estimates with no hidden fees",
                  "Eco-friendly cleaning solutions safe for pets & landscaping",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-success-50 text-success-600">
                      <FiCheck size={14} />
                    </span>
                    <span className="text-ink-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section background="soft">
        <Container>
          <SectionHeading eyebrow="Our Services" title={`Popular Services in ${city.name}`} />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      <Reviews />

      <FAQ items={cityFaqs} title={`${city.name} FAQs`} />

      <Section background="white">
        <Container>
          <SectionHeading eyebrow="Nearby Areas" title="We Also Serve" />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                to={`/service-areas/${c.slug}`}
                className="rounded-full border border-ink-100 px-5 py-2.5 text-sm font-semibold text-ink-600 transition-colors hover:border-aqua-200 hover:text-aqua-600"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCTA />
    </Layout>
  );
};

export default CityTemplate;

export const Head: HeadFC<object, CityPageContext> = ({ pageContext }) => {
  const city = getCityBySlug(pageContext.slug)!;
  return (
    <SEO
      title={`Exterior Cleaning in ${city.name}, CO | Pressure Washing & More`}
      description={`Professional pressure washing, soft washing, and window cleaning in ${city.name}, CO. ${city.blurb}`}
      pathname={`/service-areas/${city.slug}`}
      structuredData={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: `ClearPeak Exterior - ${city.name}`,
        areaServed: `${city.name}, CO`,
        geo: {
          "@type": "GeoCoordinates",
          latitude: city.lat,
          longitude: city.lng,
        },
      }}
    />
  );
};
