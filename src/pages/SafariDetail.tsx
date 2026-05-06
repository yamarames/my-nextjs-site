import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  CalendarDays,
  Users,
  Star,
  Check,
  X,
  ArrowLeft,
  Clock,
} from "lucide-react";
import { getSafariById } from "@/data/safaris";

export default function SafariDetail() {
  const { id } = useParams<{ id: string }>();
  const safari = getSafariById(id || "");

  if (!safari) {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center pt-[72px]">
        <div className="text-center">
          <h1 className="font-display text-3xl text-charcoal mb-5 tracking-tight">
            Safari Not Found
          </h1>
          <Link
            to="/safaris"
            className="text-teal font-semibold inline-flex items-center gap-2 text-sm hover:gap-3 transition-all duration-500"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Safaris
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand pt-[72px]">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[550px] overflow-hidden">
        <img
          src={safari.image}
          alt={safari.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-transparent to-charcoal/80" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to="/safaris"
                className="group inline-flex items-center gap-2 text-white/70 hover:text-white text-[13px] mb-7 transition-colors duration-500"
              >
                <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                All Safaris
              </Link>
              <div className="flex flex-wrap gap-2.5 mb-4">
                {safari.parks.map((park) => (
                  <span
                    key={park}
                    className="px-3.5 py-1.5 bg-teal/80 backdrop-blur-xl rounded-full text-[11px] font-medium text-white tracking-wide"
                  >
                    {park}
                  </span>
                ))}
              </div>
              <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] text-white mb-4 tracking-tight leading-[1.05]">
                {safari.title}
              </h1>
              <p className="text-xl text-white/60 max-w-2xl leading-relaxed font-light">
                {safari.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
            {/* Main */}
            <div className="lg:col-span-2 space-y-14">
              {/* Quick Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-8 p-7 bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
              >
                <div className="flex items-center gap-3">
                  <CalendarDays className="w-5 h-5 text-teal" />
                  <div>
                    <div className="text-[11px] text-warm-gray font-medium tracking-wide uppercase">
                      Duration
                    </div>
                    <div className="font-semibold text-charcoal text-[15px]">
                      {safari.duration}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-teal" />
                  <div>
                    <div className="text-[11px] text-warm-gray font-medium tracking-wide uppercase">
                      Group Size
                    </div>
                    <div className="font-semibold text-charcoal text-[15px]">
                      Up to {safari.maxGroupSize}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-teal" />
                  <div>
                    <div className="text-[11px] text-warm-gray font-medium tracking-wide uppercase">
                      Location
                    </div>
                    <div className="font-semibold text-charcoal text-[15px]">
                      {safari.location}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-amber fill-current" />
                  <div>
                    <div className="text-[11px] text-warm-gray font-medium tracking-wide uppercase">
                      Rating
                    </div>
                    <div className="font-semibold text-charcoal text-[15px]">
                      {safari.rating} ({safari.reviewCount})
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <div>
                <h2 className="font-display text-2xl text-charcoal mb-5 tracking-tight">
                  About This Safari
                </h2>
                <p className="text-warm-gray leading-[1.85] text-[15px]">
                  {safari.longDescription}
                </p>
              </div>

              {/* Highlights */}
              <div>
                <h2 className="font-display text-2xl text-charcoal mb-5 tracking-tight">
                  Safari Highlights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {safari.highlights.map((highlight, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.05,
                        duration: 0.7,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="flex items-start gap-3.5 p-5 bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                    >
                      <div className="w-6 h-6 rounded-full bg-teal/[0.06] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-teal" />
                      </div>
                      <span className="text-[14px] text-charcoal leading-relaxed">
                        {highlight}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div>
                <h2 className="font-display text-2xl text-charcoal mb-7 tracking-tight">
                  Day-by-Day Itinerary
                </h2>
                <div className="space-y-5">
                  {safari.itinerary.map((day, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.08,
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="bg-white rounded-2xl p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                    >
                      <div className="flex items-center gap-3.5 mb-4">
                        <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center">
                          <span className="text-[13px] font-bold text-white">
                            {day.day}
                          </span>
                        </div>
                        <h3 className="font-display text-lg text-charcoal tracking-tight">
                          {day.title}
                        </h3>
                      </div>
                      <p className="text-warm-gray leading-[1.8] pl-[54px] text-[14px]">
                        {day.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              <div>
                <h2 className="font-display text-2xl text-charcoal mb-6 tracking-tight">
                  Gallery
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {safari.gallery.map((img, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.1,
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="aspect-square rounded-xl overflow-hidden group"
                    >
                      <img
                        src={img}
                        alt={`${safari.title} ${i + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Price */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="bg-white rounded-2xl p-7 shadow-lg"
                >
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="font-display text-[40px] font-semibold text-charcoal tracking-tight">
                      ${safari.price.toLocaleString()}
                    </span>
                    <span className="text-warm-gray text-[13px]">/ person</span>
                  </div>
                  <p className="text-[11px] text-warm-gray mb-7 tracking-wide">
                    Minimum age: {safari.minAge} years
                  </p>
                  <Link
                    to={`/booking?safari=${safari.id}`}
                    className="group block w-full py-4 bg-teal text-white text-center rounded-2xl font-semibold text-sm tracking-wide hover:bg-deep-forest transition-all duration-500 mb-4 hover:shadow-lg hover:shadow-teal/20 hover:-translate-y-px"
                  >
                    Book This Safari
                  </Link>
                  <p className="text-[11px] text-center text-warm-gray tracking-wide">
                    Free cancellation up to 48 hours before
                  </p>
                </motion.div>

                {/* Included */}
                <div className="bg-white rounded-2xl p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <h3 className="font-display text-lg text-charcoal mb-5 tracking-tight">
                    What's Included
                  </h3>
                  <ul className="space-y-3.5">
                    {safari.included.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[13px]">
                        <Check className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                        <span className="text-warm-gray leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Not Included */}
                <div className="bg-white rounded-2xl p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <h3 className="font-display text-lg text-charcoal mb-5 tracking-tight">
                    Not Included
                  </h3>
                  <ul className="space-y-3.5">
                    {safari.notIncluded.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[13px]">
                        <X className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                        <span className="text-warm-gray leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
