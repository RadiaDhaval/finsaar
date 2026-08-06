"use client";

import { motion } from "framer-motion";

export default function RealtimeIllustration() {
  return (
    <div className="relative w-full aspect-[4/3] flex items-center justify-center pointer-events-none p-10">
      {/* Background glow */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-3/4 h-3/4 rounded-full bg-copper/10 blur-3xl"
      />
      
      <motion.svg
        viewBox="0 0 300 200"
        className="w-full h-full drop-shadow-2xl overflow-visible"
        style={{ filter: "drop-shadow(0px 20px 30px rgba(181, 114, 59, 0.15))" }}
      >
        <defs>
          <linearGradient id="barGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#B5723B" />
            <stop offset="100%" stopColor="#8e5324" />
          </linearGradient>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1="20"
            y1={160 - i * 40}
            x2="280"
            y2={160 - i * 40}
            stroke="#e2e8f0"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}

        {/* Animated Bars */}
        {[
          { h: 40, x: 50 },
          { h: 70, x: 100 },
          { h: 50, x: 150 },
          { h: 100, x: 200 },
          { h: 130, x: 250 },
        ].map((bar, i) => (
          <motion.rect
            key={i}
            x={bar.x - 15}
            y={160 - bar.h}
            width="30"
            height={bar.h}
            fill="url(#barGrad)"
            rx="4"
            initial={{ height: 0, y: 160 }}
            animate={{ height: bar.h, y: 160 - bar.h }}
            transition={{
              duration: 1.5,
              delay: i * 0.2,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Trending Line */}
        <motion.path
          d="M 50 110 L 100 80 L 150 95 L 200 50 L 250 20"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
        />

        {/* Points on the line */}
        {[
          { y: 110, x: 50 },
          { y: 80, x: 100 },
          { y: 95, x: 150 },
          { y: 50, x: 200 },
          { y: 20, x: 250 },
        ].map((point, i) => (
          <motion.circle
            key={`pt-${i}`}
            cx={point.x}
            cy={point.y}
            r="6"
            fill="#fff"
            stroke="#059669"
            strokeWidth="3"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 + i * 0.2 + 0.5, ease: "backOut" }}
          />
        ))}
      </motion.svg>
    </div>
  );
}
