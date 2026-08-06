"use client";

import { motion } from "framer-motion";

export default function ServicesAnimation() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.25] overflow-hidden">
      <motion.svg
        viewBox="0 0 1000 600"
        className="w-full h-full max-w-[1400px]"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="servicesGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B5723B" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#B5723B" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#9A5A34" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Diagonal sweeping lines */}
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.line
            key={`line-${i}`}
            x1="-200"
            y1={i * 150}
            x2="1200"
            y2={i * 150 - 400}
            stroke="url(#servicesGrad)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Floating abstract polygons */}
        {[
          { points: "100,50 150,150 50,150", delay: 0 },
          { points: "800,100 900,100 850,200", delay: 0.5 },
          { points: "400,450 500,550 300,550", delay: 1 },
        ].map((poly, i) => (
          <motion.polygon
            key={`poly-${i}`}
            points={poly.points}
            fill="none"
            stroke="#B5723B"
            strokeWidth="1"
            strokeDasharray="5 10"
            animate={{
              rotate: 360,
              y: [0, -20, 0],
            }}
            transition={{
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: poly.delay },
            }}
            style={{
              originX: "50%",
              originY: "50%",
            }}
          />
        ))}

        {/* Shimmering highlights */}
        {[...Array(6)].map((_, i) => (
          <motion.circle
            key={`shimmer-${i}`}
            cx={200 + i * 150}
            cy={100 + (i % 3) * 150}
            r="2"
            fill="#B5723B"
            animate={{
              opacity: [0, 0.4, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.svg>
    </div>
  );
}
