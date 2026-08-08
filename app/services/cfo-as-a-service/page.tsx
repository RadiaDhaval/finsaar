"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/ui/PageHeader";
import FinalCTA from "@/components/FinalCTA";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import { CheckCircle2, Target } from "lucide-react";

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
        <PageHeader
          badge="CFO as a service"
          title={<>Manage your business finance sharply with our <span className="text-copper">CFO as a service.</span></>}
          subtitle="Finsaar delivers CFO support embedded as your team, not just as consultants—tech (AI) enabled, led by senior finance professionals for planning, strategy, and investment readiness."
        />
        
        {/* Services & Capabilities Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-heading text-3xl font-bold text-navy mb-8">Capabilities</h2>
                <div className="space-y-4">
                  {capabilities.map((cap, i) => (
                    <div key={i} className="flex items-center gap-4 bg-blue-50/40 p-4 rounded-xl border border-blue-100/50">
                      <CheckCircle2 className="text-blue-600 shrink-0" size={24} />
                      <span className="font-heading font-semibold text-navy text-lg">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-navy rounded-[40px] p-10 lg:p-14 relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-copper/20 blur-3xl rounded-full" />
                <h2 className="font-heading text-3xl font-bold text-white mb-8 relative z-10">Who is the right fit</h2>
                <div className="space-y-6 relative z-10">
                  {rightFit.map((fit, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="mt-1">
                        <Target className="text-copper shrink-0" size={20} />
                      </div>
                      <p className="font-body text-white/80 leading-relaxed text-[15px]">{fit}</p>
                    </div>
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
