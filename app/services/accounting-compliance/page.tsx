"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/ui/PageHeader";
import FinalCTA from "@/components/FinalCTA";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import { CheckCircle2, ListChecks } from "lucide-react";

const servicesList = [
  "Accounting & bookkeeping",
  "GST compliance",
  "Tax compliance",
  "Payroll processing & compliance",
];

const howItWorks = [
  { step: "1", title: "Discovery", desc: "Current-state review" },
  { step: "2", title: "Setup & Cleanup", desc: "Accounting system alignment" },
  { step: "3", title: "Monthly Closes", desc: "Compliance calendar execution" },
  { step: "4", title: "Insights", desc: "Ongoing improvements" },
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
        <PageHeader
          badge="Accounting & compliance"
          title={<>Your books of accounts are taken care of—<span className="text-copper">so you focus on growth.</span></>}
          subtitle="A solid foundation for your business growth."
        />
        
        {/* Services & Capabilities Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-heading text-3xl font-bold text-navy mb-8">What we cover</h2>
                <div className="space-y-4">
                  {servicesList.map((service, i) => (
                    <div key={i} className="flex items-center gap-4 bg-orange-50/40 p-4 rounded-xl border border-orange-100/50">
                      <CheckCircle2 className="text-copper shrink-0" size={24} />
                      <span className="font-heading font-semibold text-navy text-lg">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-navy rounded-[40px] p-10 lg:p-14 relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-copper/20 blur-3xl rounded-full" />
                <h2 className="font-heading text-3xl font-bold text-white mb-8 relative z-10">How it works</h2>
                <div className="space-y-8 relative z-10">
                  {howItWorks.map((step, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                        <span className="font-heading font-bold text-copper text-lg">{step.step}</span>
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-xl text-white mb-1">{step.title}</h3>
                        <p className="font-body text-white/60">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
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
