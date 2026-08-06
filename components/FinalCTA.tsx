"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import PulseOrbAnimation from "@/components/ui/PulseOrbAnimation";

export default function FinalCTA({
  onOpenContact,
}: {
  onOpenContact: () => void;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section 
      ref={ref}
      className="py-24 lg:py-32 bg-navy relative overflow-hidden z-[80] -mt-6 shadow-[0_-15px_40px_rgba(0,0,0,0.1)]"
      style={{ borderTopLeftRadius: '100vw 8vw' }}
    >
      <motion.div style={{ y }}>
        {/* Background Glows */}
      <div className="absolute inset-0">
        <PulseOrbAnimation />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5" />
        <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-copper/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full bg-copper/5 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
            Finance shouldn&apos;t be the{" "}
            <span className="text-copper">limiting factor.</span>
          </h2>
          <p className="font-body text-lg text-white/50 max-w-2xl mx-auto">
            Join 50+ founders who&apos;ve unlocked scalable financial
            infrastructure with Finsaar. Let&apos;s build your finance brain
            together.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Button size="lg" onClick={onOpenContact} className="text-base">
              Book a Strategy Call
              <ArrowRight size={18} />
            </Button>
          </motion.div>
        </motion.div>
      </div>
      </motion.div>
    </section>
  );
}
