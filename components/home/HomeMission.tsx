"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function HomeMission() {
  return (
    <section className="py-24 lg:py-40 bg-[#FBF9F6] relative border-b border-sand/30 flex items-center justify-center overflow-hidden z-[60] -mt-6 rounded-t-[32px] md:rounded-t-[48px] lg:rounded-t-[64px] shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sand/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10"
        >
          <div className="flex justify-center">
            <Quote size={48} className="text-copper/40 rotate-180" strokeWidth={1} />
          </div>
          
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl leading-[1.2] text-navy font-semibold tracking-tight">
            Business growth should not stall due to a lack of <span className="text-copper italic">financial know-how.</span>
          </h2>
          
          <div className="w-16 h-[2px] bg-copper/30 mx-auto" />
          
          <p className="font-body text-xl md:text-2xl text-navy/60 max-w-2xl mx-auto leading-relaxed font-light">
            Every great business should have an equal opportunity to scale. Finance shouldn't be the limiting factor—that's our mission.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
