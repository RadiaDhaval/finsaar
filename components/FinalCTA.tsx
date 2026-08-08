"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

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
      {/* Minimal Animated Dot Grid Background */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          maskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)"
        }}
      >
        <motion.div
          animate={{
            backgroundPosition: ["0px 0px", "40px 40px"],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "linear",
          }}
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)",
            backgroundSize: "40px 40px",
          }}
        />
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
