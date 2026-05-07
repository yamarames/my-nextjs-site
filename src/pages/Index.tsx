import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ArrowUpRight, 
  Compass, 
  Globe, 
  Heart, 
  Calendar, 
  ArrowRight,
  MoveRight,
  Zap,
  Star,
  MapPin
} from "lucide-react";
import { tours } from "@/data/tours";
import { safaris } from "@/data/safaris";

gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".hero-video", {
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        y: 200,
        scale: 1.1
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-sand overflow-hidden">
      {/* 01. CINEMATIC HERO */}
      <section className="hero-section relative h-[90vh] flex items-center justify-center overflow-hidden bg-charcoal">
        <div className="hero-video absolute inset-0 z-0">
          <video 
            autoPlay loop muted playsInline 
            className="w-full h-full object-cover scale-105 opacity-60 grayscale-[20%]"
          >
            <source src="/videos/home-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal/60" />
        </div>

        <div className="relative z-10 text-center max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block text-[8px] font-bold tracking-[0.6em] uppercase text-amber mb-6">Ultra-Luxe Expeditionary Service</span>
            <h1 className="text-white text-huge mb-8">
              Uncharted <br /> <span className="text-white/90">Elegance.</span>
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-12">
               <Link to="/safaris" className="btn-raw !px-12 !py-4 hover-trigger">Explore Archives</Link>
               <Link to="/contact" className="group flex items-center gap-4 text-white/50 hover:text-white transition-all text-[9px] font-bold tracking-[0.4em] uppercase hover-trigger">
                 Direct Inward Dial
                 <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
               </Link>
            </div>
          </motion.div>
        </div>

        {/* Minimal Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
           <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
           <span className="text-[7px] font-bold tracking-widest uppercase text-white">Scroll</span>
        </div>
      </section>

      {/* 02. EDITORIAL PREFACE */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
               <motion.div
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="space-y-6"
               >
                 <span className="text-[7px] font-bold tracking-[0.5em] uppercase text-charcoal/30">The Philosophy</span>
                 <h2 className="text-[clamp(2rem,5vw,3rem)] text-charcoal font-display leading-[1.1] italic tracking-tight">
                   Travel is no longer <br /> about arrival. <br /> It's about <span className="text-amber">resonance.</span>
                 </h2>
                 <p className="text-charcoal/60 text-base font-light leading-relaxed max-w-md">
                   We curate high-fidelity experiences across the East African frontier. 
                   Our methodology combines military-grade logistics with a refined 
                   aesthetic sensibility, ensuring every moment is a masterwork.
                 </p>
                 <div className="pt-4">
                    <Link to="/about" className="btn-raw-outline hover-trigger">Our Protocol</Link>
                 </div>
               </motion.div>
            </div>
            
            <div className="lg:col-span-6 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                className="aspect-[4/5] overflow-hidden bg-sand shadow-2xl relative group"
              >
                <img 
                  src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80" 
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-[2000ms]"
                  alt="Editorial Safari Capture"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-charcoal/5" />
              </motion.div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-amber/10 blur-3xl rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 03. THE COLLECTION - TIGHT GRID */}
      <section className="py-20 bg-sand/30 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-24">
          <div className="flex justify-between items-end mb-12">
             <div>
                <span className="text-[7px] font-bold tracking-[0.5em] uppercase text-charcoal/30 block mb-3">Featured Fragments</span>
                <h2 className="text-huge font-display italic">Selected Arc.</h2>
             </div>
             <Link to="/safaris" className="text-[8px] font-bold tracking-[0.4em] uppercase text-charcoal/40 hover:text-amber transition-colors pb-2 border-b border-charcoal/10 hover-trigger">
                View Entire Collection
             </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safaris.slice(0, 3).map((safari, i) => (
              <motion.div 
                key={safari.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <Link to={`/safaris/${safari.id}`}>
                  <div className="relative aspect-[3/4] overflow-hidden bg-sand shadow-lg mb-4">
                    <img 
                      src={safari.image} 
                      className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1500ms]"
                      alt={safari.title}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors duration-700" />
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700">
                       <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <span className="text-[6px] font-bold text-charcoal/30 tracking-[0.3em] uppercase">{safari.location}</span>
                  <h3 className="text-xl font-display italic text-charcoal group-hover:text-amber transition-colors mt-1">{safari.title}</h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 04. DUAL SHOWCASE */}
      <section className="py-24 bg-charcoal relative">
        <div className="absolute inset-0 opacity-[0.015] select-none pointer-events-none flex items-center justify-center">
           <h1 className="text-[20vw] font-display font-bold text-white whitespace-nowrap italic">ZANTRICA</h1>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
             <div className="lg:col-span-5 order-2 lg:order-1">
               <motion.div 
                 className="aspect-[3/4] overflow-hidden bg-sand shadow-2xl relative group"
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
               >
                 <img 
                   src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1000&q=80" 
                   className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms]"
                   alt="Wild Safari"
                   loading="lazy"
                 />
               </motion.div>
             </div>
             
             <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
               <span className="text-[7px] font-bold tracking-[0.5em] uppercase text-white/20">The Deployment</span>
               <h2 className="text-huge text-white font-display italic tracking-tighter">Beyond the <br /> <span className="text-amber">Horizon line.</span></h2>
               <p className="text-white/40 text-lg font-light leading-relaxed max-w-md italic font-display">
                 "Our private charters and technical expeditions are designed for those 
                 whose curiosity is matched only by their demand for absolute comfort."
               </p>
               <div className="grid grid-cols-2 gap-8 pt-4">
                  {[
                    { label: "Technical Guides", icon: Compass },
                    { label: "Private Aviation", icon: Zap },
                    { label: "High Fidelity", icon: Star },
                    { label: "Sanctuary Access", icon: MapPin },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                       <item.icon className="w-5 h-5 text-amber opacity-60" />
                       <span className="text-[8px] font-bold tracking-widest text-white/60 uppercase">{item.label}</span>
                    </div>
                  ))}
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 05. INVITATION CTA */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <span className="text-[8px] font-bold tracking-[0.5em] uppercase text-charcoal/30">Immediate Action</span>
            <h2 className="text-[clamp(2.5rem,8vw,5rem)] text-charcoal font-display leading-none italic tracking-tighter">
              Begin your <br /> <span className="text-amber">private story.</span>
            </h2>
            <p className="text-charcoal/50 text-base font-light max-w-lg mx-auto">
              Our architects are standing by to engineer your next deployment. 
              Availability is intentionally limited to preserve fidelity.
            </p>
            <div className="pt-6">
              <Link to="/booking" className="btn-raw !px-16 !py-5 text-lg hover-trigger">Initialize Inward Bound</Link>
            </div>
          </motion.div>
        </div>
        
        {/* Abstract shapes */}
        <div className="absolute top-1/2 left-0 w-64 h-px bg-charcoal/5 -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-64 h-px bg-charcoal/5 -translate-y-1/2" />
      </section>
    </div>
  );
}
