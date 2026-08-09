"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/ui/PageHeader";
import FinalCTA from "@/components/FinalCTA";
import { motion } from "framer-motion";
import Heading from "@/components/ui/Heading";
import { Quote, Briefcase, Users2, Cpu } from "lucide-react";

const pillars = [
  {
    title: "Core domain expertise",
    desc: "We are chartered accountants and finance professionals with over 100 years of combined experience. Together we have raised, deployed and managed over Rs. 1,000 crs and have scaled businesses.",
    icon: Briefcase,
    bg: "bg-orange-300",
  },
  {
    title: "Embedded not fractional",
    desc: "We work as a part of your team embedding within the system and not just as consultants or advisors. We don't sit outside the fence, we work closely with you, get involved and be a part of your conversations as senior leaders.",
    icon: Users2,
    bg: "bg-emerald-300",
  },
  {
    title: "Tech enabled, human led",
    desc: "We are tech enabled and leverage technology to deliver the outcome. We are building in-house AI capability, essentially building a finance brain for businesses - leveraging technology and human expertise.",
    icon: Cpu,
    bg: "bg-blue-400",
  }
];

export default function AboutPage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <Navbar onOpenContact={() => setContactOpen(true)} />
      <main className="flex-1">
        {/* Premium Hero */}
        <PageHeader
          badge="About Finsaar"
          title={<>We simplify your <span className="text-copper">company finance.</span></>}
          subtitle="Finsaar helps growing startups and SMEs make smarter strategic decisions by elevating their financial management to the next level."
        />

        {/* Mission & Story Split Layout */}
        <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sand/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              
              {/* Left: Our Mission */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <Quote className="absolute -top-6 -left-6 text-sand/40 rotate-180" size={64} strokeWidth={1} />
                <span className="font-body text-sm text-copper font-medium uppercase tracking-widest relative z-10">Our Mission</span>
                <Heading as="h2" className="mt-4 mb-6 relative z-10">
                  Equal opportunity <br/><span className="text-copper">to scale</span>
                </Heading>
                <div className="space-y-6 relative z-10">
                  <p className="font-body text-xl text-navy/80 leading-relaxed font-light">
                    Every great business should have an equal opportunity to scale. Finance shouldn't be the limiting factor.
                  </p>
                  <p className="font-body text-lg text-navy/60 leading-relaxed">
                    Managing company finances and compliances is complicated and our mission is to simplify it.
                  </p>
                </div>
              </motion.div>

              {/* Right: Why we created Finsaar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-navy rounded-[40px] p-10 lg:p-14 relative overflow-hidden shadow-2xl"
              >
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-copper/20 blur-[80px] rounded-full pointer-events-none" />
                <span className="font-body text-sm text-sand font-medium uppercase tracking-widest">The Origin</span>
                <h3 className="font-heading text-3xl font-bold text-white mt-4 mb-6">
                  Why we created Finsaar
                </h3>
                <div className="space-y-6">
                  <p className="font-body text-lg text-white/80 leading-relaxed">
                    We are entrepreneurs and founders ourselves and we have lived the scaleup challenges. As chartered accountants we have seen more businesses failing than succeeding due to bad financial management.
                  </p>
                  <p className="font-body text-lg text-white/60 leading-relaxed">
                    Honestly we saw this as an opportunity to help growing businesses with their accounting & finance management.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* "Why Us" Dark Banner */}
        <section className="py-24 bg-navy relative overflow-hidden border-y border-white/10 z-[60] -mt-6 rounded-t-[40px] md:rounded-t-[60px] shadow-[0_-15px_40px_rgba(0,0,0,0.1)]">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-body text-sm text-copper font-medium uppercase tracking-widest">Why Us</span>
              <Heading as="h2" className="mt-6 text-white text-4xl md:text-5xl leading-tight">
                Come for our expertise and stay for the <span className="text-copper italic">reliability & outcome.</span>
              </Heading>
              <p className="font-body text-xl text-white/50 mt-8 max-w-2xl mx-auto font-light">
                (And a bit of banter — after all, finance is fun!)
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pillars / Features */}
        <section className="py-24 lg:py-32 bg-[#FBF9F6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Card 1: Core Domain Expertise (Spans 2 columns) */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="lg:col-span-2 bg-white rounded-[40px] p-8 md:p-10 lg:p-14 border border-sand/30 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-sand/60 transition-all duration-500 group relative overflow-hidden flex flex-col md:flex-row gap-8 items-start"
              >
                <div className="absolute top-0 right-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-orange-300 blur-[80px] md:blur-[120px] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none translate-x-1/3 -translate-y-1/3" />
                <div className="absolute -bottom-4 md:-bottom-10 -right-4 md:-right-10 font-heading font-bold text-[120px] md:text-[180px] lg:text-[240px] leading-none text-sand/10 select-none pointer-events-none group-hover:text-sand/20 transition-colors duration-500">
                  01
                </div>

                <div className="w-20 h-20 shrink-0 rounded-3xl bg-white shadow-[0_8px_16px_rgba(0,0,0,0.04)] border border-sand/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-10">
                  <Briefcase size={36} className="text-copper" strokeWidth={1.5} />
                </div>
                
                <div className="relative z-10 flex-1">
                  <h3 className="font-heading text-3xl lg:text-4xl font-bold text-navy mb-6 leading-tight group-hover:text-copper transition-colors duration-300">
                    {pillars[0].title}
                  </h3>
                  <p className="font-body text-lg text-navy/70 leading-relaxed max-w-xl">
                    {pillars[0].desc}
                  </p>
                </div>
              </motion.div>

              {/* Card 2: Embedded not fractional (Spans 1 column) */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
                className="lg:col-span-1 bg-navy rounded-[40px] p-8 md:p-10 lg:p-14 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden flex flex-col h-full"
              >
                <div className="absolute top-0 right-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-emerald-300 blur-[80px] md:blur-[100px] rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none translate-x-1/2 -translate-y-1/2" />
                <div className="absolute -bottom-2 md:-bottom-6 -right-2 md:-right-4 font-heading font-bold text-[100px] md:text-[140px] lg:text-[180px] leading-none text-white/5 select-none pointer-events-none group-hover:text-white/10 transition-colors duration-500">
                  02
                </div>

                <div className="relative z-10 flex-1 flex flex-col">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500 backdrop-blur-md">
                    <Users2 size={28} className="text-emerald-400" strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="font-heading text-2xl lg:text-3xl font-bold text-white mb-6 leading-tight group-hover:text-emerald-400 transition-colors duration-300">
                    {pillars[1].title}
                  </h3>
                  <p className="font-body text-base text-white/60 leading-relaxed">
                    {pillars[1].desc}
                  </p>
                </div>
              </motion.div>

              {/* Card 3: Tech enabled, human led (Full width) */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                className="lg:col-span-3 bg-white rounded-[40px] p-8 md:p-10 lg:p-16 border border-sand/30 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-sand/60 transition-all duration-500 group relative overflow-hidden flex flex-col md:flex-row gap-8 lg:gap-12 items-center"
              >
                <div className="absolute top-1/2 left-0 w-[300px] md:w-[600px] h-[150px] md:h-[300px] bg-blue-400 blur-[80px] md:blur-[150px] rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none -translate-x-1/4 -translate-y-1/2" />
                <div className="absolute -top-4 md:-top-10 -right-4 md:-right-10 font-heading font-bold text-[140px] md:text-[200px] lg:text-[300px] leading-none text-sand/10 select-none pointer-events-none group-hover:text-sand/20 transition-colors duration-500">
                  03
                </div>

                <div className="w-24 h-24 shrink-0 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 relative z-10">
                  <Cpu size={40} className="text-blue-600" strokeWidth={1.5} />
                </div>
                
                <div className="relative z-10 flex-1">
                  <h3 className="font-heading text-3xl lg:text-5xl font-bold text-navy mb-6 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                    {pillars[2].title}
                  </h3>
                  <p className="font-body text-xl text-navy/70 leading-relaxed max-w-3xl">
                    {pillars[2].desc}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <FinalCTA onOpenContact={() => setContactOpen(true)} />
      </main>
      <Footer />
      <ContactForm isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
