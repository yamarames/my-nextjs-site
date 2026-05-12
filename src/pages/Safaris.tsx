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
  ChevronRight,
} from "lucide-react";
import { safaris, Safari } from "@/data/safaris";

const LOCATIONS = [
  { key: "all", label: "All Regions" },
  { key: "north", label: "Northern Tanzania" },
  { key: "south", label: "Southern Tanzania" },
  { key: "west", label: "Western Tanzania" },
];

const DURATIONS = [
  { key: "all", label: "Any Length" },
  { key: "short", label: "1–3 Days" },
  { key: "mid", label: "4–6 Days" },
  { key: "long", label: "7+ Days" },
];

function SafariCard({ safari, index, featured }: { safari: Safari; index: number; featured?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      className={`tour-card group ${featured ? "md:col-span-2 lg:col-span-1" : ""}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
        <img
          src={safari.image}
          alt={safari.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 text-charcoal shadow">
            <Clock className="w-3 h-3" />
            {safari.duration}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 rounded-full px-2.5 py-1 shadow">
          <Star className="w-3 h-3 text-amber fill-amber" />
          <span className="text-xs font-bold text-charcoal">{safari.rating}</span>
          <span className="text-xs text-charcoal/40">({safari.reviewCount})</span>
        </div>
        {/* Parks overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/70 to-transparent p-4">
          <div className="flex flex-wrap gap-1">
            {safari.parks.slice(0, 2).map((park) => (
              <span key={park} className="text-xs text-white/80 bg-white/10 backdrop-blur-sm rounded px-2 py-0.5">
                {park}
              </span>
            ))}
            {safari.parks.length > 2 && (
              <span className="text-xs text-white/60">+{safari.parks.length - 2} more</span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-charcoal/50 mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>{safari.location}</span>
          <span className="mx-1 text-charcoal/20">·</span>
          <Users className="w-3.5 h-3.5" />
          <span>Max {safari.maxGroupSize}</span>
        </div>

        <h3 className="font-display font-semibold text-xl text-charcoal leading-tight mb-2 group-hover:text-amber transition-colors">
          {safari.title}
        </h3>
        <p className="text-sm text-charcoal/60 leading-relaxed mb-4 line-clamp-2">
          {safari.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-1 mb-5">
          {safari.highlights.slice(0, 3).map((h) => (
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
              <span className="text-2xl font-bold text-charcoal font-display">
                ${safari.price.toLocaleString()}
              </span>
              <span className="text-xs text-charcoal/50">/ person</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/safaris/${safari.id}`}
              className="px-3 py-2 border border-gray-200 text-charcoal/70 text-xs font-semibold rounded-lg hover:border-charcoal transition-colors"
            >
              Details
            </Link>
            <Link
              to={`/booking?safari=${safari.id}`}
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

export default function Safaris() {
  const [activeLocation, setActiveLocation] = useState("all");
  const [activeDuration, setActiveDuration] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = safaris.filter((s) => {
    const matchLoc =
      activeLocation === "all" ||
      (activeLocation === "north" && s.location.toLowerCase().includes("northern")) ||
      (activeLocation === "south" && s.location.toLowerCase().includes("southern")) ||
      (activeLocation === "west" && s.location.toLowerCase().includes("western"));
    const matchSearch =
      !search ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.location.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    const matchDur =
      activeDuration === "all" ||
      (activeDuration === "short" && s.durationDays <= 3) ||
      (activeDuration === "mid" && s.durationDays >= 4 && s.durationDays <= 6) ||
      (activeDuration === "long" && s.durationDays >= 7);
    return matchLoc && matchSearch && matchDur;
  });

  const featured = safaris.filter((s) => s.featured).slice(0, 1)[0];

  return (
    <div className="min-h-screen bg-white">
      {/* ── HERO ── */}
      <section className="relative h-80 sm:h-[28rem] flex items-end overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1800&q=80"
            alt="Tanzania Safari"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
        </div>
        <div className="section-container relative z-10 pb-12 pt-24">
          <span className="section-label text-amber mb-3 block">Tanzania</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-white leading-tight">
            Safari Packages
          </h1>
          <p className="text-white/70 text-base sm:text-lg mt-3 max-w-xl">
            {safaris.length} expertly crafted multi-day safaris. Serengeti, Ngorongoro,
            Kilimanjaro, and more—all fully inclusive with luxury camps.
          </p>
        </div>
      </section>

      {/* ── FEATURED SAFARI ── */}
      {featured && (
        <section className="py-14 bg-sand/30">
          <div className="section-container">
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-5 h-5 text-amber fill-amber" />
              <span className="text-sm font-bold text-charcoal/60 uppercase tracking-widest">
                Editor's Choice
              </span>
            </div>
            <Link to={`/safaris/${featured.id}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-500">
              <div className="relative overflow-hidden aspect-video lg:aspect-auto min-h-72">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/40 to-transparent" />
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="badge-amber">Most Popular</span>
                  <span className="flex items-center gap-1 text-sm text-charcoal/50">
                    <Star className="w-3.5 h-3.5 text-amber fill-amber" />
                    {featured.rating} ({featured.reviewCount} reviews)
                  </span>
                </div>
                <h2 className="font-display font-semibold text-3xl sm:text-4xl text-charcoal mb-3 group-hover:text-amber transition-colors">
                  {featured.title}
                </h2>
                <p className="text-charcoal/60 text-base leading-relaxed mb-6">
                  {featured.description}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-charcoal/60 mb-8">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber" /> {featured.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber" /> {featured.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-amber" /> Max {featured.maxGroupSize} guests
                  </span>
                </div>
                <div className="flex items-center gap-6 pt-6 border-t border-gray-100">
                  <div>
                    <span className="text-xs text-charcoal/40 block">From</span>
                    <span className="text-3xl font-bold text-charcoal font-display">
                      ${featured.price.toLocaleString()}
                      <span className="text-base font-normal text-charcoal/50"> /person</span>
                    </span>
                  </div>
                  <Link
                    to={`/booking?safari=${featured.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="btn-primary"
                  >
                    Book Now
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ── FILTERS ── */}
      <section className="sticky top-14 sm:top-[60px] z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="section-container py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30" />
              <input
                type="text"
                placeholder="Search safaris..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber"
              />
            </div>
            {/* Location tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc.key}
                  onClick={() => setActiveLocation(loc.key)}
                  className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    activeLocation === loc.key
                      ? "bg-amber text-white shadow-sm"
                      : "bg-gray-100 text-charcoal/60 hover:bg-gray-200"
                  }`}
                >
                  {loc.label}
                </button>
              ))}
            </div>
            {/* Duration */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {DURATIONS.map((d) => (
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

      {/* ── SAFARI GRID ── */}
      <section className="py-12 bg-sand/20">
        <div className="section-container">
          <div className="flex items-center justify-between mb-8">
            <p className="text-charcoal/60 text-sm">
              <span className="font-semibold text-charcoal">{filtered.length}</span> safari
              {filtered.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-charcoal/40 text-xl font-display mb-3">No safaris match your filters</p>
              <button
                onClick={() => { setActiveLocation("all"); setSearch(""); setActiveDuration("all"); }}
                className="btn-outline mt-4"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((safari, i) => (
                <SafariCard key={safari.id} safari={safari} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CUSTOM SAFARI CTA ── */}
      <section className="py-16 bg-charcoal">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row items-center gap-10 justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-semibold text-white mb-3">
                Want a custom itinerary?
              </h2>
              <p className="text-white/60 text-base max-w-xl">
                Our safari specialists design tailor-made journeys for families, honeymoons,
                and special events. Private vehicles, exclusive camps, and your own pace.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link to="/contact" className="btn-primary text-base px-8 py-4">
                Plan My Safari
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/booking" className="btn-outline-white text-base px-8 py-4">
                Book a Package
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
