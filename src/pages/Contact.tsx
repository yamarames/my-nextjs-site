import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, CheckCircle2, ArrowRight } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "safari",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[380px] overflow-hidden">
        {/* Replace with nanobanana: warm Zanzibar beach at sunrise, gentle waves, palm fronds in foreground */}
        <img
          src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1920&q=85"
          alt="Zanzibar beach"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-charcoal/30 to-charcoal/65" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 h-full flex flex-col justify-end px-6 sm:px-12 lg:px-24 pb-14 max-w-[1400px] mx-auto w-full"
        >
          <span className="text-amber text-xs font-bold tracking-widest uppercase mb-4">Contact Us</span>
          <h1 className="text-white font-display text-5xl sm:text-6xl font-semibold leading-tight mb-3">
            Let's Plan Your<br />Adventure
          </h1>
          <p className="text-white/75 text-lg max-w-lg leading-relaxed">
            Have a question or ready to book? We usually reply within a few hours.
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">

            {/* Left: Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl font-semibold text-charcoal mb-6">Our Offices</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-amber/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5 text-amber" />
                    </div>
                    <div>
                      <div className="font-semibold text-charcoal mb-1">Zanzibar Office</div>
                      <div className="text-charcoal/60 text-sm leading-relaxed">
                        Hurumzi St, Stone Town<br />
                        Zanzibar, Tanzania
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-amber/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5 text-amber" />
                    </div>
                    <div>
                      <div className="font-semibold text-charcoal mb-1">Arusha Office</div>
                      <div className="text-charcoal/60 text-sm leading-relaxed">
                        Njiro Road, Kijenge<br />
                        Arusha, Tanzania
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-charcoal/8" />

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-amber/10 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-amber" />
                  </div>
                  <div>
                    <div className="font-semibold text-charcoal mb-1">Phone</div>
                    <a href="tel:+255123456789" className="text-charcoal/60 text-sm hover:text-amber transition-colors">+255 123 456 789</a><br />
                    <a href="tel:+255987654321" className="text-charcoal/60 text-sm hover:text-amber transition-colors">+255 987 654 321</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-amber/10 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-amber" />
                  </div>
                  <div>
                    <div className="font-semibold text-charcoal mb-1">Email</div>
                    <a href="mailto:hello@zantrica.com" className="text-charcoal/60 text-sm hover:text-amber transition-colors">hello@zantrica.com</a><br />
                    <a href="mailto:field@zantrica.com" className="text-charcoal/60 text-sm hover:text-amber transition-colors">field@zantrica.com</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-amber/10 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-amber" />
                  </div>
                  <div>
                    <div className="font-semibold text-charcoal mb-1">Hours</div>
                    <div className="text-charcoal/60 text-sm leading-relaxed">
                      Mon – Sat: 8:00 am – 8:00 pm<br />
                      Sun: 9:00 am – 5:00 pm<br />
                      <span className="text-amber text-xs font-semibold">East Africa Time (EAT)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-charcoal/8" />

              <div className="bg-sand/50 rounded-2xl p-6">
                <h3 className="font-display text-lg font-semibold text-charcoal mb-2">Quick Response</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">
                  We typically reply within 2–4 hours during business hours. For urgent safari queries, call us directly.
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-2">
              {!submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-3xl border border-charcoal/8 shadow-sm p-8 sm:p-12"
                >
                  <h2 className="font-display text-3xl font-semibold text-charcoal mb-2">Send Us a Message</h2>
                  <p className="text-charcoal/55 text-base mb-8">Fill in the form and one of our guides will get back to you personally.</p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="form-label">Your Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Sarah Johnson"
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label className="form-label">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label">What are you interested in?</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="form-input"
                      >
                        <option value="safari">Wildlife Safari</option>
                        <option value="zanzibar">Zanzibar Island Tour</option>
                        <option value="custom">Custom Itinerary</option>
                        <option value="group">Private Group Trip</option>
                        <option value="general">General Question</option>
                      </select>
                    </div>

                    <div>
                      <label className="form-label">Your Message</label>
                      <textarea
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your trip idea — dates, group size, interests..."
                        className="form-input resize-none"
                      />
                    </div>

                    <button type="submit" className="btn-primary w-full sm:w-auto px-10 py-4 text-base gap-2">
                      Send Message <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-3xl border border-charcoal/8 shadow-sm p-12 text-center"
                >
                  <div className="w-20 h-20 bg-amber/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-amber" />
                  </div>
                  <h3 className="font-display text-3xl font-semibold text-charcoal mb-3">Message Sent!</h3>
                  <p className="text-charcoal/60 text-base max-w-sm mx-auto leading-relaxed mb-8">
                    Thanks for reaching out. One of our team members will get back to you within a few hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "safari", message: "" }); }}
                    className="btn-outline text-sm px-6 py-3"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
