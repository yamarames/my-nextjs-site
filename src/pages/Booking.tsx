import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Users,
  Minus,
  Plus,
  Check,
  ArrowRight,
  CreditCard,
  Shield,
  Clock,
  MapPin,
  Star,
} from "lucide-react";
import {
  format,
  addDays,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    specialRequests: "",
  });

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
        ...tours.slice(0, 3).map((t) => ({
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
    <div className="min-h-screen bg-sand pt-[72px]">
      {/* Header */}
      <section className="bg-charcoal py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
        </div>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-white mb-5 tracking-tight">
              Book Your Adventure
            </h1>
            <p className="text-white/50 max-w-xl leading-relaxed font-light">
              Select your dates, group size, and any add-ons. We'll handle the
              rest.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="flex items-center gap-6 mt-14">
            {["Select & Customize", "Your Details", "Confirmation"].map(
              (s, i) => (
                <div key={s} className="flex items-center gap-4">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold transition-all duration-500 ${
                      step > i + 1
                        ? "bg-teal text-white"
                        : step === i + 1
                        ? "bg-amber text-charcoal"
                        : "bg-white/[0.08] text-white/30"
                    }`}
                  >
                    {step > i + 1 ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span
                    className={`text-[13px] hidden sm:block font-medium transition-colors duration-500 ${
                      step >= i + 1 ? "text-white" : "text-white/30"
                    }`}
                  >
                    {s}
                  </span>
                  {i < 2 && (
                    <div className="w-10 h-px bg-white/[0.08] hidden sm:block" />
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Calendar */}
                  <div className="bg-white rounded-2xl p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                    <h2 className="font-display text-xl text-charcoal mb-7 flex items-center gap-2.5 tracking-tight">
                      <CalendarIcon className="w-5 h-5 text-teal" />
                      Select Your Date
                    </h2>
                    <div className="max-w-sm mx-auto">
                      <div className="flex items-center justify-between mb-5">
                        <button
                          onClick={() =>
                            setSelectedDate(addDays(currentMonth, -30))
                          }
                          className="p-2.5 hover:bg-gray-50 rounded-xl transition-colors"
                        >
                          <ArrowRight className="w-4 h-4 rotate-180" />
                        </button>
                        <span className="font-display text-lg text-charcoal tracking-tight">
                          {format(currentMonth, "MMMM yyyy")}
                        </span>
                        <button
                          onClick={() =>
                            setSelectedDate(addDays(currentMonth, 30))
                          }
                          className="p-2.5 hover:bg-gray-50 rounded-xl transition-colors"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {weekDays.map((d) => (
                          <div
                            key={d}
                            className="text-center text-[11px] font-bold text-warm-gray py-2"
                          >
                            {d}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: days[0].getDay() }).map((_, i) => (
                          <div key={`empty-${i}`} />
                        ))}
                        {days.map((day) => {
                          const isSelected = isSameDay(day, selectedDate);
                          const isToday = isSameDay(day, today);
                          const isPast = isBefore(day, today);
                          return (
                            <button
                              key={day.toISOString()}
                              onClick={() => !isPast && setSelectedDate(day)}
                              disabled={isPast}
                              className={cn(
                                "aspect-square rounded-lg text-[13px] font-semibold transition-all duration-300",
                                isSelected
                                  ? "bg-teal text-white shadow-lg shadow-teal/20"
                                  : isToday
                                  ? "bg-amber/15 text-amber font-bold"
                                  : isPast
                                  ? "text-gray-200 cursor-not-allowed"
                                  : "text-charcoal hover:bg-teal/[0.06] hover:text-teal"
                              )}
                            >
                              {format(day, "d")}
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-center text-[13px] text-warm-gray mt-5">
                        Selected:{" "}
                        <span className="font-semibold text-teal">
                          {format(selectedDate, "EEEE, MMMM do, yyyy")}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Group Size */}
                  <div className="bg-white rounded-2xl p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                    <h2 className="font-display text-xl text-charcoal mb-7 flex items-center gap-2.5 tracking-tight">
                      <Users className="w-5 h-5 text-teal" />
                      Group Size
                    </h2>
                    <div className="space-y-7">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-charcoal text-[15px]">
                            Adults
                          </div>
                          <div className="text-[13px] text-warm-gray">
                            Ages 13+
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setAdults(Math.max(1, adults - 1))}
                            className="w-10 h-10 rounded-full border-2 border-gray-100 flex items-center justify-center hover:border-teal hover:text-teal transition-all duration-300"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-6 text-center font-bold text-lg">
                            {adults}
                          </span>
                          <button
                            onClick={() => setAdults(adults + 1)}
                            className="w-10 h-10 rounded-full border-2 border-gray-100 flex items-center justify-center hover:border-teal hover:text-teal transition-all duration-300"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-charcoal text-[15px]">
                            Children
                          </div>
                          <div className="text-[13px] text-warm-gray">
                            Ages 3-12 (50% off)
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() =>
                              setChildren(Math.max(0, children - 1))
                            }
                            className="w-10 h-10 rounded-full border-2 border-gray-100 flex items-center justify-center hover:border-teal hover:text-teal transition-all duration-300"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-6 text-center font-bold text-lg">
                            {children}
                          </span>
                          <button
                            onClick={() => setChildren(children + 1)}
                            className="w-10 h-10 rounded-full border-2 border-gray-100 flex items-center justify-center hover:border-teal hover:text-teal transition-all duration-300"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Selected Items */}
                  <div className="bg-white rounded-2xl p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                    <h2 className="font-display text-xl text-charcoal mb-6 tracking-tight">
                      Selected Experiences
                    </h2>
                    <div className="space-y-4">
                      {selectedItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-4 p-4 bg-sand rounded-xl"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-20 h-20 rounded-xl object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold tracking-wide ${
                                  item.type === "safari"
                                    ? "bg-coral/10 text-coral"
                                    : "bg-teal/10 text-teal"
                                }`}
                              >
                                {item.type === "safari" ? "Safari" : "Tour"}
                              </span>
                            </div>
                            <h3 className="font-display text-charcoal tracking-tight">
                              {item.title}
                            </h3>
                            <div className="flex items-center gap-4 text-[11px] text-warm-gray mt-1.5">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {item.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-amber fill-current" />
                                {item.price > 200
                                  ? "$" + item.price.toLocaleString()
                                  : "$" + item.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Summary */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <div className="bg-white rounded-2xl p-7 shadow-lg">
                      <h3 className="font-display text-xl text-charcoal mb-7 tracking-tight">
                        Booking Summary
                      </h3>

                      <div className="space-y-3.5 mb-7">
                        <div className="flex justify-between text-[13px]">
                          <span className="text-warm-gray">Date</span>
                          <span className="font-semibold text-charcoal">
                            {format(selectedDate, "MMM do, yyyy")}
                          </span>
                        </div>
                        <div className="flex justify-between text-[13px]">
                          <span className="text-warm-gray">Adults</span>
                          <span className="font-semibold text-charcoal">
                            {adults}
                          </span>
                        </div>
                        {children > 0 && (
                          <div className="flex justify-between text-[13px]">
                            <span className="text-warm-gray">Children</span>
                            <span className="font-semibold text-charcoal">
                              {children}
                            </span>
                          </div>
                        )}
                        <div className="border-t pt-4 mt-4">
                          <div className="flex justify-between text-[13px]">
                            <span className="text-warm-gray">Subtotal</span>
                            <span className="font-semibold text-charcoal">
                              ${subtotal.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between text-[13px] mt-2.5">
                            <span className="text-warm-gray">
                              Service Fee (5%)
                            </span>
                            <span className="font-semibold text-charcoal">
                              ${serviceFee.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-5 mb-7">
                        <div className="flex justify-between items-baseline">
                          <span className="font-display text-lg text-charcoal tracking-tight">
                            Total
                          </span>
                          <span className="font-display text-[28px] text-teal tracking-tight">
                            ${total.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => setStep(2)}
                        className="w-full py-4 bg-teal text-white rounded-2xl font-semibold text-sm tracking-wide hover:bg-deep-forest transition-all duration-500 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-teal/20 hover:-translate-y-px"
                      >
                        Continue <ArrowRight className="w-4 h-4" />
                      </button>

                      <div className="flex items-center justify-center gap-5 mt-5 text-[11px] text-warm-gray">
                        <span className="flex items-center gap-1">
                          <Shield className="w-3 h-3" /> Secure
                        </span>
                        <span className="flex items-center gap-1">
                          <CreditCard className="w-3 h-3" /> SSL Encrypted
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                <div className="lg:col-span-2">
                  <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl p-8 lg:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)] space-y-7"
                  >
                    <h2 className="font-display text-2xl text-charcoal mb-8 tracking-tight">
                      Traveler Details
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[13px] font-semibold text-charcoal mb-2.5">
                          First Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({ ...formData, firstName: e.target.value })
                          }
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-100 focus:border-teal focus:ring-2 focus:ring-teal/10 outline-none transition-all duration-300 text-[14px]"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-semibold text-charcoal mb-2.5">
                          Last Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({ ...formData, lastName: e.target.value })
                          }
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-100 focus:border-teal focus:ring-2 focus:ring-teal/10 outline-none transition-all duration-300 text-[14px]"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[13px] font-semibold text-charcoal mb-2.5">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-100 focus:border-teal focus:ring-2 focus:ring-teal/10 outline-none transition-all duration-300 text-[14px]"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-semibold text-charcoal mb-2.5">
                          Phone
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-100 focus:border-teal focus:ring-2 focus:ring-teal/10 outline-none transition-all duration-300 text-[14px]"
                          placeholder="+1 234 567 890"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-charcoal mb-2.5">
                        Country
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.country}
                        onChange={(e) =>
                          setFormData({ ...formData, country: e.target.value })
                        }
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-100 focus:border-teal focus:ring-2 focus:ring-teal/10 outline-none transition-all duration-300 text-[14px]"
                        placeholder="United States"
                      />
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-charcoal mb-2.5">
                        Special Requests
                      </label>
                      <textarea
                        rows={4}
                        value={formData.specialRequests}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            specialRequests: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-100 focus:border-teal focus:ring-2 focus:ring-teal/10 outline-none transition-all duration-300 resize-none text-[14px]"
                        placeholder="Dietary requirements, accessibility needs, celebration details..."
                      />
                    </div>

                    <div className="flex gap-4 pt-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-7 py-3.5 border-2 border-gray-100 rounded-xl font-semibold text-[13px] text-warm-gray hover:border-teal hover:text-teal transition-all duration-500"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3.5 bg-teal text-white rounded-xl font-semibold text-[13px] tracking-wide hover:bg-deep-forest transition-all duration-500 hover:shadow-lg hover:shadow-teal/20 hover:-translate-y-px"
                      >
                        Complete Booking
                      </button>
                    </div>
                  </form>
                </div>

                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <div className="bg-white rounded-2xl p-7 shadow-lg">
                      <h3 className="font-display text-lg text-charcoal mb-5 tracking-tight">
                        Booking Summary
                      </h3>
                      <div className="space-y-2.5 text-[13px] mb-5">
                        <div className="flex justify-between">
                          <span className="text-warm-gray">Date</span>
                          <span>{format(selectedDate, "MMM do")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-warm-gray">Adults</span>
                          <span>{adults}</span>
                        </div>
                        {children > 0 && (
                          <div className="flex justify-between">
                            <span className="text-warm-gray">Children</span>
                            <span>{children}</span>
                          </div>
                        )}
                      </div>
                      <div className="border-t pt-5">
                        <div className="flex justify-between items-baseline font-display text-lg">
                          <span>Total</span>
                          <span className="text-teal tracking-tight">
                            ${total.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl mx-auto text-center py-20"
              >
                <div className="w-20 h-20 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Check className="w-10 h-10 text-teal" />
                </div>
                <h2 className="font-display text-[clamp(2rem,5vw,3rem)] text-charcoal mb-5 tracking-tight">
                  Booking Confirmed!
                </h2>
                <p className="text-warm-gray mb-10 leading-relaxed max-w-md mx-auto">
                  Thank you, {formData.firstName || "Traveler"}! We've received
                  your booking request for{" "}
                  {format(selectedDate, "MMMM do, yyyy")}. Our team will contact
                  you within 24 hours to finalize the details.
                </p>
                <div className="bg-white rounded-2xl p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] text-left max-w-md mx-auto mb-10">
                  <h3 className="font-display text-lg text-charcoal mb-5 tracking-tight">
                    Booking Details
                  </h3>
                  <div className="space-y-3 text-[13px]">
                    <div className="flex justify-between">
                      <span className="text-warm-gray">Date</span>
                      <span className="font-semibold">
                        {format(selectedDate, "EEEE, MMM do, yyyy")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-warm-gray">Adults</span>
                      <span className="font-semibold">{adults}</span>
                    </div>
                    {children > 0 && (
                      <div className="flex justify-between">
                        <span className="text-warm-gray">Children</span>
                        <span className="font-semibold">{children}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-warm-gray">Total</span>
                      <span className="font-semibold text-teal">
                        ${total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <a
                  href="/"
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-teal text-white rounded-2xl font-semibold text-sm tracking-wide hover:bg-deep-forest transition-all duration-500 hover:shadow-lg hover:shadow-teal/20 hover:-translate-y-px"
                >
                  Back to Home
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
