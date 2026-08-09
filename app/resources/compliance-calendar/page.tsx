"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/ui/PageHeader";

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

export default function ComplianceCalendarPage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <Navbar onOpenContact={() => setContactOpen(true)} />
      <main className="flex-1 bg-[#FBF9F6] min-h-screen">
        <PageHeader
          badge="Resources"
          title={<>Compliance <span className="text-copper">Calendar</span></>}
          subtitle="Never miss a deadline. A quick overview of standard monthly, quarterly, and annual compliance deadlines in India."
        />

        <section className="py-12 lg:py-20 relative z-10 -mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto min-h-[500px]">
              <div className="space-y-16 lg:space-y-24">
                {complianceDeadlines.map((block, i) => (
                  <div key={i} className="relative">
                    <div className="flex items-center gap-6 mb-10">
                      <h3 className="font-heading text-3xl md:text-4xl font-bold text-navy tracking-tight">{block.month}</h3>
                      <div className="flex-1 h-[1px] bg-sand/40" />
                    </div>
                    
                    <div className="flex flex-col bg-white rounded-[32px] p-6 lg:p-10 shadow-[0_20px_40px_-15px_rgba(20,33,58,0.05)] border border-black/5">
                      {block.items.map((item, j) => (
                        <div 
                          key={j} 
                          className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-8 lg:gap-16 py-6 border-b border-sand/30 last:border-0 hover:bg-[#FBF9F6] -mx-6 px-6 lg:-mx-10 lg:px-10 transition-colors duration-300 cursor-default relative overflow-hidden"
                        >
                          {/* Accent line on hover */}
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-copper opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          <div className="w-full md:w-[240px] lg:w-[280px] shrink-0">
                            <span className="inline-flex items-center gap-2 font-heading font-semibold text-2xl lg:text-3xl text-navy group-hover:text-copper transition-colors duration-300 leading-tight">
                              {item.date}
                            </span>
                          </div>
                          <div className="flex-1">
                            <span className="font-body text-lg lg:text-xl text-navy/70 group-hover:text-navy transition-colors duration-300">
                              {item.task}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ContactForm isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
