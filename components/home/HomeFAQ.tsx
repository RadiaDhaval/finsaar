"use client";

import { useState } from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Heading from "@/components/ui/Heading";
import { Plus } from "lucide-react";

const topFaqs = [
  { q: "What does finsaar do?", a: "Finsaar is an integrated financial services partner for growing Indian businesses, combining hands-on accounting, compliance, and Fractional CFO support with capital management advisory. We work with companies whose finance needs have outgrown a single bookkeeper but don't yet justify a full in-house CFO — from scaling startups to established SMEs." },
  { q: "Who is finsaar built for?", a: "Finsaar works with two kinds of businesses: startups on the journey from early revenue to scale — whether bootstrapped, growing, or funded — and SMEs in manufacturing, export, services, B2B businesses B2C & D2C brands or SaaS that need disciplined accounting, compliance, and financial strategy. We don't work with pre-revenue/idea-stage companies or trading businesses; our playbooks are built for businesses with real transaction volume, real compliance obligations, and real growth or fundraising ambitions." },
  { q: "What's the difference between finsaar's accounting services and a Virtual CFO engagement?", a: "Accounting and compliance services keep your books, filings, and payroll accurate and on time; a Virtual CFO engagement adds strategic financial leadership — forecasting, MIS, fundraising or debt support, and board-level reporting — on top of that foundation. Most clients start with the accounting layer and add Fractional CFO support as reporting and capital needs grow." },
  { q: "Do I need a full-time CFO, or is a fractional/virtual CFO enough?", a: "Most SMEs and startups don't need a full-time CFO at every stage — a Fractional CFO delivers the same strategic oversight (forecasting, fundraising readiness, board reporting, capital structuring) at a fraction of the cost, engaged for the hours your business actually needs. Finsaar scales the engagement up or down as you grow — from early revenue through a funding round and beyond — so you're not paying for full-time capacity before you need it." },
  { q: "Does finsaar work with startups at every stage, or only certain sizes?", a: "finsaar works with startups from early revenue through growth and scale — what we think of as the 1-to-10-to-10x journey — as long as the business is revenue-generating, growing, and/or has raised funding. We're not the right fit for pre-revenue or purely idea-stage companies, since the value of a Fractional CFO shows up once there's real financial activity, compliance load, and decisions to inform." },
  { q: "What accounting software and tools does finsaar work with?", a: "finsaar works with the accounting and finance tools Indian SMEs already use — most commonly Tally, along with Excel-based workflows, Zoho Books, and bank statement/GST portal integrations. We fit into your existing systems rather than forcing a platform migration on day one." },
  { q: "How is finsaar different from a traditional CA firm or accounting outsourcing vendor?", a: "A traditional CA firm typically files your returns and closes your books once a period ends; finsaar runs your finance function continuously — bookkeeping, compliance, payroll, and MIS reporting on a set cadence — plus the option to layer on Fractional CFO and capital advisory as you scale. It's built as one relationship that grows with the business instead of a series of one-off engagements." },
  { q: "How does pricing work?", a: "finsaar prices engagements based on transaction volume, entity complexity, and scope (accounting-only vs. accounting plus Fractional CFO), typically as a fixed monthly retainer rather than hourly billing. This gives founders and finance teams a predictable line item instead of variable CA fees." },
  { q: "How long does onboarding take?", a: "Most clients are fully onboarded — books migrated, historical data reconciled, and reporting cadence set — within 2–4 weeks, depending on the state of existing records and the number of entities involved. Businesses with clean, up-to-date books onboard faster; those needing catch-up bookkeeping take a bit longer up front." },
  { q: "Is my financial data secure with finsaar?", a: "Yes — client financial data is handled under confidentiality agreements, access-controlled systems, and standard data protection practices, and is never shared with third parties without consent. If you're a funded startup with investor-grade data sensitivity, we can walk through our specific data handling practices during onboarding." },
];
export default function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section 
      ref={ref}
      className="py-24 lg:py-32 bg-white relative z-[70] -mt-6 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]"
      style={{ borderTopLeftRadius: '100vw 6vw', borderBottomRightRadius: '100vw 6vw' }}
    >
      <motion.div style={{ y }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="font-body text-sm text-navy font-medium uppercase tracking-widest">FAQ</span>
          <Heading as="h2" className="mt-4">
            Questions <span className="text-navy/80">founders</span> ask us
          </Heading>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {topFaqs.map((faq, i) => (
            <div 
              key={faq.q} 
              className={`bg-white rounded-[28px] transition-all duration-300 ${openIndex === i ? 'border border-navy shadow-[0_8px_30px_rgb(0,0,0,0.08)]' : 'border border-navy/[0.08] shadow-sm hover:shadow-md hover:border-navy/20'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-6 px-8 text-left cursor-pointer group"
              >
                <span className={`font-heading font-medium text-base pr-4 transition-colors text-navy`}>
                  {faq.q}
                </span>
                <motion.div 
                  animate={{ rotate: openIndex === i ? 45 : 0 }} 
                  transition={{ duration: 0.3 }} 
                  className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${openIndex === i ? 'border-navy text-navy' : 'border-navy/30 text-navy/60 group-hover:border-navy group-hover:text-navy'}`}
                >
                  <Plus size={14} strokeWidth={2} />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: "auto", opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }} 
                    transition={{ duration: 0.3 }} 
                    className="overflow-hidden"
                  >
                    <p className="font-body text-[15px] text-navy/70 leading-relaxed pb-7 px-8 pt-0">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}
