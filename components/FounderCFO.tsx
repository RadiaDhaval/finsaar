"use client";

import { motion } from "framer-motion";
import Heading from "@/components/ui/Heading";
import { Award, Users, Briefcase, TrendingUp } from "lucide-react";

const stats = [
  { icon: TrendingUp, value: "₹1,000cr+", label: "Assets Managed" },
  { icon: Users, value: "100+", label: "Years Combined Experience" },
  { icon: Briefcase, value: "50+", label: "Clients Served" },
  { icon: Award, value: "3", label: "Founder CAs" },
];

export default function FounderCFO() {
  return (
    <section
      id="founder"
      className="py-20 lg:py-28 bg-navy relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-copper/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-52 h-52 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="font-body text-sm text-copper font-medium uppercase tracking-widest">
            Meet Your CFOs
          </span>
          <Heading as="h2" className="mt-4 text-white">
            We are <span className="text-copper">Founder CFOs</span>
          </Heading>
          <p className="font-body text-lg text-white/60 mt-6 leading-relaxed">
            Chartered Accountants and seasoned CFOs with a combined experience
            of 100+ years. We&apos;ve managed over ₹1,000 crores across
            industries, helping businesses scale from seed to series and beyond.
          </p>
        </motion.div>

        {/* Founder Portraits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {[
            {
              name: "Rajesh Mehta",
              role: "Co-Founder & Managing Partner",
              experience: "35+ years in Corporate Finance & M&A",
            },
            {
              name: "Priya Krishnamurthy",
              role: "Co-Founder & CFO Advisory Lead",
              experience: "30+ years in Financial Strategy & Compliance",
            },
            {
              name: "Amit Srinivasan",
              role: "Co-Founder & Capital Markets Head",
              experience: "35+ years in Capital Advisory & Fundraising",
            },
          ].map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="text-center group"
            >
              {/* Avatar placeholder */}
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-copper/30 to-copper/10 border-2 border-copper/30 flex items-center justify-center mb-5 group-hover:border-copper/60 transition-colors duration-300">
                <span className="font-heading font-bold text-3xl text-copper">
                  {founder.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <h4 className="font-heading font-bold text-lg text-white">
                {founder.name}
              </h4>
              <p className="font-body text-sm text-copper mt-1">{founder.role}</p>
              <p className="font-body text-xs text-white/40 mt-2">
                {founder.experience}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-copper/30 transition-colors duration-300"
            >
              <stat.icon
                size={24}
                className="text-copper mx-auto mb-3"
                strokeWidth={1.5}
              />
              <p className="font-heading font-extrabold text-2xl md:text-3xl text-white">
                {stat.value}
              </p>
              <p className="font-body text-xs text-white/40 mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
