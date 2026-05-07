import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Compass, ArrowRight } from "lucide-react";

const navLinks = [
  { name: "Collection", path: "/safaris", label: "01" },
  { name: "Day Trips", path: "/tours", label: "02" },
  { name: "About", path: "/about", label: "03" },
  { name: "Contact", path: "/contact", label: "04" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ${
          scrolled ? "bg-white/90 backdrop-blur-xl border-b border-charcoal/5 py-4" : "bg-transparent py-8"
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-6 sm:px-12 flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-4 relative z-[60] hover-trigger">
            <div className="w-10 h-10 bg-charcoal text-white flex items-center justify-center font-bold text-lg rotate-45 group-hover:rotate-0 transition-transform duration-700">
              <span className="-rotate-45 group-hover:rotate-0 transition-transform duration-700">Z</span>
            </div>
            <span className={`font-display text-huge !text-3xl tracking-tighter ${!scrolled && !isOpen ? "text-white" : "text-charcoal"} transition-colors duration-700`}>
              Zan<span className="italic font-light">Trica</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-16">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative group text-[10px] font-bold tracking-[0.4em] uppercase hover-trigger ${
                  !scrolled ? "text-white/60 hover:text-white" : "text-charcoal/40 hover:text-charcoal"
                } transition-colors duration-500`}
              >
                <span className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 text-[8px] text-amber italic font-display">
                  {link.label}
                </span>
                {link.name}
              </Link>
            ))}
            <Link to="/booking" className="btn-raw !py-4 !px-10 text-[10px] hover-trigger">
              Inquire
            </Link>
          </div>

          {/* Menu Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-[60] flex items-center gap-6 group hover-trigger"
          >
            <span className={`text-[10px] font-bold tracking-[0.4em] uppercase hidden sm:block ${
              !scrolled && !isOpen ? "text-white/40" : "text-charcoal/40"
            }`}>
              {isOpen ? "Close" : "Menu"}
            </span>
            <div className="relative w-10 h-6 flex flex-col justify-center gap-1.5 overflow-hidden">
              <span className={`w-full h-px transition-all duration-700 ${
                isOpen ? "rotate-45 translate-y-[4px]" : ""
              } ${!scrolled && !isOpen ? "bg-white" : "bg-charcoal"}`} />
              <span className={`w-full h-px transition-all duration-700 ${
                isOpen ? "-rotate-45 -translate-y-[3px]" : ""
              } ${!scrolled && !isOpen ? "bg-white" : "bg-charcoal"}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[55] bg-white flex flex-col lg:flex-row overflow-hidden"
          >
            {/* Massive Background text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
              <span className="text-[15vw] font-display font-bold leading-none italic">MENU</span>
            </div>

            {/* Left: Menu Links */}
            <div className="flex-1 flex flex-col justify-center px-6 sm:px-24 py-32 border-r border-charcoal/5 relative z-10">
              <div className="space-y-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={link.path}
                      className="group flex items-baseline gap-12 hover-trigger"
                    >
                      <span className="font-display text-2xl italic text-amber">{link.label}</span>
                      <span className="font-display text-5xl sm:text-7xl text-charcoal tracking-tighter transition-all duration-1000 group-hover:italic group-hover:translate-x-4">
                        {link.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Featured / Contact Info */}
            <div className="w-full lg:w-1/3 bg-sand/30 p-24 hidden lg:flex flex-col justify-between relative z-10">
              <div className="space-y-32">
                <div>
                  <span className="block text-[10px] font-bold tracking-[0.5em] uppercase text-charcoal/20 mb-12">Boutique Offices</span>
                  <div className="space-y-16">
                    <div>
                      <h4 className="font-display text-4xl mb-6 italic">Zanzibar</h4>
                      <p className="text-base text-charcoal/50 leading-relaxed font-light">
                        Hurumzi St, Stone Town<br />
                        The Spice Island
                      </p>
                    </div>
                    <div>
                      <h4 className="font-display text-4xl mb-6 italic">Arusha</h4>
                      <p className="text-base text-charcoal/50 leading-relaxed font-light">
                        Njiro Road, Kijenge<br />
                        The Safari Capital
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-8">
                   <span className="block text-[10px] font-bold tracking-[0.5em] uppercase text-charcoal/20 mb-12">Social Connect</span>
                   <div className="flex gap-12">
                     {[
                       { name: "Instagram", url: "https://instagram.com/zantrica" },
                       { name: "Facebook", url: "https://facebook.com/zantrica" },
                       { name: "Twitter", url: "https://twitter.com/zantrica" }
                     ].map(s => (
                       <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="text-charcoal hover:text-amber transition-colors font-display text-2xl italic hover-trigger">{s.name}</a>
                     ))}
                   </div>
                </div>
              </div>

              <div className="pt-20 border-t border-charcoal/10">
                <Link to="/booking" className="group flex items-center justify-between text-charcoal hover-trigger">
                  <span className="font-display text-3xl italic">Start Your Story</span>
                  <div className="w-12 h-12 rounded-full border border-charcoal/10 flex items-center justify-center group-hover:bg-charcoal group-hover:text-white transition-all duration-700">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
