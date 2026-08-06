"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import { Check, X, ArrowRight } from "lucide-react";
import Link from "next/link";

const comparisonHighlights = [
  {
    feature: "Engagement Model",
    traditional: "Transactional, deadline-driven",
    finsaar: "Continuous, integrated operating partner",
  },
  {
    feature: "Financial Focus",
    traditional: "Historical reporting & tax filing",
    finsaar: "Forward-looking forecasting & strategy",
  },
  {
    feature: "Data Visibility",
    traditional: "Static period-end statements",
    finsaar: "Real-time KPI dashboards & margin analysis",
  },
];

export default function HomeWhyFinsaar() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section 
      ref={ref}
      className="py-24 lg:py-32 bg-sand-light/30 relative z-20 -mt-6 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]"
      style={{ borderTopLeftRadius: '100vw 6vw', borderBottomRightRadius: '100vw 6vw' }}
    >
      <motion.div style={{ y }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="font-body text-sm text-copper font-medium uppercase tracking-widest">
            Why Finsaar
          </span>
          <Heading as="h2" className="mt-4">
            You&apos;re scaling fast.{" "}
            <span className="text-copper">Your finances shouldn&apos;t hold you back.</span>
          </Heading>
          <Text size="lg" muted className="mt-6">
            The jump from ₹1Cr to ₹10Cr demands more than a traditional CA.
            You need an embedded financial operating system built for velocity.
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-sand/40 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 bg-navy text-white">
            <div className="p-5 font-heading font-semibold text-white/70 text-sm uppercase tracking-wider border-b md:border-b-0 md:border-r border-white/10">Feature</div>
            <div className="p-5 font-heading font-semibold text-white/70 text-sm uppercase tracking-wider border-b md:border-b-0 md:border-r border-white/10">Traditional CA</div>
            <div className="p-5 font-heading font-semibold text-sm uppercase tracking-wider"><span className="text-copper">Finsaar</span> CFO</div>
          </div>
          {comparisonHighlights.map((row, i) => (
            <div key={row.feature} className={`grid grid-cols-1 md:grid-cols-3 ${i < comparisonHighlights.length - 1 ? "border-b border-sand/30" : ""}`}>
              <div className="p-5 font-heading font-semibold text-navy text-sm border-b md:border-b-0 md:border-r border-sand/20">{row.feature}</div>
              <div className="p-5 font-body text-sm text-navy/50 flex items-start gap-2 border-b md:border-b-0 md:border-r border-sand/20">
                <X size={14} className="text-terracotta/60 shrink-0 mt-0.5" />{row.traditional}
              </div>
              <div className="p-5 font-body text-sm text-navy flex items-start gap-2">
                <Check size={14} className="text-emerald shrink-0 mt-0.5" />{row.finsaar}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link href="/about" className="inline-flex items-center gap-2 font-heading font-semibold text-copper hover:text-copper-dark transition-colors group">
            Learn more about our approach
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
