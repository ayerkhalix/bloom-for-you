"use client"

import { useMemo, useState, useEffect } from "react"
import { motion } from "framer-motion"

interface Particle {
  id: number
  x: number
  size: number
  duration: number
  delay: number
  opacity: number
}

export function HeartParticles() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 8 + Math.random() * 14,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      opacity: 0.15 + Math.random() * 0.25,
    }))
  }, [])

  if (!mounted) return null

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: `${p.x}%`, bottom: "-5%" }}
          animate={{
            y: [0, -(window.innerHeight + 100)],
            x: [0, Math.sin(p.id) * 30, 0],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            width={p.size}
            height={p.size}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="hsl(280 45% 72%)"
              fillOpacity={0.6}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
