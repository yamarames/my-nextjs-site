import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MapPin,
  Star,
  ArrowLeft,
  Clock,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { getTourById } from "@/data/tours";
import { useRef } from "react";

export default function TourDetail() {
  const { id } = useParams<{ id: string }>();
  const tour = getTourById(id || "");
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 600]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  if (!tour) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-large text-charcoal mb-12 tracking-tighter italic">Fragment not found.</h1>
          <Link to="/tours" className="btn-raw-outline hover-trigger">
            Return to Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden">
      {/* Editorial Hero */}
      <section className="relative h-screen bg-charcoal flex items-center px-6 sm:px-12 lg:px-24 overflow-hidden pt-20">
        <motion.div style={{ y, scale, opacity }} className="absolute inset-0">
          <img
            src={tour.image}
            alt={`${tour.title} at ${tour.location}`}
            loading="lazy"
            className="w-full h-full object-cover grayscale-[30%] brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal" />
        </motion.div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <Link
              to="/tours"
              className="group inline-flex items-center gap-6 text-white/50 hover:text-white text-[9px] font-bold tracking-[0.5em] uppercase mb-16 transition-all hover-trigger"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
              The Island Series / {tour.location}
            </Link>
            
            <div className="flex items-center gap-6 mb-6">
              <div className="w-10 h-px bg-amber" />
              <span className="text-amber font-bold text-[8px] tracking-[0.4em] uppercase">Island Fragment No. {tour.id.slice(-2).toUpperCase()}</span>
            </div>

            <h1 className="text-white text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-tighter mb-8 relative mix-blend-difference">
              {tour.title.split(' ').slice(0, -1).join(' ')} <br /> 
              <span className="italic ml-24 text-amber">{tour.title.split(' ').pop()}.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            
            {/* Left: Metadata Portfolio */}
            <div className="lg:col-span-4 space-y-10 sticky top-32">
              <div className="bg-sand/30 p-8 border border-charcoal/5">
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-display italic text-amber text-lg">01</span>
                  <div className="w-6 h-px bg-charcoal/10" />
                  <span className="text-[8px] font-bold tracking-[0.4em] uppercase text-charcoal/30">Tour Details</span>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Duration", value: tour.duration },
                    { label: "Zone", value: tour.location },
                    { label: "Category", value: tour.category },
                    { label: "Rating", value: `${tour.rating} / 5.0` },
                  ].map((item) => (
                    <div key={item.label} className="group border-b border-charcoal/5 pb-3 last:border-0">
                      <span className="block text-[7px] font-bold text-charcoal/20 tracking-[0.4em] uppercase mb-1 group-hover:text-amber transition-colors">{item.label}</span>
                      <span className="text-lg font-display text-charcoal italic tracking-tight capitalize">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Card - High End */}
              <div className="bg-charcoal p-8 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-amber/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                <span className="block text-[7px] font-bold text-white/30 tracking-[0.5em] uppercase mb-4 relative z-10">Private Rate</span>
                <div className="flex items-baseline gap-3 mb-6 relative z-10">
                  <span className="text-4xl font-display italic text-amber tracking-tighter">${tour.price}</span>
                  <span className="text-white/20 text-[9px] font-light uppercase tracking-[0.2em]">per guest</span>
                </div>
                <Link to="/booking" className="btn-raw w-full !bg-white !text-charcoal hover:!bg-amber text-center block relative z-10 hover-trigger !py-4">
                  Reserve Spot
                </Link>
                <div className="mt-6 space-y-3 border-t border-white/5 pt-6 relative z-10">
                   {['Pickup included', 'Expert guides', 'Private options'].map((text) => (
                     <div key={text} className="flex items-center gap-3 text-[7px] text-white/30 uppercase tracking-[0.2em]">
                        <div className="w-1 h-1 rounded-full bg-amber/50" />
                        {text}
                     </div>
                   ))}
                </div>
              </div>
            </div>

            {/* Right: The Body Narrative */}
            <div className="lg:col-span-8 space-y-20">
              <div className="max-w-3xl">
                 <div className="flex items-center gap-4 mb-6">
                    <span className="font-display italic text-amber text-xl">02</span>
                    <span className="text-[9px] font-bold tracking-[0.5em] uppercase text-charcoal/30">The Essence</span>
                 </div>
                 <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] text-charcoal mb-8 leading-tight italic tracking-tight">Island <br /> <span className="ml-8">Vibrations.</span></h2>
                 <div className="space-y-4 text-charcoal/80 text-lg leading-relaxed font-light">
                  {tour.longDescription.split('\n').map((para, i) => (
                    <p key={i}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Highlights Gallery */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 bg-sand/20 p-8 lg:p-10">
                {tour.highlights.map((h, i) => (
                  <div key={i} className="flex gap-6 py-6 border-b border-charcoal/5">
                    <span className="font-display italic text-amber text-xl">0{i+1}</span>
                    <p className="text-charcoal font-display text-xl leading-tight tracking-tight">{h}</p>
                  </div>
                ))}
              </div>

              {/* Timeline Itinerary */}
              <div>
                 <div className="flex items-center gap-4 mb-6">
                    <span className="font-display italic text-amber text-xl">03</span>
                    <span className="text-[8px] font-bold tracking-[0.4em] uppercase text-charcoal/30">Timeline</span>
                 </div>
                <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] text-charcoal mb-8 leading-tight italic tracking-tight">Daily <br /><span className="ml-8">Flow.</span></h2>
                <div className="space-y-0 border-t border-charcoal/5">
                  {tour.itinerary.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="group grid grid-cols-1 md:grid-cols-12 gap-6 py-8 border-b border-charcoal/5 hover:bg-sand/10 transition-colors"
                    >
                      <div className="md:col-span-3">
                        <span className="font-display text-xl italic text-charcoal/10 group-hover:text-amber transition-all duration-700">
                          {item.time}
                        </span>
                      </div>
                      <div className="md:col-span-9">
                        <h3 className="text-charcoal text-lg font-display group-hover:italic group-hover:translate-x-2 transition-all duration-1000 tracking-tight">
                          {item.activity}
                        </h3>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Gallery Montage - Editorial Style */}
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 aspect-[16/7] overflow-hidden bg-sand shadow-2xl hover-trigger">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 3 }}
                    src={tour.gallery[0]} 
                    className="w-full h-full object-cover grayscale-[50%] hover:grayscale-0 transition-all duration-[2000ms]" 
                  />
                </div>
                <div className="col-span-12 md:col-span-8 aspect-[16/9] overflow-hidden bg-sand shadow-xl lg:-mt-16 z-10 hover-trigger">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 3 }}
                    src={tour.gallery[1]} 
                    alt={`${tour.title} secondary view`}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[50%] hover:grayscale-0 transition-all duration-[2000ms]" 
                  />
                </div>
                <div className="col-span-12 md:col-span-4 aspect-square overflow-hidden bg-sand shadow-lg mt-8 hover-trigger">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 3 }}
                    src={tour.gallery[2]} 
                    alt={`${tour.title} detail view`}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[50%] hover:grayscale-0 transition-all duration-[2000ms]" 
                  />
                </div>
              </div>
              
              <div className="pt-20 text-center">
                <Link to="/booking" className="btn-raw !px-16 !py-6 text-lg hover-trigger">
                   Begin This Experience
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
