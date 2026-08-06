"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";

// Placeholder data - Client can easily swap out images here!
const testimonials = [
  {
    id: 1,
    content: "Finsaar completely transformed how we view our financials. We used to look at history; now we look at the future. Our margins improved by 14% in just six months of working with them.",
    author: "Rahul Sharma",
    role: "Founder & CEO, TechFlow India",
    // To change image: replace the src with actual path like '/testimonials/rahul.jpg'
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", // Example placeholder logo
  },
  {
    id: 2,
    content: "The level of clarity Finsaar brought to our cap table and fundraising strategy was incredible. They act as true operating partners, not just accountants. Best decision we made pre-Series A.",
    author: "Anjali Desai",
    role: "Co-Founder, UrbanVault",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    id: 3,
    content: "Compliance used to be a nightmare that kept me up at night. With Finsaar's embedded CFO model, everything is on autopilot. We finally have a finance brain that scales with us.",
    author: "Vikram Mehta",
    role: "Managing Director, CloudPay",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=crop",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
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

  const nextTestimonial = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section 
      ref={ref}
      className="py-24 lg:py-32 bg-[#F9F7F4] relative z-40 -mt-6 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]"
      style={{ borderTopRightRadius: '100vw 6vw', borderBottomLeftRadius: '100vw 6vw' }}
    >
      <motion.div style={{ y }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16 md:mb-24"
        >
          <span className="font-body text-sm text-copper font-medium uppercase tracking-widest flex items-center justify-center gap-2">
            <span className="w-8 h-[1px] bg-copper/50" /> Client Success Stories <span className="w-8 h-[1px] bg-copper/50" />
          </span>
          <Heading as="h2" className="mt-6">
            Don&apos;t just take our <span className="text-copper">word for it.</span>
          </Heading>
          <Text size="lg" muted className="mt-6">
            Hear from founders who have unlocked their growth potential with Finsaar as their embedded financial partner.
          </Text>
        </motion.div>

        {/* Premium Testimonial Carousel */}
        <div className="max-w-5xl mx-auto relative group">
          
          <div className="absolute -inset-4 bg-gradient-to-r from-copper/20 via-sand/30 to-emerald/20 blur-2xl opacity-50 rounded-full pointer-events-none" />

          <div className="relative z-10 bg-[#0f192b] rounded-[2.5rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(15,25,43,0.3)] overflow-hidden border border-white/10">
            {/* Background glows & watermark */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-copper/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#1e345e] blur-[100px] rounded-full pointer-events-none" />
            
            <div className="absolute top-12 right-12 text-white/[0.03] rotate-12 pointer-events-none scale-150">
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
                  <div className="absolute -inset-3 bg-gradient-to-br from-copper to-copper/0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-700 blur-lg" />
                  <div className="w-40 h-40 md:w-52 md:h-52 relative rounded-full overflow-hidden border-[3px] border-copper/40 shadow-2xl bg-navy-light">
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].author}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  {/* Premium Rating Badge */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 shadow-xl flex items-center gap-1.5 border border-white/20">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} size={14} className="text-[#fbbf24] fill-[#fbbf24] drop-shadow-md" />
                    ))}
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex flex-col text-center md:text-left mt-6 md:mt-0">
                  <Quote size={40} className="text-copper/60 mb-6 mx-auto md:mx-0 drop-shadow-sm" />
                  <p className="font-heading font-medium text-2xl md:text-3xl text-white/95 leading-[1.6] mb-10 tracking-wide">
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
                    
                    {/* Client Logo Placeholder */}
                    <div className="h-10 relative opacity-60 grayscale contrast-200 invert hidden md:block group-hover:opacity-100 transition-opacity duration-500">
                      <Image
                         src={testimonials[currentIndex].logo}
                         alt="Company Logo"
                         width={120}
                         height={40}
                         className="object-contain h-full w-auto"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
          </div>

          {/* Navigation Controls positioned cleanly below */}
          <div className="flex items-center justify-between mt-10 px-4">
            <div className="flex gap-2.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-500 rounded-full h-2 ${
                    currentIndex === idx ? "w-10 bg-copper shadow-[0_0_10px_rgba(181,114,59,0.5)]" : "w-2 bg-navy/20 hover:bg-navy/40"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button 
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-navy/10 flex items-center justify-center text-navy/60 hover:bg-navy hover:text-white hover:border-navy transition-all shadow-sm"
              >
                <ChevronLeft size={20} strokeWidth={2} />
              </button>
              <button 
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-navy/10 flex items-center justify-center text-navy/60 hover:bg-navy hover:text-white hover:border-navy transition-all shadow-sm"
              >
                <ChevronRight size={20} strokeWidth={2} />
              </button>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
