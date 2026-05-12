import { motion } from "framer-motion";
import { Heart, Leaf, Star, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Heart,
    title: "Passion First",
    description:
      "We started ZanTrica because we love sharing our home. Every tour is crafted with genuine care and real enthusiasm for this island.",
  },
  {
    icon: Leaf,
    title: "Sustainable Travel",
    description:
      "We partner with local communities, support conservation efforts, and make sure our footprint on this beautiful land stays positive.",
  },
  {
    icon: Star,
    title: "Excellence Always",
    description:
      "From our vehicles to our guides to our accommodation partners, we hold every detail to the highest standard.",
  },
  {
    icon: Shield,
    title: "Protecting Nature",
    description:
      "A portion of every booking goes directly to wildlife conservation and community development projects across Tanzania.",
  },
];

const team = [
  {
    name: "Omar Juma",
    role: "Founder & Lead Guide",
    bio: "Born and raised in Stone Town, Omar has spent 15 years showing visitors the hidden soul of Zanzibar.",
    // Replace with nanobanana: portrait of a warm Tanzanian man, early 40s, outdoor setting
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85",
  },
  {
    name: "Fatima Hassan",
    role: "Operations Manager",
    bio: "Fatima keeps everything running smoothly so every guest experience feels effortless from start to finish.",
    // Replace with nanobanana: portrait of a Tanzanian woman, professional outdoor setting
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=85",
  },
  {
    name: "David Mwinyi",
    role: "Safari Lead",
    bio: "David has tracked wildlife across Tanzania for over a decade. He knows where the elephants sleep.",
    // Replace with nanobanana: portrait of a Tanzanian man in safari gear, natural light
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=85",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        {/* Replace with nanobanana: aerial Zanzibar coastline at golden hour, turquoise water, palm trees */}
        <img
          src="https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=1920&q=85"
          alt="Zanzibar coastline"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/30 to-charcoal/70" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 h-full flex flex-col justify-end px-6 sm:px-12 lg:px-24 pb-16 max-w-[1400px] mx-auto w-full"
        >
          <span className="text-amber text-xs font-bold tracking-widest uppercase mb-4">Our Story</span>
          <h1 className="text-white font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-tight mb-4">
            People Who Love<br />This Place
          </h1>
          <p className="text-white/75 text-lg sm:text-xl max-w-xl leading-relaxed">
            ZanTrica is a team of 24 local guides, storytellers, and conservationists
            who believe great travel starts with genuine connection.
          </p>
        </motion.div>
      </section>

      {/* Origin Story */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-amber text-xs font-bold tracking-widest uppercase mb-4 block">How We Started</span>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-charcoal leading-tight mb-8">
                From a Single Dhow<br />to a Family Business
              </h2>
              <div className="space-y-5 text-charcoal/70 text-lg leading-relaxed">
                <p>
                  ZanTrica began in 2015 when Omar Juma decided to share his island
                  with the world — not as a tourist destination, but as a living,
                  breathing home.
                </p>
                <p>
                  What started as sunset cruises for friends grew into something
                  much bigger. Today we are a family of explorers who believe the
                  best experiences come from genuine intimacy with the land and
                  its people.
                </p>
                <p>
                  Every guide on our team was born within 100 km of the places we
                  take you. That is not a marketing line — it is just who we are.
                </p>
              </div>
              <div className="mt-10 flex items-center gap-10">
                <div>
                  <div className="font-display text-5xl font-semibold italic text-amber">24</div>
                  <div className="text-sm text-charcoal/50 mt-1">Local team members</div>
                </div>
                <div className="w-px h-12 bg-charcoal/10" />
                <div>
                  <div className="font-display text-5xl font-semibold italic text-amber">10+</div>
                  <div className="text-sm text-charcoal/50 mt-1">Years of experience</div>
                </div>
                <div className="w-px h-12 bg-charcoal/10" />
                <div>
                  <div className="font-display text-5xl font-semibold italic text-amber">4,000+</div>
                  <div className="text-sm text-charcoal/50 mt-1">Happy travellers</div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="aspect-[3/4] overflow-hidden rounded-2xl shadow-lg"
              >
                {/* Replace with nanobanana: local Zanzibar guide with guests on a dhow boat, warm golden light */}
                <img
                  src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=85"
                  alt="Guides and guests on a dhow"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.8 }}
                className="aspect-[3/4] overflow-hidden rounded-2xl shadow-lg mt-10"
              >
                {/* Replace with nanobanana: Stone Town narrow alley with local people, warm afternoon light */}
                <img
                  src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=85"
                  alt="Stone Town, Zanzibar"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-32 bg-sand/40">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
          <div className="text-center mb-16">
            <span className="text-amber text-xs font-bold tracking-widest uppercase mb-4 block">What We Stand For</span>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-charcoal leading-tight">
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-charcoal/5 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-amber/10 rounded-xl flex items-center justify-center mb-5">
                  <v.icon className="w-6 h-6 text-amber" />
                </div>
                <h3 className="font-display text-xl font-semibold text-charcoal mb-3">{v.title}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
          <div className="text-center mb-16">
            <span className="text-amber text-xs font-bold tracking-widest uppercase mb-4 block">The People Behind ZanTrica</span>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-charcoal leading-tight">
              Meet the Team
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                className="group text-center"
              >
                <div className="aspect-square overflow-hidden rounded-2xl shadow-md mb-6 bg-sand">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h4 className="font-display text-2xl font-semibold text-charcoal mb-1">{member.name}</h4>
                <span className="text-amber text-xs font-bold tracking-widest uppercase">{member.role}</span>
                <p className="text-charcoal/60 text-sm leading-relaxed mt-3 max-w-xs mx-auto">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32 bg-charcoal">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 text-center">
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-white leading-tight mb-6">
            Ready to Explore<br />Tanzania with Us?
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Browse our tours or get in touch — we will put together a trip that feels made for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/safaris" className="btn-primary text-base px-8 py-4">
              Explore Our Tours
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white/20 text-white font-semibold text-base hover:border-amber hover:text-amber transition-all duration-300"
            >
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
