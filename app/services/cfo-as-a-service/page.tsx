"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import FinalCTA from "@/components/FinalCTA";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import { CheckCircle2, Target } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const capabilities = [
  "MIS & reporting",
  "Cashflow optimization & forecasting",
  "Budgeting & financial planning",
];

const rightFit = [
  "Startups, Founders & SMEs who generating over Rs. 1 cr of revenue - Manufactures, Brand owners, SaaS, Services, exports, B2B, B2C & D2C brands",
  "Startups and SMEs who are looking for finance partner and not just consultant",
  "Businesses scaling teams, markets, or product lines",
  "Businesses who are serious about MIS, data & reporting"
];

const faqs = [
  { q: "What does finsaar's CFO-as-a-Service include?", a: "finsaar's CFO-as-a-Service brings together financial strategy, compliance oversight, AR/AP reconciliation, MIS reporting, Investor & board reporting, Cash flow forecasting & management and due diligence support under one Fractional CFO relationship. It's designed to give founders and business owners CFO-level financial leadership without the cost of a full-time executive hire." },
  { q: "What's the difference between a Virtual CFO and a Fractional CFO?", a: "In practice, the terms are used interchangeably — both describe a senior finance professional providing CFO-level strategy and oversight on a part-time, remote, or contract basis rather than as a full-time in-house hire. finsaar uses \"CFO as a Service\" to describe this same model: strategic financial leadership, sized to what your business actually needs." },
  { q: "How much time does a Fractional CFO from finsaar spend on my business?", a: "Time commitment is scoped to your business — typically ranging from a few hours a week for early-stage companies to several days a month for businesses preparing for fundraising, debt, or a major transaction. Engagement scope is reviewed periodically and adjusted as your reporting and strategic needs change." },
  { q: "What does MIS reporting include, and how often will I receive it?", a: "MIS reporting includes standardized monthly (or weekly, for higher-velocity businesses) dashboards covering P&L performance, cash flow, working capital, and key operational KPIs relevant to your business. For manufacturing and export SMEs this typically includes inventory and receivables aging; for SaaS and funded startups it typically includes burn rate, runway, and unit economics; for services businesses it typically centers on project/client profitability and utilization." },
  { q: "What is due diligence support, and when do I need it?", a: "Due diligence support means preparing and organizing your financial records, compliance history, and MIS data for scrutiny during fundraising, an acquisition, a bank loan, or an investor/lender audit. finsaar prepares this proactively as part of ongoing CFO engagements, so you're not scrambling to assemble data rooms under a deadline when a deal or credit facility comes up." },
  { q: "What is AR/AP reconciliation, and why does it matter?", a: "AR/AP reconciliation means matching what customers owe you (accounts receivable) and what you owe vendors (accounts payable) against your books and bank records to catch discrepancies early. For businesses with long payment or billing cycles — common in manufacturing, export, services, and B2B SaaS — this directly protects working capital and cash flow visibility." },
  { q: "Can finsaar help with fundraising, debt, or capital structuring?", a: "Yes — finsaar's Capital Management arm supports debt advisory and capital structuring for corporates and SMEs, working alongside the CFO engagement so your MIS, compliance, and due diligence readiness are already in order when you approach lenders or investors. This is distinct from wealth management or portfolio advisory — it's focused on raising and structuring capital for the business itself." },
  { q: "Does finsaar handle tax and regulatory compliance (GST, TDS, income tax)?", a: "Yes — compliance coverage includes GST filing, TDS returns, income tax filing, and other statutory obligations, tracked on a compliance calendar so nothing is missed. This runs as a continuous part of the CFO engagement rather than a once-a-year, deadline-driven scramble." },
  { q: "Is finsaar's CFO-as-a-Service a replacement for hiring an in-house finance team, or does it work alongside one?", a: "It works both ways — for businesses without an in-house finance team, finsaar functions as the finance function end-to-end; for businesses that already have internal finance staff, finsaar's Fractional CFO provides senior oversight, strategy, and reporting rigor on top of the existing team. The engagement is scoped to fill the specific gap your business has, not to replace people unnecessarily." }
];

export default function CfoAsAServicePage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <Navbar onOpenContact={() => setContactOpen(true)} />
      <main className="flex-1">
        {/* Awwwards Style Hero Section */}
        <section className="relative pt-32 lg:pt-48 pb-32 lg:pb-64 bg-[#FBF9F6] overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
            <div className="absolute -top-40 -right-20 w-[500px] h-[500px] bg-copper/10 blur-[120px] rounded-full" />
            <div className="absolute top-40 -left-20 w-[500px] h-[500px] bg-blue-400/10 blur-[120px] rounded-full" />
          </div>
          
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-block px-4 py-1.5 bg-copper/10 text-copper font-heading font-semibold text-xs md:text-sm tracking-[0.2em] uppercase rounded-full mb-6 md:mb-8 border border-copper/20">
                CFO as a service
              </span>
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-bold text-navy leading-[1.05] tracking-tight mb-8">
                Manage finance sharply.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-copper to-orange-400">Scale fearlessly.</span>
              </h1>
              <p className="font-body text-lg md:text-xl text-navy/60 max-w-2xl mx-auto leading-relaxed font-light">
                Finsaar delivers CFO support embedded as your team, not just as consultants—tech-enabled, led by senior finance professionals for strategy and investment readiness.
              </p>
            </motion.div>
          </div>

          {/* Hero Mockup 1 (Centerpiece with 3D perspective illusion) */}
          <div className="relative z-20 max-w-[1000px] mx-auto px-4 sm:px-6 mt-20 lg:mt-28">
            <div className="absolute -inset-4 bg-gradient-to-b from-white/40 to-transparent blur-xl rounded-3xl opacity-50" />
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative w-full rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(20,33,58,0.25)] border border-black/[0.04] bg-white ring-1 ring-black/5"
            >
              {/* Safari Header */}
              <div className="bg-[#F8F9FA] px-4 md:px-6 py-3 md:py-4 border-b border-black/[0.04] flex items-center">
                <div className="flex gap-2">
                  <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#FF5F56] shadow-inner"></div>
                  <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#FFBD2E] shadow-inner"></div>
                  <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#27C93F] shadow-inner"></div>
                </div>
                <div className="mx-auto bg-white rounded-md md:rounded-lg h-6 md:h-7 w-full max-w-[200px] md:max-w-[300px] shadow-sm flex items-center justify-center border border-black/[0.02]">
                  <span className="text-[10px] md:text-xs text-navy/40 font-medium tracking-wide">finsaar.co / cfo-dashboard</span>
                </div>
              </div>
              {/* Content */}
              <div className="relative w-full bg-white">
                <Image 
                  src="/images/cfo/cfo_1.png" 
                  alt="CFO Dashboard Overview" 
                  width={1400} 
                  height={800} 
                  className="w-full h-auto object-cover object-top" 
                  priority
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Capabilities & Masked Mockup Section */}
        <section className="py-24 lg:py-32 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Capabilities and Second Mockup Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy/5 text-navy font-heading font-bold text-[13px] tracking-widest uppercase rounded-full mb-8">
                  <Target size={16} className="text-copper" /> Capabilities
                </div>
                <h2 className="font-heading text-4xl lg:text-5xl font-bold text-navy mb-8 leading-tight">
                  Financial command at your fingertips.
                </h2>
                <div className="space-y-4">
                  {capabilities.map((cap, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.6 }}
                      className="flex items-center gap-5 bg-[#FBF9F6] p-5 rounded-2xl border border-sand/50 group hover:border-copper/30 transition-colors duration-300"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <CheckCircle2 className="text-copper shrink-0" size={24} />
                      </div>
                      <span className="font-heading font-semibold text-navy text-[17px]">{cap}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Mockup 2 - Awwwards Style Masking */}
              <div className="relative w-full h-[500px] lg:h-[650px] rounded-[40px] overflow-hidden group shadow-[0_30px_60px_-15px_rgba(20,33,58,0.2)]">
                {/* Premium Dark Base */}
                <div className="absolute inset-0 bg-[#0A111D]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-copper/20 via-[#0A111D]/0 to-[#0A111D]/0" />
                
                {/* Floating Mockup Masked */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, rotate: -2, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-16 -right-12 lg:-right-24 bottom-0 left-12 lg:left-16 rounded-tl-[32px] overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-t border-l border-white/10 bg-[#1E1E1E]"
                >
                  <div className="bg-[#2D2D2D] px-5 py-3.5 border-b border-black/20 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-80"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] opacity-80"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27C93F] opacity-80"></div>
                  </div>
                  <div className="relative w-full h-full bg-white">
                    <Image 
                      src="/images/cfo/cfo_2.png" 
                      alt="CFO Dashboard Analytics" 
                      width={1000} 
                      height={800} 
                      className="w-full h-full object-cover object-left-top" 
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Who is the right fit */}
            <div className="bg-navy rounded-[40px] p-10 lg:p-16 relative overflow-hidden">
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-copper/20 blur-[100px] rounded-full pointer-events-none" />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 relative z-10">
                <div className="lg:col-span-1">
                  <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-6">Who is the<br/><span className="text-copper">right fit?</span></h2>
                  <p className="font-body text-white/60 leading-relaxed text-lg">
                    We partner with businesses that are serious about data, reporting, and sustainable growth.
                  </p>
                </div>
                
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {rightFit.map((fit, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.6 }}
                      className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition-colors duration-300"
                    >
                      <Target className="text-copper mb-4" size={28} />
                      <p className="font-body text-white/90 leading-relaxed text-[15px]">{fit}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <ServiceFAQ faqs={faqs} title="CFO as a service FAQ" />
        <FinalCTA onOpenContact={() => setContactOpen(true)} />
      </main>
      <Footer />
      <ContactForm isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
