import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  MapPin,
  Star,
  Users,
  Search,
  Filter,
} from "lucide-react";
import { tours, Tour } from "@/data/tours";

const CATEGORIES = [
  { key: "all", label: "All Tours" },
  { key: "beach", label: "Beach" },
  { key: "culture", label: "Culture" },
  { key: "adventure", label: "Adventure" },
  { key: "wildlife", label: "Wildlife" },
  { key: "food", label: "Food & Cooking" },
];

const CATEGORY_COLORS: Record<string, string> = {
  beach: "bg-blue-50 text-blue-700",
  culture: "bg-purple-50 text-purple-700",
  adventure: "bg-orange-50 text-orange-700",
  wildlife: "bg-green-50 text-green-700",
  food: "bg-red-50 text-red-700",
};

const DURATION_GROUPS = [
  { key: "all", label: "Any Duration" },
  { key: "short", label: "Under 3 Hours" },
  { key: "half", label: "Half Day" },
  { key: "full", label: "Full Day" },
];

function TourCard({ tour, index }: { tour: Tour; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="tour-card group"
    >
      {/* Image */}
      <div className="tour-card-image">
        <img src={tour.image} alt={tour.title} loading="lazy" />
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
              CATEGORY_COLORS[tour.category] || "bg-gray-100 text-gray-600"
            }`}
          >
            {CATEGORIES.find((c) => c.key === tour.category)?.label || tour.category}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 rounded-full px-2.5 py-1 shadow">
          <Star className="w-3 h-3 text-amber fill-amber" />
          <span className="text-xs font-bold text-charcoal">{tour.rating}</span>
          <span className="text-xs text-charcoal/40">({tour.reviewCount})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-3 text-xs text-charcoal/50 mb-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {tour.duration}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {tour.location}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            Max {tour.maxGroupSize}
          </span>
        </div>

        <h3 className="font-display font-semibold text-xl text-charcoal leading-tight mb-2 group-hover:text-amber transition-colors">
          {tour.title}
        </h3>
        <p className="text-sm text-charcoal/60 leading-relaxed mb-4 line-clamp-2">
          {tour.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-1 mb-4">
          {tour.highlights.slice(0, 2).map((h) => (
            <li key={h} className="flex items-start gap-2 text-xs text-charcoal/60">
              <span className="w-1.5 h-1.5 rounded-full bg-amber mt-1.5 shrink-0" />
              {h}
            </li>
          ))}
        </ul>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-xs text-charcoal/40 block">From</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-charcoal font-display">${tour.price}</span>
              <span className="text-xs text-charcoal/50">/ person</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/tours/${tour.id}`}
              className="px-3 py-2 border border-gray-200 text-charcoal/70 text-xs font-semibold rounded-lg hover:border-charcoal transition-colors"
            >
              Details
            </Link>
            <Link
              to={`/booking?tour=${tour.id}`}
              className="px-4 py-2 bg-amber text-white text-xs font-semibold rounded-lg hover:bg-amber/90 transition-colors"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Tours() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDuration, setActiveDuration] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = tours.filter((t) => {
    const matchCat = activeCategory === "all" || t.category === activeCategory;
    const matchSearch =
      !search ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.location.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    const matchDuration =
      activeDuration === "all" ||
      (activeDuration === "short" && t.durationHours < 3) ||
      (activeDuration === "half" && t.durationHours >= 3 && t.durationHours <= 5) ||
      (activeDuration === "full" && t.durationHours > 5);
    return matchCat && matchSearch && matchDuration;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* ── HERO ── */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-50"
          >
            <source src="/videos/tours-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        </div>
        <div className="section-container relative z-10 pb-12 pt-24">
          <span className="section-label text-amber mb-3 block">Zanzibar Island</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-white leading-tight">
            Day Tours &amp; Excursions
          </h1>
          <p className="text-white/70 text-base sm:text-lg mt-3 max-w-xl">
            {tours.length} hand-picked experiences from spice tours to ocean adventures.
            All include hotel pickup, expert guides, and transparent pricing.
          </p>
        </div>
      </section>

      {/* ── FILTERS ── */}
      <section className="sticky top-14 sm:top-[60px] z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="section-container py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30" />
              <input
                type="text"
                placeholder="Search tours..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber"
              />
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    activeCategory === cat.key
                      ? "bg-amber text-white shadow-sm"
                      : "bg-gray-100 text-charcoal/60 hover:bg-gray-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Duration filter */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar sm:ml-2">
              <Filter className="w-4 h-4 text-charcoal/40 shrink-0" />
              {DURATION_GROUPS.map((d) => (
                <button
                  key={d.key}
                  onClick={() => setActiveDuration(d.key)}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeDuration === d.key
                      ? "bg-charcoal text-white"
                      : "bg-gray-100 text-charcoal/60 hover:bg-gray-200"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section className="py-12 bg-sand/20">
        <div className="section-container">
          <div className="flex items-center justify-between mb-8">
            <p className="text-charcoal/60 text-sm">
              <span className="font-semibold text-charcoal">{filtered.length}</span> tour
              {filtered.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-charcoal/40 text-xl font-display mb-3">No tours match your filters</p>
              <button
                onClick={() => { setActiveCategory("all"); setSearch(""); setActiveDuration("all"); }}
                className="btn-outline mt-4"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((tour, i) => (
                <TourCard key={tour.id} tour={tour} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-charcoal">
        <div className="section-container text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-white mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-white/60 text-base max-w-md mx-auto mb-8">
            We create custom private tours for groups, families, and honeymoons.
            Tell us what you want and we'll make it happen.
          </p>
          <Link to="/contact" className="btn-primary text-base px-8 py-4">
            Request a Custom Tour
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
