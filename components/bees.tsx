"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"

interface BeeData {
  id: number
  startX: number
  startY: number
  color: string
  size: number
  speed: number
  flowerIndex: number
}

function BeeShape({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 32 26" fill="none">
      {/* Body segments */}
      <motion.circle
        cx="16"
        cy="13"
        r="6"
        fill={color}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.circle
        cx="9"
        cy="13"
        r="4"
        fill={color}
        fillOpacity={0.9}
        animate={{
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.1,
        }}
      />
      <motion.circle
        cx="23"
        cy="13"
        r="5"
        fill={color}
        fillOpacity={0.85}
        animate={{
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />
      
      {/* Wings */}
      <motion.path
        d="M12 8 Q8 6 6 8 Q8 10 12 9Z"
        fill="#f0f0ff"
        fillOpacity={0.6}
        animate={{
          d: [
            "M12 8 Q8 6 6 8 Q8 10 12 9Z",
            "M12 8 Q10 4 8 8 Q10 12 12 9Z",
            "M12 8 Q8 6 6 8 Q8 10 12 9Z",
          ],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.path
        d="M20 8 Q24 6 26 8 Q24 10 20 9Z"
        fill="#f0f0ff"
        fillOpacity={0.6}
        animate={{
          d: [
            "M20 8 Q24 6 26 8 Q24 10 20 9Z",
            "M20 8 Q22 4 24 8 Q22 12 20 9Z",
            "M20 8 Q24 6 26 8 Q24 10 20 9Z",
          ],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Stripes */}
      <path d="M16 7 L16 19" stroke="#4a3055" strokeWidth="1" strokeOpacity="0.6" />
      <path d="M10 8 L10 18" stroke="#4a3055" strokeWidth="0.8" strokeOpacity="0.5" />
      <path d="M22 8 L22 18" stroke="#4a3055" strokeWidth="0.8" strokeOpacity="0.5" />
      
      {/* Antennae */}
      <path d="M15 6 Q13 4 11 4" stroke="#4a3055" strokeWidth="0.8" strokeOpacity="0.6" strokeLinecap="round" />
      <path d="M17 6 Q19 4 21 4" stroke="#4a3055" strokeWidth="0.8" strokeOpacity="0.6" strokeLinecap="round" />
    </svg>
  )
}

export function Bees() {
  const bees = useMemo<BeeData[]>(() => {
    const colors = ["#d8a8e0", "#e8a0d0", "#c890e0", "#f0a8d8"]
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      startX: 20 + Math.random() * 60,
      startY: 60 + Math.random() * 30,
      color: colors[i % colors.length],
      size: 14 + Math.random() * 10,
      speed: 3 + Math.random() * 2,
      flowerIndex: i % 7,
    }))
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-[2]">
      {bees.map((bee) => (
        <motion.div
          key={bee.id}
          className="absolute"
          style={{
            left: `${bee.startX}%`,
            top: `${bee.startY}%`,
          }}
          animate={{
            x: [
              0,
              Math.sin(bee.id * 2) * 20,
              Math.cos(bee.id * 1.5) * 30,
              Math.sin(bee.id * 3) * 15,
              0,
            ],
            y: [
              0,
              Math.cos(bee.id * 1.8) * 15,
              Math.sin(bee.id * 2.2) * 25,
              Math.cos(bee.id * 2.8) * 10,
              0,
            ],
            rotate: [
              0,
              Math.sin(bee.id * 3) * 5,
              Math.cos(bee.id * 2) * 8,
              Math.sin(bee.id * 4) * 3,
              0,
            ],
          }}
          transition={{
            duration: bee.speed,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.6, 0.9, 1],
          }}
        >
          <BeeShape color={bee.color} size={bee.size} />
        </motion.div>
      ))}
    </div>
  )
}