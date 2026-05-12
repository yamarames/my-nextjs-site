import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Star,
  ArrowLeft,
  Clock,
  Users,
  Check,
  X,
  Calendar,
  ArrowRight,
  Shield,
} from "lucide-react";
import { getTourById } from "@/data/tours";

export default function TourDetail() {
  const { id } = useParams<{ id: string }>();
  const tour = getTourById(id || "");

  if (!tour) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-display font-semibold text-charcoal mb-4">Tour Not Found</h1>
          <p className="text-charcoal/60 mb-8">This tour doesn't exist or may have been removed.</p>
          <Link to="/tours" className="btn-primary">Browse All Tours</Link>
        </div>
      </div>
    );
  }

  const CATEGORY_LABELS: Record<string, string> = {
    beach: "Beach", culture: "Culture", adventure: "Adventure", wildlife: "Wildlife", food: "Food & Cooking",
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ── HERO ── */}
      <section className="relative h-[55vh] sm:h-[65vh] bg-charcoal flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={tour.image}
            alt={tour.title}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
        </div>
        <div className="section-container relative z-10 pb-12 pt-24">
          <Link
            to="/tours"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-semibold mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tours
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="badge-amber">{CATEGORY_LABELS[tour.category] || tour.category}</span>
            <div className="flex items-center gap-1 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1">
              <Star className="w-3.5 h-3.5 text-amber fill-amber" />
              <span className="text-white text-sm font-semibold">{tour.rating}</span>
              <span className="text-white/60 text-xs">({tour.reviewCount} reviews)</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-white leading-tight max-w-3xl">
            {tour.title}
          </h1>
          <p className="text-white/70 text-base sm:text-lg mt-3 max-w-2xl">{tour.subtitle}</p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-12 bg-sand/20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* ── LEFT: Main Info ── */}
            <div className="lg:col-span-8 space-y-10">
              {/* Quick stats */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { icon: Clock, label: "Duration", value: tour.duration },
                  { icon: MapPin, label: "Location", value: tour.location },
                  { icon: Users, label: "Group Size", value: `Max ${tour.maxGroupSize}` },
                  { icon: Calendar, label: "Min Age", value: `${tour.minAge}+ years` },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center mx-auto mb-2">
                      <item.icon className="w-5 h-5 text-amber" />
                    </div>
                    <p className="text-xs text-charcoal/50 mb-1">{item.label}</p>
                    <p className="font-semibold text-charcoal text-sm">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                <h2 className="text-2xl font-display font-semibold text-charcoal mb-5">About This Tour</h2>
                <p className="text-charcoal/70 text-base leading-relaxed">{tour.longDescription}</p>
              </div>

              {/* Highlights */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                <h2 className="text-2xl font-display font-semibold text-charcoal mb-6">Tour Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tour.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-amber/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-amber" />
                      </div>
                      <p className="text-charcoal/80 text-sm">{h}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                <h2 className="text-2xl font-display font-semibold text-charcoal mb-6">Itinerary</h2>
                <div className="space-y-0">
                  {tour.itinerary.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex gap-4 py-4 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-bold text-amber bg-amber/10 rounded-lg px-2 py-1 whitespace-nowrap">
                          {item.time}
                        </span>
                        {i < tour.itinerary.length - 1 && (
                          <div className="w-px flex-1 bg-gray-100 mt-2" />
                        )}
                      </div>
                      <p className="text-charcoal/80 text-sm leading-relaxed pt-1">{item.activity}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* What's included / not included */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="font-display font-semibold text-lg text-charcoal mb-4 flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" /> What's Included
                  </h3>
                  <ul className="space-y-2">
                    {tour.included.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-charcoal/70">
                        <Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="font-display font-semibold text-lg text-charcoal mb-4 flex items-center gap-2">
                    <X className="w-5 h-5 text-red-400" /> Not Included
                  </h3>
                  <ul className="space-y-2">
                    {tour.notIncluded.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-charcoal/60">
                        <X className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Photo Gallery */}
              <div>
                <h2 className="text-2xl font-display font-semibold text-charcoal mb-6">Photo Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tour.gallery.map((img, i) => (
                    <div key={i} className={`overflow-hidden rounded-2xl ${i === 0 ? "sm:col-span-2 aspect-video" : "aspect-video"}`}>
                      <img
                        src={img}
                        alt={`${tour.title} gallery ${i + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT: Booking Sidebar ── */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-5">
                {/* Price card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <p className="text-xs text-charcoal/50 mb-1">Price per person</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-charcoal font-display">${tour.price}</span>
                      <span className="text-charcoal/50 text-sm">/ person</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <Star className="w-4 h-4 text-amber fill-amber" />
                      <span className="text-sm font-semibold text-charcoal">{tour.rating}</span>
                      <span className="text-charcoal/40 text-sm">({tour.reviewCount} reviews)</span>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <Link
                      to={`/booking?tour=${tour.id}`}
                      className="w-full btn-primary justify-center py-4 text-base"
                    >
                      Book This Tour
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                      to="/contact"
                      className="w-full btn-outline justify-center py-3.5 text-sm"
                    >
                      Ask a Question
                    </Link>
                  </div>
                  <div className="px-6 pb-6 space-y-2">
                    {["Hotel pickup & drop-off included", "Expert local guide", "Free cancellation available"].map((t) => (
                      <div key={t} className="flex items-center gap-2 text-xs text-charcoal/60">
                        <Shield className="w-3.5 h-3.5 text-amber shrink-0" />
                        {t}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick details */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
                  <h3 className="font-semibold text-charcoal">Tour Details</h3>
                  {[
                    { label: "Duration", value: tour.duration },
                    { label: "Location", value: tour.location },
                    { label: "Category", value: CATEGORY_LABELS[tour.category] || tour.category },
                    { label: "Group Size", value: `Max ${tour.maxGroupSize} people` },
                    { label: "Min. Age", value: `${tour.minAge} years` },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between text-sm border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                      <span className="text-charcoal/50">{item.label}</span>
                      <span className="font-semibold text-charcoal text-right max-w-[55%]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
