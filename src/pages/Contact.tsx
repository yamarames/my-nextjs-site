import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Check,
  MoveRight,
} from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 600]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden">
      {/* Editorial Hero */}
      <section className="relative h-screen bg-charcoal flex items-center px-6 sm:px-12 lg:px-24 overflow-hidden">
        <motion.div style={{ y, scale, opacity }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1920&q=80"
            alt="Contact ZanTrica"
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
                <span className="text-amber font-bold text-[10px] tracking-[0.6em] uppercase">The Inquiry Cycle</span>
              </div>
              <h1 className="text-white text-huge leading-[0.7] tracking-tighter mb-20 relative mix-blend-difference">
                Start Your <br /> <span className="italic ml-24 text-amber">Dialog.</span>
              </h1>
              <p className="text-white/60 text-editorial max-w-2xl leading-relaxed italic">
                "Every masterpiece begins with a conversation. Let us draft your 
                Tanzanian story together."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-60 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-24">
          <div className="grid grid-cols-12 gap-12 lg:gap-24 items-start">
            
            {/* Left: Contact Info Portfolio */}
            <div className="col-span-12 lg:col-span-4 space-y-32 sticky top-40">
              <div className="bg-sand/30 p-12 lg:p-20 border border-charcoal/5">
                <div className="flex items-center gap-6 mb-16">
                  <span className="font-display italic text-amber text-3xl">01</span>
                  <div className="w-12 h-px bg-charcoal/10" />
                  <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-charcoal/30">Liaison</span>
                </div>
                <h2 className="text-huge text-charcoal leading-none mb-20 tracking-tighter">The <br /><span className="italic ml-16">Studios.</span></h2>
                
                <div className="space-y-24">
                  <div className="group">
                    <div className="flex items-center gap-4 mb-6">
                      <MapPin className="w-4 h-4 text-amber" />
                      <h4 className="font-display text-4xl italic group-hover:translate-x-2 transition-transform">Zanzibar Studio</h4>
                    </div>
                    <div className="pl-8 space-y-4 text-charcoal/60 text-xl font-light leading-relaxed font-display italic">
                      <p>Hurumzi St, Stone Town</p>
                      <p>+255 123 456 789</p>
                      <p className="text-charcoal border-b border-charcoal/10 inline-block">hello@zantrica.com</p>
                    </div>
                  </div>
                  <div className="group">
                    <div className="flex items-center gap-4 mb-6">
                      <MapPin className="w-4 h-4 text-amber" />
                      <h4 className="font-display text-4xl italic group-hover:translate-x-2 transition-transform">Arusha Base</h4>
                    </div>
                    <div className="pl-8 space-y-4 text-charcoal/60 text-xl font-light leading-relaxed font-display italic">
                      <p>Njiro Road, Kijenge</p>
                      <p>+255 987 654 321</p>
                      <p className="text-charcoal border-b border-charcoal/10 inline-block">field@zantrica.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-6 mb-12">
                  <span className="font-display italic text-amber text-3xl">02</span>
                  <div className="w-12 h-px bg-charcoal/10" />
                  <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-charcoal/30">Operational Hours</span>
                </div>
                <div className="space-y-6 text-charcoal/60 text-xl font-light font-display italic">
                  <p>Mon — Sat / 08:00 — 20:00</p>
                  <p>Sun / 09:00 — 17:00</p>
                  <div className="pt-8">
                    <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-amber">East Africa Time (EAT)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: The Raw Form */}
            <div className="lg:col-span-8">
              <div className="bg-charcoal p-12 sm:p-24 relative overflow-hidden shadow-2xl group">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none select-none">
                  <h3 className="text-[10vw] font-display text-white leading-none italic uppercase font-bold">Inquire</h3>
                </div>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="relative z-10 space-y-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                      <div className="space-y-6">
                        <label className="text-[10px] font-bold tracking-[0.5em] uppercase text-white/20">Identity</label>
                        <input
                          type="text"
                          required
                          className="w-full bg-transparent border-b border-white/10 py-6 text-white text-3xl font-light focus:outline-none focus:border-amber transition-all duration-700 font-display italic"
                          placeholder="Ex. Julianne Moore"
                        />
                      </div>
                      <div className="space-y-6">
                        <label className="text-[10px] font-bold tracking-[0.5em] uppercase text-white/20">Digital Address</label>
                        <input
                          type="email"
                          required
                          className="w-full bg-transparent border-b border-white/10 py-6 text-white text-3xl font-light focus:outline-none focus:border-amber transition-all duration-700 font-display italic"
                          placeholder="Ex. julianne@arch.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <label className="text-[10px] font-bold tracking-[0.5em] uppercase text-white/20">Subject of Interest</label>
                      <div className="relative group">
                        <select className="w-full bg-transparent border-b border-white/10 py-6 text-white/40 text-3xl font-light focus:outline-none focus:border-amber transition-all duration-700 appearance-none font-display italic cursor-pointer">
                          <option value="general" className="bg-charcoal">Bespoke Itinerary Design</option>
                          <option value="safari" className="bg-charcoal">Wildlife Expedition</option>
                          <option value="zanzibar" className="bg-charcoal">Island Fragments</option>
                          <option value="corporate" className="bg-charcoal">Private Group Inquiry</option>
                        </select>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                           <MoveRight className="w-8 h-8 text-white/10 group-focus-within:text-amber transition-colors rotate-90" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <label className="text-[10px] font-bold tracking-[0.5em] uppercase text-white/20">The Brief</label>
                      <textarea
                        rows={5}
                        required
                        className="w-full bg-transparent border-b border-white/10 py-6 text-white text-3xl font-light focus:outline-none focus:border-amber transition-all duration-700 resize-none font-display italic"
                        placeholder="Draft your story..."
                      />
                    </div>

                    <div className="pt-12">
                      <button type="submit" className="btn-raw w-full md:w-auto !bg-amber !text-charcoal hover:!bg-white hover-trigger !px-20">
                        Transmit Inquiry
                      </button>
                    </div>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="py-40 text-center"
                  >
                    <div className="w-24 h-24 bg-amber/10 border border-amber text-amber rounded-full flex items-center justify-center mx-auto mb-16 shadow-[0_0_50px_rgba(217,119,6,0.2)]">
                      <Check className="w-12 h-12" />
                    </div>
                    <h3 className="font-display text-8xl text-white mb-8 italic tracking-tighter">Received.</h3>
                    <p className="text-white/40 text-2xl font-light max-w-md mx-auto leading-relaxed font-display italic">
                      "An architect will review your brief and connect within the next solar cycle."
                    </p>
                    <div className="mt-20">
                       <button onClick={() => setSubmitted(false)} className="text-amber font-bold text-[10px] tracking-[0.5em] uppercase hover:text-white transition-colors hover-trigger">Send Another Brief</button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Banner */}
      <section className="py-24 border-t border-charcoal/5">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-12">
          <span className="text-[10px] font-bold tracking-[0.6em] uppercase text-charcoal/20 italic">Follow the Global Journey</span>
          <div className="flex gap-20">
            {['Instagram', 'Journal', 'Newsletter', 'Twitter'].map((s) => (
              <span key={s} className="text-[10px] font-bold tracking-[0.4em] uppercase text-charcoal/40 hover:text-amber cursor-pointer transition-all hover-trigger group">
                <span className="inline-block group-hover:-translate-y-1 transition-transform">{s}</span>
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
