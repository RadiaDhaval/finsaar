"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Heading from "@/components/ui/Heading";
import { Plus } from "lucide-react";

interface FAQ {
  q: string;
  a: string;
}

export default function ServiceFAQ({ faqs, title = "Frequently asked questions" }: { faqs: FAQ[], title?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const renderFaq = (faq: FAQ, globalIndex: number) => (
    <div 
      key={faq.q} 
      className={`bg-white rounded-[28px] transition-all duration-300 ${openIndex === globalIndex ? 'border border-navy shadow-[0_8px_30px_rgb(0,0,0,0.08)]' : 'border border-navy/[0.08] shadow-sm hover:shadow-md hover:border-navy/20'}`}
    >
      <button
        onClick={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
        className="w-full flex items-start sm:items-center justify-between py-6 px-6 sm:px-8 text-left cursor-pointer group"
      >
        <span className={`font-heading font-medium text-[15px] sm:text-base pr-4 transition-colors text-navy`}>
          {faq.q}
        </span>
        <motion.div 
          animate={{ rotate: openIndex === globalIndex ? 45 : 0 }} 
          transition={{ duration: 0.3 }} 
          className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${openIndex === globalIndex ? 'border-navy text-navy' : 'border-navy/30 text-navy/60 group-hover:border-navy group-hover:text-navy mt-1 sm:mt-0'}`}
        >
          <Plus size={14} strokeWidth={2} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {openIndex === globalIndex && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            transition={{ duration: 0.3 }} 
            className="overflow-hidden"
          >
            <p className="font-body text-sm sm:text-[15px] text-navy/70 leading-relaxed pb-7 px-6 sm:px-8 pt-0">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <section className="py-24 lg:py-32 bg-[#FBF9F6] relative z-[70] shadow-[0_-10px_30px_rgba(0,0,0,0.02)] border-t border-sand/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="font-body text-sm text-navy font-medium uppercase tracking-widest">FAQ</span>
          <Heading as="h2" className="mt-4">
            {title}
          </Heading>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start">
          <div className="space-y-4">
            {faqs.slice(0, Math.ceil(faqs.length / 2)).map((faq, i) => renderFaq(faq, i))}
          </div>
          <div className="space-y-4">
            {faqs.slice(Math.ceil(faqs.length / 2)).map((faq, i) => renderFaq(faq, i + Math.ceil(faqs.length / 2)))}
          </div>
        </div>
      </div>
    </section>
  );
}
