import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Check,
  ArrowUpRight,
} from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-sand">
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[380px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1920&q=80"
          alt="Contact ZanTrica"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/30 to-charcoal/80" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-amber font-semibold text-[11px] tracking-[0.2em] uppercase mb-4 block">
                Get in Touch
              </span>
              <h1 className="font-display text-[clamp(3rem,7vw,5.5rem)] text-white mb-5 tracking-tight leading-[1.05]">
                Contact Us
              </h1>
              <p className="text-lg text-white/60 max-w-xl leading-relaxed font-light">
                Have questions about a tour? Need a custom itinerary? We're here
                to help plan your perfect adventure.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="font-display text-3xl text-charcoal mb-7 tracking-tight">
                  Let's Talk
                </h2>
                <p className="text-warm-gray leading-[1.85] mb-10 text-[15px]">
                  Whether you're planning months ahead or looking for a
                  last-minute adventure, our team is ready to craft the perfect
                  experience for you.
                </p>
              </motion.div>

              <div className="space-y-7">
                {[
                  {
                    icon: MapPin,
                    title: "Visit Us",
                    lines: ["123 Kenyatta Road, Stone Town", "Zanzibar, Tanzania"],
                  },
                  {
                    icon: Phone,
                    title: "Call Us",
                    lines: ["+255 123 456 789", "+255 987 654 321"],
                  },
                  {
                    icon: Mail,
                    title: "Email Us",
                    lines: ["hello@zantrica.com", "bookings@zantrica.com"],
                  },
                  {
                    icon: Clock,
                    title: "Office Hours",
                    lines: [
                      "Monday - Saturday: 8am - 8pm",
                      "Sunday: 9am - 5pm (Zanzibar Time)",
                    ],
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.1,
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-11 h-11 rounded-xl bg-teal/[0.06] flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-teal" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-charcoal mb-1 tracking-tight">
                        {item.title}
                      </h3>
                      {item.lines.map((line, j) => (
                        <p key={j} className="text-[13px] text-warm-gray leading-relaxed">
                          {line}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {!submitted ? (
                <motion.form
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  onSubmit={handleSubmit}
                  className="bg-white rounded-2xl p-8 lg:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                >
                  <h3 className="font-display text-2xl text-charcoal mb-8 tracking-tight">
                    Send a Message
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[13px] font-semibold text-charcoal mb-2.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-100 focus:border-teal focus:ring-2 focus:ring-teal/10 outline-none transition-all duration-300 text-[14px]"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-charcoal mb-2.5">
                        Email Address
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
                        Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-100 focus:border-teal focus:ring-2 focus:ring-teal/10 outline-none transition-all duration-300 text-[14px] bg-white"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="booking">Booking Question</option>
                        <option value="custom">Custom Itinerary</option>
                        <option value="group">Group Booking</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-charcoal mb-2.5">
                        Message
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-100 focus:border-teal focus:ring-2 focus:ring-teal/10 outline-none transition-all duration-300 resize-none text-[14px]"
                        placeholder="Tell us about your dream trip..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 bg-teal text-white rounded-2xl font-semibold text-sm tracking-wide hover:bg-deep-forest transition-all duration-500 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-teal/20 hover:-translate-y-px"
                    >
                      <Send className="w-4 h-4" /> Send Message
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white rounded-2xl p-12 lg:p-16 shadow-[0_1px_3px_rgba(0,0,0,0.04)] text-center"
                >
                  <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-7">
                    <Check className="w-8 h-8 text-teal" />
                  </div>
                  <h3 className="font-display text-2xl text-charcoal mb-4 tracking-tight">
                    Message Sent!
                  </h3>
                  <p className="text-warm-gray max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out,{" "}
                    {formData.name || "friend"}. We'll get back to you within 24
                    hours.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
