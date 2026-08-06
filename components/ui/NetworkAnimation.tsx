"use client";

import { motion } from "framer-motion";

export default function NetworkAnimation() {
  // Generate random node positions
  const nodes = [
    { x: 50, y: 50 },
    { x: 150, y: 20 },
    { x: 250, y: 70 },
    { x: 350, y: 40 },
    { x: 100, y: 150 },
    { x: 200, y: 180 },
    { x: 300, y: 140 },
    { x: 40, y: 250 },
    { x: 150, y: 280 },
    { x: 250, y: 260 },
    { x: 360, y: 230 },
  ];

  // Define connections (index pairs)
  const edges = [
    [0, 1], [1, 2], [2, 3],
    [0, 4], [1, 5], [2, 6],
    [4, 5], [5, 6], [6, 3],
    [4, 7], [5, 8], [6, 9],
    [7, 8], [8, 9], [9, 10], [10, 6]
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.25]">
      <motion.svg
        viewBox="0 0 400 300"
        className="w-full h-full max-w-[1200px]"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B5723B" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#9A5A34" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Draw Edges */}
        {edges.map(([start, end], i) => (
          <motion.line
            key={`edge-${i}`}
            x1={nodes[start].x}
            y1={nodes[start].y}
            x2={nodes[end].x}
            y2={nodes[end].y}
            stroke="url(#edgeGrad)"
            strokeWidth="0.8"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: i * 0.1, ease: "easeInOut" }}
          />
        ))}

        {/* Draw Nodes */}
        {nodes.map((node, i) => (
          <motion.g key={`node-${i}`}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="3"
              fill="#fff"
              stroke="#B5723B"
              strokeWidth="1"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 + 0.5, type: "spring" }}
            />
            {/* Pulsing effect on some nodes */}
            {i % 3 === 0 && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="8"
                fill="none"
                stroke="#B5723B"
                strokeWidth="0.5"
                initial={{ scale: 0.5, opacity: 0.6 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
              />
            )}
          </motion.g>
        ))}
      </motion.svg>
    </div>
  );
}
