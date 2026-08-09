"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import { Quote, Star } from "lucide-react";
import Image from "next/image";

// Testimonial data
const testimonials = [
  {
    id: 1,
    content: "With Finsaar, I feel like they're part of our founding team. They take care of not just our books and compliance, but our cashflow and margin guidelines too.",
    author: "Lavanya",
    role: "Founder, Fabswadeshi",
    image: "/rahul.png",
  },
  {
    id: 2,
    content: "We were one of the first clients of Finsaar, and we're proud of that association. The team is super responsive and always available — our compliance is always on time and our books are always up to date.",
    author: "Mansa",
    role: "Co-founder, Yber",
    image: "/anjali.png",
  },
  {
    id: 3,
    content: "Team Finsaar and Dhaval Radia have played a great role in our business's growth journey. They've instrumental in finance and capital management - helped us raise structured finance exactly when we needed it most.",
    author: "Archit Gupta",
    role: "CEO, Dhansa Labs Ltd (formerly Ambey Laboratories Ltd)",
    image: "/vikram.png",
  }
];

export default function HomeTestimonials() {
  const ref = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // Auto-slide effect every 5 seconds, resetting on slide changes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section 
      ref={ref}
      className="py-24 lg:py-32 bg-white relative z-40"
    >
      <motion.div style={{ y }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16 md:mb-24"
        >
          <Heading as="h2">
            Those who <span className="text-navy">trust us</span>
          </Heading>
          <Text size="lg" muted className="mt-6">
            Hear from founders who have unlocked their growth potential with Finsaar as their embedded financial partner.
          </Text>
        </motion.div>

        {/* Premium Testimonial Carousel */}
        <div className="max-w-4xl mx-auto relative group">
          
          {/* Card Outer Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-copper/10 via-sand/20 to-navy-light/10 blur-3xl opacity-50 rounded-full pointer-events-none" />

          {/* Premium Card Container */}
          <div className="relative z-10 bg-gradient-to-br from-[#0c162c] via-[#0f1b33] to-[#0a1122] rounded-[32px] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(6,10,18,0.7)] overflow-hidden border border-white/[0.06] backdrop-blur-2xl">
            
            {/* Edge Glow Overlay */}
            <div className="absolute inset-0 rounded-[32px] p-[1px] bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent pointer-events-none" />

            {/* Background animated glows */}
            <motion.div
              animate={{
                x: [0, 15, -10, 0],
                y: [0, -20, 15, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-0 right-0 w-[300px] h-[300px] bg-copper/5 blur-[100px] rounded-full pointer-events-none"
            />
            <motion.div
              animate={{
                x: [0, -10, 20, 0],
                y: [0, 20, -15, 0],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute -bottom-10 -left-10 w-[300px] h-[300px] bg-navy-light/10 blur-[100px] rounded-full pointer-events-none"
            />
            
            {/* Decorative Outline Quote Watermark */}
            <div className="absolute top-6 right-6 text-copper/[0.03] rotate-12 pointer-events-none scale-125 select-none">
              <Quote size={180} strokeWidth={2} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, filter: "blur(8px)", scale: 0.98 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(8px)", scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center relative z-10"
              >
                
                {/* Client Image Area */}
                <div className="shrink-0 relative mx-auto md:mx-0">
                  <div className="absolute -inset-3 bg-gradient-to-br from-copper to-sand rounded-full opacity-15 group-hover:opacity-25 transition-opacity duration-700 blur-md pointer-events-none" />
                  <div className="w-32 h-32 md:w-40 md:h-40 relative rounded-full overflow-hidden p-[3px] bg-gradient-to-br from-copper/60 via-sand/45 to-white/10 shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-navy-light">
                      <Image
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].author}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  {/* Premium Rating Badge */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#0c1322]/95 backdrop-blur-md rounded-full px-3.5 py-1 shadow-[0_4px_15px_rgba(0,0,0,0.5)] flex items-center gap-0.5 border border-white/10 transition-transform duration-500 group-hover:scale-105">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} size={10} className="text-[#fbbf24] fill-[#fbbf24] drop-shadow-md" />
                    ))}
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex flex-col text-center md:text-left mt-4 md:mt-0">
                  {/* Premium Glass Tile Quote Icon */}
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 mb-4 mx-auto md:mx-0 shadow-inner">
                    <Quote size={16} className="text-copper" />
                  </div>
                  
                  {/* Fixed heights for text to completely avoid resizing shifts */}
                  <div className="h-[200px] sm:h-[120px] md:h-[130px] flex items-center">
                    <p className="font-heading font-medium text-xl md:text-2xl text-white/95 leading-[1.6] tracking-wide w-full">
                      &quot;{testimonials[currentIndex].content}&quot;
                    </p>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-t border-white/10 pt-6 mt-6 md:mt-8 gap-4">
                    <div>
                      <h4 className="font-heading font-bold text-lg text-white tracking-wide">
                        {testimonials[currentIndex].author}
                      </h4>
                      <p className="font-body text-[11px] text-copper font-semibold uppercase tracking-widest mt-1 flex items-center gap-1.5 justify-center md:justify-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-copper animate-pulse" />
                        {testimonials[currentIndex].role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
          </div>

          {/* Premium Floating Indicator Capsule */}
          <div className="flex items-center justify-center mt-10">
            <div className="inline-flex items-center gap-3 bg-white/40 backdrop-blur-md border border-sand/30 px-5 py-2.5 rounded-full shadow-[0_4px_25px_-5px_rgba(20,33,58,0.06)]">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-500 rounded-full h-2 ${
                    currentIndex === idx ? "w-10 bg-gradient-to-r from-copper to-sand shadow-[0_0_12px_rgba(181,114,59,0.5)]" : "w-2 bg-navy/20 hover:bg-navy/40"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
