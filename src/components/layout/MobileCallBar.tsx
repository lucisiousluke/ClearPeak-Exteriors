import * as React from "react";
import { FiPhone, FiArrowRight } from "react-icons/fi";
import { Link } from "gatsby";
import { site } from "~/data/site";

export const MobileCallBar: React.FC = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-ink-100 bg-white/95 backdrop-blur-md shadow-lift md:hidden">
      <a
        href={site.phoneHref}
        className="flex flex-1 items-center justify-center gap-2 border-r border-ink-100 py-4 font-display font-semibold text-ink-800"
      >
        <FiPhone /> Call Now
      </a>
      <Link
        to="/contact"
        className="flex flex-1 items-center justify-center gap-2 bg-gradient-brand py-4 font-display font-semibold text-on-primary"
      >
        Free Quote <FiArrowRight />
      </Link>
    </div>
  );
};

export default MobileCallBar;
