import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Users,
  Star,
  Check,
  X,
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";
import { getTourById } from "@/data/tours";

export default function TourDetail() {
  const { id } = useParams<{ id: string }>();
  const tour = getTourById(id || "");

  if (!tour) {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center pt-[72px]">
        <div className="text-center">
          <h1 className="font-display text-3xl text-charcoal mb-5 tracking-tight">
            Tour Not Found
          </h1>
          <Link
            to="/tours"
            className="text-teal font-semibold inline-flex items-center gap-2 text-sm hover:gap-3 transition-all duration-500"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Tours
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand pt-[72px]">
      {/* Hero Image */}
      <section className="relative h-[65vh] min-h-[520px] overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
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
                to="/tours"
                className="group inline-flex items-center gap-2 text-white/70 hover:text-white text-[13px] mb-7 transition-colors duration-500"
              >
                <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                All Tours
              </Link>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="px-3.5 py-1.5 bg-white/15 backdrop-blur-xl rounded-full text-[11px] font-medium text-white capitalize tracking-wide">
                  {tour.category}
                </span>
                <span className="px-3.5 py-1.5 bg-teal/80 backdrop-blur-xl rounded-full text-[11px] font-medium text-white tracking-wide">
                  {tour.duration}
                </span>
              </div>
              <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] text-white mb-4 tracking-tight leading-[1.05]">
                {tour.title}
              </h1>
              <p className="text-xl text-white/60 max-w-2xl leading-relaxed font-light">
                {tour.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-14">
              {/* Quick Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-8 p-7 bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-teal" />
                  <div>
                    <div className="text-[11px] text-warm-gray font-medium tracking-wide uppercase">
                      Duration
                    </div>
                    <div className="font-semibold text-charcoal text-[15px]">
                      {tour.duration}
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
                      Up to {tour.maxGroupSize}
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
                      {tour.location}
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
                      {tour.rating} ({tour.reviewCount})
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <div>
                <h2 className="font-display text-2xl text-charcoal mb-5 tracking-tight">
                  About This Experience
                </h2>
                <p className="text-warm-gray leading-[1.85] text-[15px]">
                  {tour.longDescription}
                </p>
              </div>

              {/* Highlights */}
              <div>
                <h2 className="font-display text-2xl text-charcoal mb-5 tracking-tight">
                  Highlights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tour.highlights.map((highlight, i) => (
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
                  Itinerary
                </h2>
                <div className="space-y-5">
                  {tour.itinerary.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.05,
                        duration: 0.7,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="flex gap-5"
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-teal/[0.06] flex items-center justify-center">
                          <Clock className="w-4 h-4 text-teal" />
                        </div>
                        {i < tour.itinerary.length - 1 && (
                          <div className="w-px h-full bg-teal/10 mt-3" />
                        )}
                      </div>
                      <div className="pb-8">
                        <span className="text-[13px] font-bold text-teal tracking-wide">
                          {item.time}
                        </span>
                        <p className="text-charcoal mt-1.5 text-[15px] leading-relaxed">
                          {item.activity}
                        </p>
                      </div>
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
                  {tour.gallery.map((img, i) => (
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
                        alt={`${tour.title} ${i + 1}`}
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
                {/* Price Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white rounded-2xl p-7 shadow-lg"
                >
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="font-display text-[40px] font-semibold text-charcoal tracking-tight">
                      ${tour.price}
                    </span>
                    <span className="text-warm-gray text-[13px]">/ person</span>
                  </div>
                  <p className="text-[11px] text-warm-gray mb-7 tracking-wide">
                    Minimum age: {tour.minAge} years
                  </p>
                  <Link
                    to={`/booking?tour=${tour.id}`}
                    className="group block w-full py-4 bg-teal text-white text-center rounded-2xl font-semibold text-sm tracking-wide hover:bg-deep-forest transition-all duration-500 mb-4 hover:shadow-lg hover:shadow-teal/20 hover:-translate-y-px"
                  >
                    Book This Tour
                  </Link>
                  <p className="text-[11px] text-center text-warm-gray tracking-wide">
                    Free cancellation up to 24 hours before
                  </p>
                </motion.div>

                {/* Included */}
                <div className="bg-white rounded-2xl p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <h3 className="font-display text-lg text-charcoal mb-5 tracking-tight">
                    What's Included
                  </h3>
                  <ul className="space-y-3.5">
                    {tour.included.map((item, i) => (
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
                    {tour.notIncluded.map((item, i) => (
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
