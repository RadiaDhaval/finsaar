"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Heading from "@/components/ui/Heading";

// --- Premium Custom Brand-Aligned SVG Icons ---

const PremiumBook = () => (
  <svg width="64" height="64" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Base book cover */}
    <rect x="10" y="12" width="32" height="36" rx="4" fill="url(#navyGrad)" />
    {/* Book spine line */}
    <line x1="18" y1="12" x2="18" y2="48" stroke="white" strokeOpacity="0.15" strokeWidth="2" />
    {/* Pages overlapping */}
    <path d="M18 16 H44 V46 H18 Z" fill="white" fillOpacity="0.95" filter="url(#softShadow)" />
    <rect x="24" y="24" width="14" height="3" rx="1.5" fill="url(#navyGrad)" fillOpacity="0.15" />
    <rect x="24" y="32" width="10" height="3" rx="1.5" fill="url(#navyGrad)" fillOpacity="0.15" />
    {/* Glowing Copper Bookmark */}
    <path d="M32 10 V28 L36 24 L40 28 V10 Z" fill="url(#copperGrad)" filter="url(#softShadow)" />
    {/* Floating accent badge */}
    <circle cx="44" cy="42" r="8" fill="url(#copperGrad)" filter="url(#softGlow)" />
    <path d="M41 42 L43 44 L47 39" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PremiumTax = () => (
  <svg width="64" height="64" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Document Base */}
    <rect x="12" y="8" width="32" height="40" rx="4" fill="white" stroke="url(#navyGrad)" strokeWidth="4" filter="url(#softShadow)" />
    <rect x="20" y="18" width="16" height="3" rx="1.5" fill="url(#navyGrad)" fillOpacity="0.2" />
    <rect x="20" y="26" width="12" height="3" rx="1.5" fill="url(#navyGrad)" fillOpacity="0.2" />
    {/* Shield/Stamp overlap */}
    <path d="M28 26 L42 20 V32 C42 40 35 46 28 48 C21 46 14 40 14 32 V20 L28 26 Z" fill="url(#navyGrad)" filter="url(#softShadow)" />
    <path d="M28 28 L38 24 V32 C38 38 34 42 28 44 C22 42 18 38 18 32 V24 L28 28 Z" fill="url(#copperGrad)" />
    <path d="M24 32 L27 35 L33 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PremiumPayroll = () => (
  <svg width="64" height="64" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background element */}
    <rect x="8" y="14" width="36" height="28" rx="6" fill="url(#navyGrad)" filter="url(#softShadow)" />
    {/* Card chip */}
    <rect x="14" y="22" width="6" height="8" rx="2" fill="white" fillOpacity="0.5" />
    {/* Gold coins stack */}
    <circle cx="42" cy="24" r="10" fill="url(#copperLight)" filter="url(#softShadow)" />
    <circle cx="42" cy="30" r="10" fill="url(#copperGrad)" filter="url(#softShadow)" />
    <circle cx="42" cy="36" r="10" fill="url(#copperGrad)" filter="url(#softShadow)" />
    <circle cx="42" cy="36" r="8" fill="none" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />
    <path d="M39 36 H45" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <path d="M42 33 V39" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const PremiumSearch = () => (
  <svg width="64" height="64" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Abstract target / data layers */}
    <rect x="8" y="8" width="24" height="24" rx="4" fill="url(#navyGrad)" fillOpacity="0.1" />
    <rect x="12" y="12" width="24" height="24" rx="4" fill="url(#navyGrad)" fillOpacity="0.25" />
    <rect x="16" y="16" width="24" height="24" rx="4" fill="url(#navyGrad)" fillOpacity="1" filter="url(#softShadow)" />
    
    {/* Glowing Copper Magnifying Glass */}
    <circle cx="36" cy="36" r="12" fill="url(#copperGrad)" filter="url(#softShadow)" />
    <circle cx="36" cy="36" r="7" fill="none" stroke="white" strokeWidth="2.5" />
    <line x1="26" y1="26" x2="16" y2="16" stroke="url(#copperGrad)" strokeWidth="6" strokeLinecap="round" filter="url(#softGlow)" />
    <circle cx="26" cy="26" r="3.5" fill="white" />
  </svg>
);

const PremiumSync = () => (
  <svg width="64" height="64" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Navy Arrow Loop */}
    <path d="M16 28 A 12 12 0 0 1 40 28" fill="none" stroke="url(#navyGrad)" strokeWidth="6" strokeLinecap="round" />
    <path d="M40 20 V28 H32" fill="none" stroke="url(#navyGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Copper Arrow Loop overlapping */}
    <path d="M40 32 A 12 12 0 0 1 16 32" fill="none" stroke="url(#copperGrad)" strokeWidth="6" strokeLinecap="round" filter="url(#softShadow)" />
    <path d="M16 40 V32 H24" fill="none" stroke="url(#copperGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" filter="url(#softShadow)" />
    
    <circle cx="28" cy="28" r="7" fill="url(#navyGrad)" />
    <circle cx="28" cy="28" r="3" fill="url(#copperLight)" filter="url(#softGlow)" />
  </svg>
);

const PremiumChart = () => (
  <svg width="64" height="64" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Base Dashboard */}
    <rect x="6" y="12" width="44" height="32" rx="4" fill="url(#navyGrad)" filter="url(#softShadow)" />
    {/* Glowing Copper Bars */}
    <rect x="14" y="32" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.2" />
    <rect x="24" y="24" width="6" height="14" rx="1.5" fill="url(#copperGrad)" filter="url(#softShadow)" />
    <rect x="34" y="12" width="6" height="26" rx="1.5" fill="url(#copperLight)" filter="url(#softGlow)" />
    {/* Glowing Trend Line */}
    <path d="M10 28 L18 20 L26 24 L40 10" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="40" cy="10" r="3.5" fill="white" filter="url(#softShadow)" />
  </svg>
);

// --- Data ---

const services = [
  {
    title: "Book keeping & accounting",
    desc: "Maintain pristine financial records that are always audit-ready.",
    icon: PremiumBook,
    colSpan: "lg:col-span-2",
  },
  {
    title: "Taxes & compliance",
    desc: "Navigate complex tax codes effortlessly.",
    icon: PremiumTax,
    colSpan: "lg:col-span-1",
  },
  {
    title: "Payroll Management",
    desc: "Accurate, on-time payroll for your growing team.",
    icon: PremiumPayroll,
    colSpan: "lg:col-span-1",
  },
  {
    title: "Due diligence support",
    desc: "Prepare for investments with flawless data rooms.",
    icon: PremiumSearch,
    colSpan: "lg:col-span-1",
  },
  {
    title: "AR/AP reconciliation",
    desc: "Keep cashflows positive and relationships strong.",
    icon: PremiumSync,
    colSpan: "lg:col-span-1",
  },
  {
    title: "MIS Reporting",
    desc: "Turn raw numbers into actionable growth strategies.",
    icon: PremiumChart,
    colSpan: "lg:col-span-2",
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
      className="py-24 lg:py-32 bg-[#FDFCFB] relative overflow-hidden z-30 border-b border-sand/20"
    >
      {/* Background Abstract Orbs for Glassmorphism Effect */}
      <div className="absolute top-0 left-1/4 w-[30rem] h-[30rem] bg-copper/5 rounded-full filter blur-[100px] pointer-events-none transform -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[40rem] h-[40rem] bg-navy/5 rounded-full filter blur-[120px] pointer-events-none transform translate-y-1/3 translate-x-1/4" />
      {/* SVG Definitions for Gradients and Filters */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <linearGradient id="navyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14213A" />
            <stop offset="100%" stopColor="#0A111D" />
          </linearGradient>
          <linearGradient id="copperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C48044" />
            <stop offset="100%" stopColor="#9C5C2B" />
          </linearGradient>
          <linearGradient id="copperLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2A673" />
            <stop offset="100%" stopColor="#B5723B" />
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.15" />
          </filter>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      </svg>

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
            Whether you&apos;re scaling from <span className="font-bold text-navy">1→10</span> or <span className="font-bold text-navy">10→100</span>, Finsaar takes care of your business finance and compliance so owners can focus on what they are meant to do: <span className="font-bold text-copper">scale their dreams</span>.
          </p>
        </motion.div>

        {/* High-Contrast Premium Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8 max-w-6xl mx-auto auto-rows-[minmax(240px,auto)] md:auto-rows-[minmax(280px,auto)]">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              // Premium Frosted Glass Cards over abstract background
              className={`group relative overflow-hidden rounded-[24px] p-8 md:p-10 border border-white/80 bg-white/60 backdrop-blur-3xl shadow-[0_8px_30px_rgba(20,33,58,0.06),inset_0_1px_0_rgba(255,255,255,1)] hover:shadow-[0_20px_40px_rgba(181,114,59,0.08),inset_0_1px_0_rgba(255,255,255,1)] hover:bg-white/80 hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-start ${service.colSpan}`}
            >
              
              {/* Premium abstract dual-tone spotlight on hover */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-copper/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-navy/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              {/* Premium Rich SVG Icon Container */}
              <div className="mb-8 relative z-10 group-hover:scale-105 transition-transform duration-500 origin-left">
                <service.icon />
              </div>
              
              <div className="relative z-10 mt-auto">
                <h3 className="font-heading font-bold text-xl lg:text-2xl leading-tight text-navy mb-3 group-hover:text-copper transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="font-body text-navy/70 text-sm md:text-base leading-relaxed">
                  {service.desc}
                </p>
              </div>

            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
