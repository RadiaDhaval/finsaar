"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Heading from "@/components/ui/Heading";
import { Award, Users, Briefcase, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import DirectionHover from "@/components/DirectionHover";
import GrowthAnimation from "@/components/ui/GrowthAnimation";

const stats = [
  { icon: TrendingUp, value: "₹10,000Cr+", label: "Assets Managed" },
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
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-copper/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-52 h-52 rounded-full bg-white/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="font-body text-sm text-copper font-medium uppercase tracking-widest">Meet Your CFOs</span>
          <Heading as="h2" className="mt-4 text-white">
            We are <span className="text-copper">Founder CFOs</span>
          </Heading>
          <p className="font-body text-lg text-white/60 mt-6 leading-relaxed">
            Chartered Accountants and seasoned CFOs with a combined experience of 100+ years,
            managing over ₹10,000 crores across industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-copper/30 transition-colors"
            >
              <stat.icon size={24} className="text-copper mx-auto mb-3" strokeWidth={1.5} />
              <p className="font-heading font-extrabold text-2xl md:text-3xl text-white">{stat.value}</p>
              <p className="font-body text-xs text-white/40 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/about" className="inline-flex items-center gap-2 font-heading font-semibold text-copper transition-colors group">
            <DirectionHover 
              title="Meet the full team" 
              font={{ fontSize: 16, fontFamily: "var(--font-plus-jakarta)", fontWeight: 600 }} 
              textColor="#B5723B" 
              hoverColor="#8e5324" 
            />
            <ArrowRight size={16} className="text-copper group-hover:text-copper-dark group-hover:translate-x-1 transition-all" />
          </Link>
        </motion.div>
      </div>
      </motion.div>
    </section>
  );
}
