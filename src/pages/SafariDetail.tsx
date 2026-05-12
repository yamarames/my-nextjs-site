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
  Mountain,
} from "lucide-react";
import { getSafariById } from "@/data/safaris";

export default function SafariDetail() {
  const { id } = useParams<{ id: string }>();
  const safari = getSafariById(id || "");

  if (!safari) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-display font-semibold text-charcoal mb-4">Safari Not Found</h1>
          <p className="text-charcoal/60 mb-8">This safari doesn't exist or may have been removed.</p>
          <Link to="/safaris" className="btn-primary">Browse All Safaris</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ── HERO ── */}
      <section className="relative h-[60vh] sm:h-[70vh] bg-charcoal flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={safari.image}
            alt={safari.title}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
        </div>
        <div className="section-container relative z-10 pb-12 pt-24">
          <Link
            to="/safaris"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-semibold mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Safaris
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="badge-white">{safari.duration}</span>
            <div className="flex items-center gap-1 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1">
              <Star className="w-3.5 h-3.5 text-amber fill-amber" />
              <span className="text-white text-sm font-semibold">{safari.rating}</span>
              <span className="text-white/60 text-xs">({safari.reviewCount} reviews)</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-white leading-tight max-w-3xl">
            {safari.title}
          </h1>
          <p className="text-white/70 text-base sm:text-lg mt-3 max-w-2xl">{safari.subtitle}</p>
          {/* Parks */}
          <div className="flex flex-wrap gap-2 mt-4">
            {safari.parks.map((park) => (
              <span key={park} className="text-xs text-white/70 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1">
                {park}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-12 bg-sand/20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* ── LEFT ── */}
            <div className="lg:col-span-8 space-y-10">
              {/* Quick stats */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { icon: Clock, label: "Duration", value: safari.duration },
                  { icon: MapPin, label: "Region", value: safari.location },
                  { icon: Users, label: "Group Size", value: `Max ${safari.maxGroupSize}` },
                  { icon: Mountain, label: "Parks", value: `${safari.parks.length} parks` },
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
                <h2 className="text-2xl font-display font-semibold text-charcoal mb-5">About This Safari</h2>
                <p className="text-charcoal/70 text-base leading-relaxed">{safari.longDescription}</p>
              </div>

              {/* Highlights */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                <h2 className="text-2xl font-display font-semibold text-charcoal mb-6">Safari Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {safari.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-amber/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-amber" />
                      </div>
                      <p className="text-charcoal/80 text-sm">{h}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day-by-Day Itinerary */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                <h2 className="text-2xl font-display font-semibold text-charcoal mb-6">Day-by-Day Itinerary</h2>
                <div className="space-y-0">
                  {safari.itinerary.map((day, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex gap-5 py-5 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex flex-col items-center shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-amber text-white flex items-center justify-center text-sm font-bold shrink-0">
                          {day.day}
                        </div>
                        {i < safari.itinerary.length - 1 && (
                          <div className="w-px flex-1 bg-gray-100 mt-2" />
                        )}
                      </div>
                      <div className="pt-1.5">
                        <h3 className="font-semibold text-charcoal text-base mb-1">{day.title}</h3>
                        <p className="text-charcoal/60 text-sm leading-relaxed">{day.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Included / Not Included */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="font-display font-semibold text-lg text-charcoal mb-4 flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" /> What's Included
                  </h3>
                  <ul className="space-y-2">
                    {safari.included.map((item) => (
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
                    {safari.notIncluded.map((item) => (
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
                  {safari.gallery.map((img, i) => (
                    <div key={i} className={`overflow-hidden rounded-2xl ${i === 0 ? "sm:col-span-2 aspect-video" : "aspect-video"}`}>
                      <img
                        src={img}
                        alt={`${safari.title} gallery ${i + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT: Sidebar ── */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-5">
                {/* Price + Book */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <p className="text-xs text-charcoal/50 mb-1">Price per person</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-charcoal font-display">
                        ${safari.price.toLocaleString()}
                      </span>
                      <span className="text-charcoal/50 text-sm">/ person</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <Star className="w-4 h-4 text-amber fill-amber" />
                      <span className="text-sm font-semibold text-charcoal">{safari.rating}</span>
                      <span className="text-charcoal/40 text-sm">({safari.reviewCount} reviews)</span>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <Link
                      to={`/booking?safari=${safari.id}`}
                      className="w-full btn-primary justify-center py-4 text-base"
                    >
                      Book This Safari
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                      to="/contact"
                      className="w-full btn-outline justify-center py-3.5 text-sm"
                    >
                      Request Custom Quote
                    </Link>
                  </div>
                  <div className="px-6 pb-6 space-y-2">
                    {["All-inclusive pricing", "Expert wildlife guides", "Luxury tented camps", "Free cancellation available"].map((t) => (
                      <div key={t} className="flex items-center gap-2 text-xs text-charcoal/60">
                        <Shield className="w-3.5 h-3.5 text-amber shrink-0" />
                        {t}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
                  <h3 className="font-semibold text-charcoal">Safari Details</h3>
                  {[
                    { label: "Duration", value: safari.duration },
                    { label: "Location", value: safari.location },
                    { label: "Group Size", value: `Max ${safari.maxGroupSize} people` },
                    { label: "Min. Age", value: `${safari.minAge}+ years` },
                    { label: "Parks Visited", value: safari.parks.length.toString() },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between text-sm border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                      <span className="text-charcoal/50">{item.label}</span>
                      <span className="font-semibold text-charcoal text-right max-w-[55%]">{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* Parks list */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <h3 className="font-semibold text-charcoal mb-3">Parks & Reserves</h3>
                  <div className="space-y-2">
                    {safari.parks.map((park) => (
                      <div key={park} className="flex items-center gap-2 text-sm text-charcoal/70">
                        <MapPin className="w-3.5 h-3.5 text-amber shrink-0" />
                        {park}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
