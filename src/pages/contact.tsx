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

const ContactPage: React.FC<PageProps> = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [otherChecked, setOtherChecked] = React.useState<Record<string, boolean>>({});
  const [otherSelected, setOtherSelected] = React.useState<Record<string, boolean>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    // Built with URLSearchParams (not a plain object) so repeated keys —
    // e.g. multiple checked boxes sharing the same field name — are each
    // preserved as their own entry instead of the last one overwriting the
    // rest. Netlify Forms collects same-name fields like this into an array.
    // form-name is already present via the form's hidden input, so it
    // doesn't need to be appended separately here.
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      params.append(key, String(value));
    });

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
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
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-gradient-brand text-on-primary">
                  <FiPhone />
                </span>
                <div>
                  <p className="text-xs text-ink-400">Call Us</p>
                  <p className="font-display font-semibold text-ink-800">{site.phone}</p>
                </div>
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-soft">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-gradient-brand-2 text-on-accent">
                  <FiMail />
                </span>
                <div>
                  <p className="text-xs text-ink-400">Email Us</p>
                  <p className="font-display font-semibold text-ink-800">{site.email}</p>
                </div>
              </a>
              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-soft">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-coral-500 text-on-accent">
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

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {contactPage.formFields.map((field) => {
                    const inputClass =
                      "mt-2 w-full rounded-xl border border-ink-100 px-4 py-3 outline-none transition-colors focus:border-aqua-400";
                    const dynamicOptions =
                      field.dynamicOptionsSource === "services"
                        ? services.map((s) => s.name)
                        : field.dynamicOptionsSource === "cities"
                          ? cities.map((c) => c.name)
                          : field.options || [];

                    return (
                      <div key={field.name} className={field.width === "full" ? "sm:col-span-2" : undefined}>
                        <label className="text-sm font-semibold text-ink-700" htmlFor={field.name}>
                          {field.label}
                        </label>
                        {field.fieldType === "textarea" ? (
                          <textarea
                            id={field.name}
                            name={field.name}
                            required={field.required}
                            rows={4}
                            className={inputClass}
                            placeholder={field.placeholder}
                          />
                        ) : field.fieldType === "select" ? (
                          <div>
                            <select
                              id={field.name}
                              name={field.name}
                              required={field.required}
                              className={inputClass}
                              onChange={(e) =>
                                setOtherSelected((prev) => ({ ...prev, [field.name]: e.target.value === "Other" }))
                              }
                            >
                              {dynamicOptions.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                              <option value="Other">Other</option>
                            </select>
                            {/* Always rendered (see the matching note on the
                                multiselect "Other" input below) so Netlify's
                                static form-field scan picks it up. */}
                            <input
                              name={`${field.name}Other`}
                              type="text"
                              placeholder="Please specify..."
                              className={`${inputClass} ${otherSelected[field.name] ? "" : "hidden"}`}
                            />
                          </div>
                        ) : field.fieldType === "multiselect" ? (
                          <div className="mt-2 space-y-3">
                            {/* Netlify Forms only collects same-named fields as
                                a list when the name carries the "[]" array
                                suffix — without it, only the last checked box
                                survives into the submission and any email
                                notification. */}
                            <div className="flex flex-wrap gap-2">
                              {dynamicOptions.map((opt) => (
                                <label
                                  key={opt}
                                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-ink-100 px-3 py-2 text-sm text-ink-600 transition-colors has-[:checked]:border-aqua-400 has-[:checked]:bg-aqua-50 has-[:checked]:text-aqua-700"
                                >
                                  <input
                                    type="checkbox"
                                    name={`${field.name}[]`}
                                    value={opt}
                                    className="h-4 w-4 accent-aqua-500"
                                  />
                                  {opt}
                                </label>
                              ))}
                              <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-ink-100 px-3 py-2 text-sm text-ink-600 transition-colors has-[:checked]:border-aqua-400 has-[:checked]:bg-aqua-50 has-[:checked]:text-aqua-700">
                                <input
                                  type="checkbox"
                                  name={`${field.name}[]`}
                                  value="Other"
                                  checked={!!otherChecked[field.name]}
                                  onChange={(e) =>
                                    setOtherChecked((prev) => ({ ...prev, [field.name]: e.target.checked }))
                                  }
                                  className="h-4 w-4 accent-aqua-500"
                                />
                                Other
                              </label>
                            </div>
                            {/* Always rendered (visibility toggled via CSS, not
                                mount/unmount) so Netlify's build-time form-field
                                scanner — which only reads the static HTML, not
                                post-hydration DOM changes — picks up this field
                                name even though most visitors never reveal it. */}
                            <input
                              name={`${field.name}Other`}
                              type="text"
                              placeholder="Tell us what you need..."
                              className={`${inputClass} mt-0 ${otherChecked[field.name] ? "" : "hidden"}`}
                            />
                          </div>
                        ) : (
                          <input
                            id={field.name}
                            name={field.name}
                            type={field.fieldType}
                            required={field.required}
                            className={inputClass}
                            placeholder={field.placeholder}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <Button type="submit" className="w-full" size="sm" icon={<FiSend />} disabled={submitting}>
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
    title="Free Estimate | Contact ClearPeak Exterior"
    description="Get a free, no-obligation exterior cleaning estimate from ClearPeak Exterior. We respond within one business hour."
    pathname="/contact"
  />
);
