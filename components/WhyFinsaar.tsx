"use client";

import { motion } from "framer-motion";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import { Check, X } from "lucide-react";

const comparisonData = [
  {
    feature: "Engagement Model",
    traditional: "Transactional, deadline-driven",
    finsaar: "Continuous, integrated operating partner",
  },
  {
    feature: "Financial Focus",
    traditional: "Historical reporting & tax filing",
    finsaar: "Forward-looking forecasting & strategic planning",
  },
  {
    feature: "Data Visibility",
    traditional: "Static period-end financial statements",
    finsaar: "Real-time KPI dashboards & margin analysis",
  },
  {
    feature: "Capital Support",
    traditional: "Basic compliance documentation",
    finsaar: "M&A readiness, investor data rooms, term sheet support",
  },
  {
    feature: "Value Proposition",
    traditional: "Keeping business out of regulatory trouble",
    finsaar: "Accelerating business growth & scaling efficiency",
  },
];

export default function WhyFinsaar() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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
            The jump from ₹1Cr to ₹10Cr—or ₹10Cr to ₹100Cr—demands more than a
            traditional CA. You need an embedded financial operating system built
            for velocity.
          </Text>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-sand/40"
        >
          {/* Table Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 bg-navy text-white">
            <div className="p-5 md:p-6 font-heading font-semibold text-white/70 text-sm uppercase tracking-wider border-b md:border-b-0 md:border-r border-white/10">
              Feature
            </div>
            <div className="p-5 md:p-6 font-heading font-semibold text-white/70 text-sm uppercase tracking-wider border-b md:border-b-0 md:border-r border-white/10">
              Traditional CA Firm
            </div>
            <div className="p-5 md:p-6 font-heading font-semibold text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="text-copper">Finsaar</span> Fractional CFO
            </div>
          </div>

          {/* Table Rows */}
          {comparisonData.map((row, index) => (
            <div
              key={row.feature}
              className={`grid grid-cols-1 md:grid-cols-3 ${
                index < comparisonData.length - 1 ? "border-b border-sand/30" : ""
              } hover:bg-sand-light/20 transition-colors duration-200`}
            >
              <div className="p-5 md:p-6 font-heading font-semibold text-navy text-sm border-b md:border-b-0 md:border-r border-sand/20">
                {row.feature}
              </div>
              <div className="p-5 md:p-6 font-body text-sm text-navy/50 flex items-start gap-3 border-b md:border-b-0 md:border-r border-sand/20">
                <X size={16} className="text-terracotta/60 shrink-0 mt-0.5" />
                {row.traditional}
              </div>
              <div className="p-5 md:p-6 font-body text-sm text-navy flex items-start gap-3">
                <Check size={16} className="text-emerald shrink-0 mt-0.5" />
                {row.finsaar}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
