import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Filter,
  MoveRight,
} from "lucide-react";
import { safaris } from "@/data/safaris";

const SafariCard = ({ safari, index }: { safari: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/safaris/${safari.id}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-sand shadow-lg mb-4">
          <motion.img
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            src={safari.image}
            alt={safari.title}
            loading="lazy"
            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-[1500ms]"
          />
          <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors duration-700" />
          
          <div className="absolute top-4 right-4 z-20">
             <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-700">
                <ArrowUpRight className="w-4 h-4 text-white" />
             </div>
          </div>
        </div>

        <div className="flex justify-between items-start">
          <div className="max-w-[70%]">
             <span className="block text-[6px] font-bold text-charcoal/20 tracking-[0.3em] uppercase mb-1">{safari.location}</span>
             <h3 className="text-xl font-display text-charcoal leading-tight italic group-hover:text-amber transition-colors duration-500">{safari.title}</h3>
          </div>
          <div className="text-right">
             <span className="block text-[6px] font-bold text-charcoal/20 tracking-[0.3em] uppercase mb-1">From</span>
             <span className="text-lg font-display text-charcoal italic tracking-tighter">${safari.price.toLocaleString()}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function Safaris() {
  const containerRef = useRef(null);

  const frontiers = [
    {
      name: "The Northern Frontier",
      description: "Legendary plains and the world's most concentrated wildlife sanctuaries.",
      items: safaris.filter(s => s.location.includes("Northern"))
    },
    {
      name: "The Southern Wilderness",
      description: "Remote, wild, and untouched. Africa's largest uninhabited ecosystems.",
      items: safaris.filter(s => s.location.includes("Southern") || s.location.includes("Central"))
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-sand/30 overflow-hidden">
      {/* Cinematic Hero */}
      <section className="relative h-screen bg-charcoal flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30 grayscale scale-105">
            <source src="/videos/home-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-transparent to-charcoal" />
        </div>
        <div className="relative z-10 text-center max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] font-bold tracking-[1em] uppercase text-amber mb-8 block">The Collection</span>
            <h1 className="text-white text-[clamp(3.5rem,12vw,8rem)] font-display leading-[0.8] tracking-tighter italic">
              Expeditionary <br /> <span className="text-white/90">Archives.</span>
            </h1>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20">
           <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
           <span className="text-[8px] font-bold tracking-[0.5em] uppercase text-white">Scroll Archive</span>
        </div>
      </section>

      {/* Frontiers */}
      {frontiers.map((frontier, fIndex) => (
        <section key={frontier.name} className="py-32 bg-white relative">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
            <div className="mb-24 max-w-2xl">
              <span className="text-[8px] font-bold tracking-[0.5em] uppercase text-charcoal/30 block mb-4">Frontier {fIndex + 1}</span>
              <h2 className="text-huge font-display italic leading-none tracking-tighter mb-8">{frontier.name}</h2>
              <p className="text-charcoal/50 text-lg font-light leading-relaxed italic border-l border-amber/30 pl-8">
                "{frontier.description}"
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
              {frontier.items.map((safari, i) => {
                const isLarge = i % 3 === 0;
                return (
                  <motion.div 
                    key={safari.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={isLarge ? "md:col-span-8" : "md:col-span-4"}
                  >
                    <Link to={`/safaris/${safari.id}`} className="group block">
                      <div className={`relative ${isLarge ? 'aspect-[16/9]' : 'aspect-[3/4]'} overflow-hidden bg-sand shadow-2xl mb-6`}>
                        <img 
                          src={safari.image} 
                          className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms]"
                          alt={safari.title}
                        />
                        <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors duration-1000" />
                        
                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-700">
                           <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                              <ArrowUpRight className="w-6 h-6 text-white" />
                           </div>
                        </div>

                        <div className="absolute bottom-8 left-8 right-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                           <span className="text-[8px] font-bold tracking-[0.4em] uppercase text-white/60 block mb-2">{safari.location}</span>
                           <h3 className="text-3xl text-white font-display italic tracking-tight">{safari.title}</h3>
                        </div>
                      </div>
                      
                      {!isLarge && (
                        <div className="space-y-2">
                           <h3 className="text-xl font-display italic text-charcoal group-hover:text-amber transition-colors">{safari.title}</h3>
                           <div className="flex justify-between items-center border-t border-charcoal/5 pt-2">
                              <span className="text-[7px] font-bold text-charcoal/20 uppercase tracking-widest">{safari.duration}</span>
                              <span className="text-lg font-display italic text-charcoal/60 tracking-tighter">${safari.price.toLocaleString()}</span>
                           </div>
                        </div>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Video Interstitial between frontiers */}
          {fIndex === 0 && (
            <div className="mt-40 h-[60vh] relative overflow-hidden">
               <video autoPlay loop muted playsInline className="w-full h-full object-cover grayscale opacity-60">
                  <source src="/videos/tours-hero.mp4" type="video/mp4" />
               </video>
               <div className="absolute inset-0 bg-charcoal/40" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-white text-[10vw] font-display italic tracking-tighter opacity-10">UNMAPPED</h2>
               </div>
            </div>
          )}
        </section>
      ))}

      {/* Final Invitation */}
      <section className="py-32 bg-charcoal relative">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <span className="text-[8px] font-bold tracking-[0.5em] uppercase text-white/20">Direct Channel</span>
            <h2 className="text-white text-[clamp(2.5rem,8vw,5rem)] font-display italic leading-none tracking-tighter">
              The architecture of <br /> <span className="text-amber">the impossible.</span>
            </h2>
            <p className="text-white/40 text-lg font-light max-w-xl mx-auto italic">
              Our architects specialize in private island buyouts and cross-continental migrations 
              that do not exist in any catalog.
            </p>
            <div className="pt-8">
              <Link to="/contact" className="btn-raw !px-16 !py-5 text-xl hover-trigger">Begin Dialogue</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
