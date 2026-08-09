"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import FinalCTA from "@/components/FinalCTA";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import { CheckCircle2, ArrowRight, Target } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const capabilities = [
  "MIS & reporting",
  "Cashflow forecasting & management",
  "Budgeting & financial planning",
  "Compliance oversight",
  "AR/AP reconciliation",
  "Investor & board reporting",
  "Due diligence support",
];

const rightFit = [
  { step: "1", title: "Scale-ups", desc: "Startups, founders & SMEs across manufacturing, brand/D2C, SaaS, services, exports, B2B, and B2C" },
  { step: "2", title: "Partnership", desc: "Businesses looking for a finance partner, not just a consultant" },
  { step: "3", title: "Growth", desc: "Businesses scaling teams, markets, or product lines" },
  { step: "4", title: "Data-driven", desc: "Businesses serious about MIS, data & reporting" }
];

const faqs = [
  { q: "What does finsaar's CFO as a Service include?", a: "finsaar's CFO as a Service brings together financial strategy, compliance oversight, AR/AP reconciliation, MIS reporting, investor & board reporting, cash flow forecasting & management, and due diligence support under one relationship. It's designed to give founders and business owners CFO-level financial leadership without the cost of a full-time executive hire." },
  { q: "What's the difference between a Virtual CFO and CFO as a Service?", a: "\"Virtual CFO\" is the common industry term for senior, part-time finance leadership delivered remotely rather than through a full-time in-house hire. At finsaar, we call this offering \"CFO as a Service\" — same core idea, delivered as an ongoing, embedded relationship rather than a one-off virtual consultation. Think of Virtual CFO as the category, and CFO as a Service as how finsaar delivers it." },
  { q: "How much time does finsaar's CFO as a Service spend on my business?", a: "Time commitment is scoped to your business — typically ranging from a few hours a week for early-stage companies to several days a month for businesses preparing for fundraising, debt, or a major transaction. Engagement scope is reviewed periodically and adjusted as your reporting and strategic needs change." },
  { q: "What does MIS reporting include, and how often will I receive it?", a: "MIS reporting includes standardized monthly (or weekly, for higher-velocity businesses) dashboards covering P&L performance, cash flow, working capital, and key operational KPIs relevant to your business. For manufacturing and export SMEs this typically includes inventory and receivables aging; for SaaS and funded startups it typically includes burn rate, runway, and unit economics; for services businesses it typically centers on project/client profitability and utilization." },
  { q: "What is due diligence support, and when do I need it?", a: "Due diligence support means preparing and organizing your financial records, compliance history, and MIS data for scrutiny during fundraising, an acquisition, a bank loan, or an investor/lender audit. finsaar prepares this proactively as part of ongoing engagements, so you're not scrambling to assemble data rooms under a deadline when a deal or credit facility comes up." },
  { q: "What is AR/AP reconciliation, and why does it matter?", a: "AR/AP reconciliation means matching what customers owe you (accounts receivable) and what you owe vendors (accounts payable) against your books and bank records to catch discrepancies early. For businesses with long payment or billing cycles — common in manufacturing, export, services, and B2B SaaS — this directly protects working capital and cash flow visibility." },
  { q: "Can finsaar help with fundraising, debt, or capital structuring?", a: "Yes — finsaar's Capital Management arm supports debt advisory and capital structuring for corporates and SMEs, working alongside your CFO as a Service engagement so your MIS, compliance, and due diligence readiness are already in order when you approach lenders or investors. This is distinct from wealth management or portfolio advisory — it's focused on raising and structuring capital for the business itself." },
  { q: "Does finsaar handle tax and regulatory compliance (GST, TDS, income tax)?", a: "Yes — compliance coverage includes GST filing, TDS returns, income tax filing, and other statutory obligations, tracked on a compliance calendar so nothing is missed. This runs as a continuous part of the engagement rather than a once-a-year, deadline-driven scramble." },
  { q: "Is finsaar's CFO as a Service a replacement for hiring an in-house finance team, or does it work alongside one?", a: "It works both ways — for businesses without an in-house finance team, finsaar functions as the finance function end-to-end; for businesses that already have internal finance staff, finsaar provides senior oversight, strategy, and reporting rigor on top of the existing team. The engagement is scoped to fill the specific gap your business has, not to replace people unnecessarily." }
];

export default function CfoAsAServicePage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <Navbar onOpenContact={() => setContactOpen(true)} />
      <main className="flex-1 overflow-hidden">
        
        {/* Split Hero Section */}
        <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-32 bg-[#FBF9F6]">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-copper/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 xl:gap-40 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-2xl"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-copper/10 border border-copper/20 text-copper font-heading font-semibold text-[13px] tracking-[0.2em] uppercase rounded-full mb-6">
                  CFO as a service
                </div>
                <h1 className="font-heading text-5xl lg:text-[64px] font-bold text-navy leading-[1.05] tracking-tight mb-6">
                  Your Virtual CFO —<br />
                  <span className="text-copper">embedded as your team,</span><br />
                  not just on call.
                </h1>
                <p className="font-body text-lg md:text-xl text-navy/60 leading-relaxed font-light mb-8 max-w-lg">
                  Finsaar's CFO as a Service brings senior finance leadership into your business — AI-enabled, led by experienced finance professionals, focused on planning, strategy, and investment readiness.
                </p>
                <button 
                  onClick={() => setContactOpen(true)}
                  className="bg-navy text-white px-8 py-4 rounded-full font-heading font-medium hover:bg-copper transition-colors duration-300 shadow-lg shadow-navy/20 inline-flex items-center gap-3 group"
                >
                  Get started
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full"
              >
                <div className="relative w-full rounded-2xl lg:rounded-[32px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(20,33,58,0.25)] border border-black/5 bg-white">
                  {/* Safari Header */}
                  <div className="bg-navy px-4 md:px-5 py-2.5 flex items-center border-b border-white/5">
                    <div className="flex gap-1.5 md:gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] opacity-90"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] opacity-90"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] opacity-90"></div>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="relative w-full bg-white">
                    <Image 
                      src="/images/cfo/cfo_1.png" 
                      alt="CFO Dashboard Overview" 
                      width={1000} 
                      height={800} 
                      className="w-full h-auto object-cover object-top" 
                      priority
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Capabilities & Mockup Section (Reversed Layout) */}
        <section className="py-24 lg:py-32 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              
              {/* Mockup 2 - Now on Left */}
              <div className="relative w-full order-2 lg:order-1">
                <div className="absolute -inset-10 bg-copper/10 rounded-full blur-3xl -z-10" />
                <div className="relative w-full h-[450px] lg:h-[550px] rounded-[24px] lg:rounded-[32px] overflow-hidden shadow-[0_20px_50px_-15px_rgba(20,33,58,0.15)] border border-black/5 bg-white group">
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full flex flex-col"
                  >
                    <div className="bg-navy px-4 md:px-5 py-2.5 flex items-center border-b border-white/5">
                      <div className="flex gap-1.5 md:gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] opacity-90"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] opacity-90"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] opacity-90"></div>
                      </div>
                    </div>
                    <div className="relative w-full flex-1 bg-white">
                      <Image 
                        src="/images/cfo/cfo_2.png" 
                        alt="CFO Workflow" 
                        width={800} 
                        height={800} 
                        className="w-full h-full object-cover object-left-top" 
                      />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Text on Right */}
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-copper/10 border border-copper/20 text-copper font-heading font-semibold text-[13px] tracking-[0.2em] uppercase rounded-full mb-8">
                  <Target size={16} className="text-copper" /> Capabilities
                </div>
                <h2 className="font-heading text-4xl lg:text-5xl font-bold text-navy mb-10 leading-tight">
                  Capabilities
                </h2>
                <div className="space-y-6">
                  {capabilities.map((cap, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="flex items-center gap-5 pb-6 border-b border-navy/5 last:border-0"
                    >
                      <div className="w-10 h-10 rounded-full bg-copper/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="text-copper" size={20} />
                      </div>
                      <span className="font-heading font-medium text-navy text-xl">{cap}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Who is the right fit (Light Theme) */}
        <section className="py-20 lg:py-28 bg-[#FBF9F6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-navy mb-6">Who is the right fit?</h2>
              <p className="font-body text-navy/60 text-lg">We partner with businesses that are serious about data, reporting, and sustainable growth.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {rightFit.map((fit, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="bg-white p-8 rounded-[24px] border border-black/5 hover:border-copper/30 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#FBF9F6] border border-navy/5 flex items-center justify-center mb-6 group-hover:bg-copper group-hover:text-white transition-colors duration-300">
                    <span className="font-heading font-bold text-navy group-hover:text-white text-xl">{fit.step}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-navy mb-3">{fit.title}</h3>
                  <p className="font-body text-navy/60 leading-relaxed text-[15px]">{fit.desc}</p>
                </motion.div>
              ))}
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
