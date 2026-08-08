"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Heading from "@/components/ui/Heading";

// --- Custom Code-Driven 2D Animated Icons ---

const AnimatedBook = () => (
  <motion.svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
    <motion.path 
      d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    />
    <motion.path 
      d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" 
      fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    />
    <motion.path 
      d="M10 6h6" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      initial={{ pathLength: 0 }}
      whileHover={{ pathLength: 1 }}
      transition={{ duration: 0.4 }}
    />
    <motion.path 
      d="M10 10h6" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      initial={{ pathLength: 0 }}
      whileHover={{ pathLength: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    />
    {/* Flipping page effect on hover */}
    <motion.path
      d="M6.5 2 L12 6 L12 22 L6.5 17 Z"
      fill="currentColor" fillOpacity="0.2"
      initial={{ opacity: 0, scaleX: 0, originX: "6.5px" }}
      whileHover={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
    />
  </motion.svg>
);

const AnimatedTax = () => (
  <motion.svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-600">
    <rect x="4" y="2" width="16" height="20" rx="2" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
    <line x1="8" y1="6" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="8" y1="10" x2="16" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    
    {/* Stamp that pops in on hover */}
    <motion.g
      initial={{ scale: 0, opacity: 0, rotate: 15 }}
      whileHover={{ scale: 1, opacity: 1, rotate: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      style={{ originX: "14px", originY: "16px" }}
    >
      <circle cx="14" cy="16" r="4" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5" />
      <path d="M12.5 16l1 1 2-2" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </motion.g>
  </motion.svg>
);

const AnimatedPayroll = () => (
  <motion.svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
    <rect x="2" y="6" width="20" height="12" rx="2" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    
    {/* Coins dropping on hover */}
    <motion.circle cx="12" cy="12" r="2" fill="currentColor" 
      initial={{ y: -15, opacity: 0 }}
      whileHover={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 }}
    />
    <motion.circle cx="8" cy="12" r="1.5" fill="currentColor" 
      initial={{ y: -15, opacity: 0 }}
      whileHover={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
    />
    <motion.circle cx="16" cy="12" r="1.5" fill="currentColor" 
      initial={{ y: -15, opacity: 0 }}
      whileHover={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.3 }}
    />
  </motion.svg>
);

const AnimatedSearch = () => (
  <motion.svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-orange-600">
    {/* The requested Shield animation */}
    <motion.path 
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" 
      fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      initial={{ pathLength: 1 }}
      whileHover={{ strokeDasharray: "100", strokeDashoffset: [100, 0] }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
    {/* Inner checkmark popping up */}
    <motion.path 
      d="M9 12l2 2 4-4" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      whileHover={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    />
  </motion.svg>
);

const AnimatedSync = () => (
  <motion.svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-rose-600">
    <motion.g
      whileHover={{ rotate: 180 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      style={{ originX: "12px", originY: "12px" }}
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 3v5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </motion.g>
    {/* Center dot scales up */}
    <motion.circle 
      cx="12" cy="12" r="2" fill="currentColor"
      initial={{ scale: 0 }}
      whileHover={{ scale: 1 }}
      transition={{ type: "spring", delay: 0.2 }}
    />
  </motion.svg>
);

const AnimatedChart = () => (
  <motion.svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-amber-600">
    {/* Axes */}
    <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Bars growing on hover */}
    <motion.rect x="7" y="14" width="3" height="7" rx="1" fill="currentColor" fillOpacity="0.8"
      initial={{ height: 0, y: 21 }}
      whileHover={{ height: 7, y: 14 }}
      transition={{ duration: 0.4 }}
    />
    <motion.rect x="13" y="10" width="3" height="11" rx="1" fill="currentColor" fillOpacity="0.8"
      initial={{ height: 0, y: 21 }}
      whileHover={{ height: 11, y: 10 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    />
    <motion.rect x="19" y="4" width="3" height="17" rx="1" fill="currentColor" fillOpacity="0.8"
      initial={{ height: 0, y: 21 }}
      whileHover={{ height: 17, y: 4 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    />
    
    {/* Trend line drawing over bars */}
    <motion.path 
      d="M3 16l5-5 6 2 7-9" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      whileHover={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
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
    bgClass: "bg-blue-50/40 hover:bg-blue-50/80",
    borderClass: "border-blue-100",
  },
  {
    title: "Taxes & compliance",
    desc: "Navigate complex tax codes effortlessly.",
    icon: AnimatedTax,
    colSpan: "lg:col-span-1",
    bgClass: "bg-emerald-50/40 hover:bg-emerald-50/80",
    borderClass: "border-emerald-100",
  },
  {
    title: "Payroll Management",
    desc: "Accurate, on-time payroll for your growing team.",
    icon: AnimatedPayroll,
    colSpan: "lg:col-span-1",
    bgClass: "bg-purple-50/40 hover:bg-purple-50/80",
    borderClass: "border-purple-100",
  },
  {
    title: "Due diligence support",
    desc: "Prepare for investments with flawless data rooms.",
    icon: AnimatedSearch,
    colSpan: "lg:col-span-1",
    bgClass: "bg-orange-50/40 hover:bg-orange-50/80",
    borderClass: "border-orange-100",
  },
  {
    title: "AR/AP reconciliation",
    desc: "Keep cashflows positive and relationships strong.",
    icon: AnimatedSync,
    colSpan: "lg:col-span-1",
    bgClass: "bg-rose-50/40 hover:bg-rose-50/80",
    borderClass: "border-rose-100",
  },
  {
    title: "MIS Reporting",
    desc: "Turn raw numbers into actionable growth strategies.",
    icon: AnimatedChart,
    colSpan: "lg:col-span-2",
    bgClass: "bg-amber-50/40 hover:bg-amber-50/80",
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
          className="text-center max-w-4xl mx-auto mb-16 lg:mb-20"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto auto-rows-[minmax(220px,auto)] md:auto-rows-[minmax(260px,auto)]">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              className={`group relative overflow-hidden rounded-3xl p-6 md:p-8 lg:p-10 border transition-all duration-500 flex flex-col justify-start hover:shadow-xl ${service.colSpan} ${service.bgClass} ${service.borderClass}`}
            >
              {/* Animated 2D Icon Container */}
              <motion.div 
                className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-white/80 flex items-center justify-center relative z-10"
                whileHover="hover"
                initial="initial"
              >
                <service.icon />
              </motion.div>
              
              <div className="relative z-10 mt-6 lg:mt-8">
                <h3 className="font-heading font-bold text-xl lg:text-2xl leading-tight text-navy mb-3 group-hover:translate-x-1 transition-transform duration-300">
                  {service.title}
                </h3>
                <p className="font-body text-navy/70 text-sm md:text-base leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity duration-300">
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
