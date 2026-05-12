import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { name: "Safaris", path: "/safaris" },
  { name: "Tours", path: "/tours" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = "";
  }, [location]);

  const toggleMenu = () => {
    setIsOpen((v) => {
      document.body.style.overflow = !v ? "hidden" : "";
      return !v;
    });
  };

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="section-container flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 z-[60]">
            <div
              className={`w-9 h-9 flex items-center justify-center font-bold text-lg font-display transition-colors duration-500 rounded-lg ${
                scrolled || isOpen ? "bg-charcoal text-white" : "bg-white text-charcoal"
              }`}
            >
              Z
            </div>
            <span
              className={`font-display text-2xl font-semibold tracking-tight transition-colors duration-500 ${
                scrolled || isOpen ? "text-charcoal" : "text-white"
              }`}
            >
              Zan<span className="italic font-light">Trica</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-semibold transition-colors duration-300 relative group ${
                  isActive(link.path)
                    ? scrolled ? "text-amber" : "text-white"
                    : scrolled ? "text-charcoal/60 hover:text-charcoal" : "text-white/70 hover:text-white"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-amber transition-all duration-300 ${
                    isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
            <Link
              to="/booking"
              className="ml-2 px-5 py-2.5 bg-amber text-white text-sm font-semibold rounded-xl hover:bg-amber/90 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`lg:hidden z-[60] p-2 rounded-lg transition-colors ${
              isOpen || scrolled ? "text-charcoal" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[55] bg-white flex flex-col"
          >
            <div className="flex-1 flex flex-col justify-center px-6 py-24">
              <div className="space-y-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.07 }}
                  >
                    <Link
                      to={link.path}
                      className={`block py-4 text-4xl font-display font-semibold border-b border-gray-100 transition-colors ${
                        isActive(link.path) ? "text-amber" : "text-charcoal hover:text-amber"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-10 space-y-4"
              >
                <Link
                  to="/booking"
                  className="block w-full text-center py-4 bg-amber text-white font-semibold text-lg rounded-xl"
                >
                  Book Now
                </Link>
                <div className="flex items-center justify-center gap-2 text-charcoal/50 text-sm">
                  <Phone className="w-4 h-4" />
                  <span>+255 777 000 000</span>
                </div>
              </motion.div>

              <div className="mt-12 pt-8 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-6 text-sm text-charcoal/60">
                  <div>
                    <p className="font-semibold text-charcoal mb-1">Zanzibar Office</p>
                    <p>Hurumzi St, Stone Town</p>
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal mb-1">Arusha Office</p>
                    <p>Njiro Road, Kijenge</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
