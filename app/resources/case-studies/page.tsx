"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/ui/PageHeader";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CaseStudy, getCaseStudies } from "@/lib/case-studies-service";

export default function CaseStudiesPage() {
  const [contactOpen, setContactOpen] = useState(false);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getCaseStudies();
        setCaseStudies(data);
      } catch (err) {
        console.error("Failed to load case studies:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <>
      <Navbar onOpenContact={() => setContactOpen(true)} />
      <main className="flex-1 bg-[#FBF9F6] min-h-screen">
        <PageHeader
          badge="Resources"
          title={<>Case <span className="text-copper">Studies</span></>}
          subtitle="How we drive growth. Real examples of how our embedded CFO and compliance services transformed businesses."
        />

        <section className="py-12 lg:py-20 relative z-10 -mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto min-h-[500px]">
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
                      <div className="shrink-0 w-full md:w-[260px] lg:w-[320px]">
                        <span className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-heading font-medium text-sand tracking-widest uppercase mb-6 md:mb-8">
                          {study.industry}
                        </span>
                        <div className="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-br from-white to-white/30 tracking-tighter leading-none mb-3">
                          {study.metric.split(' ')[0]}
                        </div>
                        <div className="font-heading font-bold text-lg md:text-xl lg:text-2xl text-sand tracking-tight">
                          {study.metric.split(' ').slice(1).join(' ')}
                        </div>
                      </div>
                      
                      {/* Right: Content */}
                      <div className="flex-1 mt-6 md:mt-0 md:pt-4">
                        <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight group-hover:text-sand transition-colors duration-500">
                          {study.title}
                        </h3>
                        <p className="font-body text-base md:text-lg text-white/50 leading-relaxed mb-8 md:mb-10 max-w-2xl font-light">
                          {study.description || study.desc}
                        </p>
                        
                        <Link href="#" className="group/btn inline-flex items-center gap-3 font-heading font-semibold text-white hover:text-sand transition-colors duration-300">
                          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:border-sand group-hover/btn:bg-sand/10 transition-colors duration-300">
                            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </div>
                          <span className="relative overflow-hidden">
                            <span className="block transition-transform duration-500 group-hover/btn:-translate-y-full">Explore Study</span>
                            <span className="block absolute top-0 left-0 transition-transform duration-500 translate-y-full group-hover/btn:translate-y-0 text-sand">Explore Study</span>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
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
