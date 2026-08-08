"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, BarChart3 } from "lucide-react";
import Button from "@/components/ui/Button";

const services = [
  {
    title: "Accounting & compliance",
    desc: "Your books of accounts are taken care of—so you focus on growth.",
    icon: BookOpen,
    href: "/services/accounting-compliance",
    color: "copper",
    bg: "bg-orange-50/50 hover:bg-orange-50",
  },
  {
    title: "CFO as a service",
    desc: "Manage your business finance sharply with our CFO as a service.",
    icon: BarChart3,
    href: "/services/cfo-as-a-service",
    color: "navy",
    bg: "bg-blue-50/50 hover:bg-blue-50",
  }
];

export default function ServiceCards() {
  return (
    <section className="pt-[100px] pb-20 lg:pt-[120px] lg:pb-32 bg-white relative z-10 min-h-[85vh] flex items-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className={`group relative overflow-hidden rounded-[40px] border border-sand/40 p-10 lg:p-14 transition-all duration-500 hover:shadow-xl ${s.bg} flex flex-col justify-between`}
            >
              {/* Subtle background glow */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/60 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div>
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-white/80 flex items-center justify-center mb-8">
                  <s.icon size={28} className="text-navy" strokeWidth={1.5} />
                </div>
                
                <h3 className="font-heading text-3xl lg:text-4xl font-bold text-navy mb-4 leading-tight">
                  {s.title}
                </h3>
                <p className="font-body text-lg text-navy/70 leading-relaxed mb-10">
                  {s.desc}
                </p>
              </div>

              <Link href={s.href} className="inline-block mt-auto">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Service
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
