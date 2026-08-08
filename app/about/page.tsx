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
    desc: "We are chartered accountants and finance professionals with over 100 years of combined experience. Together we have raised, deployed and managed over Rs. 10,000 crs and have scaled businesses.",
    icon: Briefcase,
    color: "text-copper",
    bg: "bg-orange-50/50",
    border: "border-orange-100",
  },
  {
    title: "Embedded not fractional",
    desc: "We work as a part of your team embedding within the system and not just as consultants or advisors. We don't sit outside the fence, we work closely with you, get involved and be a part of your conversations as senior leaders.",
    icon: Users2,
    color: "text-emerald",
    bg: "bg-emerald-50/50",
    border: "border-emerald-100",
  },
  {
    title: "Tech enabled, human led",
    desc: "We are tech enabled and leverage technology to deliver the outcome. We are building in-house AI capability, essentially building a finance brain for businesses - leveraging technology and human expertise.",
    icon: Cpu,
    color: "text-blue-600",
    bg: "bg-blue-50/50",
    border: "border-blue-100",
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
              <span className="font-body text-sm text-sand font-medium uppercase tracking-widest">Why Us</span>
              <Heading as="h2" className="mt-6 text-white text-4xl md:text-5xl leading-tight">
                Come for our expertise and stay for the <span className="text-sand italic">reliability & outcome.</span>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className={`bg-white rounded-3xl p-8 lg:p-10 border ${pillar.border} shadow-sm hover:shadow-xl transition-all duration-300 group`}
                >
                  <div className={`w-14 h-14 rounded-2xl ${pillar.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                    <pillar.icon size={24} className={pillar.color} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-navy mb-4">{pillar.title}</h3>
                  <p className="font-body text-[15px] text-navy/70 leading-relaxed">
                    {pillar.desc}
                  </p>
                </motion.div>
              ))}
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
