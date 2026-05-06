import { motion } from "framer-motion";
import { Compass, Heart, Globe, Award, Users, TreePine } from "lucide-react";

const team = [
  {
    name: "Omar Juma",
    role: "Founder & Lead Guide",
    bio: "Born and raised in Stone Town, Omar has been guiding visitors through Zanzibar's secrets for over 15 years. His encyclopedic knowledge of local history and wildlife is matched only by his warmth and storytelling ability.",
  },
  {
    name: "Fatima Hassan",
    role: "Operations Director",
    bio: "Fatima ensures every detail of your journey is flawless. From hotel pickups to dietary requirements, she orchestrates the behind-the-scenes magic that makes ZanTrica experiences seamless.",
  },
  {
    name: "David Mwinyi",
    role: "Safari Specialist",
    bio: "A certified field guide with over a decade of experience in Tanzania's national parks, David has an uncanny ability to find the Big Five and read animal behavior like no one else.",
  },
];

const values = [
  {
    icon: Heart,
    title: "Passion First",
    description:
      "We started ZanTrica because we love sharing our home. Every tour is crafted with genuine care and enthusiasm.",
  },
  {
    icon: Globe,
    title: "Sustainable Travel",
    description:
      "We partner with local communities, support conservation efforts, and ensure our impact on this beautiful land is positive.",
  },
  {
    icon: Award,
    title: "Excellence Always",
    description:
      "From our vehicles to our guides to our accommodation partners, we accept only the highest standards.",
  },
  {
    icon: TreePine,
    title: "Protecting Nature",
    description:
      "A portion of every booking goes directly to wildlife conservation and community development projects.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-sand">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[450px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1920&q=80"
          alt="About ZanTrica"
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
                Our Story
              </span>
              <h1 className="font-display text-[clamp(3rem,7vw,5.5rem)] text-white mb-5 tracking-tight leading-[1.05]">
                About ZanTrica
              </h1>
              <p className="text-lg text-white/60 max-w-xl leading-relaxed font-light">
                A story of passion, place, and the belief that travel should
                transform both visitor and visited.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-charcoal mb-8 tracking-tight leading-[1.1]">
                From a Single Dhow to
                <span className="block text-amber italic font-light mt-1">
                  a Family of Explorers
                </span>
              </h2>
              <div className="space-y-5 text-warm-gray leading-[1.85] text-[15px]">
                <p>
                  ZanTrica began in 2015 when Omar Juma, a third-generation Stone
                  Town resident, decided to share his island with the world—not as
                  a tourist destination, but as a living, breathing home.
                </p>
                <p>
                  What started as sunset dhow cruises for friends grew into
                  something much larger. Today, we're a team of 24 passionate
                  locals who believe that the best travel experiences come from
                  genuine connection—to the land, the wildlife, and the people who
                  call this place home.
                </p>
                <p>
                  We've hosted over 15,000 guests from 45 countries, but we still
                  approach every booking as if it's our first. Because for us, this
                  isn't just business. It's our life's work.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 gap-5"
            >
              <div className="space-y-5">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600&q=80"
                    alt="Stone Town"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-teal rounded-2xl p-7 text-white">
                  <div className="font-display text-4xl mb-1 tracking-tight">9+</div>
                  <div className="text-[13px] text-white/70">Years of Excellence</div>
                </div>
              </div>
              <div className="space-y-5 pt-10">
                <div className="bg-amber rounded-2xl p-7 text-charcoal">
                  <div className="font-display text-4xl mb-1 tracking-tight">15K+</div>
                  <div className="text-[13px] text-charcoal/60">Happy Travelers</div>
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80"
                    alt="Safari"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 bg-cream relative">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-teal font-semibold text-[11px] tracking-[0.2em] uppercase mb-4 block"
            >
              What We Believe
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.1,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-display text-[clamp(2rem,4vw,3rem)] text-charcoal tracking-tight"
            >
              Our Values
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-white rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-lg hover:shadow-charcoal/5 transition-all duration-700 group"
              >
                <div className="w-11 h-11 rounded-xl bg-teal/[0.06] flex items-center justify-center mb-6 group-hover:bg-teal transition-all duration-500">
                  <value.icon className="w-5 h-5 text-teal group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="font-display text-xl text-charcoal mb-3 tracking-tight">
                  {value.title}
                </h3>
                <p className="text-[13px] text-warm-gray leading-[1.75]">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-coral font-semibold text-[11px] tracking-[0.2em] uppercase mb-4 block"
            >
              The People
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.1,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-display text-[clamp(2rem,4vw,3rem)] text-charcoal tracking-tight"
            >
              Meet Our Team
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-white rounded-2xl p-9 shadow-[0_1px_3px_rgba(0,0,0,0.04)] text-center hover:shadow-lg hover:shadow-charcoal/5 transition-all duration-700"
              >
                <div className="w-16 h-16 rounded-full bg-teal/[0.06] flex items-center justify-center mx-auto mb-7">
                  <Users className="w-7 h-7 text-teal" />
                </div>
                <h3 className="font-display text-xl text-charcoal mb-1 tracking-tight">
                  {member.name}
                </h3>
                <p className="text-teal text-[13px] font-semibold mb-5 tracking-wide">
                  {member.role}
                </p>
                <p className="text-[13px] text-warm-gray leading-[1.8]">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
