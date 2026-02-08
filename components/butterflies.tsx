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
  depth: number // 0: behind flowers, 1: in front of flowers
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
        transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
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
        transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
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
      <ellipse cx="20" cy="14" rx="1.5" ry="6" fill="#4a3055" fillOpacity={0.6} />
      {/* Antennae */}
      <path d="M19 8 Q16 4 14 3" stroke="#4a3055" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M21 8 Q24 4 26 3" stroke="#4a3055" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <circle cx="14" cy="3" r="1" fill="#4a3055" fillOpacity={0.5} />
      <circle cx="26" cy="3" r="1" fill="#4a3055" fillOpacity={0.5} />
    </svg>
  )
}

export function Butterflies() {
  const butterflies = useMemo<ButterflyData[]>(() => {
    const colors = ["#d0a8e0", "#e8a8c8", "#c8a8d8", "#b89ae0", "#f0b0d0", "#c8a0d0", "#d8b0e0", "#e0a0c0", "#c890d0"]
    return Array.from({ length: 9 }, (_, i) => ({
      id: i,
      startX: 5 + Math.random() * 90,
      startY: 10 + Math.random() * 60,
      color: colors[i % colors.length],
      size: 24 + Math.random() * 20,
      pathDuration: 15 + Math.random() * 15,
      wingSpeed: 0.25 + Math.random() * 0.35,
      depth: Math.random() > 0.5 ? 0 : 1,
    }))
  }, [])

  return (
    <>
      {/* Butterflies behind flowers */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-[1]">
        {butterflies
          .filter(b => b.depth === 0)
          .map((b) => (
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
                  Math.sin(b.id * 1.2) * 100,
                  Math.cos(b.id * 0.7) * 140,
                  Math.sin(b.id * 1.8) * 80,
                  Math.cos(b.id * 2.2) * 120,
                  0,
                ],
                y: [
                  0,
                  Math.cos(b.id * 0.9) * 60,
                  Math.sin(b.id * 1.5) * 100,
                  Math.cos(b.id * 2.1) * 50,
                  Math.sin(b.id * 0.5) * 70,
                  0,
                ],
                rotate: [
                  0,
                  Math.sin(b.id * 2) * 10,
                  Math.cos(b.id * 1.5) * 15,
                  Math.sin(b.id * 3) * 8,
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

      {/* Butterflies in front of flowers */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-[3]">
        {butterflies
          .filter(b => b.depth === 1)
          .map((b) => (
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
                  Math.cos(b.id * 1.5) * 120,
                  Math.sin(b.id * 0.9) * 160,
                  Math.cos(b.id * 2.4) * 100,
                  Math.sin(b.id * 1.8) * 140,
                  0,
                ],
                y: [
                  0,
                  Math.sin(b.id * 1.1) * 80,
                  Math.cos(b.id * 0.8) * 120,
                  Math.sin(b.id * 2.5) * 60,
                  Math.cos(b.id * 1.7) * 90,
                  0,
                ],
                rotate: [
                  0,
                  Math.cos(b.id * 2.5) * 12,
                  Math.sin(b.id * 2) * 18,
                  Math.cos(b.id * 3.5) * 10,
                  0,
                ],
              }}
              transition={{
                duration: b.pathDuration * 1.1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ButterflyShape color={b.color} size={b.size} />
            </motion.div>
          ))}
      </div>
    </>
  )
}