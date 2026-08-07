"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Heading from "@/components/ui/Heading";

// --- Custom Animated Icons ---

const AnimatedBook = () => (
  <motion.svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    <motion.path 
      d="M6 8h2" 
      initial={{ pathLength: 0, opacity: 0 }}
      whileHover={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
    />
    <motion.path 
      d="M6 12h2" 
      initial={{ pathLength: 0, opacity: 0 }}
      whileHover={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    />
    <motion.path 
      d="M16 8h2" 
      initial={{ pathLength: 0, opacity: 0 }}
      whileHover={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    />
    <motion.path 
      d="M16 12h2" 
      initial={{ pathLength: 0, opacity: 0 }}
      whileHover={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    />
  </motion.svg>
);

const AnimatedTax = () => (
  <motion.svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <motion.path 
      d="M9 16l2 2 4-4" 
      initial={{ pathLength: 0, opacity: 0 }}
      whileHover={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
  </motion.svg>
);

const AnimatedPayroll = () => (
  <motion.svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <motion.circle 
      cx="19" cy="11" r="3"
      initial={{ y: -10, opacity: 0 }}
      whileHover={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, type: "spring" }}
    />
    <motion.path 
      d="M19 14v.01" 
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    />
  </motion.svg>
);

const AnimatedSearch = () => (
  <motion.svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange-600">
    <motion.g
      whileHover={{ x: [0, -3, 3, 0], y: [0, 2, -2, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </motion.g>
    <motion.path 
      d="M11 8v.01" 
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
    />
    <motion.path 
      d="M8 11h.01" 
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    />
  </motion.svg>
);

const AnimatedSync = () => (
  <motion.svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-rose-600">
    <motion.g
      whileHover={{ rotate: 180 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{ originX: "12px", originY: "12px" }}
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </motion.g>
  </motion.svg>
);

const AnimatedChart = () => (
  <motion.svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
    <line x1="3" y1="21" x2="21" y2="21" />
    <motion.path 
      d="M5 21V16a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" 
      initial={{ scaleY: 0, transformOrigin: "bottom" }}
      whileHover={{ scaleY: 1 }}
      transition={{ duration: 0.3 }}
    />
    <motion.path 
      d="M11 21V10a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v11" 
      initial={{ scaleY: 0, transformOrigin: "bottom" }}
      whileHover={{ scaleY: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    />
    <motion.path 
      d="M17 21V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v17" 
      initial={{ scaleY: 0, transformOrigin: "bottom" }}
      whileHover={{ scaleY: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    />
  </motion.svg>
);

// --- Data ---

const services = [
  {
    title: "Book keeping & accounting",
    desc: "Maintain pristine financial records that are always audit-ready.",
    icon: AnimatedBook,
    colSpan: "lg:col-span-2",
    bgClass: "bg-blue-50/50 hover:bg-blue-50",
    borderClass: "border-blue-100",
  },
  {
    title: "Taxes & compliance",
    desc: "Navigate complex tax codes effortlessly.",
    icon: AnimatedTax,
    colSpan: "lg:col-span-1",
    bgClass: "bg-emerald-50/50 hover:bg-emerald-50",
    borderClass: "border-emerald-100",
  },
  {
    title: "Payroll Management",
    desc: "Accurate, on-time payroll for your growing team.",
    icon: AnimatedPayroll,
    colSpan: "lg:col-span-1",
    bgClass: "bg-purple-50/50 hover:bg-purple-50",
    borderClass: "border-purple-100",
  },
  {
    title: "Due diligence support",
    desc: "Prepare for investments with flawless data rooms.",
    icon: AnimatedSearch,
    colSpan: "lg:col-span-1",
    bgClass: "bg-orange-50/50 hover:bg-orange-50",
    borderClass: "border-orange-100",
  },
  {
    title: "AR/AP reconciliation",
    desc: "Keep cashflows positive and relationships strong.",
    icon: AnimatedSync,
    colSpan: "lg:col-span-1",
    bgClass: "bg-rose-50/50 hover:bg-rose-50",
    borderClass: "border-rose-100",
  },
  {
    title: "MIS Reporting",
    desc: "Turn raw numbers into actionable growth strategies.",
    icon: AnimatedChart,
    colSpan: "lg:col-span-2",
    bgClass: "bg-amber-50/50 hover:bg-amber-50",
    borderClass: "border-amber-100",
  },
];

export default function HomeServices() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section 
      ref={ref}
      className="py-24 lg:py-32 bg-white relative overflow-hidden z-30 border-b border-sand/20"
    >
      <motion.div style={{ y }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16 lg:mb-24"
        >
          <span className="font-body text-sm text-navy/60 font-medium uppercase tracking-widest">Our Services</span>
          <Heading as="h2" className="mt-4">
            <span className="text-navy">What we do</span>
          </Heading>
          <p className="font-body text-lg md:text-xl text-navy/70 mt-8 leading-relaxed max-w-3xl mx-auto">
            Whether you're scaling from <span className="font-bold text-navy">1→10</span> or <span className="font-bold text-navy">10→100</span>, Finsaar takes care of your business finance and compliance so owners can focus on what they are meant to do: <span className="font-bold text-copper">scale their dreams</span>.
          </p>
        </motion.div>

        {/* Premium Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto auto-rows-[minmax(260px,auto)]">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              className={`group relative overflow-hidden rounded-3xl p-8 border transition-all duration-500 flex flex-col justify-between hover:shadow-xl ${service.colSpan} ${service.bgClass} ${service.borderClass}`}
            >
              {/* Animated Icon Container */}
              <motion.div 
                className="w-16 h-16 rounded-2xl bg-white/60 shadow-sm border border-white/50 flex items-center justify-center relative z-10"
                whileHover="hover"
                initial="initial"
              >
                <service.icon />
              </motion.div>
              
              <div className="relative z-10 mt-6">
                <h3 className="font-heading font-bold text-xl lg:text-2xl text-navy mb-2 group-hover:translate-x-1 transition-transform duration-300">
                  {service.title}
                </h3>
                <p className="font-body text-navy/60 text-sm md:text-base leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {service.desc}
                </p>
              </div>

              {/* Background abstract decoration on hover */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/40 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
