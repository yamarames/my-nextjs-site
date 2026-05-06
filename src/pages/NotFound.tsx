import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-sand flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Compass className="w-10 h-10 text-teal" />
        </div>
        <h1 className="font-display text-6xl text-charcoal mb-2">404</h1>
        <h2 className="font-display text-2xl text-charcoal mb-4">Page Not Found</h2>
        <p className="text-warm-gray mb-8">
          Looks like you've wandered off the trail. Let's get you back on track.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-teal text-white rounded-xl font-semibold hover:bg-deep-forest transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
