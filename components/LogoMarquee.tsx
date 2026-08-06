"use client";

import { motion } from "framer-motion";

const logos = [
  "Fabswadeshi",
  "Yber",
  "Dhansa Labs",
  "NexScale",
  "UrbanVault",
  "CloudPay",
  "GreenStack",
  "FinBridge",
];

function LogoItem({ name }: { name: string }) {
  return (
    <div className="flex items-center mx-12 sm:mx-16 group min-w-max cursor-pointer">
      <span className="font-heading font-black text-3xl sm:text-4xl text-navy/15 group-hover:text-copper transition-colors duration-500 whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export default function LogoMarquee() {
  return (
    <section 
      className="py-10 bg-sand-light/40 border-b border-sand/40 relative z-10 -mt-4 shadow-[0_-5px_20px_rgba(0,0,0,0.02)]"
      style={{ borderTopRightRadius: '100vw 4vw' }}
    >
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center font-body text-sm text-navy/40 uppercase tracking-widest mb-8"
      >
        Trusted by India&apos;s fastest-growing companies
      </motion.p>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-sand-light/40 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-sand-light/40 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee">
          {/* Duplicate logos for seamless loop */}
          {[...logos, ...logos].map((name, i) => (
            <LogoItem key={`${name}-${i}`} name={name} />
          ))}
        </div>
      </div>
    </section>
  );
}
