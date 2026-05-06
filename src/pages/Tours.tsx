import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Search,
  MoveRight,
} from "lucide-react";
import { tours } from "@/data/tours";

const TourCard = ({ tour, index }: { tour: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <Link to={`/tours/${tour.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-sand mb-4 shadow-lg">
          <motion.img
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            src={tour.image}
            alt={tour.title}
            loading="lazy"
            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-[1500ms]"
          />
          <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors duration-700" />
          
          <div className="absolute top-4 right-4 z-20">
            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-700">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-700 bg-gradient-to-t from-charcoal/80 to-transparent">
             <div className="flex items-center gap-2 text-white/60 text-[7px] font-bold tracking-widest uppercase">
                <span className="text-amber italic font-display normal-case text-xs">{tour.duration}</span>
                <span className="opacity-20">/</span>
                <span>{tour.location}</span>
             </div>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-display text-charcoal leading-tight italic group-hover:text-amber transition-colors duration-500">
            {tour.title}
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-[7px] font-bold text-charcoal/20 uppercase tracking-[0.3em]">{tour.category}</span>
            <span className="font-display text-base italic text-charcoal/80 tracking-tighter">${tour.price}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function Tours() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-sand/30">
      {/* Cinematic Hero Section */}
      <section className="relative h-screen bg-charcoal flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-40 grayscale">
            <source src="/videos/tours-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-transparent to-charcoal" />
        </div>
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] font-bold tracking-[1em] uppercase text-amber mb-6 block">Chapter 01</span>
            <h1 className="text-white text-[12vw] font-display leading-[0.8] italic tracking-tighter">
              The Island <br /> <span className="text-amber/90">Series.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-12 bg-white relative">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-24">
          <div className="flex justify-between items-center mb-10 border-b border-charcoal/5 pb-4">
             <div className="flex items-center gap-6">
               <span className="text-[8px] font-bold tracking-[0.4em] uppercase text-charcoal/30">The Island Series</span>
               <div className="flex gap-4">
                 {['Culture', 'Nature', 'Private', 'Aerial'].map(cat => (
                   <button key={cat} className="text-[9px] font-bold tracking-widest uppercase text-charcoal/40 hover:text-amber transition-colors hover-trigger">
                     {cat}
                   </button>
                 ))}
               </div>
             </div>
             
             <div className="relative hidden md:block">
                <input 
                  type="text" 
                  placeholder="Locate Experience" 
                  className="bg-sand/30 border-b border-charcoal/10 py-1.5 px-4 text-[9px] font-bold uppercase tracking-widest focus:outline-none focus:border-amber transition-all w-48"
                />
                <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-charcoal/20" />
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {tours.map((tour, index) => (
              <TourCard key={tour.id} tour={tour} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-sand relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-24 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="text-[7px] font-bold tracking-[0.5em] uppercase text-charcoal/30">Private Charters</span>
            <h2 className="text-charcoal text-[clamp(1.8rem,4vw,2.5rem)] font-display italic leading-none tracking-tighter">
              A purely sovereign way <br /> to experience Zanzibar.
            </h2>
            <p className="text-charcoal/60 text-sm font-light leading-relaxed">
              For those who value absolute seclusion, we offer private yacht and helicopter 
              deployments across the archipelago.
            </p>
            <div className="pt-4">
              <Link to="/contact" className="btn-raw hover-trigger">
                Inquire Sovereignty
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
