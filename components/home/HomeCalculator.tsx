"use client";

import { motion } from "framer-motion";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import { Calculator, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomeCalculator({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-sand-light/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-sand/40 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left - Info */}
              <div className="p-10 lg:p-12 flex flex-col justify-center">
                <div className="w-14 h-14 rounded-2xl bg-copper/10 flex items-center justify-center mb-6">
                  <Calculator size={28} className="text-copper" strokeWidth={1.5} />
                </div>
                <span className="font-body text-sm text-copper font-medium uppercase tracking-widest">ROI Calculator</span>
                <Heading as="h2" className="mt-3">
                  Is a fractional CFO <span className="text-copper">worth it?</span>
                </Heading>
                <Text size="lg" muted className="mt-4 mb-8">
                  Use our interactive calculator to compare the cost of a full-time CFO vs. Finsaar&apos;s fractional model. Most founders save 65-82%.
                </Text>
                <div className="flex flex-wrap gap-4">
                  <Link href="/calculator">
                    <Button size="md">
                      Try the Calculator
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                  <Button variant="secondary" size="md" onClick={onOpenContact}>
                    Book a Strategy Call
                  </Button>
                </div>
              </div>

              {/* Right - Visual */}
              <div className="bg-gradient-to-br from-navy to-navy-light p-10 lg:p-12 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-copper/10 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 blur-2xl" />
                <div className="relative text-center space-y-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <p className="font-body text-sm text-white/50">Avg. Annual Savings</p>
                    <p className="font-heading font-extrabold text-4xl text-emerald mt-2">₹28L+</p>
                  </div>
                  <div className="bg-copper/20 backdrop-blur-sm rounded-xl p-6 border border-copper/30">
                    <p className="font-body text-sm text-copper-light">vs Full-Time CFO</p>
                    <p className="font-heading font-extrabold text-4xl text-white mt-2">65-82%</p>
                    <p className="font-body text-xs text-white/40 mt-1">cost reduction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
