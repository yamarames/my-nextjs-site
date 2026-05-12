import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Star,
  Users,
  Award,
  Clock,
  MapPin,
  ChevronRight,
  Shield,
} from "lucide-react";
import { tours } from "@/data/tours";
import { safaris } from "@/data/safaris";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const CATEGORY_LABELS: Record<string, string> = {
  beach: "Beach",
  culture: "Culture",
  adventure: "Adventure",
  wildlife: "Wildlife",
  food: "Food",
};

export default function Index() {
  const featuredTours = tours.filter((t) => t.featured).slice(0, 4);
  const featuredSafaris = safaris.filter((s) => s.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* ── HERO ── */}
      <section className="relative h-[92vh] flex items-center overflow-hidden bg-charcoal">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-50"
          >
            <source src="/videos/home-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/30 to-charcoal/70" />
        </div>

        <div className="section-container relative z-10 pt-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="max-w-3xl"
          >
            <motion.span variants={fadeUp} className="section-label text-amber/90 mb-4 block">
              Zanzibar &amp; Tanzania
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-semibold text-white leading-[1.05] mb-6"
            >
              Unforgettable <br />
              <span className="italic text-amber">African Adventures</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-white/80 text-lg sm:text-xl leading-relaxed max-w-xl mb-10"
            >
              From spice-scented island tours to Big Five safaris across the Serengeti.
              Book with local experts who know every trail, reef, and sunset spot.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link to="/tours" className="btn-primary text-base px-8 py-4">
                Explore Tours
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/safaris" className="btn-outline-white text-base px-8 py-4">
                View Safaris
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Trust badges */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-charcoal/80 to-transparent py-8">
          <div className="section-container">
            <div className="flex flex-wrap gap-6 sm:gap-10">
              {[
                { icon: Star, label: "4.9 Average Rating", sub: "1,400+ Reviews" },
                { icon: Users, label: "12,000+ Travellers", sub: "Since 2012" },
                { icon: Award, label: "Top Rated Agency", sub: "Tanzania Tourism" },
                { icon: Shield, label: "Secure Booking", sub: "Free Cancellation" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-amber" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{item.label}</p>
                    <p className="text-white/50 text-xs">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="py-20 bg-sand/40">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="section-label mb-3 block">Who We Are</span>
              <h2 className="text-4xl sm:text-5xl font-display font-semibold text-charcoal mb-6 leading-tight">
                Your Local Experts <br />
                <span className="italic text-amber">in East Africa</span>
              </h2>
              <p className="text-charcoal/70 text-base sm:text-lg leading-relaxed mb-6">
                Zantrica was founded by passionate Tanzanians who grew up exploring these
                landscapes. We combine insider knowledge with professional guiding to give
                you authentic, safe, and memorable experiences—whether you're snorkeling
                Mnemba Atoll or tracking lions across the Serengeti.
              </p>
              <p className="text-charcoal/70 text-base leading-relaxed mb-8">
                Every tour and safari is led by certified, English-speaking guides who
                love sharing their home. Small groups, flexible dates, and transparent
                pricing—no surprises.
              </p>
              <Link to="/about" className="btn-outline">
                About Zantrica
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1489493512598-d08130f49bea?w=1200&q=85"
                  alt="Tanzania Safari Guide"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
                <p className="text-3xl font-display font-bold text-charcoal">12+</p>
                <p className="text-sm text-charcoal/60 mt-0.5">Years of experience</p>
              </div>
              <div className="absolute -top-5 -right-5 bg-amber rounded-2xl shadow-xl p-5">
                <p className="text-3xl font-display font-bold text-white">4.9</p>
                <p className="text-sm text-white/80 mt-0.5">Average rating</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURED TOURS ── */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="section-label mb-3 block">Popular Day Trips</span>
              <h2 className="text-4xl sm:text-5xl font-display font-semibold text-charcoal">
                Top Zanzibar Tours
              </h2>
            </div>
            <Link
              to="/tours"
              className="flex items-center gap-2 text-amber font-semibold text-sm hover:underline shrink-0"
            >
              View all tours
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTours.map((tour, i) => (
              <motion.div
                key={tour.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="tour-card group"
              >
                <div className="tour-card-image">
                  <img src={tour.image} alt={tour.title} loading="lazy" />
                  <div className="absolute top-3 left-3">
                    <span className="badge-amber">
                      {CATEGORY_LABELS[tour.category] || tour.category}
                    </span>
                  </div>
                  {tour.rating >= 4.8 && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1">
                      <Star className="w-3 h-3 text-amber fill-amber" />
                      <span className="text-xs font-bold text-charcoal">{tour.rating}</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-3 text-xs text-charcoal/50 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {tour.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {tour.location}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-charcoal leading-tight mb-3 group-hover:text-amber transition-colors">
                    {tour.title}
                  </h3>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <span className="text-xs text-charcoal/40 block">From</span>
                      <span className="text-xl font-bold text-charcoal font-display">
                        ${tour.price}
                        <span className="text-sm font-normal text-charcoal/50"> /person</span>
                      </span>
                    </div>
                    <Link
                      to={`/tours/${tour.id}`}
                      className="px-4 py-2 bg-amber text-white text-sm font-semibold rounded-lg hover:bg-amber/90 transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAFARI BANNER ── */}
      <section className="relative py-24 overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1534177616072-ef7dc12044d2?w=1800&q=85"
            alt="Safari in Tanzania"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-charcoal/60" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-2xl">
            <span className="section-label text-amber mb-4 block">Tanzania Safaris</span>
            <h2 className="text-4xl sm:text-5xl font-display font-semibold text-white mb-6 leading-tight">
              Witness the <span className="italic text-amber">Great Migration</span> and the Big Five
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl">
              Multi-day luxury safari packages to Serengeti, Ngorongoro Crater, Kilimanjaro,
              and beyond. All-inclusive pricing, expert guides, and unforgettable wildlife encounters.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/safaris" className="btn-primary text-base px-8 py-4">
                Explore Safaris
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/booking" className="btn-outline-white text-base px-8 py-4">
                Get a Custom Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED SAFARIS ── */}
      <section className="py-20 bg-sand/30">
        <div className="section-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="section-label mb-3 block">Multi-Day Experiences</span>
              <h2 className="text-4xl sm:text-5xl font-display font-semibold text-charcoal">
                Featured Safaris
              </h2>
            </div>
            <Link
              to="/safaris"
              className="flex items-center gap-2 text-amber font-semibold text-sm hover:underline shrink-0"
            >
              View all safaris
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredSafaris.map((safari, i) => (
              <motion.div
                key={safari.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="tour-card group"
              >
                <div className="tour-card-image" style={{ aspectRatio: "16/10" }}>
                  <img src={safari.image} alt={safari.title} loading="lazy" />
                  <div className="absolute top-3 left-3">
                    <span className="badge-white">{safari.duration}</span>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1">
                    <Star className="w-3 h-3 text-amber fill-amber" />
                    <span className="text-xs font-bold text-charcoal">{safari.rating}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 text-xs text-charcoal/50 mb-2">
                    <MapPin className="w-3 h-3" />
                    <span>{safari.location}</span>
                  </div>
                  <h3 className="font-display font-semibold text-xl text-charcoal leading-tight mb-2 group-hover:text-amber transition-colors">
                    {safari.title}
                  </h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed mb-4 line-clamp-2">
                    {safari.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-xs text-charcoal/40 block">From</span>
                      <span className="text-2xl font-bold text-charcoal font-display">
                        ${safari.price.toLocaleString()}
                        <span className="text-sm font-normal text-charcoal/50"> /person</span>
                      </span>
                    </div>
                    <Link
                      to={`/safaris/${safari.id}`}
                      className="px-4 py-2 bg-amber text-white text-sm font-semibold rounded-lg hover:bg-amber/90 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="text-center mb-14">
            <span className="section-label mb-3 block">Why Zantrica</span>
            <h2 className="text-4xl sm:text-5xl font-display font-semibold text-charcoal">
              Travel the right way
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Local Expertise",
                desc: "Our guides are born and raised in Tanzania. They know the land, the wildlife, and the hidden gems tourists never see.",
              },
              {
                icon: Shield,
                title: "Safe & Reliable",
                desc: "Licensed vehicles, first-aid certified guides, 24/7 support, and comprehensive travel insurance options.",
              },
              {
                icon: Users,
                title: "Small Groups",
                desc: "Max 12 guests per tour for a personal, intimate experience. No crowded buses or rushed itineraries.",
              },
              {
                icon: Star,
                title: "Best Price Guarantee",
                desc: "Transparent, all-inclusive pricing. No hidden fees. If you find a lower price, we'll match it.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center p-6 rounded-2xl bg-sand/40 border border-sand hover:bg-sand/70 transition-colors"
              >
                <div className="w-12 h-12 bg-amber/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-amber" />
                </div>
                <h3 className="font-display font-semibold text-xl text-charcoal mb-3">{item.title}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 bg-amber">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-display font-semibold text-white mb-4">
              Ready to start your adventure?
            </h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-10">
              Browse our tours and safaris, choose your dates, and book online in minutes.
              Our team is ready to help you create the perfect trip.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/booking"
                className="px-10 py-4 bg-white text-amber font-semibold text-base rounded-xl hover:bg-gray-50 transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                Book Your Trip
              </Link>
              <Link
                to="/contact"
                className="px-10 py-4 border-2 border-white text-white font-semibold text-base rounded-xl hover:bg-white hover:text-amber transition-all"
              >
                Ask a Question
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
