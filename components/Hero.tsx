"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import Image from "next/image";
import MeshText from "@/components/MeshText";
import { TrendingUp, ShieldCheck } from "lucide-react";

export default function Hero({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <section
      id="hero"
      className="relative pt-[72px] min-h-screen flex items-center overflow-hidden bg-white"
    >
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-sand-light/30 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-copper/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-sand/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16 lg:py-0">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-2 bg-sand-light px-4 py-2 rounded-full text-sm font-body font-medium text-navy/70">
                  <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                  Boutique CFO-as-a-Service
                </span>
              </motion.div>

              <Heading as="h1">
                We&apos;ve got your{" "}
                <span className="inline-block relative w-[180px] h-[60px] md:w-[240px] md:h-[80px] align-bottom">
                  <MeshText 
                    text="finance" 
                    color="#B5723B" 
                    font={{ fontFamily: "Plus Jakarta Sans", fontSize: 72, variant: "Bold", fontWeight: 700 }} 
                  />
                </span>{" "}
                &amp; your back.
              </Heading>
            </div>

            <Text size="lg" muted className="max-w-lg">
              Finsaar is a boutique CFO-as-a-service firm. We manage your
              accounting, compliance, and capital strategy so founders can focus
              strictly on business growth.
            </Text>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" onClick={onOpenContact}>
                Book a Strategy Call
              </Button>
              <Button variant="secondary" size="lg" onClick={onOpenContact}>
                Evaluate Your Finances
              </Button>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex items-center gap-8 pt-4"
            >
              {[
                { value: "₹10,000Cr+", label: "Assets Managed" },
                { value: "100+", label: "Years Combined Exp." },
                { value: "50+", label: "Clients Served" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading font-bold text-xl text-navy">
                    {stat.value}
                  </p>
                  <p className="font-body text-xs text-navy/50 mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: 3D Dashboard Graphic */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative flex items-center justify-center w-full"
          >
            <motion.div 
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.02, rotate: 1 }}
              className="relative w-full max-w-lg lg:max-w-none transition-transform duration-300"
            >
              <Image
                src="/images/hero-dashboard.png"
                alt="Finsaar Financial Dashboard"
                width={700}
                height={500}
                className="w-full h-auto object-contain drop-shadow-2xl"
                priority
              />
              {/* Floating stat card overlays - 2026 Immersive Style */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="absolute top-[10%] -left-[5%] sm:-left-[15%] lg:-left-[20%] z-20 cursor-pointer group"
              >
                <div className="relative overflow-hidden bg-white/60 backdrop-blur-3xl rounded-[24px] p-5 pr-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] border border-white/80 transition-all duration-300 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)]">
                  {/* Inner glow line */}
                  <div className="absolute inset-0 rounded-[24px] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] pointer-events-none" />
                  
                  {/* Background Gradient Mesh */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald/20 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative flex items-center gap-5">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white to-emerald-50 flex items-center justify-center shrink-0 border border-emerald/20 shadow-[0_8px_16px_-6px_rgba(16,185,129,0.3)] group-hover:shadow-[0_12px_24px_-8px_rgba(16,185,129,0.5)] transition-shadow duration-300">
                      <TrendingUp size={24} className="text-emerald drop-shadow-sm" />
                    </div>
                    
                    {/* Text */}
                    <div className="flex flex-col">
                      <p className="text-[10px] font-heading font-extrabold tracking-[0.25em] uppercase text-navy/40 mb-1">
                        Monthly Savings
                      </p>
                      <div className="flex items-baseline gap-1">
                        <p className="text-3xl font-heading font-black bg-gradient-to-br from-navy to-emerald-800 bg-clip-text text-transparent group-hover:from-emerald-700 group-hover:to-emerald transition-all duration-500">
                          ₹4.2L
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="absolute bottom-[15%] -right-[5%] sm:-right-[10%] lg:-right-[15%] z-20 cursor-pointer group"
              >
                <div className="relative overflow-hidden bg-white/60 backdrop-blur-3xl rounded-[24px] p-5 pr-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] border border-white/80 transition-all duration-300 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)]">
                  {/* Inner glow line */}
                  <div className="absolute inset-0 rounded-[24px] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] pointer-events-none" />
                  
                  {/* Background Gradient Mesh */}
                  <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-copper/20 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative flex items-center gap-5">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white to-copper-light/30 flex items-center justify-center shrink-0 border border-copper/20 shadow-[0_8px_16px_-6px_rgba(181,114,59,0.3)] group-hover:shadow-[0_12px_24px_-8px_rgba(181,114,59,0.5)] transition-shadow duration-300">
                      <ShieldCheck size={24} className="text-copper drop-shadow-sm" />
                    </div>
                    
                    {/* Text */}
                    <div className="flex flex-col">
                      <p className="text-[10px] font-heading font-extrabold tracking-[0.25em] uppercase text-navy/40 mb-1">
                        Compliance Score
                      </p>
                      <div className="flex items-baseline gap-1">
                        <p className="text-3xl font-heading font-black bg-gradient-to-br from-navy to-copper-dark bg-clip-text text-transparent group-hover:from-copper group-hover:to-copper-dark transition-all duration-500">
                          98.5%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
