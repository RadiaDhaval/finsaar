"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import { Calculator, TrendingDown, IndianRupee } from "lucide-react";

const painPoints = ["Messy Books", "Fundraising", "Margin Erosion"] as const;

function formatCurrency(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  return `₹${value.toLocaleString("en-IN")}`;
}

export default function ROICalculator() {
  const [revenue, setRevenue] = useState(5); // in Cr
  const [employees, setEmployees] = useState(25);
  const [painPoint, setPainPoint] = useState<(typeof painPoints)[number]>("Messy Books");

  const calculations = useMemo(() => {
    // Full-time CFO cost estimate (Indian market)
    const baseSalary = 3000000 + revenue * 200000; // ₹30L base + scales with revenue
    const benefits = baseSalary * 0.35; // 35% benefits overhead
    const fullTimeCost = baseSalary + benefits;

    // Finsaar fractional cost (monthly retainer scaled by complexity)
    const complexityMultiplier =
      painPoint === "Fundraising" ? 1.3 : painPoint === "Margin Erosion" ? 1.15 : 1;
    const monthlyRetainer =
      (50000 + revenue * 15000 + employees * 500) * complexityMultiplier;
    const annualFinsaarCost = monthlyRetainer * 12;

    const savings = fullTimeCost - annualFinsaarCost;
    const savingsPercent = Math.round((savings / fullTimeCost) * 100);

    return {
      fullTimeCost,
      monthlyRetainer,
      annualFinsaarCost,
      savings,
      savingsPercent,
    };
  }, [revenue, employees, painPoint]);

  return (
    <section
      id="calculator"
      className="py-20 lg:py-28 bg-gradient-to-b from-sand-light/30 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="font-body text-sm text-copper font-medium uppercase tracking-widest">
            ROI Calculator
          </span>
          <Heading as="h2" className="mt-4">
            The CFO <span className="text-copper">Cost vs Value</span>{" "}
            Calculator
          </Heading>
          <Text size="lg" muted className="mt-6">
            See how much you save with a fractional CFO compared to a full-time
            hire. Move the sliders to match your business.
          </Text>
        </motion.div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl border border-sand/40 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Inputs */}
            <div className="p-8 lg:p-10 space-y-8 border-b lg:border-b-0 lg:border-r border-sand/30">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-copper/10 flex items-center justify-center">
                  <Calculator size={20} className="text-copper" />
                </div>
                <h3 className="font-heading font-bold text-lg text-navy">
                  Your Business
                </h3>
              </div>

              {/* Revenue Slider */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="font-body text-sm font-medium text-navy/70">
                    Annual Revenue
                  </label>
                  <span className="font-heading font-bold text-copper text-lg">
                    ₹{revenue}Cr
                  </span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={100}
                  step={0.5}
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs font-body text-navy/30">₹50L</span>
                  <span className="text-xs font-body text-navy/30">₹100Cr</span>
                </div>
              </div>

              {/* Employee Slider */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="font-body text-sm font-medium text-navy/70">
                    Employee Count
                  </label>
                  <span className="font-heading font-bold text-copper text-lg">
                    {employees}
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={500}
                  step={5}
                  value={employees}
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs font-body text-navy/30">5</span>
                  <span className="text-xs font-body text-navy/30">500</span>
                </div>
              </div>

              {/* Pain Point Selector */}
              <div>
                <label className="font-body text-sm font-medium text-navy/70 block mb-3">
                  Primary Financial Pain Point
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {painPoints.map((point) => (
                    <button
                      key={point}
                      onClick={() => setPainPoint(point)}
                      className={`px-3 py-3 rounded-xl text-sm font-body font-medium transition-all duration-300 border min-h-[44px] cursor-pointer ${
                        painPoint === point
                          ? "bg-copper text-white border-copper shadow-lg shadow-copper/20"
                          : "bg-sand-light/50 text-navy/60 border-sand/40 hover:border-copper/30"
                      }`}
                    >
                      {point}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="p-8 lg:p-10 bg-gradient-to-br from-navy to-navy-light text-white relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-copper/10 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 blur-2xl pointer-events-none" />

              <div className="relative space-y-8">
                <h3 className="font-heading font-bold text-lg text-white/70">
                  Your Savings Breakdown
                </h3>

                {/* Full-time Cost */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <IndianRupee size={16} className="text-white/50" />
                    <span className="font-body text-sm text-white/50">
                      Full-Time CFO (Annual)
                    </span>
                  </div>
                  <motion.p
                    key={calculations.fullTimeCost}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="font-heading font-bold text-2xl text-white/80 line-through decoration-terracotta/60"
                  >
                    {formatCurrency(calculations.fullTimeCost)}
                  </motion.p>
                </div>

                {/* Finsaar Cost */}
                <div className="bg-copper/20 backdrop-blur-sm rounded-xl p-5 border border-copper/30">
                  <div className="flex items-center gap-2 mb-2">
                    <IndianRupee size={16} className="text-copper-light" />
                    <span className="font-body text-sm text-copper-light">
                      Finsaar Fractional CFO (Monthly)
                    </span>
                  </div>
                  <motion.p
                    key={calculations.monthlyRetainer}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="font-heading font-bold text-2xl text-white"
                  >
                    {formatCurrency(Math.round(calculations.monthlyRetainer))}
                    <span className="text-sm font-normal text-white/50">
                      /month
                    </span>
                  </motion.p>
                </div>

                {/* Savings */}
                <div className="bg-emerald/20 backdrop-blur-sm rounded-xl p-5 border border-emerald/30">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown size={16} className="text-emerald" />
                    <span className="font-body text-sm text-emerald">
                      Potential Annual Savings
                    </span>
                  </div>
                  <div className="flex items-end gap-3">
                    <motion.p
                      key={calculations.savings}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="font-heading font-extrabold text-3xl text-emerald"
                    >
                      {formatCurrency(Math.round(calculations.savings))}
                    </motion.p>
                    <motion.span
                      key={calculations.savingsPercent}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-heading font-bold text-lg text-emerald/70 pb-0.5"
                    >
                      ({calculations.savingsPercent}% savings)
                    </motion.span>
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
