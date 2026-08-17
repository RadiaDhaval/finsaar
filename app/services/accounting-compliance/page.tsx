"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import FinalCTA from "@/components/FinalCTA";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import { CheckCircle2, Target, ArrowRight } from "lucide-react";
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
      <main className="flex-1 overflow-hidden">
        
        {/* Split Hero Section */}
        <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-32 bg-[#FBF9F6]">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-copper/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 xl:gap-64 2xl:gap-72 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-2xl"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-copper/10 border border-copper/20 text-copper font-heading font-semibold text-[13px] tracking-[0.2em] uppercase rounded-full mb-6">
                  Accounting & Compliance
                </div>
                <h1 className="font-heading text-5xl lg:text-[64px] font-bold text-navy leading-[1.05] tracking-tight mb-6">
                  Your books are taken care of —<br />
                  <span className="text-copper">so you can focus on growth.</span>
                </h1>
                <p className="font-body text-lg md:text-xl text-navy/60 leading-relaxed font-light mb-8 max-w-lg">
                  A solid foundation for your business growth. We handle the daily numbers and compliance so you can build the future.
                </p>
                <button 
                  onClick={() => setContactOpen(true)}
                  className="bg-copper text-white px-8 py-4 rounded-full font-heading font-medium hover:bg-navy transition-colors duration-300 shadow-lg shadow-copper/20 inline-flex items-center gap-3 group"
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
                  <div className="relative w-full bg-white h-[400px] md:h-[500px] lg:h-[750px]">
                    <Image 
                      src="/images/acc-com/ac-1.png" 
                      alt="Accounting & Compliance Dashboard" 
                      fill
                      className="object-cover object-left-top" 
                      priority
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Services Section (Reversed Layout) */}
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

              {/* Text on Right */}
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-copper/10 border border-copper/20 text-copper font-heading font-semibold text-[13px] tracking-[0.2em] uppercase rounded-full mb-8">
                  <Target size={16} className="text-copper" /> Capabilities
                </div>
                <h2 className="font-heading text-4xl lg:text-5xl font-bold text-navy mb-10 leading-tight">
                  What we cover
                </h2>
                <div className="space-y-6">
                  {servicesList.map((service, i) => (
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
                      <span className="font-heading font-medium text-navy text-xl">{service}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* How it works (Light Theme) */}
        <section className="py-20 lg:py-28 bg-[#FBF9F6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-navy mb-6">How it works</h2>
              <p className="font-body text-navy/60 text-lg">A streamlined process to get your books in order and keep them that way.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {howItWorks.map((step, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="bg-white p-8 rounded-[24px] border border-black/5 hover:border-copper/30 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#FBF9F6] border border-navy/5 flex items-center justify-center mb-6 group-hover:bg-copper group-hover:text-white transition-colors duration-300">
                    <span className="font-heading font-bold text-navy group-hover:text-white text-xl">{step.step}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-navy mb-3">{step.title}</h3>
                  <p className="font-body text-navy/60 leading-relaxed text-[15px]">{step.desc}</p>
                </motion.div>
              ))}
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
