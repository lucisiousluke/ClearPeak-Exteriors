import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "~/components/layout/Layout";
import SEO from "~/components/shared/SEO";
import { Container, Section } from "~/components/ui";
import { site } from "~/data/site";

const PrivacyPolicyPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Section background="soft" className="pt-16 md:pt-20">
        <Container className="max-w-3xl">
          <h1 className="font-display text-display-md font-bold text-ink-800">Privacy Policy</h1>
          <p className="mt-4 text-sm text-ink-400">Last updated: July 2026</p>

          <div className="mt-8 rounded-2xl border border-aqua-200 bg-aqua-50 p-5 text-sm leading-relaxed text-ink-600">
            <strong className="text-ink-800">Note:</strong> This is a general-purpose template intended to
            describe how this site actually operates. It has not been reviewed by an attorney and should not
            be treated as legal advice. Please have a legal professional review this policy before relying on
            it to meet any specific legal or regulatory requirements.
          </div>

          <div className="prose-legal mt-10 space-y-8 text-ink-600">
            <section>
              <h2 className="font-display text-xl font-bold text-ink-800">Overview</h2>
              <p className="mt-3 leading-relaxed">
                {site.name} ("we," "us," or "our") operates this website. This policy explains what
                information we collect when you visit or use the site, how we use it, and the choices you
                have.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink-800">Information We Collect</h2>
              <p className="mt-3 leading-relaxed">
                When you submit our quote request form, we collect the information you provide: your name,
                phone number, email address, the service and city you're interested in, and any message you
                include. We only collect what's needed to respond to your request — we don't ask for payment
                information, social security numbers, or other sensitive personal data through this site.
              </p>
              <p className="mt-3 leading-relaxed">
                We do not currently use analytics, advertising trackers, or third-party cookies on this site.
                Some pages use your browser's local session storage for basic functionality (for example,
                remembering that you dismissed a promotional banner) — this data stays on your device and
                isn't sent to us or any third party.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink-800">How We Use Your Information</h2>
              <p className="mt-3 leading-relaxed">We use the information you submit to:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed">
                <li>Respond to your quote request and answer questions</li>
                <li>Schedule and coordinate service appointments</li>
                <li>Communicate with you about services you've requested</li>
              </ul>
              <p className="mt-3 leading-relaxed">
                We do not sell, rent, or trade your personal information to third parties for marketing
                purposes.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink-800">How Your Information Is Handled</h2>
              <p className="mt-3 leading-relaxed">
                This website is hosted on Netlify, and our contact form is processed through Netlify Forms.
                Submissions are stored securely with our hosting provider and are accessible only to us. We
                retain quote request submissions only as long as reasonably needed to respond to your inquiry
                and maintain business records.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink-800">Children's Privacy</h2>
              <p className="mt-3 leading-relaxed">
                This site is not directed at children under 13, and we do not knowingly collect information
                from children.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink-800">Your Choices</h2>
              <p className="mt-3 leading-relaxed">
                If you'd like us to delete information you've previously submitted, or have any questions
                about how your information is handled, contact us using the details below and we'll be happy
                to help.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink-800">Changes to This Policy</h2>
              <p className="mt-3 leading-relaxed">
                We may update this policy from time to time. Changes will be posted on this page with an
                updated revision date.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink-800">Contact Us</h2>
              <p className="mt-3 leading-relaxed">
                Questions about this policy? Reach out at{" "}
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

export default PrivacyPolicyPage;

export const Head: HeadFC = () => (
  <SEO title="Privacy Policy" description="How ClearPeak Exterior collects, uses, and protects your information." pathname="/privacy-policy" />
);
