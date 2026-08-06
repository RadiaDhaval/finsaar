"use client";

import { motion } from "framer-motion";

export default function ShieldAnimation() {
  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      <motion.svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-xl overflow-visible"
      >
        <defs>
          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="checkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
        </defs>

        {/* Shield Body */}
        <motion.path
          d="M100 20 C140 20 180 40 180 40 C180 100 160 160 100 190 C40 160 20 100 20 40 C20 40 60 20 100 20 Z"
          fill="url(#shieldGrad)"
          stroke="#059669"
          strokeWidth="4"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", bounce: 0.5, duration: 1 }}
        />

        {/* Shield Inner Glow */}
        <motion.path
          d="M100 30 C135 30 170 48 170 48 C170 98 153 150 100 176 C47 150 30 98 30 48 C30 48 65 30 100 30 Z"
          fill="none"
          stroke="#34d399"
          strokeWidth="2"
          opacity="0.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
        />

        {/* Checkmark */}
        <motion.path
          d="M60 100 L90 130 L140 70"
          fill="none"
          stroke="url(#checkGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
        />

        {/* Success burst particles */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.circle
            key={`burst-${i}`}
            cx="100"
            cy="100"
            r="4"
            fill="#34d399"
            initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
            whileInView={{ 
              scale: [0, 1, 0],
              x: Math.cos((i * 60 * Math.PI) / 180) * 80,
              y: Math.sin((i * 60 * Math.PI) / 180) * 80,
              opacity: [1, 0.5, 0]
            }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
          />
        ))}
      </motion.svg>
    </div>
  );
}
