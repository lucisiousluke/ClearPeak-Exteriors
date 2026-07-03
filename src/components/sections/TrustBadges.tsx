import * as React from "react";
import { motion } from "framer-motion";
import { FiShield, FiHome, FiThumbsUp, FiStar } from "react-icons/fi";
import { Container, Counter } from "~/components/ui";

const badges = [
  { icon: FiShield, label: "Fully Insured" },
  { icon: FiHome, label: "Locally Owned" },
  { icon: FiThumbsUp, label: "Satisfaction Guaranteed" },
  { icon: FiStar, label: "Five-Star Rated" },
];

const stats = [
  { to: 3200, suffix: "+", label: "Homes Cleaned" },
  { to: 4.9, suffix: "★", label: "Average Rating", decimal: true },
  { to: 10, suffix: "+", label: "Cities Served" },
  { to: 8, suffix: " yrs", label: "In Business" },
];

export const TrustBadges: React.FC = () => {
  return (
    <section className="border-y border-ink-100 bg-white py-12">
      <Container>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {badges.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-center gap-3"
            >
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-gradient-brand/10 text-aqua-600">
                <b.icon size={20} />
              </span>
              <span className="font-display text-sm font-semibold text-ink-700 md:text-base">{b.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-2 gap-8 border-t border-ink-100 pt-14 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <p className="font-display text-4xl font-bold text-gradient-brand md:text-5xl">
                {s.decimal ? (
                  `${s.to}${s.suffix}`
                ) : (
                  <Counter to={s.to} suffix={s.suffix} />
                )}
              </p>
              <p className="mt-2 text-sm font-semibold text-ink-500">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TrustBadges;
