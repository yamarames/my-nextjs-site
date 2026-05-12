import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Users,
  Minus,
  Plus,
  Check,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
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

const STEPS = [
  { n: 1, label: "Trip Details" },
  { n: 2, label: "Your Details" },
  { n: 3, label: "Confirmed" },
];

export default function Booking() {
  const [searchParams] = useSearchParams();
  const tourId = searchParams.get("tour");
  const safariId = searchParams.get("safari");

  const [selectedDate, setSelectedDate] = useState<Date>(addDays(new Date(), 3));
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(new Date());
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedItems, setSelectedItems] = useState<BookingItem[]>([]);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const items: BookingItem[] = [];
    if (tourId) {
      const tour = getTourById(tourId);
      if (tour) items.push({ id: tour.id, title: tour.title, type: "tour", price: tour.price, image: tour.image, duration: tour.duration });
    }
    if (safariId) {
      const safari = getSafariById(safariId);
      if (safari) items.push({ id: safari.id, title: safari.title, type: "safari", price: safari.price, image: safari.image, duration: safari.duration });
    }
    if (items.length === 0) {
      items.push(...tours.slice(0, 1).map((t) => ({ id: t.id, title: t.title, type: "tour" as const, price: t.price, image: t.image, duration: t.duration })));
    }
    setSelectedItems(items);
  }, [tourId, safariId]);

  const subtotal = useMemo(() => {
    const itemsTotal = selectedItems.reduce((sum, item) => sum + item.price, 0);
    return itemsTotal * adults + itemsTotal * children * 0.5;
  }, [selectedItems, adults, children]);

  const serviceFee = subtotal * 0.05;
  const total = subtotal + serviceFee;

  const currentMonth = startOfMonth(currentMonthDate);
  const days = eachDayOfInterval({ start: startOfMonth(currentMonth), end: endOfMonth(currentMonth) });
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = startOfDay(new Date());

  const handlePrevMonth = () => setCurrentMonthDate(addDays(currentMonth, -1));
  const handleNextMonth = () => setCurrentMonthDate(addDays(endOfMonth(currentMonth), 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-sand/30">
      {/* ── HEADER ── */}
      <section className="bg-charcoal pt-20 pb-12">
        <div className="section-container">
          <h1 className="text-4xl sm:text-5xl font-display font-semibold text-white mb-3">
            Book Your Trip
          </h1>
          <p className="text-white/60 text-base max-w-md">
            Complete the form below and our team will confirm your booking within 24 hours.
          </p>

          {/* Step indicator */}
          <div className="flex items-center gap-3 mt-8">
            {STEPS.map((s, i) => (
              <div key={s.n} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500",
                      step > s.n
                        ? "bg-amber text-white"
                        : step === s.n
                        ? "bg-white text-charcoal ring-2 ring-amber"
                        : "bg-white/10 text-white/30"
                    )}
                  >
                    {step > s.n ? <Check className="w-4 h-4" /> : s.n}
                  </div>
                  <span
                    className={cn(
                      "text-sm font-semibold transition-colors",
                      step >= s.n ? "text-white" : "text-white/30"
                    )}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={cn("w-12 h-0.5 transition-colors", step > s.n ? "bg-amber" : "bg-white/10")} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM AREA ── */}
      <section className="py-10">
        <div className="section-container">
          <AnimatePresence mode="wait">
            {/* ── STEP 1: TRIP DETAILS ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Left: Calendar + Guests */}
                <div className="lg:col-span-8 space-y-8">
                  {/* Date Picker */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber/10 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-amber" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-charcoal text-lg">Choose Your Date</h3>
                          <p className="text-xs text-charcoal/50">Select your preferred start date</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      {/* Month navigation */}
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-xl font-display font-semibold text-charcoal">
                          {format(currentMonth, "MMMM yyyy")}
                        </h4>
                        <div className="flex gap-2">
                          <button
                            onClick={handlePrevMonth}
                            className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-amber hover:text-white transition-all"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleNextMonth}
                            className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-amber hover:text-white transition-all"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {weekDays.map((d) => (
                          <div key={d} className="text-center text-xs font-semibold text-charcoal/30 py-2">
                            {d}
                          </div>
                        ))}
                        {Array.from({ length: days[0].getDay() }).map((_, i) => (
                          <div key={`e-${i}`} className="aspect-square" />
                        ))}
                        {days.map((day) => {
                          const isSelected = isSameDay(day, selectedDate);
                          const isPast = isBefore(day, today);
                          const isToday = isSameDay(day, new Date());

                          return (
                            <button
                              key={day.toISOString()}
                              onClick={() => !isPast && setSelectedDate(day)}
                              disabled={isPast}
                              className={cn(
                                "aspect-square flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200",
                                isSelected
                                  ? "bg-amber text-white font-bold shadow-md"
                                  : isToday
                                  ? "bg-amber/10 text-amber font-bold border border-amber/30"
                                  : isPast
                                  ? "text-charcoal/15 cursor-not-allowed"
                                  : "text-charcoal hover:bg-sand"
                              )}
                            >
                              {format(day, "d")}
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-4 flex items-center gap-3 p-3 bg-amber/5 rounded-xl border border-amber/10">
                        <Calendar className="w-4 h-4 text-amber shrink-0" />
                        <p className="text-sm text-charcoal/70">
                          Selected:{" "}
                          <strong className="text-charcoal">
                            {format(selectedDate, "EEEE, MMMM do, yyyy")}
                          </strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber/10 flex items-center justify-center">
                          <Users className="w-5 h-5 text-amber" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-charcoal text-lg">Number of Guests</h3>
                          <p className="text-xs text-charcoal/50">Children get 50% discount</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      {[
                        { label: "Adults", sub: "Ages 13 and over", val: adults, set: setAdults, min: 1 },
                        { label: "Children", sub: "Ages 3–12 (50% discount)", val: children, set: setChildren, min: 0 },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                          <div>
                            <p className="font-semibold text-charcoal text-base">{item.label}</p>
                            <p className="text-xs text-charcoal/50 mt-0.5">{item.sub}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => item.set(Math.max(item.min, item.val - 1))}
                              className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-charcoal hover:bg-amber hover:text-white transition-all"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-2xl font-bold text-charcoal w-8 text-center font-display">
                              {item.val}
                            </span>
                            <button
                              onClick={() => item.set(item.val + 1)}
                              className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-charcoal hover:bg-amber hover:text-white transition-all"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Booking Summary */}
                <div className="lg:col-span-4">
                  <div className="sticky top-24 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                      <h3 className="font-semibold text-charcoal text-lg">Booking Summary</h3>
                    </div>
                    <div className="p-6 space-y-5">
                      {/* Selected tours */}
                      {selectedItems.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-semibold text-charcoal text-sm leading-tight">{item.title}</p>
                            <p className="text-xs text-charcoal/50 mt-1 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {item.duration}
                            </p>
                            <span className={cn(
                              "text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block",
                              item.type === "tour" ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600"
                            )}>
                              {item.type === "tour" ? "Day Tour" : "Safari"}
                            </span>
                          </div>
                        </div>
                      ))}

                      <div className="pt-4 border-t border-gray-100 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-charcoal/60">Departure Date</span>
                          <span className="font-semibold text-charcoal">{format(selectedDate, "MMM d, yyyy")}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-charcoal/60">Adults × {adults}</span>
                          <span className="font-semibold text-charcoal">${(selectedItems.reduce((s, i) => s + i.price, 0) * adults).toLocaleString()}</span>
                        </div>
                        {children > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-charcoal/60">Children × {children} (50% off)</span>
                            <span className="font-semibold text-charcoal">${(selectedItems.reduce((s, i) => s + i.price, 0) * children * 0.5).toLocaleString()}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm">
                          <span className="text-charcoal/60">Service fee (5%)</span>
                          <span className="font-semibold text-charcoal">${serviceFee.toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between pt-3 border-t border-gray-100">
                          <span className="font-bold text-charcoal">Total</span>
                          <div className="text-right">
                            <span className="text-2xl font-bold text-amber font-display">${total.toLocaleString()}</span>
                            <p className="text-xs text-charcoal/40">All taxes included</p>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setStep(2)}
                        className="w-full btn-primary justify-center py-4 text-base"
                      >
                        Continue to Your Details
                        <ArrowRight className="w-5 h-5" />
                      </button>

                      <div className="flex items-center justify-center gap-2 text-xs text-charcoal/40 pt-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber/60" />
                        Secure booking · Free cancellation available
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: YOUR DETAILS ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="max-w-3xl mx-auto"
              >
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-8 border-b border-gray-100">
                    <h2 className="text-2xl font-display font-semibold text-charcoal">Your Details</h2>
                    <p className="text-charcoal/60 text-sm mt-1">Fill in your contact information to complete the booking request.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="form-label">First Name</label>
                        <input type="text" required className="form-input" placeholder="John" />
                      </div>
                      <div>
                        <label className="form-label">Last Name</label>
                        <input type="text" required className="form-input" placeholder="Smith" />
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="form-label">Email Address</label>
                        <input type="email" required className="form-input" placeholder="john@email.com" />
                      </div>
                      <div>
                        <label className="form-label">Phone Number</label>
                        <input type="tel" required className="form-input" placeholder="+1 234 567 8900" />
                      </div>
                    </div>

                    {/* Nationality */}
                    <div>
                      <label className="form-label">Nationality / Country</label>
                      <input type="text" className="form-input" placeholder="e.g. United Kingdom" />
                    </div>

                    {/* Special requests */}
                    <div>
                      <label className="form-label">Special Requests or Dietary Requirements</label>
                      <textarea
                        rows={4}
                        className="form-input resize-none"
                        placeholder="e.g. vegetarian meals, wheelchair access, celebrating an anniversary..."
                      />
                    </div>

                    {/* Summary box */}
                    <div className="flex items-start gap-4 p-4 bg-amber/5 rounded-xl border border-amber/10">
                      <Calendar className="w-5 h-5 text-amber shrink-0 mt-0.5" />
                      <div className="text-sm text-charcoal/70">
                        <p><strong className="text-charcoal">{format(selectedDate, "EEEE, MMMM d, yyyy")}</strong></p>
                        <p>{adults} adult{adults > 1 ? "s" : ""}{children > 0 ? ` + ${children} child${children > 1 ? "ren" : ""}` : ""} · Total: <strong className="text-amber">${total.toLocaleString()}</strong></p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex items-center gap-2 text-sm font-semibold text-charcoal/50 hover:text-charcoal transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Trip Details
                      </button>
                      <button
                        type="submit"
                        className="btn-primary px-10 py-4 text-base flex-1 sm:flex-none justify-center"
                      >
                        Complete Booking Request
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: CONFIRMED ── */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto text-center py-8"
              >
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 sm:p-16">
                  <div className="w-20 h-20 bg-green-50 border-2 border-green-200 text-green-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
                    <Check className="w-10 h-10" />
                  </div>
                  <h2 className="text-4xl font-display font-semibold text-charcoal mb-4">
                    Booking Received!
                  </h2>
                  <p className="text-charcoal/60 text-lg leading-relaxed mb-4 max-w-md mx-auto">
                    Thank you! Your booking request has been submitted successfully.
                  </p>
                  <div className="bg-sand/50 rounded-xl p-5 mb-8 text-left space-y-2">
                    <p className="text-sm text-charcoal/70">
                      <span className="font-semibold text-charcoal">What happens next:</span>
                    </p>
                    <ul className="space-y-1.5 text-sm text-charcoal/60">
                      <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-green-500 shrink-0" /> Our team reviews your request within 2–4 hours</li>
                      <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-green-500 shrink-0" /> You receive a confirmation email with all details</li>
                      <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-green-500 shrink-0" /> We'll contact you to finalise any special arrangements</li>
                    </ul>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/" className="btn-primary px-8 py-3.5">
                      Back to Home
                    </Link>
                    <Link to="/tours" className="btn-outline px-8 py-3.5">
                      Browse More Tours
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
