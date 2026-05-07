import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Compass, Heart, Globe, Award, Users, TreePine, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    label: "01",
    title: "Passion First",
    description:
      "We started ZanTrica because we love sharing our home. Every tour is crafted with genuine care and enthusiasm.",
  },
  {
    label: "02",
    title: "Sustainable Travel",
    description:
      "We partner with local communities, support conservation efforts, and ensure our impact on this beautiful land is positive.",
  },
  {
    label: "03",
    title: "Excellence Always",
    description:
      "From our vehicles to our guides to our accommodation partners, we accept only the highest standards.",
  },
  {
    label: "04",
    title: "Protecting Nature",
    description:
      "A portion of every booking goes directly to wildlife conservation and community development projects.",
  },
];

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 600]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden">
      {/* Editorial Hero */}
      <section className="relative h-screen bg-charcoal flex items-center px-6 sm:px-12 lg:px-24 overflow-hidden">
        <motion.div style={{ y, scale, opacity }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1920&q=80"
            alt="Human connection in the Tanzanian wilderness"
            loading="lazy"
            className="w-full h-full object-cover grayscale-[30%] brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal" />
        </motion.div>

        <div className="relative z-10 w-full max-w-[1800px] mx-auto pt-20">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-8 mb-16">
                <div className="w-16 h-px bg-amber" />
                <span className="text-amber font-bold text-[10px] tracking-[0.6em] uppercase">The Manifesto</span>
              </div>
              <h1 className="text-white text-huge leading-[0.7] tracking-tighter mb-20 relative mix-blend-difference">
                Human <br /> <span className="italic ml-24 text-amber">Connection.</span>
              </h1>
              <p className="text-white/60 text-editorial max-w-2xl leading-relaxed italic">
                "Founded on the belief that travel is an art form, a narrative 
                between the explorer and the ancient rhythms of Tanzania."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-60 bg-white relative">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-24">
          <div className="grid grid-cols-12 gap-12 lg:gap-24 items-start">
            <div className="col-span-12 lg:col-span-5">
              <div className="flex items-center gap-6 mb-12">
                <span className="font-display italic text-amber text-3xl">01</span>
                <div className="w-12 h-px bg-charcoal/10" />
                <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-charcoal/30">The Origin</span>
              </div>
              <h2 className="text-huge text-charcoal mb-20 leading-[0.8] tracking-tighter">
                From a Single Dhow <br /><span className="italic ml-24 text-amber">to a Legacy.</span>
              </h2>
              <div className="space-y-12 text-charcoal/70 text-2xl font-light leading-relaxed font-display italic">
                <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-charcoal first-letter:mr-4 first-letter:float-left first-letter:leading-[0.8]">
                  ZanTrica began in 2015 when Omar Juma decided to share his island 
                  with the world—not as a tourist destination, but as a living, 
                  breathing home.
                </p>
                <p>
                  What started as sunset cruises for friends grew into a family of 
                  explorers. Today, we are a team of 24 passionate locals who 
                  believe that the best experiences come from genuine intimacy 
                  with the land and its people.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-7 mt-20 lg:mt-32">
              <div className="relative">
                 {/* Large Background Text */}
                <div className="absolute -top-32 -right-32 text-[15vw] font-display text-charcoal/[0.02] whitespace-nowrap italic pointer-events-none select-none z-0">
                  Zanzibar
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2 }}
                    className="aspect-[3/4] bg-sand overflow-hidden shadow-2xl hover-trigger"
                  >
                    <motion.img 
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 3 }}
                      src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1000&q=80" 
                      className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-[2000ms]"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 2 }}
                    className="aspect-[3/4] bg-sand overflow-hidden md:mt-40 shadow-2xl hover-trigger"
                  >
                    <motion.img 
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 3 }}
                      src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1000&q=80" 
                      className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-[2000ms]"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values - Editorial List */}
      <section className="py-60 bg-charcoal relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/[0.02] -skew-x-12 translate-x-1/2" />
        
        <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
          <div className="flex items-center gap-6 mb-24">
            <span className="font-display italic text-amber text-3xl">02</span>
            <div className="w-12 h-px bg-white/10" />
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-white/30">The Belief System</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-40 gap-y-12">
            {values.map((v, i) => (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="group py-16 border-b border-white/5 hover:border-amber/30 transition-all duration-700"
              >
                <div className="flex items-baseline gap-12">
                  <span className="font-display text-5xl italic text-amber/20 group-hover:text-amber transition-all duration-700">
                    {v.label}
                  </span>
                  <div>
                    <h3 className="text-white text-6xl font-display mb-8 group-hover:italic transition-all duration-700 tracking-tight">
                      {v.title}
                    </h3>
                    <p className="text-white/40 text-xl font-light leading-relaxed max-w-xl font-display italic">
                      "{v.description}"
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team - Portfolio Style */}
      <section className="py-60 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-24">
          <div className="text-center mb-40">
             <div className="flex items-center justify-center gap-6 mb-12">
                <div className="w-12 h-px bg-charcoal/10" />
                <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-charcoal/20">The Collective</span>
                <div className="w-12 h-px bg-charcoal/10" />
             </div>
             <h2 className="text-large text-charcoal leading-[0.8] tracking-tighter">The Curators <br /><span className="italic ml-24 text-amber">of the Wild.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-24 lg:gap-40">
            {[
              { name: "Omar Juma", role: "Founder", img: "https://i.pravatar.cc/600?img=68" },
              { name: "Fatima Hassan", role: "Operations", img: "https://i.pravatar.cc/600?img=45" },
              { name: "David Mwinyi", role: "Safari Lead", img: "https://i.pravatar.cc/600?img=11" },
            ].map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 1.5 }}
                className="group text-center hover-trigger"
              >
                <div className="aspect-[4/5] bg-sand overflow-hidden mb-12 shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-[2000ms] relative">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 3 }}
                    src={m.img} 
                    alt={m.name} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-charcoal/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-1000" />
                </div>
                <h4 className="font-display text-4xl text-charcoal mb-4 group-hover:italic transition-all duration-700">{m.name}</h4>
                <div className="w-8 h-px bg-amber mx-auto mb-4" />
                <span className="text-[9px] font-bold tracking-[0.5em] uppercase text-charcoal/20">{m.role}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-80 bg-sand/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none flex items-center justify-center">
           <span className="text-[20vw] font-display font-bold italic -rotate-12">JOURNEY</span>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 text-center relative z-10">
          <h2 className="text-large text-charcoal leading-[0.8] tracking-tighter mb-24">Join the <br /><span className="italic ml-32 text-amber">Narrative.</span></h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-16">
             <Link to="/safaris" className="btn-raw hover-trigger">Explore Collection</Link>
             <Link to="/contact" className="group flex items-center gap-8 text-charcoal hover-trigger">
                <span className="font-display text-5xl border-b border-charcoal pb-4 italic transition-all group-hover:translate-x-4">Start a Story</span>
                <div className="w-16 h-16 rounded-full bg-charcoal text-white flex items-center justify-center group-hover:bg-amber group-hover:text-charcoal transition-all duration-1000">
                  <MoveRight className="w-8 h-8" />
                </div>
              </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
