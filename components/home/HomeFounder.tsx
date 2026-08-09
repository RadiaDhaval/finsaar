"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Heading from "@/components/ui/Heading";
import { Award, Users, Briefcase, TrendingUp } from "lucide-react";
import GrowthAnimation from "@/components/ui/GrowthAnimation";

const stats = [
  { icon: TrendingUp, value: "₹1,000cr+", label: "Assets Managed" },
  { icon: Users, value: "100+", label: "Years Combined Exp." },
  { icon: Briefcase, value: "50+", label: "Clients Served" },
  { icon: Award, value: "3", label: "Founder CAs" },
];

export default function HomeFounder() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section 
      ref={ref}
      className="py-24 lg:py-32 bg-navy relative overflow-hidden z-50 -mt-6 shadow-[0_-15px_40px_rgba(0,0,0,0.1)]"
      style={{ borderTopLeftRadius: '50% 8vw', borderTopRightRadius: '50% 8vw' }}
    >
      <GrowthAnimation />
      <motion.div style={{ y }}>
        {/* Background glow effects */}
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-52 h-52 rounded-full bg-copper/10 blur-3xl pointer-events-none animate-[pulse_6s_infinite]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <span className="font-body text-sm text-copper font-semibold uppercase tracking-widest">Who We Are</span>
          <Heading as="h2" className="mt-4 text-white">
            Founder CFOs, <span className="bg-gradient-to-r from-copper-light to-copper bg-clip-text text-transparent">for founders</span>
          </Heading>
          
          <div className="font-body text-lg text-white/70 mt-8 leading-relaxed max-w-3xl mx-auto space-y-4">
            <p>
              We&apos;re a team of Chartered Accountants and seasoned CFOs with over 100 years of combined experience. As entrepreneurs and founders ourselves, we understand these pain points firsthand — our singular goal is to help founders and owners scale their businesses.
            </p>
            <p>
              Through our CFO as a Service offering, we handle accounting, taxes & compliance, and the finance function — for businesses ranging from startups like Fabswadeshi to listed entities like Dhansa Labs Ltd.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-copper/45 hover:shadow-[0_8px_30px_rgba(181,114,59,0.06)] transition-all duration-300 group"
            >
              <stat.icon size={24} className="text-copper-light mx-auto mb-3 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
              <p className="font-heading font-extrabold text-2xl md:text-3xl text-white">{stat.value}</p>
              <p className="font-body text-xs text-white/40 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
      </motion.div>
    </section>
  );
}
