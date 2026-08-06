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
    <div className="flex items-center gap-3 px-8 py-3 mx-4 bg-white rounded-lg border border-sand/40 shadow-sm hover:shadow-md hover:border-copper/30 transition-all duration-300 group min-w-max">
      <div className="w-8 h-8 rounded-lg bg-sand-light flex items-center justify-center group-hover:bg-copper/10 transition-colors duration-300">
        <span className="font-heading font-bold text-sm text-navy group-hover:text-copper transition-colors duration-300">
          {name[0]}
        </span>
      </div>
      <span className="font-body text-sm font-medium text-navy/50 group-hover:text-navy/80 transition-colors whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export default function LogoMarquee() {
  return (
    <section className="py-12 bg-sand-light/40 border-y border-sand/30 overflow-hidden">
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
