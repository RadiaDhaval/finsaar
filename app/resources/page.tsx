"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/ui/PageHeader";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { FileText, Download, TrendingUp, Calculator, ShieldCheck } from "lucide-react";

const resources = [
  {
    title: "Startup Due Diligence Checklist",
    description: "The exact 50-point checklist VC and PE firms use when evaluating your data room.",
    category: "Fundraising",
    icon: ShieldCheck,
    type: "PDF Guide",
    fileSize: "2.4 MB"
  },
  {
    title: "13-Week Cashflow Model",
    description: "Our proprietary Excel template for tracking runway and forecasting cash crunches before they happen.",
    category: "Finance",
    icon: TrendingUp,
    type: "Excel Template",
    fileSize: "1.1 MB"
  },
  {
    title: "Indian Startup Compliance Calendar 2026",
    description: "Never miss a GST, TDS, or ROC deadline again with this comprehensive yearly calendar.",
    category: "Compliance",
    icon: FileText,
    type: "PDF Guide",
    fileSize: "3.5 MB"
  },
  {
    title: "Founders Guide to Unit Economics",
    description: "How to correctly calculate CAC, LTV, and payback periods without fooling yourself.",
    category: "Strategy",
    icon: Calculator,
    type: "Whitepaper",
    fileSize: "4.2 MB"
  }
];

export default function ResourcesPage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <Navbar onOpenContact={() => setContactOpen(true)} />
      <main className="flex-1">
        <PageHeader
          badge="Free Resources"
          title={<>Tools to build your <span className="text-copper">financial engine</span></>}
          subtitle="Download our proprietary templates, checklists, and guides used by top-tier Indian startups."
        />

        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {resources.map((resource, i) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-sand-light/20 rounded-2xl p-8 border border-sand/40 hover:border-copper/30 transition-all duration-300 flex flex-col group"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center border border-sand/40 group-hover:border-copper/30 transition-colors">
                      <resource.icon size={24} className="text-copper" strokeWidth={1.5} />
                    </div>
                    <span className="px-3 py-1 bg-white border border-sand/40 rounded-full text-xs font-heading font-semibold text-navy/60">
                      {resource.category}
                    </span>
                  </div>
                  
                  <h3 className="font-heading font-bold text-2xl text-navy mb-3">
                    {resource.title}
                  </h3>
                  <p className="font-body text-navy/60 mb-8 flex-1">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-sand/30 mt-auto">
                    <div className="flex flex-col">
                      <span className="font-body text-xs text-navy/40 uppercase tracking-widest">{resource.type}</span>
                      <span className="font-body text-sm font-medium text-navy/60">{resource.fileSize}</span>
                    </div>
                    <Button variant="secondary" size="sm" className="gap-2 group-hover:bg-navy group-hover:text-white transition-colors" onClick={() => setContactOpen(true)}>
                      <Download size={16} /> Download
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Newsletter CTA inside Resources */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 bg-navy rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-copper/10 blur-[100px] pointer-events-none" />
              
              <div className="relative z-10 max-w-2xl mx-auto">
                <h3 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">
                  Want more resources like this?
                </h3>
                <p className="font-body text-white/60 mb-8">
                  Join 2,000+ founders receiving our weekly newsletter on scaling finance, compliance updates, and fundraising strategy.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-body placeholder:text-white/30 outline-none focus:border-copper/50 focus:bg-white/10 transition-all"
                  />
                  <Button size="lg" className="whitespace-nowrap">
                    Subscribe
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <ContactForm isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
