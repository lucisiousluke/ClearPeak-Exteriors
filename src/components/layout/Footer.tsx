import * as React from "react";
import { Link } from "gatsby";
import { FiPhone, FiMail, FiMapPin, FiInstagram, FiFacebook } from "react-icons/fi";
import { Container } from "~/components/ui";
import { site, footerLinks } from "~/data/site";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-ink-800 pt-20 text-white">
      <Container>
        <div className="grid grid-cols-2 gap-10 pb-16 md:grid-cols-5">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-white">
                CP
              </span>
              ClearPeak Exteriors
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Denver Metro's premium exterior cleaning company — pressure washing, soft washing, window cleaning,
              and more.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-gradient-brand"
              >
                <FiFacebook />
              </a>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-gradient-brand"
              >
                <FiInstagram />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white/90">Services</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              {footerLinks.services.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="transition-colors hover:text-aqua-400">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white/90">Service Areas</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              {footerLinks.areas.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="transition-colors hover:text-aqua-400">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white/90">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <FiPhone className="mt-0.5 flex-none" />
                <a href={site.phoneHref} className="transition-colors hover:text-aqua-400">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <FiMail className="mt-0.5 flex-none" />
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-aqua-400">
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <FiMapPin className="mt-0.5 flex-none" />
                <span>
                  {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-sm text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} ClearPeak Exteriors. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
