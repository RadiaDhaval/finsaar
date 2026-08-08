"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/ui/PageHeader";
import FinalCTA from "@/components/FinalCTA";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, FileBarChart, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const complianceDeadlines = [
  {
    month: "Every Month",
    items: [
      { date: "7th", task: "TDS / TCS Deposit for previous month" },
      { date: "11th", task: "GSTR-1 filing (Outward supplies)" },
      { date: "15th", task: "PF / ESI Deposit for previous month" },
      { date: "20th", task: "GSTR-3B filing (Summary return & tax payment)" }
    ]
  },
  {
    month: "Quarterly Deadlines",
    items: [
      { date: "15th Jun/Sep/Dec/Mar", task: "Advance Income Tax Installment" },
      { date: "31st Jan/May/Jul/Oct", task: "TDS Return Filing (Form 24Q/26Q)" }
    ]
  },
  {
    month: "Annual Deadlines (Sep - Nov)",
    items: [
      { date: "30th Sep", task: "Income Tax Return (ITR) for non-audit cases" },
      { date: "31st Oct", task: "Income Tax Return (ITR) for audit cases" },
      { date: "30th Nov", task: "ROC Annual Filing (AOC-4, MGT-7)" }
    ]
  }
];

const caseStudies = [
  {
    title: "Scaling a D2C Brand from ₹1Cr to ₹10Cr ARR",
    industry: "D2C / E-Commerce",
    metric: "3x Growth",
    desc: "How we implemented a 13-week rolling cash flow model and optimized their working capital cycle, freeing up cash for aggressive marketing spend without raising debt.",
    glow: "bg-orange-500"
  },
  {
    title: "Automating Compliance for a SaaS Startup",
    industry: "B2B SaaS",
    metric: "100% Audit-Ready",
    desc: "Transitioned their messy spreadsheet-based accounting into a fully automated tech stack, ensuring flawless GST compliance and saving the founders 40+ hours a month.",
    glow: "bg-blue-500"
  },
  {
    title: "Due Diligence Prep for Series A",
    industry: "HealthTech",
    metric: "₹50Cr Raised",
    desc: "Acted as their embedded CFO to rebuild historical financials, clear compliance backlogs, and manage the data room—resulting in a smooth term sheet signing.",
    glow: "bg-emerald-500"
  }
];

export default function ResourcesPage() {
  const [contactOpen, setContactOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"calendar" | "casestudies">("calendar");

  return (
    <>
      <Navbar onOpenContact={() => setContactOpen(true)} />
      <main className="flex-1 bg-[#FBF9F6] min-h-screen">
        <PageHeader
          badge="Resources"
          title={<>Your financial <span className="text-copper">toolkit</span></>}
          subtitle="Explore our compliance calendar and deep-dive case studies to see how we build financial engines for growing businesses."
        />

        <section className="py-12 lg:py-20 relative z-10 -mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Custom Premium Tabs */}
            <div className="flex justify-center mb-16">
              <div className="bg-white p-2 rounded-full shadow-sm border border-sand/30 flex gap-2 w-full max-w-md relative z-20">
                <button
                  onClick={() => setActiveTab("calendar")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full font-heading font-semibold text-[15px] transition-all duration-300 relative ${activeTab === "calendar" ? "text-white" : "text-navy/60 hover:text-navy"}`}
                >
                  {activeTab === "calendar" && (
                    <motion.div layoutId="activeTab" className="absolute inset-0 bg-navy rounded-full" />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Calendar size={18} /> Compliance Calendar
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("casestudies")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full font-heading font-semibold text-[15px] transition-all duration-300 relative ${activeTab === "casestudies" ? "text-white" : "text-navy/60 hover:text-navy"}`}
                >
                  {activeTab === "casestudies" && (
                    <motion.div layoutId="activeTab" className="absolute inset-0 bg-navy rounded-full" />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <FileBarChart size={18} /> Case Studies
                  </span>
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="max-w-5xl mx-auto min-h-[500px]">
              <AnimatePresence mode="wait">
                
                {/* COMPLIANCE CALENDAR */}
                {activeTab === "calendar" && (
                  <motion.div
                    key="calendar"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="text-center mb-12">
                      <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-4">Never miss a deadline.</h2>
                      <p className="font-body text-navy/60 text-lg">A quick overview of standard monthly, quarterly, and annual compliance deadlines in India.</p>
                    </div>

                    <div className="space-y-8">
                      {complianceDeadlines.map((block, i) => (
                        <div key={i} className="bg-white rounded-3xl p-8 lg:p-10 border border-sand/40 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                          <h3 className="font-heading text-xl font-bold text-copper mb-6 uppercase tracking-wider text-sm">{block.month}</h3>
                          <div className="space-y-4">
                            {block.items.map((item, j) => (
                              <div key={j} className="flex flex-col sm:flex-row sm:items-center gap-4 py-4 border-b border-sand/20 last:border-0 last:pb-0">
                                <div className="bg-navy/5 text-navy font-heading font-bold text-lg px-4 py-2 rounded-xl min-w-[140px] text-center border border-navy/10">
                                  {item.date}
                                </div>
                                <div className="flex-1 flex items-center gap-3">
                                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                                  <span className="font-body text-navy/80 text-[17px]">{item.task}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* CASE STUDIES */}
                {activeTab === "casestudies" && (
                  <motion.div
                    key="casestudies"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="text-center mb-12">
                      <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-4">How we drive growth.</h2>
                      <p className="font-body text-navy/60 text-lg">Real examples of how our embedded CFO and compliance services transformed businesses.</p>
                    </div>

                    <div className="flex flex-col gap-10">
                      {caseStudies.map((study, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                          className="relative overflow-hidden rounded-[40px] bg-navy p-10 lg:p-16 group transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(20,33,58,0.4)] border border-white/5"
                        >
                          {/* Premium Background Glow */}
                          <div className={`absolute top-1/2 left-0 w-[500px] h-[500px] ${study.glow} blur-[150px] rounded-full opacity-0 group-hover:opacity-[0.15] transition-opacity duration-1000 pointer-events-none -translate-x-1/2 -translate-y-1/2`} />
                          
                          <div className="relative z-10 flex flex-col md:flex-row gap-12 lg:gap-20 items-start">
                            {/* Left: Massive Metric */}
                            <div className="shrink-0 w-full md:w-[280px]">
                              <span className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-heading font-medium text-sand tracking-widest uppercase mb-8">
                                {study.industry}
                              </span>
                              <div className="font-heading font-black text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-br from-white to-white/30 tracking-tighter leading-none mb-3">
                                {study.metric.split(' ')[0]}
                              </div>
                              <div className="font-heading font-bold text-xl lg:text-2xl text-sand tracking-tight">
                                {study.metric.split(' ').slice(1).join(' ')}
                              </div>
                            </div>
                            
                            {/* Right: Content */}
                            <div className="flex-1 md:pt-4">
                              <h3 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight group-hover:text-sand transition-colors duration-500">
                                {study.title}
                              </h3>
                              <p className="font-body text-lg text-white/50 leading-relaxed mb-10 max-w-2xl font-light">
                                {study.desc}
                              </p>
                              
                              <Link href="#" className="inline-flex items-center gap-3 font-heading font-semibold text-white group-hover:text-sand transition-colors duration-300">
                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-sand group-hover:bg-sand/10 transition-colors duration-300">
                                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                                </div>
                                <span className="relative overflow-hidden">
                                  <span className="block transition-transform duration-500 group-hover:-translate-y-full">Explore Study</span>
                                  <span className="block absolute top-0 left-0 transition-transform duration-500 translate-y-full group-hover:translate-y-0 text-sand">Explore Study</span>
                                </span>
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
                
              </AnimatePresence>
            </div>
            
          </div>
        </section>
      </main>
      <Footer />
      <ContactForm isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
