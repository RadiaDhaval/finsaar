"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import NetworkAnimation from "@/components/ui/NetworkAnimation";

const integrations = [
  {
    name: "Tally Prime",
    initial: "T",
    color: "bg-blue-50 text-blue-700 border-blue-100",
  },
  {
    name: "Zoho Books",
    initial: "Z",
    color: "bg-red-50 text-red-600 border-red-100",
  },
  {
    name: "Razorpay",
    initial: "R",
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
  {
    name: "ClearTax",
    initial: "C",
    color: "bg-green-50 text-green-600 border-green-100",
  },
  {
    name: "Microsoft Excel",
    initial: "X",
    color: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  {
    name: "QuickBooks",
    initial: "Q",
    color: "bg-teal-50 text-teal-600 border-teal-100",
  },
];
export default function TechIntegrations() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section 
      ref={ref}
      className="py-24 lg:py-32 bg-white overflow-hidden relative z-[60] -mt-6 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]"
      style={{ borderTopRightRadius: '100vw 6vw' }}
    >
      <NetworkAnimation />
      <motion.div style={{ y }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="font-body text-sm text-copper font-medium uppercase tracking-widest">
            Tech Agnostic
          </span>
          <Heading as="h2" className="mt-4">
            We fit into your{" "}
            <span className="text-copper">existing systems</span>
          </Heading>
          <Text size="lg" muted className="mt-6">
            No forced platform migrations. Finsaar works seamlessly with the
            tools you already trust.
          </Text>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 max-w-4xl mx-auto">
          {integrations.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-sand/40 bg-white hover:shadow-lg hover:border-copper/20 transition-all duration-300 cursor-default group"
            >
              <div
                className={`w-14 h-14 rounded-xl ${item.color} border flex items-center justify-center font-heading font-bold text-xl transition-transform duration-300 group-hover:scale-110`}
              >
                {item.initial}
              </div>
              <span className="font-body text-xs text-navy/50 text-center group-hover:text-navy/80 transition-colors">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
