import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Compass } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Tours", href: "/tours" },
  { label: "Safaris", href: "/safaris" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === "/";

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-sand/90 backdrop-blur-2xl shadow-[0_1px_40px_-12px_rgba(0,0,0,0.08)]"
            : isHome
            ? "bg-transparent"
            : "bg-sand/90 backdrop-blur-2xl"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            <Link to="/" className="flex items-center gap-3 group">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-500 ${
                  scrolled || !isHome
                    ? "bg-teal"
                    : "bg-white/15 backdrop-blur-md border border-white/20"
                }`}
              >
                <Compass
                  className={`w-[18px] h-[18px] text-white transition-transform duration-500 group-hover:rotate-45`}
                />
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-display text-[22px] font-semibold leading-none tracking-tight transition-colors duration-500 ${
                    scrolled || !isHome ? "text-charcoal" : "text-white"
                  }`}
                >
                  ZanTrica
                </span>
                <span
                  className={`text-[9px] font-body tracking-[0.25em] uppercase leading-none mt-0.5 transition-colors duration-500 ${
                    scrolled || !isHome
                      ? "text-warm-gray/70"
                      : "text-white/70"
                  }`}
                >
                  Tours & Safaris
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-4 py-2 text-[13px] font-medium transition-colors duration-300 rounded-lg ${
                    location.pathname === link.href
                      ? scrolled || !isHome
                        ? "text-teal"
                        : "text-white"
                      : scrolled || !isHome
                      ? "text-charcoal/60 hover:text-charcoal hover:bg-charcoal/[0.04]"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                  {location.pathname === link.href && (
                    <motion.div
                      layoutId="nav-indicator"
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                        scrolled || !isHome ? "bg-teal" : "bg-white"
                      }`}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/booking"
                className={`px-5 py-2.5 rounded-xl text-[13px] font-semibold tracking-wide transition-all duration-500 ${
                  scrolled || !isHome
                    ? "bg-teal text-white hover:bg-deep-forest hover:shadow-lg hover:shadow-teal/20 hover:-translate-y-px"
                    : "bg-white/15 backdrop-blur-md text-white hover:bg-white/25 border border-white/20 hover:-translate-y-px"
                }`}
              >
                Book Now
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 ${
                scrolled || !isHome
                  ? "text-charcoal hover:bg-charcoal/5"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-sand"
          >
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="pt-28 px-8"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.06,
                      duration: 0.5,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                  >
                    <Link
                      to={link.href}
                      className={`block py-4 text-3xl font-display border-b border-charcoal/[0.06] transition-colors ${
                        location.pathname === link.href
                          ? "text-teal"
                          : "text-charcoal/80 hover:text-teal"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: navLinks.length * 0.06,
                    duration: 0.5,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  className="pt-6"
                >
                  <Link
                    to="/booking"
                    className="block w-full py-4 text-center bg-teal text-white rounded-2xl text-lg font-semibold tracking-wide hover:bg-deep-forest transition-colors"
                  >
                    Book Your Adventure
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
