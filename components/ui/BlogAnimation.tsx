"use client";

import { motion } from "framer-motion";

export default function BlogAnimation() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-50 mix-blend-screen">
      <motion.svg
        viewBox="0 0 400 400"
        className="w-full h-full drop-shadow-2xl"
      >
        <defs>
          <linearGradient id="blogGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B5723B" />
            <stop offset="100%" stopColor="#9A5A34" />
          </linearGradient>
          <linearGradient id="blogGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#D9C9A8" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Floating abstract paper planes / shards */}
        {[0, 1, 2].map((i) => (
          <motion.path
            key={`shard-${i}`}
            d={`M${150 + i * 20} ${150 + i * 10} L${250 + i * 30} ${100 + i * 20} L${200 + i * 20} ${250 + i * 10} Z`}
            fill="url(#blogGrad2)"
            stroke="url(#blogGrad1)"
            strokeWidth="2"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 5 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.2
            }}
            style={{ originX: "200px", originY: "150px" }}
          />
        ))}

        {/* Orbiting concentric circles */}
        {[1, 2].map((i) => (
          <motion.circle
            key={`circle-${i}`}
            cx="200"
            cy="200"
            r={100 + i * 40}
            fill="none"
            stroke="url(#blogGrad1)"
            strokeWidth="1"
            strokeDasharray="10 20"
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{
              duration: 20 + i * 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ originX: "200px", originY: "200px" }}
          />
        ))}

        {/* Decorative dots */}
        {[...Array(8)].map((_, i) => (
          <motion.circle
            key={`dot-${i}`}
            cx="200"
            cy="200"
            r="3"
            fill="#B5723B"
            animate={{
              x: Math.cos((i * 45 * Math.PI) / 180) * (150 + Math.sin(i) * 20),
              y: Math.sin((i * 45 * Math.PI) / 180) * (150 + Math.cos(i) * 20),
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              opacity: { duration: 2 + (i % 3), repeat: Infinity, ease: "easeInOut" }
            }}
          />
        ))}
      </motion.svg>
    </div>
  );
}
