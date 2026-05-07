import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Users,
  Minus,
  Plus,
  Check,
  ArrowRight,
  ShieldCheck,
  MoveRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  format,
  addDays,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isBefore,
  startOfDay,
} from "date-fns";
import { tours, getTourById } from "@/data/tours";
import { safaris, getSafariById } from "@/data/safaris";
import { cn } from "@/lib/utils";

interface BookingItem {
  id: string;
  title: string;
  type: "tour" | "safari";
  price: number;
  image: string;
  duration: string;
}

export default function Booking() {
  const [searchParams] = useSearchParams();
  const tourId = searchParams.get("tour");
  const safariId = searchParams.get("safari");

  const [selectedDate, setSelectedDate] = useState<Date>(addDays(new Date(), 3));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedItems, setSelectedItems] = useState<BookingItem[]>([]);
  const [step, setStep] = useState(1);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const items: BookingItem[] = [];
    if (tourId) {
      const tour = getTourById(tourId);
      if (tour) {
        items.push({
          id: tour.id,
          title: tour.title,
          type: "tour",
          price: tour.price,
          image: tour.image,
          duration: tour.duration,
        });
      }
    }
    if (safariId) {
      const safari = getSafariById(safariId);
      if (safari) {
        items.push({
          id: safari.id,
          title: safari.title,
          type: "safari",
          price: safari.price,
          image: safari.image,
          duration: safari.duration,
        });
      }
    }
    if (items.length === 0) {
      items.push(
        ...tours.slice(0, 1).map((t) => ({
          id: t.id,
          title: t.title,
          type: "tour" as const,
          price: t.price,
          image: t.image,
          duration: t.duration,
        }))
      );
    }
    setSelectedItems(items);
  }, [tourId, safariId]);

  const subtotal = useMemo(() => {
    const itemsTotal = selectedItems.reduce((sum, item) => sum + item.price, 0);
    return itemsTotal * adults + itemsTotal * children * 0.5;
  }, [selectedItems, adults, children]);

  const serviceFee = subtotal * 0.05;
  const total = subtotal + serviceFee;

  const currentMonth = startOfMonth(selectedDate);
  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const today = startOfDay(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden">
      {/* Editorial Hero */}
      <section className="relative h-[45vh] bg-charcoal flex items-center px-6 sm:px-12 lg:px-24 overflow-hidden pt-12">
        <motion.div style={{ y, opacity }} className="absolute inset-0 opacity-[0.03] select-none pointer-events-none flex items-center justify-center">
           <h1 className="text-[6vw] font-display font-bold text-white whitespace-nowrap italic">RESERVE</h1>
        </motion.div>

        <div className="relative z-10 w-full max-w-[1200px] mx-auto">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px bg-amber" />
                <span className="text-amber font-bold text-[8px] tracking-[0.4em] uppercase">The Reservation Protocol</span>
              </div>
              <h1 className="text-white text-huge mb-6 relative">
                Secure Your <br /> <span className="italic ml-12 text-amber">Timeline.</span>
              </h1>
              
              {/* Step Indicators */}
              <div className="flex gap-8 items-center mt-6">
                 {[
                   { n: 1, label: "Configuration" },
                   { n: 2, label: "Identity" },
                   { n: 3, label: "Finalization" }
                 ].map((stepObj) => (
                   <div key={stepObj.n} className="flex items-center gap-3 group">
                      <span className={cn(
                        "font-display text-2xl italic transition-all duration-700",
                        step >= stepObj.n ? "text-amber" : "text-white/10"
                      )}>
                        0{stepObj.n}
                      </span>
                      <span className={cn(
                        "text-[7px] font-bold tracking-[0.3em] uppercase transition-all duration-700",
                        step >= stepObj.n ? "text-white/60" : "text-white/5"
                      )}>
                        {stepObj.label}
                      </span>
                      {stepObj.n < 3 && <div className="w-6 h-px bg-white/10" />}
                   </div>
                 ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Form Area */}
      <section className="py-16 bg-sand/20 relative">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-24">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16"
              >
                <div className="lg:col-span-8 space-y-12">
                  {/* Calendar Portfolio - Mobile App Style */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="font-display italic text-amber text-xl">01</span>
                      <div className="w-6 h-px bg-charcoal/10" />
                      <span className="text-[8px] font-bold tracking-[0.4em] uppercase text-charcoal/30">Temporal Selection</span>
                    </div>
                    
                    <div className="bg-white p-6 sm:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.08)] relative overflow-hidden rounded-3xl">
                       <div className="flex items-center justify-between mb-10">
                         <div>
                            <h3 className="text-2xl font-bold text-charcoal font-display italic tracking-tight">
                              {format(currentMonth, "MMMM yyyy")}
                            </h3>
                            <span className="text-[10px] font-bold text-charcoal/20 uppercase tracking-[0.3em]">Select your arrival date</span>
                         </div>
                         <div className="flex gap-2">
                           <button 
                             onClick={() => setSelectedDate(addDays(currentMonth, -30))} 
                             className="w-10 h-10 rounded-2xl bg-sand/50 flex items-center justify-center hover:bg-amber hover:text-white transition-all duration-500 hover-trigger"
                           >
                             <ChevronLeft className="w-5 h-5" />
                           </button>
                           <button 
                             onClick={() => setSelectedDate(addDays(currentMonth, 30))} 
                             className="w-10 h-10 rounded-2xl bg-sand/50 flex items-center justify-center hover:bg-amber hover:text-white transition-all duration-500 hover-trigger"
                           >
                             <ChevronRight className="w-5 h-5" />
                           </button>
                         </div>
                       </div>

                       <div className="grid grid-cols-7 gap-1">
                          {weekDays.map(d => (
                            <div key={d} className="text-center text-[8px] font-bold text-charcoal/20 uppercase tracking-[0.2em] py-4">{d}</div>
                          ))}
                          
                          {Array.from({ length: days[0].getDay() }).map((_, i) => (
                            <div key={`empty-${i}`} className="aspect-square" />
                          ))}
                          
                          {days.map((day) => {
                            const isSelected = isSameDay(day, selectedDate);
                            const isPast = isBefore(day, today);
                            const isCurrentMonth = day.getMonth() === currentMonth.getMonth();

                            return (
                              <button
                                key={day.toISOString()}
                                onClick={() => !isPast && setSelectedDate(day)}
                                disabled={isPast}
                                className={cn(
                                  "aspect-square flex flex-col items-center justify-center rounded-2xl text-sm transition-all duration-500 relative group hover-trigger",
                                  isSelected 
                                    ? "bg-amber text-white font-bold shadow-[0_10px_25px_rgba(217,119,6,0.4)] scale-95" 
                                    : "hover:bg-sand/50 text-charcoal/80",
                                  isPast ? "opacity-[0.05] cursor-not-allowed" : "",
                                  !isCurrentMonth ? "opacity-20" : ""
                                )}
                              >
                                <span className={cn(
                                  "relative z-10",
                                  isSelected ? "font-display italic text-lg" : ""
                                )}>
                                  {format(day, "d")}
                                </span>
                                {isSameDay(day, new Date()) && !isSelected && (
                                  <div className="w-1 h-1 bg-amber rounded-full mt-0.5" />
                                )}
                              </button>
                            );
                          })}
                       </div>
                    </div>
                  </div>

                  {/* Group Density */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="font-display italic text-amber text-xl">02</span>
                      <div className="w-6 h-px bg-charcoal/10" />
                      <span className="text-[8px] font-bold tracking-[0.4em] uppercase text-charcoal/30">Guest Density</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      {[
                        { label: "Adults", sub: "Ages 13+", val: adults, set: setAdults, min: 1 },
                        { label: "Children", sub: "Ages 3-12", val: children, set: setChildren, min: 0 },
                      ].map((item) => (
                        <div key={item.label} className="bg-white p-6 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.04)] flex justify-between items-center group transition-all">
                           <div>
                             <h4 className="font-display text-2xl mb-1 group-hover:italic transition-all duration-700">{item.label}</h4>
                             <span className="text-[8px] font-bold text-charcoal/20 uppercase tracking-[0.3em]">{item.sub}</span>
                           </div>
                           <div className="flex items-center gap-5">
                             <button 
                               onClick={() => item.set(Math.max(item.min, item.val - 1))} 
                               className="w-8 h-8 rounded-xl bg-sand flex items-center justify-center text-charcoal/40 hover:text-amber hover:bg-sand/80 transition-all hover-trigger"
                             >
                               <Minus className="w-4 h-4" />
                             </button>
                             <span className="font-display text-3xl italic w-10 text-center tracking-tighter text-charcoal/80">{item.val}</span>
                             <button 
                               onClick={() => item.set(item.val + 1)} 
                               className="w-8 h-8 rounded-xl bg-sand flex items-center justify-center text-charcoal/40 hover:text-amber hover:bg-sand/80 transition-all hover-trigger"
                             >
                               <Plus className="w-4 h-4" />
                             </button>
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Summary Sidebar */}
                <div className="lg:col-span-4">
                  <div className="sticky top-24 bg-white border border-charcoal/5 p-8 space-y-10 shadow-[0_40px_80px_rgba(0,0,0,0.06)] rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber/[0.03] blur-3xl rounded-full" />
                    
                    <div>
                      <span className="text-[7px] font-bold tracking-[0.4em] uppercase text-charcoal/30 block mb-6">Your Selection</span>
                      {selectedItems.map(item => (
                        <div key={item.id} className="flex gap-4 group mb-5">
                           <div className="w-14 h-14 bg-sand overflow-hidden shrink-0 shadow-sm rounded-2xl">
                             <img src={item.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                           </div>
                           <div>
                             <h4 className="font-display text-base mb-0.5 italic leading-tight">{item.title}</h4>
                             <div className="w-4 h-px bg-amber mb-1 opacity-40" />
                             <span className="text-[7px] font-bold text-charcoal/40 uppercase tracking-[0.3em]">{item.duration}</span>
                           </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-charcoal/5 pt-8 space-y-4">
                       <div className="flex justify-between items-center">
                         <span className="text-charcoal/30 uppercase tracking-[0.25em] text-[8px] font-bold">Departure</span>
                         <span className="font-display text-base italic text-charcoal/80">{format(selectedDate, "MMM do, yyyy")}</span>
                       </div>
                       <div className="flex justify-between items-end pt-4 border-t border-charcoal/5">
                         <span className="text-charcoal/30 uppercase tracking-[0.25em] text-[8px] font-bold">Total Investment</span>
                         <div className="text-right">
                           <span className="font-display text-3xl italic text-amber tracking-tighter">${total.toLocaleString()}</span>
                           <span className="block text-[6px] font-bold text-charcoal/20 uppercase tracking-widest">Incl. all services</span>
                         </div>
                       </div>
                    </div>

                    <button onClick={() => setStep(2)} className="btn-raw w-full !px-0 hover-trigger !py-4 !bg-charcoal !text-white hover:!bg-amber rounded-2xl shadow-lg">
                      Proceed to Identity
                    </button>
                    
                    <div className="flex items-center justify-center gap-2 text-[7px] font-bold text-charcoal/20 uppercase tracking-[0.3em] pt-2">
                       <ShieldCheck className="w-3 h-3 text-amber/40" />
                       Encrypted Transaction
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-4xl mx-auto bg-white p-8 sm:p-16 relative overflow-hidden shadow-2xl rounded-[3rem]"
              >
                <div className="absolute top-0 right-0 p-8 opacity-[0.015] pointer-events-none select-none">
                  <h3 className="text-[8vw] font-display text-charcoal leading-none italic uppercase font-bold">Identity</h3>
                </div>

                <form onSubmit={handleSubmit} className="relative z-10 space-y-12">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-3">
                        <label className="text-[9px] font-bold tracking-[0.4em] uppercase text-charcoal/20">First Identity</label>
                        <input
                          type="text" required
                          className="w-full bg-sand/10 border-b border-charcoal/10 py-3 px-4 text-charcoal text-xl font-light focus:outline-none focus:border-amber transition-all duration-700 font-display italic rounded-t-xl"
                          placeholder="Julianne"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] font-bold tracking-[0.4em] uppercase text-charcoal/20">Last Identity</label>
                        <input
                          type="text" required
                          className="w-full bg-sand/10 border-b border-charcoal/10 py-3 px-4 text-charcoal text-xl font-light focus:outline-none focus:border-amber transition-all duration-700 font-display italic rounded-t-xl"
                          placeholder="Moore"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-3">
                        <label className="text-[9px] font-bold tracking-[0.4em] uppercase text-charcoal/20">Digital Link</label>
                        <input
                          type="email" required
                          className="w-full bg-sand/10 border-b border-charcoal/10 py-3 px-4 text-charcoal text-xl font-light focus:outline-none focus:border-amber transition-all duration-700 font-display italic rounded-t-xl"
                          placeholder="julianne@arch.com"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] font-bold tracking-[0.4em] uppercase text-charcoal/20">Contact Number</label>
                        <input
                          type="tel" required
                          className="w-full bg-sand/10 border-b border-charcoal/10 py-3 px-4 text-charcoal text-xl font-light focus:outline-none focus:border-amber transition-all duration-700 font-display italic rounded-t-xl"
                          placeholder="+1 ..."
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[9px] font-bold tracking-[0.4em] uppercase text-charcoal/20">Special Requests</label>
                      <textarea
                        rows={3}
                        className="w-full bg-sand/10 border-b border-charcoal/10 py-3 px-4 text-charcoal text-xl font-light focus:outline-none focus:border-amber transition-all duration-700 resize-none font-display italic rounded-t-xl"
                        placeholder="Dietary requirements or specific curiosities..."
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-8 pt-4">
                       <button type="button" onClick={() => setStep(1)} className="text-[9px] font-bold tracking-[0.4em] uppercase text-charcoal/30 hover:text-charcoal transition-all hover-trigger">
                         ← Configuration
                       </button>
                       <button type="submit" className="btn-raw !bg-charcoal !text-white hover:!bg-amber hover-trigger !px-12 !py-4 rounded-2xl shadow-xl">
                         Finalize Reservation Request
                       </button>
                    </div>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl mx-auto text-center py-20 bg-white shadow-2xl rounded-[4rem] px-8 sm:px-16"
              >
                <div className="w-20 h-20 bg-amber/10 border border-amber text-amber rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-[0_15px_30px_rgba(217,119,6,0.15)] rotate-12 group-hover:rotate-0 transition-transform duration-700">
                  <Check className="w-10 h-10" />
                </div>
                <h2 className="text-[7vw] font-display text-charcoal mb-6 italic leading-none tracking-tighter">Transmitted.</h2>
                <p className="text-charcoal/60 text-xl font-light leading-relaxed mb-12 max-w-lg mx-auto font-display italic">
                  "Your journey request has been recorded. An architect will contact 
                  you within the next solar cycle to finalize the details."
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                   <Link to="/" className="btn-raw hover-trigger !px-10 !py-4 rounded-2xl shadow-lg">Return to Archives</Link>
                   <Link to="/safaris" className="text-[9px] font-bold tracking-[0.4em] uppercase text-charcoal/30 hover:text-charcoal transition-colors hover-trigger">Explore More Collections</Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
