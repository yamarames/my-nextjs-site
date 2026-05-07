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

  const groupedTours = [
    {
      category: "The Island Series",
      featuredImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
      items: tours.filter(t => t.category === "beach" || t.category === "adventure")
    },
    {
      category: "The Cultural Series",
      featuredImage: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=1200&q=80",
      items: tours.filter(t => t.category === "culture" || t.category === "food")
    },
    {
      category: "The Wild Series",
      featuredImage: "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=1200&q=80",
      items: tours.filter(t => t.category === "wildlife")
    }
  ];

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

      {/* Grouped Chapters */}
      {groupedTours.map((group, index) => (
        <section key={group.category} className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white relative">
          {/* Sticky Visual Side */}
          <div className="sticky top-0 h-[50vh] lg:h-screen overflow-hidden border-r border-charcoal/5">
            <motion.img 
              initial={{ scale: 1.1, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2 }}
              src={group.featuredImage} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2000ms]" 
              alt={group.category}
            />
            <div className="absolute inset-0 bg-charcoal/20" />
            <div className="absolute bottom-12 left-12 z-10">
              <span className="text-[8px] font-bold tracking-[0.5em] text-white/50 uppercase">Series {String(index + 1).padStart(2, '0')}</span>
              <h2 className="text-huge text-white mt-2">{group.category}</h2>
            </div>
          </div>

          {/* Scrolling Content Side */}
          <div className="py-24 px-12 lg:px-32 space-y-32 bg-white">
            <div className="max-w-md">
               <span className="text-[7px] font-bold tracking-[0.4em] uppercase text-charcoal/30">Selection Archive</span>
               <p className="mt-6 text-charcoal/60 text-lg font-light leading-relaxed italic">
                 "A curated set of experiences designed to resonate with the specific frequency 
                 of {group.category.toLowerCase()}."
               </p>
            </div>

            <div className="grid grid-cols-1 gap-24">
              {group.items.map((tour, i) => (
                <TourCard key={tour.id} tour={tour} index={i} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Private Sovereign CTA */}
      <section className="py-32 bg-charcoal relative overflow-hidden group">
        <div className="max-w-[1200px] mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <span className="text-[8px] font-bold tracking-[0.5em] uppercase text-white/20">The Deployment</span>
            <h2 className="text-white text-[clamp(2.5rem,6vw,4.5rem)] font-display italic leading-[0.9] tracking-tighter">
              A purely sovereign way <br /> <span className="text-amber">to experience Zanzibar.</span>
            </h2>
            <p className="text-white/40 text-lg font-light leading-relaxed max-w-xl mx-auto italic">
              For those who value absolute seclusion, we offer private yacht and helicopter 
              deployments across the archipelago.
            </p>
            <div className="pt-8">
              <Link to="/contact" className="btn-raw !px-16 !py-5 hover-trigger">
                Inquire Sovereignty
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Abstract watermark */}
        <div className="absolute inset-0 opacity-[0.02] select-none pointer-events-none flex items-center justify-center">
           <h1 className="text-[30vw] font-display font-bold text-white italic">ZANTRICA</h1>
        </div>
      </section>
    </div>
  );
}
