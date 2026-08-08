"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import { Quote, Star } from "lucide-react";
import Image from "next/image";

// Testimonial data (without external logos)
const testimonials = [
  {
    id: 1,
    content: "With Finsaar, I feel like they are part of our founding team. They take care of not only my books and compliances but managing cashflow and margin guidelines as well.",
    author: "Lavanya",
    role: "Founder, Fabswadeshi",
    image: "/rahul.png",
  },
  {
    id: 2,
    content: "We are one of the first clients of Finsaar and we are so proud of this association. The team is super responsive and available all the time. Our compliances are always on time and books up to date.",
    author: "Varun Varma",
    role: "Co-founder, Yber",
    image: "/anjali.png",
  },
  {
    id: 3,
    content: "Team Finsaar & Dhaval Radia has played great role in our businesses growth journey. They have helped us complete finance and capital management. Helped us raise structured finance when we need the most.",
    author: "Archit Gupta",
    role: "CEO, Dhansa Labs Ltd",
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

  // Auto-slide effect every 5 seconds, resetting the timer when user manually changes slide
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
          <span className="font-body text-sm text-navy/60 font-medium uppercase tracking-widest flex items-center justify-center gap-2">
            <span className="w-8 h-[1px] bg-navy/20" /> Client Success Stories <span className="w-8 h-[1px] bg-navy/20" />
          </span>
          <Heading as="h2" className="mt-6">
            Those who <span className="text-navy">trust us</span>
          </Heading>
          <Text size="lg" muted className="mt-6">
            Hear from founders who have unlocked their growth potential with Finsaar as their embedded financial partner.
          </Text>
        </motion.div>

        {/* Premium Testimonial Carousel */}
        <div className="max-w-5xl mx-auto relative group">
          
          {/* Card Outer Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-copper/10 via-sand/20 to-navy-light/10 blur-3xl opacity-60 rounded-full pointer-events-none" />

          {/* Premium Card Container */}
          <div className="relative z-10 bg-gradient-to-br from-[#0c1322] via-[#0f192b] to-[#080d18] rounded-[2.5rem] p-8 md:p-16 shadow-[0_30px_70px_rgba(8,13,24,0.45)] overflow-hidden border border-white/[0.08] backdrop-blur-xl">
            
            {/* Background animated glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-copper/5 blur-[120px] rounded-full pointer-events-none animate-[pulse_8s_infinite]" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-navy-light/15 blur-[120px] rounded-full pointer-events-none animate-[pulse_10s_infinite_2s]" />
            
            {/* Decorative Quote Watermark */}
            <div className="absolute top-12 right-12 text-white/[0.02] rotate-12 pointer-events-none scale-150 select-none">
              <Quote size={200} strokeWidth={2} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-center relative z-10"
              >
                
                {/* Client Image Area */}
                <div className="shrink-0 relative mx-auto md:mx-0">
                  <div className="absolute -inset-3 bg-gradient-to-br from-copper to-sand rounded-full opacity-15 group-hover:opacity-25 transition-opacity duration-700 blur-md pointer-events-none" />
                  <div className="w-40 h-40 md:w-52 md:h-52 relative rounded-full overflow-hidden p-[3px] bg-gradient-to-br from-copper/60 via-sand/40 to-white/10 shadow-2xl">
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
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#0c1322]/85 backdrop-blur-md rounded-full px-4 py-1.5 shadow-xl flex items-center gap-1 border border-white/10">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} size={11} className="text-[#fbbf24] fill-[#fbbf24] drop-shadow-md" />
                    ))}
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex flex-col text-center md:text-left mt-6 md:mt-0">
                  <Quote size={40} className="text-copper/75 mb-6 mx-auto md:mx-0 drop-shadow-[0_2px_8px_rgba(181,114,59,0.25)]" />
                  
                  {/* Predefined heights for text to avoid resizing shifts */}
                  <p className="font-heading font-medium text-2xl md:text-3xl text-white/95 leading-[1.6] mb-10 tracking-wide min-h-[280px] sm:min-h-[220px] md:min-h-[200px]">
                    &quot;{testimonials[currentIndex].content}&quot;
                  </p>
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-t border-white/10 pt-8 mt-auto gap-6">
                    <div>
                      <h4 className="font-heading font-bold text-xl text-white tracking-wide">
                        {testimonials[currentIndex].author}
                      </h4>
                      <p className="font-body text-sm text-copper-light uppercase tracking-wider mt-1.5">
                        {testimonials[currentIndex].role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
          </div>

          {/* Navigation Dots centered below with arrows removed */}
          <div className="flex items-center justify-center mt-10">
            <div className="flex gap-2.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-500 rounded-full h-2 ${
                    currentIndex === idx ? "w-10 bg-copper shadow-[0_0_10px_rgba(181,114,59,0.4)]" : "w-2.5 bg-navy/15 hover:bg-navy/35"
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
