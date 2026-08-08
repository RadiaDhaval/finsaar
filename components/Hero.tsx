"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import { Play } from "lucide-react";
import Image from "next/image";

export default function Hero({ onOpenContact }: { onOpenContact: () => void }) {
  const services = [
    "Accounting & Compliance",
    "Fractional CFO",
    "Capital Management",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [services.length]);
  return (
    <section
      className="relative pt-[100px] pb-[60px] lg:pt-[160px] lg:pb-[140px] min-h-[90vh] lg:min-h-screen flex items-center bg-transparent overflow-hidden lg:overflow-visible"
    >


      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-24 xl:gap-32 items-center py-16 lg:py-0">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10 max-w-2xl -ml-2 lg:-ml-8 xl:-ml-12"
          >
            <div className="space-y-8">
              {/* Badge similar to Steno.ai */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-3 bg-white/50 border border-sand/40 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm">
                  <div className="w-6 h-6 rounded-full bg-[#E5F5E0] flex items-center justify-center">
                    <Play size={10} className="text-[#2e7d32] fill-[#2e7d32] ml-0.5" />
                  </div>
                  <p className="font-body text-xs text-navy/70 italic">
                    "With Finsaar, build a legacy, not just a balance sheet."<br/>
                    <span className="text-navy/50 text-[10px] not-italic">— Rahul Sharma</span>
                  </p>
                </div>
              </motion.div>

              <h1 className="font-heading text-[44px] leading-[1.1] sm:text-6xl md:text-7xl lg:text-[5.5rem] lg:leading-[1.05] tracking-tight text-navy font-medium mt-8 lg:mt-10">
                Growth<br/>
                everywhere.<br/>
                All at once.
              </h1>
            </div>

            <Text size="lg" className="max-w-md text-navy/70 leading-relaxed font-body text-base md:text-lg mt-6 lg:mt-8">
              Finsaar is a boutique CFO as a service firm. We take care of your accounting, compliance, and numbers so you can focus on business growth.
            </Text>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col gap-6 pt-2"
            >
              <div className="flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-white/90 to-sand/20 backdrop-blur-md border border-sand/40 pl-3.5 pr-5 py-1.5 rounded-full shadow-[0_8px_30px_rgba(20,33,58,0.04)]">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-copper/50 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-copper"></span>
                  </span>
                  <span className="text-[9px] uppercase tracking-widest font-extrabold bg-navy/5 text-navy/60 px-2 py-0.5 rounded-md border border-navy/5 shrink-0">
                    Expertise
                  </span>
                  <div className="h-5 overflow-hidden flex items-center relative w-[180px] sm:w-[200px] pl-1">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={index}
                        initial={{ y: 12, opacity: 0, filter: "blur(4px)" }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        exit={{ y: -12, opacity: 0, filter: "blur(4px)" }}
                        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                        className="font-body text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r from-navy via-navy to-copper bg-clip-text text-transparent whitespace-nowrap block"
                      >
                        {services[index]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={onOpenContact}>
                  Apply
                </Button>
              </div>
            </motion.div>


          </motion.div>

          {/* Right: App Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 flex items-center justify-center lg:justify-end w-full lg:w-[48vw] xl:w-[52vw] 2xl:w-[55vw] mt-8 lg:mt-0"
          >
            <div className="relative w-[110%] sm:w-full aspect-[16/11] lg:translate-x-[30%]">
              <div className="relative w-full h-full rounded-xl lg:rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(20,33,58,0.2)] lg:shadow-[0_30px_80px_-20px_rgba(20,33,58,0.2)] border border-navy/10 bg-white flex flex-col">
                {/* Browser Mockup Header */}
                <div className="h-6 lg:h-7 w-full bg-navy border-b border-white/5 flex items-center px-3 shrink-0">
                  <div className="flex gap-1 w-12">
                    <div className="w-2 h-2 rounded-full bg-[#FF5F56] border border-[#E0443E]/50"></div>
                    <div className="w-2 h-2 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50"></div>
                    <div className="w-2 h-2 rounded-full bg-[#27C93F] border border-[#1AAB29]/50"></div>
                  </div>
                  
                  <div className="flex-1 flex justify-center">
                    <div className="w-full max-w-[200px] h-4 lg:h-4.5 bg-white/10 rounded flex items-center justify-center border border-white/5 shadow-inner">
                      <span className="text-[8px] lg:text-[9px] font-body font-medium text-white/60 tracking-wider">finsaar.co</span>
                    </div>
                  </div>
                  
                  <div className="w-12"></div> {/* Spacer to balance dots */}
                </div>

                {/* Dashboard Image */}
                <div className="relative flex-1 w-full bg-white">
                  <Image
                    src="/images/mock_hero.png"
                    alt="Finsaar App Dashboard"
                    fill
                    className="object-cover object-left-top"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Subtle 5px Edge Blur Overlay on the absolute right edge */}
            <div 
              className="hidden lg:block absolute right-0 top-0 bottom-0 w-8 backdrop-blur-[5px] z-20 pointer-events-none"
              style={{
                maskImage: 'linear-gradient(to left, black 0%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to left, black 0%, transparent 100%)'
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
