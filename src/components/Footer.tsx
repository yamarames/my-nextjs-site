import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, ArrowUpRight } from "lucide-react";

const LINKS = {
  explore: [
    { label: "Zanzibar Tours", path: "/tours" },
    { label: "Tanzania Safaris", path: "/safaris" },
    { label: "Book a Trip", path: "/booking" },
    { label: "Custom Tours", path: "/contact" },
  ],
  company: [
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Reviews", path: "/about#reviews" },
    { label: "FAQ", path: "/contact#faq" },
  ],
};

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-charcoal text-white">
      <div className="section-container pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-14">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-white text-charcoal flex items-center justify-center font-bold text-lg font-display rounded-lg">
                Z
              </div>
              <span className="font-display text-2xl font-semibold tracking-tight text-white">
                Zan<span className="italic font-light">Trica</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Local experts in Zanzibar and Tanzania. We've been guiding travellers
              through the magic of East Africa since 2012.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, label: "Instagram", url: "https://instagram.com/zantrica" },
                { icon: Facebook, label: "Facebook", url: "https://facebook.com/zantrica" },
                { icon: Twitter, label: "Twitter / X", url: "https://twitter.com/zantrica" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white/60 hover:bg-amber hover:text-white transition-all duration-300"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm font-bold text-white/80 uppercase tracking-widest mb-5">Explore</h4>
            <ul className="space-y-3">
              {LINKS.explore.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.path}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold text-white/80 uppercase tracking-widest mb-5">Company</h4>
            <ul className="space-y-3">
              {LINKS.company.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.path}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white/80 uppercase tracking-widest mb-5">Contact Us</h4>
            <div className="space-y-4">
              <a href="tel:+255 651 568 860" className="flex items-start gap-3 text-white/50 hover:text-white transition-colors group">
                <Phone className="w-4 h-4 text-amber shrink-0 mt-0.5" />
                <span className="text-sm">+255 651 568 860</span>
              </a>
              <a href="mailto:info@zantrica.com" className="flex items-start gap-3 text-white/50 hover:text-white transition-colors group">
                <Mail className="w-4 h-4 text-amber shrink-0 mt-0.5" />
                <span className="text-sm">info@zantrica.com</span>
              </a>
              <div className="flex items-start gap-3 text-white/50">
                <MapPin className="w-4 h-4 text-amber shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-white/70 font-medium">Zanzibar</p>
                  <p>Hurumzi St, Stone Town</p>
                  <p className="text-white/70 font-medium mt-2">Arusha</p>
                  <p>Njiro Road, Kijenge</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Zantrica Tours &amp; Safaris. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-white/30 text-xs hover:text-white cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="text-white/30 text-xs hover:text-white cursor-pointer transition-colors">
              Terms of Service
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-white/30 hover:text-white text-xs transition-colors"
            >
              Back to top
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
