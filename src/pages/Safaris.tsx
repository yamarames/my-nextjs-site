import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Star,
  Users,
  ArrowRight,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";
import { safaris, type Safari } from "@/data/safaris";

export default function Safaris() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-sand">
      {/* Hero */}
      <section className="relative h-[65vh] min-h-[520px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80"
          alt="Tanzania Safaris"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/30 to-charcoal/80" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-amber font-semibold text-[11px] tracking-[0.2em] uppercase mb-4 block">
                Wild Adventures
              </span>
              <h1 className="font-display text-[clamp(3rem,8vw,6.5rem)] text-white mb-5 tracking-tight leading-[1.05]">
                Tanzania Safaris
              </h1>
              <p className="text-lg text-white/60 max-w-2xl leading-relaxed font-light">
                From the Serengeti's endless plains to Ngorongoro's crater floor,
                witness the greatest wildlife show on Earth.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Safari List */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {safaris.map((safari: Safari, i: number) => (
              <motion.div
                key={safari.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  to={`/safaris/${safari.id}`}
                  className="group block"
                  onMouseEnter={() => setHoveredId(safari.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="bg-white rounded-3xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:shadow-charcoal/8 transition-all duration-700">
                    <div className="grid grid-cols-1 lg:grid-cols-5">
                      <div className="lg:col-span-2 relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                        <img
                          src={safari.image}
                          alt={safari.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-charcoal/15 lg:bg-gradient-to-l" />
                        <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                          {safari.parks.slice(0, 2).map((park) => (
                            <span
                              key={park}
                              className="px-3.5 py-1.5 bg-white/90 backdrop-blur-xl rounded-full text-[11px] font-semibold text-charcoal tracking-wide"
                            >
                              {park.split(" ").slice(0, 2).join(" ")}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="lg:col-span-3 p-8 lg:p-10 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 text-amber mb-4">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-semibold">
                              {safari.rating}
                            </span>
                            <span className="text-[11px] text-warm-gray">
                              ({safari.reviewCount} reviews)
                            </span>
                          </div>
                          <h3 className="font-display text-2xl lg:text-[28px] text-charcoal mb-3 group-hover:text-teal transition-colors duration-500 tracking-tight">
                            {safari.title}
                          </h3>
                          <p className="text-warm-gray leading-[1.8] mb-7 text-[14px]">
                            {safari.description}
                          </p>
                          <div className="flex flex-wrap gap-5 mb-2">
                            <span className="flex items-center gap-1.5 text-[13px] text-warm-gray">
                              <CalendarDays className="w-4 h-4 text-teal" />
                              {safari.duration}
                            </span>
                            <span className="flex items-center gap-1.5 text-[13px] text-warm-gray">
                              <Users className="w-4 h-4 text-teal" />
                              Max {safari.maxGroupSize} guests
                            </span>
                            <span className="flex items-center gap-1.5 text-[13px] text-warm-gray">
                              <MapPin className="w-4 h-4 text-teal" />
                              {safari.location}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-7 border-t border-gray-100 mt-4">
                          <div>
                            <span className="text-[32px] font-display font-semibold text-charcoal tracking-tight">
                              ${safari.price.toLocaleString()}
                            </span>
                            <span className="text-warm-gray text-[13px] ml-1.5">
                              per person
                            </span>
                          </div>
                          <span
                            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[13px] tracking-wide transition-all duration-500 ${
                              hoveredId === safari.id
                                ? "bg-teal text-white shadow-lg shadow-teal/20 -translate-y-px"
                                : "bg-teal/[0.06] text-teal"
                            }`}
                          >
                            View Details
                            <ArrowRight
                              className={`w-4 h-4 transition-transform duration-300 ${
                                hoveredId === safari.id
                                  ? "translate-x-0.5"
                                  : ""
                              }`}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-20 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-teal rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-amber rounded-full blur-[100px]" />
        </div>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {[
              {
                icon: CalendarDays,
                title: "Best Time to Visit",
                desc: "June to October for the Great Migration. Year-round for general wildlife.",
              },
              {
                icon: Users,
                title: "Group Sizes",
                desc: "Intimate groups of 4-6 in custom 4x4 vehicles with pop-up roofs.",
              },
              {
                icon: Star,
                title: "All-Inclusive",
                desc: "Accommodation, meals, park fees, and transfers all included in every package.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="p-6"
              >
                <item.icon className="w-7 h-7 text-amber/80 mx-auto mb-5" />
                <h3 className="font-display text-xl text-white mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-white/45 text-[13px] leading-[1.75]">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
