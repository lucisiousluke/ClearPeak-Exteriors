import * as React from "react";
import { Link } from "gatsby";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX, FiPhone, FiChevronDown } from "react-icons/fi";
import { Container, Button } from "~/components/ui";
import { navLinks, site } from "~/data/site";
import { services } from "~/data/services";

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/85 backdrop-blur-md shadow-soft" : "bg-transparent"
      }`}
    >
      <Container className="flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-ink-800">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-glow">
            CP
          </span>
          ClearPeak <span className="hidden text-gradient-brand sm:inline">Exteriors</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="flex items-center gap-1 font-semibold text-ink-700 transition-colors hover:text-aqua-600">
              Services <FiChevronDown className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 top-full grid w-[560px] -translate-x-1/2 grid-cols-2 gap-1 rounded-3xl border border-ink-100 bg-white p-4 shadow-lift"
                >
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/services/${s.slug}`}
                      className="flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-soft"
                    >
                      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-gradient-brand/10 text-aqua-600">
                        <s.icon size={18} />
                      </span>
                      <span className="text-sm font-semibold text-ink-700">{s.name}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {navLinks
            .filter((l) => l.label !== "Services")
            .map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-semibold text-ink-700 transition-colors hover:text-aqua-600"
              >
                {link.label}
              </Link>
            ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 font-display font-semibold text-ink-700 hover:text-aqua-600"
          >
            <FiPhone /> {site.phone}
          </a>
          <Button as="a" href="/contact" size="sm">
            Get Free Estimate
          </Button>
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-50 text-ink-800 lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <FiMenu size={22} />
        </button>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink-900/40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col gap-6 bg-white p-6 shadow-lift"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-bold">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-50"
                  aria-label="Close menu"
                >
                  <FiX size={20} />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-3 py-3 font-display text-lg font-semibold text-ink-800 hover:bg-soft"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3">
                <a href={site.phoneHref} className="flex items-center justify-center gap-2 font-semibold text-ink-700">
                  <FiPhone /> {site.phone}
                </a>
                <Button as="a" href="/contact">
                  Get Free Estimate
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
