import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "~/components/layout/Layout";
import SEO from "~/components/shared/SEO";
import { Container, Section } from "~/components/ui";
import { site } from "~/data/site";

const TermsPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Section background="soft" className="pt-16 md:pt-20">
        <Container className="max-w-3xl">
          <h1 className="font-display text-display-md font-bold text-ink-800">Terms of Service</h1>
          <p className="mt-4 text-sm text-ink-400">Last updated: July 2026</p>

          <div className="mt-8 rounded-2xl border border-aqua-200 bg-aqua-50 p-5 text-sm leading-relaxed text-ink-600">
            <strong className="text-ink-800">Note:</strong> This is a general-purpose template, not a
            contract drafted for this specific business. It has not been reviewed by an attorney and should
            not be treated as legal advice. Please have a legal professional review this before relying on it
            to meet any specific legal requirements.
          </div>

          <div className="prose-legal mt-10 space-y-8 text-ink-600">
            <section>
              <h2 className="font-display text-xl font-bold text-ink-800">Agreement to Terms</h2>
              <p className="mt-3 leading-relaxed">
                By using this website or requesting a quote through it, you agree to these terms. If you
                don't agree, please don't use the site or our services.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink-800">Our Services</h2>
              <p className="mt-3 leading-relaxed">
                {site.name} provides exterior cleaning services, including pressure washing, soft washing,
                window cleaning, roof cleaning, concrete cleaning, and commercial services, in the Denver
                Metro area. Specific service details, availability, and pricing are confirmed at the time of
                your quote and may vary based on property size, condition, and location.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink-800">Estimates & Pricing</h2>
              <p className="mt-3 leading-relaxed">
                Estimates requested through this site are free and non-binding until confirmed. Final pricing
                may be adjusted after an in-person or photo-based assessment of your property. We'll always
                confirm pricing with you before beginning work.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink-800">Scheduling & Weather</h2>
              <p className="mt-3 leading-relaxed">
                Appointments are scheduled based on availability and may be rescheduled due to weather or
                conditions unsafe for exterior work. We'll do our best to communicate any changes as early as
                possible.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink-800">Property Access & Preparation</h2>
              <p className="mt-3 leading-relaxed">
                You're responsible for providing safe, reasonable access to the areas being cleaned and for
                removing or securing personal property, vehicles, and fragile items near the work area before
                your appointment.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink-800">Limitation of Liability</h2>
              <p className="mt-3 leading-relaxed">
                While we take care to protect your property, exterior cleaning inherently involves water,
                pressure, and cleaning solutions near your home or business. To the extent permitted by law,
                we are not liable for pre-existing damage, normal wear revealed by cleaning, or issues arising
                from conditions not disclosed to us in advance. We carry insurance for our work — details
                available on request.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink-800">Website Use</h2>
              <p className="mt-3 leading-relaxed">
                The content on this site — including text, images, and branding — belongs to {site.name}
                unless otherwise noted, and is provided for informational purposes about our services.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink-800">Governing Law</h2>
              <p className="mt-3 leading-relaxed">
                These terms are governed by the laws of the State of Colorado, without regard to conflict of
                law principles.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink-800">Changes to These Terms</h2>
              <p className="mt-3 leading-relaxed">
                We may update these terms from time to time. Changes will be posted on this page with an
                updated revision date.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink-800">Contact Us</h2>
              <p className="mt-3 leading-relaxed">
                Questions about these terms? Reach out at{" "}
                <a href={`mailto:${site.email}`} className="font-semibold text-aqua-600 hover:underline">
                  {site.email}
                </a>{" "}
                or{" "}
                <a href={site.phoneHref} className="font-semibold text-aqua-600 hover:underline">
                  {site.phone}
                </a>
                .
              </p>
            </section>
          </div>
        </Container>
      </Section>
    </Layout>
  );
};

export default TermsPage;

export const Head: HeadFC = () => (
  <SEO title="Terms of Service" description="The terms that apply to using ClearPeak Exterior's website and services." pathname="/terms" />
);
