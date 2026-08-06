"use client";

import { motion } from "framer-motion";

export default function CoinAnimation() {
  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-lg overflow-visible"
      >
        <defs>
          <linearGradient id="coinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="coinGradDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
        </defs>

        {/* Stack of Coins */}
        {[0, 1, 2].map((i) => (
          <motion.g
            key={i}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              bounce: 0.5,
              duration: 1,
              delay: 0.5 + i * 0.3,
            }}
          >
            {/* Coin Side */}
            <path
              d={`M20 ${70 - i * 15} C20 ${78 - i * 15} 80 ${78 - i * 15} 80 ${70 - i * 15} L80 ${76 - i * 15} C80 ${84 - i * 15} 20 ${84 - i * 15} 20 ${76 - i * 15} Z`}
              fill="url(#coinGradDark)"
            />
            {/* Coin Top */}
            <ellipse
              cx="50"
              cy={70 - i * 15}
              rx="30"
              ry="8"
              fill="url(#coinGrad)"
              stroke="#fbbf24"
              strokeWidth="1.5"
            />
            {/* Inner Ring */}
            <ellipse
              cx="50"
              cy={70 - i * 15}
              rx="22"
              ry="5"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="1"
              opacity="0.5"
            />
          </motion.g>
        ))}

        {/* Sparkles */}
        {[0, 1, 2].map((i) => (
          <motion.path
            key={`sparkle-${i}`}
            d="M50 20 L52 28 L60 30 L52 32 L50 40 L48 32 L40 30 L48 28 Z"
            fill="#fbbf24"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0], rotate: 180 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeInOut",
            }}
            style={{
              originX: "50px",
              originY: "30px",
              x: (i - 1) * 20,
              y: (i % 2) * 15,
            }}
          />
        ))}
      </motion.svg>
    </div>
  );
}
