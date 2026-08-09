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

const servicesList = [
  "Accounting & bookkeeping",
  "GST compliance",
  "Tax compliance",
  "Payroll processing & compliance",
];

const howItWorks = [
  { step: "1", title: "Discovery", desc: "Current-state review" },
  { step: "2", title: "Setup / cleanup", desc: "Accounting system alignment" },
  { step: "3", title: "Monthly closes", desc: "Compliance calendar execution" },
  { step: "4", title: "Insights", desc: "Ongoing improvement" },
];

const faqs = [
  { q: "What's included in finsaar's bookkeeping and accounting service?", a: "finsaar's bookkeeping and accounting service covers daily transaction recording, bank and credit card reconciliation, accounts payable/receivable tracking, ledger maintenance, and periodic financial statement preparation. It's the operational foundation your compliance filings, payroll, and MIS reporting are built on." },
  { q: "What's the difference between bookkeeping and accounting — and do I need both?", a: "Bookkeeping is the day-to-day recording of transactions (invoices, payments, bank entries); accounting is the higher-level work of reconciling, classifying, and turning those records into usable financial statements and insight. Most businesses need both, which is why finsaar delivers them as one continuous service rather than two separate handoffs." },
  { q: "Which accounting software does finsaar use for bookkeeping?", a: "finsaar primarily works within Tally for Indian SME clients, with Excel-based bookkeeping as a fallback and Zoho Books support where clients are already on it. We work inside your existing system rather than requiring you to migrate platforms just to start." },
  { q: "Can finsaar clean up or catch up on backlogged / messy books?", a: "Yes — catch-up bookkeeping (reconciling backlogged transactions, fixing miscategorized entries, and bringing records current) is a common starting point for new clients transitioning from an in-house or part-time bookkeeper. We assess the backlog first and give you a clear timeline before starting cleanup." },
  { q: "How often will I get updated books and financial statements?", a: "Most clients receive reconciled books and financial statements monthly, with weekly transaction updates available for higher-volume businesses. Reporting cadence is set during onboarding based on your transaction volume and how frequently you need visibility for decision-making." },
  { q: "Does finsaar handle GST-related bookkeeping (input credit, invoice matching)?", a: "Yes — GST-compliant invoice recording, input tax credit tracking, and invoice matching against GSTR-2A/2B are part of the bookkeeping workflow for GST-registered businesses. This keeps your books audit-ready and reduces reconciliation surprises at filing time." },
  { q: "Is bookkeeping available as a standalone service, or does it require a full CFO engagement?", a: "Bookkeeping and accounting is available as a fully standalone service — you don't need a Fractional CFO engagement to work with finsaar. Many clients start here and add compliance, payroll, or CFO-level reporting later as the business grows." },
  { q: "How does finsaar ensure accuracy in the books?", a: "finsaar builds accuracy in through monthly reconciliation checkpoints, a second-level review before books are closed for the period, and standardized chart-of-accounts structures tailored to your industry — manufacturing, export, services, or SaaS. Any discrepancy is flagged and resolved with you before the period closes, not after." },
  { q: "Can finsaar manage payroll end-to-end, including statutory compliance?", a: "Yes — payroll management includes salary processing, TDS deduction, PF/ESI compliance, and statutory filings, run on your chosen payroll cycle. This is handled as part of the same finance function as your bookkeeping and compliance work, so payroll data flows straight into your books without manual reconciliation." }
];

export default function AccountingCompliancePage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <Navbar onOpenContact={() => setContactOpen(true)} />
      <main className="flex-1">
        {/* Centered Hero Section */}
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
                Accounting & compliance
              </span>
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-bold text-navy leading-[1.05] tracking-tight mb-8 max-w-[1000px] mx-auto">
                Your books are taken care of — <span className="text-copper">so you can focus on growth.</span>
              </h1>
              <p className="font-body text-lg md:text-xl text-navy/60 max-w-2xl mx-auto leading-relaxed font-light">
                A solid foundation for your business growth. We handle the daily numbers and compliance so you can build the future.
              </p>
            </motion.div>
          </div>

          {/* Hero Mockup 1 (Centerpiece) */}
          <div className="relative z-20 max-w-[1000px] mx-auto px-4 sm:px-6 mt-20 lg:mt-28">
            <div className="absolute -inset-4 bg-gradient-to-b from-white/40 to-transparent blur-xl rounded-3xl opacity-50" />
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative w-full rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(20,33,58,0.25)] border border-black/[0.04] bg-white ring-1 ring-black/5"
            >
              {/* Safari Header */}
              <div className="bg-navy px-4 md:px-6 py-2 md:py-2.5 border-b border-white/5 flex items-center">
                <div className="flex gap-1.5 md:gap-2">
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#FF5F56] shadow-inner opacity-90"></div>
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#FFBD2E] shadow-inner opacity-90"></div>
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#27C93F] shadow-inner opacity-90"></div>
                </div>
                <div className="mx-auto bg-white/10 rounded-md md:rounded-lg h-5 md:h-6 w-full max-w-[200px] md:max-w-[300px] flex items-center justify-center border border-white/5">
                  <span className="text-[9px] md:text-[11px] text-white/50 font-medium tracking-wide">finsaar.co / compliance</span>
                </div>
              </div>
              {/* Content */}
              <div className="relative w-full bg-white">
                <Image 
                  src="/images/acc-com/ac-1.png" 
                  alt="Accounting & Compliance Dashboard" 
                  width={1400} 
                  height={800} 
                  className="w-full h-auto object-cover object-top" 
                  priority
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 lg:py-32 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-copper/10 border border-copper/20 text-copper font-heading font-semibold text-[13px] tracking-[0.2em] uppercase rounded-full mb-8">
                  <Target size={16} className="text-copper" /> Capabilities
                </div>
                <h2 className="font-heading text-4xl lg:text-5xl font-bold text-navy mb-8 leading-tight">
                  What we cover
                </h2>
                <div className="space-y-4">
                  {servicesList.map((service, i) => (
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
                      <span className="font-heading font-semibold text-navy text-[17px]">{service}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Mockup 2 */}
              <div className="relative w-full h-[500px] lg:h-[650px] rounded-[24px] lg:rounded-[32px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(20,33,58,0.2)] border border-black/5 bg-white">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full flex flex-col"
                >
                  <div className="bg-navy px-4 md:px-6 py-2 md:py-2.5 border-b border-white/5 flex items-center">
                    <div className="flex gap-1.5 md:gap-2">
                      <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#FF5F56] shadow-inner opacity-90"></div>
                      <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#FFBD2E] shadow-inner opacity-90"></div>
                      <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#27C93F] shadow-inner opacity-90"></div>
                    </div>
                  </div>
                  <div className="relative w-full flex-1 bg-white">
                    <Image 
                      src="/images/acc-com/ac-2.png" 
                      alt="Accounting Workflow" 
                      width={1000} 
                      height={800} 
                      className="w-full h-full object-cover object-left-top" 
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* How it works (Dark Theme) */}
            <div className="bg-navy rounded-[40px] p-10 lg:p-16 relative overflow-hidden">
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-copper/20 blur-[100px] rounded-full pointer-events-none" />
              
              <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
                <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-6">How it works</h2>
                <p className="font-body text-white/60 text-lg">A streamlined process to get your books in order and keep them that way.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {howItWorks.map((step, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition-colors duration-300"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-copper/20 flex items-center justify-center mb-6">
                      <span className="font-heading font-bold text-copper text-xl">{step.step}</span>
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-white mb-2">{step.title}</h3>
                    <p className="font-body text-white/60 leading-relaxed text-[15px]">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ServiceFAQ faqs={faqs} title="Accounts & Compliance FAQ" />
        <FinalCTA onOpenContact={() => setContactOpen(true)} />
      </main>
      <Footer />
      <ContactForm isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
