import { Link } from "react-router-dom";
import {
  Compass,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  ArrowUp,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-charcoal text-white/70 relative overflow-hidden">
      {/* Subtle top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-lg bg-teal flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                <Compass className="w-[18px] h-[18px] text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-[22px] font-semibold text-white leading-none tracking-tight">
                  ZanTrica
                </span>
                <span className="text-[9px] font-body tracking-[0.25em] uppercase text-white/40 leading-none mt-0.5">
                  Tours & Safaris
                </span>
              </div>
            </Link>
            <p className="text-sm leading-[1.75] text-white/45 max-w-xs">
              Crafting unforgettable journeys through Zanzibar's spice-scented
              alleys and Tanzania's wild heart since 2015. Your adventure begins
              here.
            </p>
            <div className="flex gap-2.5">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center hover:bg-teal transition-all duration-500 group"
                >
                  <social.icon className="w-[15px] h-[15px] text-white/50 group-hover:text-white transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="font-display text-lg text-white mb-6 tracking-wide">
              Navigate
            </h4>
            <ul className="space-y-3.5">
              {[
                { label: "Home", href: "/" },
                { label: "Zanzibar Tours", href: "/tours" },
                { label: "Tanzania Safaris", href: "/safaris" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-white/45 hover:text-amber transition-colors duration-300"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-px translate-x-px group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Experiences */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-lg text-white mb-6 tracking-wide">
              Experiences
            </h4>
            <ul className="space-y-3.5">
              {[
                "Spice Tour",
                "Mnemba Snorkeling",
                "Serengeti Migration",
                "Kilimanjaro Trek",
                "Sunset Dhow Cruise",
              ].map((item) => (
                <li key={item}>
                  <span className="text-sm text-white/45 hover:text-amber transition-colors duration-300 cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-lg text-white mb-6 tracking-wide">
              Contact Us
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber mt-0.5 shrink-0" />
                <span className="text-sm text-white/45 leading-relaxed">
                  123 Kenyatta Road, Stone Town
                  <br />
                  Zanzibar, Tanzania
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber shrink-0" />
                <a
                  href="tel:+255123456789"
                  className="text-sm text-white/45 hover:text-amber transition-colors duration-300"
                >
                  +255 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber shrink-0" />
                <a
                  href="mailto:hello@zantrica.com"
                  className="text-sm text-white/45 hover:text-amber transition-colors duration-300"
                >
                  hello@zantrica.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/25 tracking-wide">
            &copy; {new Date().getFullYear()} ZanTrica Tours & Safaris. All
            rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.92 }}
            className="w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center hover:bg-teal transition-colors duration-500 group"
          >
            <ArrowUp className="w-4 h-4 text-white/40 group-hover:text-white transition-colors duration-300" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
