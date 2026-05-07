import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-6 overflow-hidden relative">
      {/* Background Stencil */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
        <h1 className="text-[25vw] font-display text-white whitespace-nowrap leading-none">LOST</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-center relative z-10"
      >
        <span className="text-amber font-bold text-[10px] tracking-[0.5em] uppercase mb-12 block">Error 404</span>
        <h1 className="text-white text-huge leading-[0.75] tracking-tighter mb-12 italic">
          Off the <br /> <span className="not-italic">Map.</span>
        </h1>
        <p className="text-white/40 text-xl font-light max-w-sm mx-auto leading-relaxed mb-16">
          The coordinate you requested does not exist in our current collection.
        </p>
        <Link to="/" className="group flex items-center justify-center gap-6 text-white">
          <span className="font-display text-3xl border-b border-white pb-2">Return Home</span>
          <div className="w-12 h-12 rounded-full bg-white text-charcoal flex items-center justify-center group-hover:bg-amber transition-all duration-700">
            <MoveRight className="w-6 h-6" />
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
