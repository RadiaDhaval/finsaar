"use client";

import { useState } from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Heading from "@/components/ui/Heading";
import { Plus, ArrowRight } from "lucide-react";
import Link from "next/link";
import DirectionHover from "@/components/DirectionHover";

const topFaqs = [
  { q: "Do I need a full-time CFO, or is a fractional CFO enough?", a: "For most businesses between ₹1Cr and ₹100Cr in revenue, a fractional CFO provides the same strategic expertise at 65-80% lower cost." },
  { q: "What accounting software does Finsaar work with?", a: "We are completely tech-agnostic. Finsaar integrates seamlessly with Tally Prime, Zoho Books, QuickBooks, ClearTax, and even Microsoft Excel." },
  { q: "How quickly can we get started?", a: "Our onboarding process typically takes 5-7 business days. We begin with a comprehensive financial health check and establish real-time reporting within the first two weeks." },
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
      className="py-24 lg:py-32 bg-sand-light/30 relative z-[70] -mt-6 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]"
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

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-10">
          <Link href="/faq" className="inline-flex items-center gap-2 font-heading font-semibold text-navy transition-colors group">
            <DirectionHover 
              title="View all FAQs" 
              font={{ fontSize: 16, fontFamily: "var(--font-plus-jakarta)", fontWeight: 600 }} 
              textColor="#14213A" 
              hoverColor="#1c2d4f" 
            />
            <ArrowRight size={16} className="text-navy group-hover:text-navy-light group-hover:translate-x-1 transition-all" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
