import * as React from "react";
import { Link } from "gatsby";
import { FiPhone, FiMail, FiMapPin, FiInstagram, FiFacebook } from "react-icons/fi";
import { Container } from "~/components/ui";
import { site } from "~/data/site";
import { footerDescription, footerColumns, legalLinks } from "~/data/footer";
import logo from "~/images/clearpeak-logo-compact-white.svg";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-ink-800 pt-20 text-white">
      <Container>
        <div className="grid grid-cols-2 gap-10 pb-16 lg:grid-cols-6">
          <div className="col-span-2">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="ClearPeak Exterior" className="h-14 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{footerDescription}</p>
            <div className="mt-6 flex gap-3">
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-gradient-brand hover:text-on-primary"
              >
                <FiFacebook />
              </a>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-gradient-brand hover:text-on-primary"
              >
                <FiInstagram />
              </a>
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.heading}>
              <h4 className="font-display font-semibold text-white/90">{column.heading}</h4>
              <ul className="mt-4 space-y-3 text-sm text-white/60">
                {column.links.map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className="transition-colors hover:text-aqua-400">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

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
          <p>© {new Date().getFullYear()} ClearPeak Exterior. All rights reserved.</p>
          <div className="flex gap-6">
            {legalLinks.map((l) => (
              <Link key={l.href} to={l.href} className="hover:text-white">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
