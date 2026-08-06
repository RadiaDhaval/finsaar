"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import { BookOpen, TrendingUp, Landmark, ArrowRight } from "lucide-react";
import Link from "next/link";
import DirectionHover from "@/components/DirectionHover";
import HomeServicesSkeleton from "./HomeServicesSkeleton";

const services = [
  {
    title: "Accounts & Compliance",
    description: "End-to-end bookkeeping, GST filings, TDS management, and ROC compliance.",
    icon: BookOpen,
    gradient: "from-sand-light/50 to-white",
  },
  {
    title: "CFO as a Service",
    description: "MIS reporting, cashflow optimization, budgeting, and financial planning.",
    icon: TrendingUp,
    gradient: "from-copper/5 to-white",
  },
  {
    title: "Capital Structure Advisory",
    description: "M&A readiness, investor data rooms, term sheet negotiation, and fundraising.",
    icon: Landmark,
    gradient: "from-navy/[0.03] to-white",
  },
];

export default function HomeServices() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching delay to demonstrate skeleton
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      ref={ref}
      className="py-24 lg:py-32 bg-white relative z-30 -mt-6 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]"
      style={{ borderTopRightRadius: '100vw 8vw' }}
    >
      <motion.div style={{ y }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="font-body text-sm text-copper font-medium uppercase tracking-widest">Our Services</span>
          <Heading as="h2" className="mt-4">
            Three pillars of <span className="text-copper">financial clarity</span>
          </Heading>
          <Text size="lg" muted className="mt-6">
            From day-to-day compliance to boardroom-ready capital strategy.
          </Text>
        </motion.div>

        {isLoading ? (
          <HomeServicesSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(20,33,58,0.08)" }}
                className={`group bg-gradient-to-br ${service.gradient} rounded-2xl border border-sand/40 hover:border-terracotta/40 p-8 transition-all duration-500`}
              >
                <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center mb-5 group-hover:bg-copper/20 transition-colors">
                  <service.icon size={24} className="text-copper" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading font-bold text-xl text-navy mb-3">{service.title}</h3>
                <Text muted className="mb-6">{service.description}</Text>
                <Link href="/services" className="inline-flex items-center gap-2 font-heading font-semibold text-sm text-copper hover:text-copper-dark transition-colors group/link">
                  Learn more
                  <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link href="/services" className="inline-flex items-center gap-2 font-heading font-semibold text-copper transition-colors group">
            <DirectionHover 
              title="View all services in detail" 
              font={{ fontSize: 16, fontFamily: "var(--font-plus-jakarta)", fontWeight: 600 }} 
              textColor="#B5723B" 
              hoverColor="#8e5324" 
            />
            <ArrowRight size={16} className="text-copper group-hover:text-copper-dark group-hover:translate-x-1 transition-all" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
