"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"

interface ButterflyData {
  id: number
  startX: number
  startY: number
  color: string
  size: number
  pathDuration: number
  wingSpeed: number
}

function ButterflyShape({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 40 28" fill="none">
      {/* Left wing */}
      <motion.path
        d="M20 14 Q8 2 4 10 Q2 18 20 14Z"
        fill={color}
        fillOpacity={0.7}
        animate={{ d: [
          "M20 14 Q8 2 4 10 Q2 18 20 14Z",
          "M20 14 Q12 6 8 12 Q6 18 20 14Z",
          "M20 14 Q8 2 4 10 Q2 18 20 14Z",
        ]}}
        transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Right wing */}
      <motion.path
        d="M20 14 Q32 2 36 10 Q38 18 20 14Z"
        fill={color}
        fillOpacity={0.7}
        animate={{ d: [
          "M20 14 Q32 2 36 10 Q38 18 20 14Z",
          "M20 14 Q28 6 32 12 Q34 18 20 14Z",
          "M20 14 Q32 2 36 10 Q38 18 20 14Z",
        ]}}
        transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Left lower wing */}
      <motion.path
        d="M20 14 Q10 16 6 22 Q12 26 20 14Z"
        fill={color}
        fillOpacity={0.5}
        animate={{ d: [
          "M20 14 Q10 16 6 22 Q12 26 20 14Z",
          "M20 14 Q13 16 10 20 Q14 24 20 14Z",
          "M20 14 Q10 16 6 22 Q12 26 20 14Z",
        ]}}
        transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Right lower wing */}
      <motion.path
        d="M20 14 Q30 16 34 22 Q28 26 20 14Z"
        fill={color}
        fillOpacity={0.5}
        animate={{ d: [
          "M20 14 Q30 16 34 22 Q28 26 20 14Z",
          "M20 14 Q27 16 30 20 Q26 24 20 14Z",
          "M20 14 Q30 16 34 22 Q28 26 20 14Z",
        ]}}
        transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Body */}
      <ellipse cx="20" cy="14" rx="1.5" ry="6" fill="#5a2040" fillOpacity={0.8} />
      {/* Antennae */}
      <path d="M19 8 Q16 4 14 3" stroke="#5a2040" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M21 8 Q24 4 26 3" stroke="#5a2040" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <circle cx="14" cy="3" r="1" fill="#5a2040" fillOpacity={0.6} />
      <circle cx="26" cy="3" r="1" fill="#5a2040" fillOpacity={0.6} />
    </svg>
  )
}

export function Butterflies() {
  const butterflies = useMemo<ButterflyData[]>(() => {
    const colors = ["#b57edc", "#d88cb5", "#c47eb5", "#9b72cf", "#e0a0c0", "#a87cc4"]
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      startX: 10 + Math.random() * 80,
      startY: 15 + Math.random() * 50,
      color: colors[i],
      size: 28 + Math.random() * 16,
      pathDuration: 12 + Math.random() * 10,
      wingSpeed: 0.3 + Math.random() * 0.3,
    }))
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-10">
      {butterflies.map((b) => (
        <motion.div
          key={b.id}
          className="absolute"
          style={{
            left: `${b.startX}%`,
            top: `${b.startY}%`,
          }}
          animate={{
            x: [
              0,
              Math.sin(b.id * 1.5) * 80,
              Math.cos(b.id * 0.8) * 120,
              Math.sin(b.id * 2) * 60,
              0,
            ],
            y: [
              0,
              Math.cos(b.id * 1.2) * 50,
              Math.sin(b.id * 0.6) * 80,
              Math.cos(b.id * 1.8) * 40,
              0,
            ],
          }}
          transition={{
            duration: b.pathDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ButterflyShape color={b.color} size={b.size} />
        </motion.div>
      ))}
    </div>
  )
}
