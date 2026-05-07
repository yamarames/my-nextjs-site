import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MapPin,
  Users,
  Star,
  ArrowLeft,
  Clock,
  MoveRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { getSafariById } from "@/data/safaris";
import { useRef } from "react";

export default function SafariDetail() {
  const { id } = useParams<{ id: string }>();
  const safari = getSafariById(id || "");
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  if (!safari) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-large text-charcoal mb-8 tracking-tighter italic">Lost in the wild.</h1>
          <Link to="/safaris" className="btn-raw-outline hover-trigger">
            Return to Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden">
      {/* Editorial Hero */}
      <section className="relative h-[80vh] bg-charcoal flex items-center px-6 sm:px-12 lg:px-24 overflow-hidden pt-16">
        <motion.div style={{ y, scale, opacity }} className="absolute inset-0">
          <img
            src={safari.image}
            alt={safari.title}
            className="w-full h-full object-cover grayscale-[30%] brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal" />
        </motion.div>

        <div className="relative z-10 w-full max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <Link
              to="/safaris"
              className="group inline-flex items-center gap-4 text-white/50 hover:text-white text-[8px] font-bold tracking-[0.4em] uppercase mb-10 transition-all hover-trigger"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
              Archives / {safari.location}
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-amber" />
              <span className="text-amber font-bold text-[7px] tracking-[0.3em] uppercase">Expedition Report No. {safari.id.slice(-2).toUpperCase()}</span>
            </div>

            <h1 className="text-white text-[clamp(2.2rem,6vw,4rem)] leading-[0.95] tracking-tighter mb-4 relative mix-blend-difference font-display">
              {safari.title.split(' ').slice(0, -1).join(' ')} <br /> 
              <span className="italic ml-16 text-amber">{safari.title.split(' ').pop()}.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-16 bg-white relative">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Left: Metadata Portfolio */}
            <div className="lg:col-span-4 space-y-8 sticky top-24">
              <div className="bg-sand/30 p-6 border border-charcoal/5">
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-display italic text-amber text-lg">01</span>
                  <div className="w-5 h-px bg-charcoal/10" />
                  <span className="text-[7px] font-bold tracking-[0.3em] uppercase text-charcoal/30">Technical Specs</span>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Duration", value: safari.duration },
                    { label: "Guest Capacity", value: `Up to ${safari.maxGroupSize}` },
                    { label: "Primary Zone", value: safari.location },
                    { label: "Experience Level", value: "Ultra-Bespoke" },
                  ].map((item) => (
                    <div key={item.label} className="group border-b border-charcoal/5 pb-2.5 last:border-0">
                      <span className="block text-[6px] font-bold text-charcoal/20 tracking-[0.3em] uppercase mb-0.5 group-hover:text-amber transition-colors">{item.label}</span>
                      <span className="text-base font-display text-charcoal italic tracking-tight">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar Booking Card */}
              <div className="bg-charcoal p-6 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-amber/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                <span className="block text-[6px] font-bold text-white/30 tracking-[0.4em] uppercase mb-3 relative z-10">Confidential Rate</span>
                <div className="flex items-baseline gap-2 mb-6 relative z-10">
                  <span className="text-3xl font-display italic text-amber tracking-tighter">${safari.price.toLocaleString()}</span>
                  <span className="text-white/20 text-[8px] font-light uppercase tracking-[0.2em]">per guest</span>
                </div>
                <Link to="/booking" className="btn-raw w-full !bg-white !text-charcoal hover:!bg-amber text-center block relative z-10 hover-trigger !py-3">
                  Inquire Privately
                </Link>
                <div className="mt-4 flex items-center justify-center gap-2 text-[6px] text-white/20 font-bold tracking-[0.3em] uppercase relative z-10">
                  <ShieldCheck className="w-2.5 h-2.5 text-amber/50" />
                  Certified Expedition
                </div>
              </div>
            </div>

            {/* Right: The Body Narrative */}
            <div className="lg:col-span-8 space-y-16">
              <div className="max-w-2xl">
                 <div className="flex items-center gap-3 mb-5">
                    <span className="font-display italic text-amber text-xl">02</span>
                    <span className="text-[8px] font-bold tracking-[0.4em] uppercase text-charcoal/30">The Narrative</span>
                 </div>
                 <h2 className="text-[clamp(1.4rem,3.5vw,2.2rem)] text-charcoal mb-8 leading-[1.1] italic tracking-tighter">Wilderness <br /> <span className="ml-12">Redefined.</span></h2>
                 <div className="space-y-5 text-charcoal/70 text-lg leading-relaxed font-display italic">
                  {safari.longDescription.split('\n').map((para, i) => (
                    <p key={i} className="first-letter:text-5xl first-letter:font-bold first-letter:text-charcoal first-letter:mr-2 first-letter:float-left first-letter:leading-[0.8]">
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Highlights Gallery */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 bg-sand/15 p-6 lg:p-8">
                {safari.highlights.map((h, i) => (
                  <div key={i} className="flex gap-4 py-5 border-b border-charcoal/5">
                    <span className="font-display italic text-amber text-lg">0{i+1}</span>
                    <p className="text-charcoal font-display text-xl leading-tight tracking-tight">{h}</p>
                  </div>
                ))}
              </div>

              {/* Timeline Itinerary */}
              <div>
                 <div className="flex items-center gap-3 mb-5">
                    <span className="font-display italic text-amber text-lg">03</span>
                    <span className="text-[7px] font-bold tracking-[0.4em] uppercase text-charcoal/30">Chronology</span>
                 </div>
                <h2 className="text-[clamp(1.4rem,3.5vw,2.2rem)] text-charcoal mb-6 leading-tight italic tracking-tight font-display">The <br /><span className="ml-6">Itinerary.</span></h2>
                <div className="space-y-0 border-t border-charcoal/5">
                  {safari.itinerary.map((day, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="group grid grid-cols-1 md:grid-cols-12 gap-4 py-4 border-b border-charcoal/5 hover:bg-sand/10 transition-colors"
                    >
                      <div className="md:col-span-3">
                        <span className="font-display text-lg italic text-charcoal/10 group-hover:text-amber transition-all duration-700">
                          Day {day.day}
                        </span>
                      </div>
                      <div className="md:col-span-9">
                        <h3 className="text-charcoal text-base font-display group-hover:italic group-hover:translate-x-1.5 transition-all duration-1000 tracking-tight">
                          {day.title}
                        </h3>
                        <p className="text-charcoal/50 text-[13px] font-light leading-relaxed max-w-lg">
                          {day.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Gallery Montage */}
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 aspect-[21/9] overflow-hidden bg-sand shadow-lg hover-trigger">
                  <motion.img 
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 2.5 }}
                    src={safari.gallery[0]} 
                    alt={`${safari.title} primary view`}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[40%] hover:grayscale-0 transition-all duration-[1500ms]" 
                  />
                </div>
                <div className="col-span-12 lg:col-span-7 aspect-[4/5] overflow-hidden bg-sand shadow-md lg:-mt-12 z-10 hover-trigger">
                  <motion.img 
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 2.5 }}
                    src={safari.gallery[1]} 
                    alt={`${safari.title} secondary view`}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[40%] hover:grayscale-0 transition-all duration-[1500ms]" 
                  />
                </div>
                <div className="col-span-12 lg:col-span-5 aspect-square overflow-hidden bg-sand shadow-sm mt-6 hover-trigger">
                  <motion.img 
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 2.5 }}
                    src={safari.gallery[2]} 
                    alt={`${safari.title} detail view`}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[40%] hover:grayscale-0 transition-all duration-[1500ms]" 
                  />
                </div>
              </div>
              
              <div className="pt-12 text-center">
                <Link to="/booking" className="btn-raw !px-12 !py-4 text-base hover-trigger">
                   Begin Your Private Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
