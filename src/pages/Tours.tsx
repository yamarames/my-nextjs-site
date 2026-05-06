import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Star, Clock, Users, ArrowRight, Filter, ArrowUpRight } from "lucide-react";
import { tours, type Tour } from "@/data/tours";

const categories = [
  { id: "all", label: "All Tours" },
  { id: "beach", label: "Beach" },
  { id: "culture", label: "Culture" },
  { id: "adventure", label: "Adventure" },
  { id: "wildlife", label: "Wildlife" },
  { id: "food", label: "Food" },
];

export default function Tours() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTours = activeCategory === "all"
    ? tours
    : tours.filter((t) => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-sand">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[450px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1920&q=80"
          alt="Zanzibar Tours"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/35 to-charcoal/80" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-amber font-semibold text-[11px] tracking-[0.2em] uppercase mb-4 block">
                Daily Excursions
              </span>
              <h1 className="font-display text-[clamp(3rem,7vw,5.5rem)] text-white mb-5 tracking-tight leading-[1.05]">
                Zanzibar Tours
              </h1>
              <p className="text-lg text-white/60 max-w-xl leading-relaxed font-light">
                From spice plantations to pristine reefs, discover the magic of
                Zanzibar with our curated daily experiences.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-2.5 mb-14"
          >
            <Filter className="w-4 h-4 text-warm-gray mr-2 mt-3" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-500 ${
                  activeCategory === cat.id
                    ? "bg-teal text-white shadow-lg shadow-teal/20"
                    : "bg-white text-warm-gray hover:bg-teal/[0.06] hover:text-teal"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Tours Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredTours.map((tour: Tour, i: number) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    to={`/tours/${tour.id}`}
                    className="group block bg-white rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:shadow-charcoal/8 transition-all duration-700"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3.5 py-1.5 bg-white/90 backdrop-blur-xl rounded-full text-[11px] font-semibold text-charcoal tracking-wide capitalize">
                          {tour.category}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="px-3.5 py-1.5 bg-teal/90 backdrop-blur-xl rounded-full text-[11px] font-semibold text-white tracking-wide">
                          {tour.duration}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                          <ArrowUpRight className="w-4 h-4 text-charcoal" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-1.5 text-amber mb-2.5">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-sm font-semibold">
                          {tour.rating}
                        </span>
                        <span className="text-[11px] text-warm-gray">
                          ({tour.reviewCount} reviews)
                        </span>
                      </div>
                      <h3 className="font-display text-xl text-charcoal mb-2 group-hover:text-teal transition-colors duration-500 tracking-tight">
                        {tour.title}
                      </h3>
                      <p className="text-[13px] text-warm-gray leading-[1.75] mb-5 line-clamp-2">
                        {tour.description}
                      </p>
                      <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                        <div className="flex items-center gap-5 text-[12px] text-warm-gray">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            {tour.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5" />
                            Max {tour.maxGroupSize}
                          </span>
                        </div>
                        <div className="font-semibold text-teal text-lg">
                          ${tour.price}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-teal relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
        </div>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display text-3xl sm:text-4xl text-white mb-5 tracking-tight">
              Can't Decide Which Tour?
            </h2>
            <p className="text-white/60 mb-10 max-w-lg mx-auto leading-relaxed font-light">
              Let our local experts help you craft the perfect Zanzibar
              experience tailored to your interests and schedule.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2.5 px-8 py-4 bg-amber text-charcoal rounded-2xl font-semibold text-sm tracking-wide hover:bg-gold transition-all duration-500 hover:shadow-xl hover:shadow-amber/25 hover:-translate-y-0.5"
            >
              Get Personalized Recommendations
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
