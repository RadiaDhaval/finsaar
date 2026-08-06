"use client";

import { motion } from "framer-motion";

export default function PulseOrbAnimation() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
      <motion.svg
        viewBox="0 0 400 400"
        className="w-[800px] h-[800px] drop-shadow-xl"
      >
        <defs>
          <radialGradient id="orbGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#B5723B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#B5723B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Central Orb */}
        <motion.circle
          cx="200"
          cy="200"
          r="40"
          fill="url(#orbGrad)"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Expanding Rings */}
        {[1, 2, 3].map((i) => (
          <motion.circle
            key={i}
            cx="200"
            cy="200"
            r="40"
            fill="none"
            stroke="#B5723B"
            strokeWidth="1"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 4 + i * 2, opacity: 0 }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Orbiting particles */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`particle-${i}`}
            cx="200"
            cy="200"
            r="3"
            fill="#fff"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 10 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              originX: "200px",
              originY: "200px",
              y: -100 - i * 40,
            }}
          />
        ))}
      </motion.svg>
    </div>
  );
}
