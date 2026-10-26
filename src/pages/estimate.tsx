import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import clsx from "clsx";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheck, FiInfo, FiPhone } from "react-icons/fi";
import Layout from "~/components/layout/Layout";
import SEO from "~/components/shared/SEO";
import { Badge, Button, Container } from "~/components/ui";
import { services } from "~/data/services";
import { estimatePage } from "~/data/estimatePage";
import { site } from "~/data/site";
import type { Service, ServiceEstimate } from "~/types";

type PricedService = Service & { estimate: ServiceEstimate };
type Stories = 1 | 2 | 3;
type Condition = "light" | "moderate" | "heavy";

const pricedServices = services.filter((s): s is PricedService => Boolean(s.estimate) && !s.customQuote);

const STORY_OPTIONS: { value: Stories; label: string }[] = [
  { value: 1, label: "1 Story" },
  { value: 2, label: "2 Stories" },
  { value: 3, label: "3+ Stories" },
];

const CONDITION_OPTIONS: { value: Condition; label: string; hint: string }[] = [
  { value: "light", label: "Light", hint: "Dust, light dirt" },
  { value: "moderate", label: "Moderate", hint: "Some green or dark spots" },
  { value: "heavy", label: "Heavy", hint: "Thick growth, years since cleaned" },
];

const DEFAULT_HOME_SQFT = 2000;

const unitLabel = (basis: ServiceEstimate["basis"]) => (basis === "linear" ? "linear ft" : "sq ft");

const formatMoney = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

// Parses a number input, treating blank/garbage as 0 so the math never shows NaN.
const toNumber = (value: string) => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

function servicePrice(
  e: ServiceEstimate,
  { homeSqft, size, storyFactor, conditionFactor }: { homeSqft: number; size: number; storyFactor: number; conditionFactor: number }
) {
  let base: number;
  if (e.basis === "homeSize") base = e.rate * homeSqft * storyFactor;
  else if (e.basis === "flat") base = e.rate;
  else base = e.rate * size;
  return Math.max(e.minimum, base * conditionFactor);
}

const SegmentedControl = <T extends string | number>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string; hint?: string }[];
  value: T;
  onChange: (value: T) => void;
}) => (
  <fieldset>
    <legend className="text-sm font-semibold text-ink-700">{label}</legend>
    <div className="mt-2 grid gap-2" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          aria-pressed={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={clsx(
            "rounded-xl border px-3 py-3 text-center text-sm transition-colors",
            value === opt.value
              ? "border-aqua-400 bg-aqua-50 font-semibold text-aqua-700"
              : "border-ink-100 text-ink-600 hover:border-aqua-200"
          )}
        >
          {opt.label}
          {opt.hint && <span className="mt-0.5 block text-xs font-normal text-ink-400">{opt.hint}</span>}
        </button>
      ))}
    </div>
  </fieldset>
);

const inputClass =
  "mt-2 w-full rounded-xl border border-ink-100 px-4 py-3 outline-none transition-colors focus:border-aqua-400";

const EstimatePage: React.FC<PageProps> = () => {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [homeSqft, setHomeSqft] = React.useState(String(DEFAULT_HOME_SQFT));
  const [stories, setStories] = React.useState<Stories>(1);
  const [condition, setCondition] = React.useState<Condition>("light");
  const [sizes, setSizes] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(pricedServices.map((s) => [s.slug, String(s.estimate.typicalSize ?? "")]))
  );

  const toggle = (slug: string) =>
    setSelected((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));

  const chosen = pricedServices.filter((s) => selected.includes(s.slug));
  const needsHomeSize = chosen.some((s) => s.estimate.basis === "homeSize");
  const sizedServices = chosen.filter((s) => s.estimate.basis === "area" || s.estimate.basis === "linear");

  const storyFactor =
    1 +
    (stories === 2 ? estimatePage.twoStoryUpcharge : stories === 3 ? estimatePage.threeStoryUpcharge : 0) / 100;
  const conditionFactor =
    1 +
    (condition === "moderate" ? estimatePage.moderateUpcharge : condition === "heavy" ? estimatePage.heavyUpcharge : 0) /
      100;
  const bundleApplies =
    estimatePage.bundleMinServices > 0 && estimatePage.bundleDiscount > 0 && chosen.length >= estimatePage.bundleMinServices;
  const bundleFactor = bundleApplies ? 1 - estimatePage.bundleDiscount / 100 : 1;

  const subtotal = chosen.reduce(
    (sum, s) =>
      sum +
      servicePrice(s.estimate, {
        homeSqft: toNumber(homeSqft),
        size: toNumber(sizes[s.slug] ?? ""),
        storyFactor,
        conditionFactor,
      }),
    0
  );
  const total = subtotal * bundleFactor;
  // The low end never dips under the services' own minimums, so the range
  // can't contradict the "From $X" starting prices shown elsewhere.
  const floor = chosen.reduce((sum, s) => sum + s.estimate.minimum, 0) * bundleFactor;
  const spread = estimatePage.rangeSpread / 100;
  const low = Math.floor(Math.max(total * (1 - spread), floor) / 10) * 10;
  const high = Math.max(low, Math.ceil((total * (1 + spread)) / 10) * 10);

  // Hands the selections to the contact form so the customer doesn't retype
  // them, and the estimate they saw lands in the quote request.
  const quoteHref = React.useMemo(() => {
    if (!chosen.length) return "/contact";
    const details = [
      `Online estimate: ${formatMoney(low)} – ${formatMoney(high)}`,
      needsHomeSize &&
        `Home: ${toNumber(homeSqft).toLocaleString()} sq ft, ${STORY_OPTIONS.find((o) => o.value === stories)?.label}`,
      `Condition: ${CONDITION_OPTIONS.find((o) => o.value === condition)?.label}`,
      ...sizedServices.map(
        (s) => `${s.name}: ${toNumber(sizes[s.slug] ?? "").toLocaleString()} ${unitLabel(s.estimate.basis)}`
      ),
    ]
      .filter(Boolean)
      .join("\n");
    const params = new URLSearchParams();
    chosen.forEach((s) => params.append("service", s.name));
    params.set("details", details);
    return `/contact?${params.toString()}`;
  }, [chosen, low, high, needsHomeSize, homeSqft, stories, condition, sizedServices, sizes]);

  const headline = estimatePage.headline || "Instant Estimate Calculator";

  return (
    <Layout>
      <section className="relative overflow-hidden bg-soft py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-mesh" />
        <Container className="relative">
          <div className="max-w-3xl">
            <Badge variant="aqua">Free & Instant</Badge>
            <h1 className="mt-6 font-display text-display-md font-bold text-gradient-brand">{headline}</h1>
            {estimatePage.subheadline && (
              <p className="mt-5 text-lg leading-relaxed text-ink-500">{estimatePage.subheadline}</p>
            )}
          </div>

          {pricedServices.length === 0 ? (
            <div className="mt-12 max-w-2xl rounded-4xl bg-white p-8 shadow-lift md:p-10">
              <h2 className="font-display text-2xl font-bold text-ink-800">Online estimates are coming soon</h2>
              <p className="mt-3 text-ink-500">
                In the meantime, we'll put together a free, no-obligation quote for you — usually within one business hour.
              </p>
              <Button as="a" href="/contact" className="mt-6" size="sm" icon={<FiArrowRight />}>
                Get My Free Quote
              </Button>
            </div>
          ) : (
            <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div className="space-y-8">
                <div className="rounded-4xl bg-white p-6 shadow-soft md:p-8">
                  <h2 className="font-display text-xl font-bold text-ink-800">1. Choose your services</h2>
                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {pricedServices.map((s) => {
                      const Icon = s.icon;
                      const isOn = selected.includes(s.slug);
                      return (
                        <button
                          key={s.slug}
                          type="button"
                          aria-pressed={isOn}
                          onClick={() => toggle(s.slug)}
                          className={clsx(
                            "flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors",
                            isOn ? "border-aqua-400 bg-aqua-50" : "border-ink-100 hover:border-aqua-200"
                          )}
                        >
                          <span
                            className={clsx(
                              "flex h-10 w-10 flex-none items-center justify-center rounded-xl",
                              isOn ? "bg-gradient-brand text-on-primary" : "bg-soft text-ink-500"
                            )}
                          >
                            {isOn ? <FiCheck /> : <Icon />}
                          </span>
                          <span className="min-w-0">
                            <span className="block font-display font-semibold text-ink-800">{s.name}</span>
                            {s.startingPrice && (
                              <span className="block text-xs text-ink-400">From {s.startingPrice}</span>
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-4xl bg-white p-6 shadow-soft md:p-8">
                  <h2 className="font-display text-xl font-bold text-ink-800">2. Tell us about your property</h2>
                  <div className="mt-5 space-y-6">
                    {needsHomeSize && (
                      <>
                        <div>
                          <label htmlFor="homeSqft" className="text-sm font-semibold text-ink-700">
                            Home size (finished square feet)
                          </label>
                          <input
                            id="homeSqft"
                            type="number"
                            inputMode="numeric"
                            min={0}
                            step={100}
                            value={homeSqft}
                            onChange={(e) => setHomeSqft(e.target.value)}
                            className={inputClass}
                          />
                          <p className="mt-1.5 text-xs text-ink-400">
                            Not sure? It's usually on Zillow or your county assessor's site.
                          </p>
                        </div>
                        <SegmentedControl label="Stories" options={STORY_OPTIONS} value={stories} onChange={setStories} />
                      </>
                    )}

                    {sizedServices.map((s) => (
                      <div key={s.slug}>
                        <label htmlFor={`size-${s.slug}`} className="text-sm font-semibold text-ink-700">
                          {s.name} — {s.estimate.basis === "linear" ? "length" : "area"} ({unitLabel(s.estimate.basis)})
                        </label>
                        <input
                          id={`size-${s.slug}`}
                          type="number"
                          inputMode="numeric"
                          min={0}
                          step={s.estimate.basis === "linear" ? 10 : 50}
                          value={sizes[s.slug] ?? ""}
                          onChange={(e) => setSizes((prev) => ({ ...prev, [s.slug]: e.target.value }))}
                          className={inputClass}
                        />
                        {s.estimate.sizeHint && <p className="mt-1.5 text-xs text-ink-400">{s.estimate.sizeHint}</p>}
                      </div>
                    ))}

                    <SegmentedControl
                      label="How dirty is it?"
                      options={CONDITION_OPTIONS}
                      value={condition}
                      onChange={setCondition}
                    />
                  </div>
                </div>
              </div>

              <motion.aside
                id="your-estimate"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-4xl bg-white p-6 shadow-lift md:p-8 scroll-mt-24 lg:sticky lg:top-28"
                aria-live="polite"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-ink-400">Your estimate</p>
                {chosen.length === 0 ? (
                  <p className="mt-4 text-ink-500">Pick one or more services to see your price range.</p>
                ) : (
                  <>
                    <p className="mt-3 font-display text-4xl font-bold text-gradient-brand md:text-5xl">
                      {formatMoney(low)} – {formatMoney(high)}
                    </p>
                    <ul className="mt-6 space-y-2">
                      {chosen.map((s) => (
                        <li key={s.slug} className="flex items-center gap-2 text-sm text-ink-600">
                          <FiCheck className="flex-none text-success-600" />
                          {s.name}
                        </li>
                      ))}
                    </ul>
                    {bundleApplies ? (
                      <p className="mt-4 rounded-xl bg-success-50 px-4 py-3 text-sm font-semibold text-success-600">
                        {estimatePage.bundleDiscount}% bundle discount applied
                      </p>
                    ) : (
                      estimatePage.bundleMinServices > 0 &&
                      estimatePage.bundleDiscount > 0 && (
                        <p className="mt-4 rounded-xl bg-soft px-4 py-3 text-sm text-ink-500">
                          Add {estimatePage.bundleMinServices - chosen.length} more service
                          {estimatePage.bundleMinServices - chosen.length === 1 ? "" : "s"} to save{" "}
                          {estimatePage.bundleDiscount}%.
                        </p>
                      )
                    )}
                  </>
                )}

                <Button as="a" href={quoteHref} className="mt-6 w-full" size="sm" icon={<FiArrowRight />}>
                  Get My Exact Quote
                </Button>
                <a
                  href={site.phoneHref}
                  className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-ink-600 hover:text-aqua-600"
                >
                  <FiPhone /> Or call {site.phone}
                </a>

                {estimatePage.disclaimer && (
                  <p className="mt-6 flex gap-2 border-t border-ink-100 pt-5 text-xs leading-relaxed text-ink-400">
                    <FiInfo className="mt-0.5 flex-none" />
                    {estimatePage.disclaimer}
                  </p>
                )}
              </motion.aside>

              {/* On small screens the summary sits below the form, so keep the
                  running total in view while the customer adjusts inputs.
                  Sits above MobileCallBar (bottom bar, hidden from md up). */}
              {chosen.length > 0 && (
                <a
                  href="#your-estimate"
                  className="fixed inset-x-4 bottom-[4.5rem] z-30 flex items-center justify-between rounded-full bg-ink-800 px-5 py-3 text-white shadow-lift md:bottom-4 lg:hidden"
                >
                  <span className="text-sm text-white/70">Your estimate</span>
                  <span className="flex items-center gap-2 font-display font-bold">
                    {formatMoney(low)} – {formatMoney(high)} <FiArrowRight />
                  </span>
                </a>
              )}
            </div>
          )}
        </Container>
      </section>
    </Layout>
  );
};

export default EstimatePage;

export const Head: HeadFC = () => (
  <SEO
    title="Exterior Cleaning Cost Calculator | Denver, CO"
    description="Get an instant price range for house washing, roof cleaning, driveway cleaning and more in the Denver Metro area. No contact info required."
    pathname="/estimate"
  />
);
