"use client";

import { motion } from "framer-motion";

import Image from "next/image";

const logos = [
  "/imp/logo/a.png",
  "/imp/logo/b.png",
  "/imp/logo/c.png",
  "/imp/logo/d.png",
  "/imp/logo/e.png",
];

function LogoItem({ src }: { src: string }) {
  return (
    <div className="flex items-center justify-center mx-12 sm:mx-16 group min-w-[120px] cursor-pointer">
      <div className="relative w-[120px] h-[40px] opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500">
        <Image src={src} alt="Client Logo" fill className="object-contain" />
      </div>
    </div>
  );
}

export default function LogoMarquee() {
  return (
    <section 
      className="py-10 bg-white border-b border-sand/40 relative z-10 -mt-4 shadow-[0_-5px_20px_rgba(0,0,0,0.02)]"
      style={{ borderTopRightRadius: '100vw 4vw' }}
    >
      <div className="relative mt-8">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee">
          {/* Duplicate logos for seamless loop */}
          {[...logos, ...logos, ...logos].map((src, i) => (
            <LogoItem key={`logo-${i}`} src={src} />
          ))}
        </div>
      </div>
    </section>
  );
}
