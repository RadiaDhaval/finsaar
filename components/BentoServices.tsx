"use client";

import { motion } from "framer-motion";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import {
  BookOpen,
  TrendingUp,
  Landmark,
  FileCheck,
  BarChart3,
  Calculator,
  PieChart,
  ArrowUpRight,
  Briefcase,
  Scale,
} from "lucide-react";

const services = [
  {
    id: "accounts",
    title: "Accounts & Compliance",
    description:
      "End-to-end bookkeeping, GST filings, TDS management, and ROC compliance so you never miss a deadline.",
    icon: BookOpen,
    features: [
      { icon: FileCheck, label: "GST & TDS Filings" },
      { icon: BookOpen, label: "Bookkeeping & Reconciliation" },
      { icon: Calculator, label: "Payroll Processing" },
    ],
    testimonial: {
      quote:
        "Finsaar has been super responsive and available all the time. They manage every aspect of our compliance seamlessly.",
      author: "Lavanya",
      company: "Fabswadeshi",
    },
    gradient: "from-sand-light/50 to-white",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    id: "cfo",
    title: "CFO as a Service",
    description:
      "MIS reporting, cashflow optimization, budgeting, and financial planning — like having a full-time CFO at a fraction of the cost.",
    icon: TrendingUp,
    features: [
      { icon: BarChart3, label: "MIS & Reporting" },
      { icon: PieChart, label: "Cashflow Optimization" },
      { icon: TrendingUp, label: "Budgeting & Forecasting" },
    ],
    testimonial: {
      quote:
        "Their guidance on managing cashflow and margin guidelines helped us scale 3x in one year.",
      author: "Varun Varma",
      company: "Yber",
    },
    gradient: "from-copper/5 to-white",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    id: "capital",
    title: "Capital Structure Advisory",
    description:
      "From M&A readiness and investor data rooms to term sheet negotiation and structured finance — we prepare you for growth capital.",
    icon: Landmark,
    features: [
      { icon: Briefcase, label: "M&A Readiness" },
      { icon: Scale, label: "Term Sheet Support" },
      { icon: ArrowUpRight, label: "Fundraising Strategy" },
    ],
    testimonial: {
      quote:
        "Finsaar helped us raise structured finance and build a proper data room. Invaluable during our Series A.",
      author: "Archit Gupta",
      company: "Dhansa Labs",
    },
    gradient: "from-navy/[0.03] to-white",
    span: "md:col-span-2 md:row-span-1",
  },
];

export default function BentoServices() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="font-body text-sm text-navy font-medium uppercase tracking-widest">
            Our Services
          </span>
          <Heading as="h2" className="mt-4">
            Three pillars of{" "}
            <span className="text-navy/80">financial clarity</span>
          </Heading>
          <Text size="lg" muted className="mt-6">
            From day-to-day compliance to boardroom-ready capital strategy, we
            handle your entire financial stack.
          </Text>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{
                y: -4,
                boxShadow: "0 20px 60px rgba(20, 33, 58, 0.08), 0 0 20px rgba(154, 90, 52, 0.15)",
              }}
              className={`${service.span} group bg-gradient-to-br ${service.gradient} rounded-2xl border border-sand/40 hover:border-terracotta/40 p-8 transition-all duration-500 cursor-default`}
            >
              {/* Icon + Title */}
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center shrink-0 group-hover:bg-navy/10 transition-colors duration-300">
                  <service.icon
                    size={24}
                    className="text-navy"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <Heading as="h3" className="text-xl md:text-2xl">
                    {service.title}
                  </Heading>
                </div>
              </div>

              <Text muted className="mb-6">
                {service.description}
              </Text>

              {/* Features */}
              <div className="flex flex-wrap gap-3 mb-6">
                {service.features.map((feat) => (
                  <div
                    key={feat.label}
                    className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-lg border border-sand/30 text-sm font-body text-navy/70"
                  >
                    <feat.icon size={14} className="text-navy/50" />
                    {feat.label}
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-sand/20">
                <p className="font-body text-sm text-navy/60 italic leading-relaxed">
                  &ldquo;{service.testimonial.quote}&rdquo;
                </p>
                <p className="font-heading font-semibold text-sm text-navy mt-3">
                  {service.testimonial.author}
                  <span className="text-navy/60 ml-1">
                    · {service.testimonial.company}
                  </span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
