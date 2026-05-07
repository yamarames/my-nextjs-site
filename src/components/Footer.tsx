import { Link } from "react-router-dom";
import {
  Compass,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  ArrowUp,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-charcoal text-white/70 relative overflow-hidden pt-32 pb-16">
      {/* Subtle top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />
      
      {/* Massive Background Logo - Subtle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.015] pointer-events-none select-none">
        <span className="text-[12vw] font-display font-bold leading-none italic">ZT</span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-5 space-y-10">
            <Link to="/" className="group flex items-center gap-4 hover-trigger">
              <div className="w-10 h-10 bg-white text-charcoal flex items-center justify-center font-bold text-lg rotate-45 group-hover:rotate-0 transition-transform duration-700">
                <span className="-rotate-45 group-hover:rotate-0 transition-transform duration-700">Z</span>
              </div>
              <span className="font-display text-3xl text-white tracking-tighter">
                Zan<span className="italic font-light">Trica</span>
              </span>
            </Link>
            
            <h4 className="text-2xl text-white/40 font-display italic leading-snug max-w-sm">
              "We strip away the noise of mass tourism to reveal the soul of Tanzania."
            </h4>

            <div className="flex gap-8">
              {[
                { icon: Instagram, label: "Instagram", url: "https://instagram.com/zantrica" },
                { icon: Facebook, label: "Facebook", url: "https://facebook.com/zantrica" },
                { icon: Twitter, label: "Twitter", url: "https://twitter.com/zantrica" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-white/30 hover:text-amber transition-colors duration-500 hover-trigger"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 lg:gap-20">
              <div>
                <span className="block text-[9px] font-bold tracking-[0.4em] uppercase text-white/20 mb-8">Expeditions</span>
                <ul className="space-y-4">
                  {["The Collection", "Private Safaris", "Day Excursions", "The Migration"].map((item) => (
                    <li key={item}>
                      <Link to="/safaris" className="text-white/40 hover:text-white transition-colors font-display text-xl italic hover-trigger">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="block text-[9px] font-bold tracking-[0.4em] uppercase text-white/20 mb-8">Inquiry</span>
                <ul className="space-y-4">
                  {["About Us", "Contact", "Booking Info", "Privacy Policy"].map((item) => (
                    <li key={item}>
                      <Link to="/about" className="text-white/40 hover:text-white transition-colors font-display text-xl italic hover-trigger">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="block text-[9px] font-bold tracking-[0.4em] uppercase text-white/20 mb-8">Offices</span>
                <div className="space-y-6 text-white/40 text-[11px] font-light leading-relaxed uppercase tracking-widest">
                  <p>
                    <span className="block text-amber mb-2 italic font-display normal-case tracking-normal text-sm">Zanzibar</span>
                    Hurumzi St, Stone Town<br />
                    The Spice Island
                  </p>
                  <p>
                    <span className="block text-amber mb-2 italic font-display normal-case tracking-normal text-sm">Arusha</span>
                    Njiro Road, Kijenge<br />
                    The Safari Capital
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-32 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-12">
             <p className="text-[9px] font-bold tracking-[0.4em] text-white/10 uppercase">
              © {new Date().getFullYear()} Zantrica Explorations
            </p>
            <div className="hidden sm:flex gap-10 text-[9px] font-bold tracking-widest text-white/20 uppercase">
              <span className="hover:text-white cursor-pointer transition-colors hover-trigger">English</span>
              <span className="hover:text-white cursor-pointer transition-colors hover-trigger">Swahili</span>
            </div>
          </div>
          
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -5 }}
            className="group flex items-center gap-4 text-white/40 hover:text-white transition-colors hover-trigger"
          >
            <span className="text-[9px] font-bold tracking-[0.4em] uppercase">Back to Top</span>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-charcoal transition-all duration-700">
              <ArrowUp className="w-4 h-4" />
            </div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
