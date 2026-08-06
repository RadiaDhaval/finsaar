"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import { ChevronDown } from "lucide-react";

const faqCategories = [
  {
    title: "Onboarding & Systems",
    questions: [
      {
        q: "What accounting software does Finsaar work with?",
        a: "We are completely tech-agnostic. Finsaar integrates seamlessly with Tally Prime, Zoho Books, QuickBooks, ClearTax, and even Microsoft Excel. We fit into your existing systems rather than forcing a platform migration on day one.",
      },
      {
        q: "How quickly can we get started?",
        a: "Our onboarding process typically takes 5-7 business days. We begin with a comprehensive financial health check, clean up your existing books, and establish real-time reporting within the first two weeks.",
      },
      {
        q: "Will I have a dedicated team or just one person?",
        a: "Every Finsaar client gets a dedicated micro-team: a CA-qualified analyst for day-to-day operations and a senior CFO advisor for strategic oversight. You're never dependent on a single person.",
      },
    ],
  },
  {
    title: "Pricing & Structure",
    questions: [
      {
        q: "Do I need a full-time CFO, or is a fractional CFO enough?",
        a: "For most businesses between ₹1Cr and ₹100Cr in revenue, a fractional CFO provides the same strategic expertise at 65-80% lower cost. A full-time CFO only becomes necessary at much larger scales or during complex M&A processes.",
      },
      {
        q: "How is Finsaar's pricing structured?",
        a: "We offer fixed monthly retainers based on your transaction volume and complexity — not hourly billing. This gives you predictable costs with unlimited access to your advisory team. No surprise invoices.",
      },
      {
        q: "What is the minimum engagement period?",
        a: "We require a minimum 3-month engagement to ensure meaningful impact. Most clients continue well beyond this as they see the compounding value of having an embedded financial partner.",
      },
    ],
  },
  {
    title: "Service Scope",
    questions: [
      {
        q: "What is AR/AP reconciliation and why does it matter?",
        a: "Accounts Receivable/Accounts Payable reconciliation ensures every rupee coming in and going out of your business is properly tracked and matched. Poor reconciliation leads to cash flow blind spots, missed payments, and audit risks.",
      },
      {
        q: "Can Finsaar help with fundraising?",
        a: "Absolutely. Our Capital Structure Advisory service includes building investor-ready data rooms, financial modeling, term sheet analysis, and direct support during due diligence processes. We've helped clients raise from seed to Series A and beyond.",
      },
      {
        q: "Do you handle GST and regulatory compliance?",
        a: "Yes, comprehensive GST compliance is core to our Accounts & Compliance pillar. This includes GSTR-1, GSTR-3B, TDS payments, advance tax installments, ROC filings, and a real-time compliance calendar to ensure you never miss a deadline.",
      },
    ],
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-sand/30 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 px-1 text-left min-h-[44px] cursor-pointer group"
      >
        <span
          className={`font-heading font-semibold text-[15px] pr-4 transition-colors duration-300 ${
            isOpen ? "text-copper" : "text-navy group-hover:text-copper"
          }`}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown
            size={20}
            className={`transition-colors duration-300 ${
              isOpen ? "text-copper" : "text-navy/30"
            }`}
          />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="font-body text-sm text-navy/60 leading-relaxed pb-5 px-1">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-sand-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="font-body text-sm text-copper font-medium uppercase tracking-widest">
            FAQ
          </span>
          <Heading as="h2" className="mt-4">
            Questions <span className="text-copper">founders</span> ask us
          </Heading>
          <Text size="lg" muted className="mt-6">
            Everything you need to know about working with Finsaar.
          </Text>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 gap-6">
            {faqCategories.map((category, catIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
                className="bg-white rounded-2xl border border-sand/40 shadow-sm overflow-hidden"
              >
                <div className="px-6 py-4 bg-sand-light/30 border-b border-sand/20">
                  <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-navy/60">
                    {category.title}
                  </h3>
                </div>
                <div className="px-6">
                  {category.questions.map((faq, qIndex) => (
                    <FAQItem
                      key={faq.q}
                      question={faq.q}
                      answer={faq.a}
                      isOpen={!!openItems[`${catIndex}-${qIndex}`]}
                      onToggle={() => toggleItem(`${catIndex}-${qIndex}`)}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
