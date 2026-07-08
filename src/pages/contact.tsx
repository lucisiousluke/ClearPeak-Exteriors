import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin, FiCheck, FiSend } from "react-icons/fi";
import Layout from "~/components/layout/Layout";
import SEO from "~/components/shared/SEO";
import { Container, Button, Badge } from "~/components/ui";
import { site } from "~/data/site";
import { contactPage } from "~/data/contactPage";
import { services } from "~/data/services";
import { cities } from "~/data/cities";

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");

const ContactPage: React.FC<PageProps> = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = String(value);
    });

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "quote-request", ...data }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="relative overflow-hidden bg-soft py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-gradient-mesh" />
        <Container className="relative grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Badge variant="aqua">Get In Touch</Badge>
            <h1 className="mt-6 font-display text-display-md font-bold text-gradient-brand">
              {contactPage.headline}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-500">{contactPage.subheadline}</p>

            <div className="mt-10 space-y-5">
              <a href={site.phoneHref} className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-soft">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-gradient-brand text-white">
                  <FiPhone />
                </span>
                <div>
                  <p className="text-xs text-ink-400">Call Us</p>
                  <p className="font-display font-semibold text-ink-800">{site.phone}</p>
                </div>
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-soft">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-gradient-brand-2 text-white">
                  <FiMail />
                </span>
                <div>
                  <p className="text-xs text-ink-400">Email Us</p>
                  <p className="font-display font-semibold text-ink-800">{site.email}</p>
                </div>
              </a>
              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-soft">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-coral-500 text-white">
                  <FiMapPin />
                </span>
                <div>
                  <p className="text-xs text-ink-400">Service Area</p>
                  <p className="font-display font-semibold text-ink-800">Denver Metro, CO</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-4xl bg-white p-8 shadow-lift md:p-10"
          >
            {submitted ? (
              <div className="flex flex-col items-center py-10 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success-50 text-success-600">
                  <FiCheck size={28} />
                </span>
                <h2 className="mt-6 font-display text-2xl font-bold text-ink-800">Thanks — request received!</h2>
                <p className="mt-2 text-ink-500">We'll reach out within one business hour with your free estimate.</p>
              </div>
            ) : (
              <form
                name="quote-request"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <input type="hidden" name="form-name" value="quote-request" />
                <p className="hidden">
                  <label>
                    Don't fill this out: <input name="bot-field" />
                  </label>
                </p>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-semibold text-ink-700" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      className="mt-2 w-full rounded-xl border border-ink-100 px-4 py-3 outline-none transition-colors focus:border-aqua-400"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-ink-700" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      required
                      type="tel"
                      className="mt-2 w-full rounded-xl border border-ink-100 px-4 py-3 outline-none transition-colors focus:border-aqua-400"
                      placeholder="(720) 555-0100"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-ink-700" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    required
                    type="email"
                    className="mt-2 w-full rounded-xl border border-ink-100 px-4 py-3 outline-none transition-colors focus:border-aqua-400"
                    placeholder="jane@example.com"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-semibold text-ink-700" htmlFor="service">
                      Service Needed
                    </label>
                    <select
                      id="service"
                      name="service"
                      className="mt-2 w-full rounded-xl border border-ink-100 px-4 py-3 outline-none transition-colors focus:border-aqua-400"
                    >
                      {services.map((s) => (
                        <option key={s.slug} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-ink-700" htmlFor="city">
                      City
                    </label>
                    <select
                      id="city"
                      name="city"
                      className="mt-2 w-full rounded-xl border border-ink-100 px-4 py-3 outline-none transition-colors focus:border-aqua-400"
                    >
                      {cities.map((c) => (
                        <option key={c.slug} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-ink-700" htmlFor="message">
                    Additional Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-2 w-full rounded-xl border border-ink-100 px-4 py-3 outline-none transition-colors focus:border-aqua-400"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" icon={<FiSend />} disabled={submitting}>
                  {submitting ? "Sending..." : "Get My Free Quote"}
                </Button>
              </form>
            )}
          </motion.div>
        </Container>
      </section>
    </Layout>
  );
};

export default ContactPage;

export const Head: HeadFC = () => (
  <SEO
    title="Contact Us"
    description="Get a free, no-obligation exterior cleaning estimate from ClearPeak Exteriors. We respond within one business hour."
    pathname="/contact"
  />
);
