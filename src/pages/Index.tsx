import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Compass,
  MapPin,
  Calendar,
  Users,
  Star,
  ArrowRight,
  Shield,
  Heart,
  Award,
  Clock,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { getFeaturedTours } from "@/data/tours";
import { getFeaturedSafaris, type Safari } from "@/data/safaris";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative h-screen min-h-[750px] overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80"
          alt="Tanzania Safari"
          className="w-full h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/30 to-charcoal/85" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative h-full flex items-center"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] text-white/80 text-[13px] font-medium tracking-wide mb-10"
            >
              <Compass className="w-4 h-4" />
              <span>Discover the Heart of East Africa</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(3rem,8vw,6.5rem)] text-white leading-[1.05] mb-8 tracking-tight"
            >
              Where Every Journey
              <span className="block text-amber italic font-light">
                Tells a Story
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-white/65 leading-relaxed mb-12 max-w-xl font-light"
            >
              From Zanzibar's spice-scented alleys to the Serengeti's endless
              plains, we craft unforgettable adventures that connect you with the
              soul of Tanzania.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/tours"
                className="group inline-flex items-center gap-2.5 px-8 py-4 bg-amber text-charcoal rounded-2xl font-semibold text-sm tracking-wide hover:bg-gold transition-all duration-500 hover:shadow-2xl hover:shadow-amber/25 hover:-translate-y-0.5"
              >
                Explore Tours
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/safaris"
                className="group inline-flex items-center gap-2.5 px-8 py-4 bg-white/[0.08] backdrop-blur-xl text-white rounded-2xl font-semibold text-sm tracking-wide border border-white/[0.15] hover:bg-white/[0.15] transition-all duration-500"
              >
                Safari Adventures
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[11px] text-white/40 tracking-[0.2em] uppercase font-medium">
            Scroll
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1 rounded-full bg-white/60"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { icon: Calendar, value: "2,500+", label: "Tours Hosted" },
    { icon: Users, value: "15,000+", label: "Happy Travelers" },
    { icon: Star, value: "4.9", label: "Average Rating" },
    { icon: Award, value: "9 Years", label: "Of Excellence" },
  ];

  return (
    <section className="py-16 bg-teal relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-amber rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
      </div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.1,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-center"
            >
              <stat.icon className="w-5 h-5 text-amber/80 mx-auto mb-4" />
              <div className="font-display text-3xl sm:text-4xl text-white font-semibold tracking-tight">
                {stat.value}
              </div>
              <div className="text-[13px] text-white/50 mt-1.5 tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedTours() {
  const featuredTours = getFeaturedTours().slice(0, 4);

  return (
    <section className="py-28 bg-sand relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-20">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-teal font-semibold text-[11px] tracking-[0.2em] uppercase mb-4 block"
            >
              Featured Experiences
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.1,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-display text-[clamp(2.5rem,5vw,3.5rem)] text-charcoal tracking-tight"
            >
              Discover Zanzibar
            </motion.h2>
          </div>
          <Link
            to="/tours"
            className="group inline-flex items-center gap-2 text-teal font-semibold text-sm hover:gap-3 transition-all duration-500"
          >
            View All Tours
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {featuredTours.map((tour, i) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.1,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link to={`/tours/${tour.id}`} className="group block">
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-5">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1.5 bg-white/90 backdrop-blur-xl rounded-full text-[11px] font-semibold text-charcoal tracking-wide">
                      {tour.duration}
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="flex items-center gap-1.5 text-amber mb-2">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-sm font-semibold text-white">
                        {tour.rating}
                      </span>
                      <span className="text-[11px] text-white/60">
                        ({tour.reviewCount})
                      </span>
                    </div>
                    <h3 className="font-display text-xl text-white leading-tight group-hover:text-amber transition-colors duration-500">
                      {tour.title}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5 text-warm-gray text-[13px]">
                    <MapPin className="w-3.5 h-3.5" />
                    {tour.location}
                  </div>
                  <div className="font-semibold text-teal text-[15px]">
                    ${tour.price}
                    <span className="text-warm-gray text-[13px] font-normal ml-0.5">
                      /pp
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedSafaris() {
  const featuredSafaris = getFeaturedSafaris().slice(0, 3);

  return (
    <section className="py-28 bg-cream relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-20">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-coral font-semibold text-[11px] tracking-[0.2em] uppercase mb-4 block"
            >
              Wild Adventures
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.1,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-display text-[clamp(2.5rem,5vw,3.5rem)] text-charcoal tracking-tight"
            >
              Tanzania Safaris
            </motion.h2>
          </div>
          <Link
            to="/safaris"
            className="group inline-flex items-center gap-2 text-coral font-semibold text-sm hover:gap-3 transition-all duration-500"
          >
            View All Safaris
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {featuredSafaris.map((safari: Safari, i: number) => (
            <motion.div
              key={safari.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.15,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={i === 0 ? "lg:col-span-2" : ""}
            >
              <Link to={`/safaris/${safari.id}`} className="group block">
                <div
                  className={`relative overflow-hidden rounded-2xl ${
                    i === 0 ? "aspect-[16/9]" : "aspect-[4/5]"
                  } mb-5`}
                >
                  <img
                    src={safari.image}
                    alt={safari.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/15 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3.5 py-1.5 bg-coral/90 backdrop-blur-xl rounded-full text-[11px] font-semibold text-white tracking-wide">
                      {safari.duration}
                    </span>
                    {safari.parks.slice(0, 2).map((park) => (
                      <span
                        key={park}
                        className="px-3.5 py-1.5 bg-white/15 backdrop-blur-xl rounded-full text-[11px] font-medium text-white tracking-wide"
                      >
                        {park.split(" ")[0]}
                      </span>
                    ))}
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="flex items-center gap-1.5 text-amber mb-2">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-sm font-semibold text-white">
                        {safari.rating}
                      </span>
                      <span className="text-[11px] text-white/60">
                        ({safari.reviewCount} reviews)
                      </span>
                    </div>
                    <h3
                      className={`font-display text-white leading-tight group-hover:text-amber transition-colors duration-500 ${
                        i === 0
                          ? "text-2xl sm:text-3xl"
                          : "text-xl"
                      }`}
                    >
                      {safari.title}
                    </h3>
                    <p className="text-white/60 text-[13px] mt-2 line-clamp-2 max-w-lg leading-relaxed">
                      {safari.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const features = [
    {
      icon: Shield,
      title: "Licensed & Insured",
      description:
        "Fully licensed by the Tanzania Tourist Board with comprehensive travel insurance for all guests.",
    },
    {
      icon: Heart,
      title: "Local Expertise",
      description:
        "Our guides are born and raised here. They know every secret spot, hidden trail, and the best time to visit.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description:
        "From the moment you book until you return home, our team is available around the clock.",
    },
    {
      icon: Award,
      title: "Award Winning",
      description:
        "Voted Best Tour Operator in Zanzibar 2023 & 2024 by the Tanzania Tourism Council.",
    },
  ];

  return (
    <section className="py-28 bg-sand relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-teal font-semibold text-[11px] tracking-[0.2em] uppercase mb-4 block">
              Why Travel With Us
            </span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] text-charcoal mb-8 tracking-tight leading-[1.1]">
              A Team Born from
              <span className="block text-amber italic font-light mt-1">
                Passion & Place
              </span>
            </h2>
            <p className="text-warm-gray leading-[1.8] mb-12 text-[15px]">
              We didn't just start a tour company—we opened our home. Every
              guide, every route, every meal recommendation comes from a lifetime
              of loving this land. When you travel with ZanTrica, you're not a
              tourist. You're our guest.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group"
                >
                  <div className="w-11 h-11 rounded-xl bg-teal/[0.07] flex items-center justify-center mb-4 group-hover:bg-teal transition-all duration-500">
                    <feature.icon className="w-[18px] h-[18px] text-teal group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="font-display text-lg text-charcoal mb-2 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-[13px] text-warm-gray leading-[1.75]">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80"
                alt="Zanzibar Experience"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-7 shadow-2xl shadow-charcoal/10 max-w-[260px]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-teal/10 border-2 border-white flex items-center justify-center"
                    >
                      <Users className="w-3 h-3 text-teal" />
                    </div>
                  ))}
                </div>
                <span className="text-sm font-semibold text-charcoal">
                  2,500+ guests
                </span>
              </div>
              <p className="text-[12px] text-warm-gray leading-relaxed">
                Trusted by travelers from over 45 countries worldwide
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      text: "ZanTrica transformed our honeymoon into something magical. The sunset dhow cruise was the most romantic evening of our lives, and our guide knew exactly where to find the dolphins.",
      name: "Sarah & James",
      location: "London, UK",
      rating: 5,
    },
    {
      text: "I've been on safaris across Africa, but the Serengeti migration trip with ZanTrica was on another level. The guides' knowledge, the camp's comfort, and the wildlife encounters were unparalleled.",
      name: "Michael Chen",
      location: "Singapore",
      rating: 5,
    },
    {
      text: "The spice tour opened my eyes to a whole new world. Our guide didn't just show us plants—he told us stories of trade, culture, and family that I'll never forget.",
      name: "Elena Rodriguez",
      location: "Barcelona, Spain",
      rating: 5,
    },
  ];

  return (
    <section className="py-28 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute top-1/4 left-1/4 w-[28rem] h-[28rem] bg-teal rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-amber rounded-full blur-[120px]" />
      </div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-amber font-semibold text-[11px] tracking-[0.2em] uppercase mb-4 block"
          >
            Traveler Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.1,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-display text-[clamp(2.5rem,5vw,3.5rem)] text-white tracking-tight"
          >
            What Our Guests Say
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.15,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group bg-white/[0.03] backdrop-blur-sm rounded-2xl p-8 border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-700"
            >
              <div className="flex gap-1 mb-8">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-3.5 h-3.5 text-amber fill-current"
                  />
                ))}
              </div>
              <p className="text-white/70 leading-[1.8] mb-10 text-[14px]">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center">
                  <span className="text-sm font-semibold text-teal">
                    {t.name[0]}
                  </span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">
                    {t.name}
                  </div>
                  <div className="text-white/35 text-[11px] tracking-wide">
                    {t.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
          alt="Zanzibar Beach"
          className="w-full h-[130%] object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/75" />
      </motion.div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] text-white mb-8 tracking-tight leading-[1.1]">
            Your Adventure
            <span className="block italic font-light text-amber mt-1">
              Awaits
            </span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Whether you dream of swimming with dolphins, summiting Kilimanjaro,
            or watching the sunset from a traditional dhow—we'll make it happen.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/booking"
              className="group inline-flex items-center gap-2.5 px-8 py-4 bg-amber text-charcoal rounded-2xl font-semibold text-sm tracking-wide hover:bg-gold transition-all duration-500 hover:shadow-2xl hover:shadow-amber/25 hover:-translate-y-0.5"
            >
              Start Planning
              <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2.5 px-8 py-4 bg-white/[0.08] backdrop-blur-xl text-white rounded-2xl font-semibold text-sm tracking-wide border border-white/[0.15] hover:bg-white/[0.15] transition-all duration-500"
            >
              Get in Touch
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Index() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Hero />
      <StatsBar />
      <FeaturedTours />
      <FeaturedSafaris />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
    </>
  );
}
