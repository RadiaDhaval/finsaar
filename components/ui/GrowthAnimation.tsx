"use client";

import { motion } from "framer-motion";

export default function GrowthAnimation() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.15]">
      <motion.svg
        viewBox="0 0 800 400"
        className="w-full h-full max-w-[1400px]"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="growthLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B5723B" stopOpacity="0" />
            <stop offset="50%" stopColor="#B5723B" stopOpacity="1" />
            <stop offset="100%" stopColor="#9A5A34" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="growthFillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#B5723B" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#B5723B" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Abstract Chart Fill */}
        <motion.path
          d="M0 400 L0 300 Q100 280 200 250 T400 150 T600 80 T800 20 L800 400 Z"
          fill="url(#growthFillGrad)"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Abstract Chart Line */}
        <motion.path
          d="M0 300 Q100 280 200 250 T400 150 T600 80 T800 20"
          fill="none"
          stroke="url(#growthLineGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Floating Data Nodes */}
        {[
          { cx: 200, cy: 250, delay: 0.5 },
          { cx: 400, cy: 150, delay: 1 },
          { cx: 600, cy: 80, delay: 1.5 },
        ].map((node, i) => (
          <motion.g key={`node-${i}`}>
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r="6"
              fill="#fff"
              stroke="#B5723B"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: node.delay, type: "spring" }}
            />
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r="20"
              fill="none"
              stroke="#B5723B"
              strokeWidth="1"
              initial={{ scale: 0, opacity: 1 }}
              whileInView={{ scale: 2.5, opacity: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: node.delay,
              }}
            />
          </motion.g>
        ))}
      </motion.svg>
    </div>
  );
}
