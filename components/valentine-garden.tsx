"use client"

import React from "react"
import { useState, useCallback, useRef } from "react"
import { AnimatePresence } from "framer-motion"
import { HeartParticles } from "./heart-particles"
import { Flower } from "./flower"
import { Butterflies } from "./butterflies"
import { Envelope } from "./envelope"

const MAX_FLOWERS = 14
const MIN_HORIZONTAL_GAP = 7 // minimum % distance between flower centers

interface FlowerData {
  id: number
  type: "rose" | "lily"
  x: number
  bottomVh: number
  heightVh: number
}

// Pre-defined height tiers so flowers reach 70–90% of viewport
// Each entry is [bottomVh, heightVh] — bottom position and how tall the flower grows
const flowerTiers: [number, number][] = [
  [0, 90],
  [1, 95],
  [2, 88],
  [0, 92],
  [1, 94],
  [2, 89],
  [0, 96],
  [1, 91],
  [2, 93],
  [0, 88],
  [1, 95],
  [2, 90],
  [0, 94],
  [1, 92],
]

function findSafeX(desiredX: number, existingFlowers: FlowerData[]): number {
  if (existingFlowers.length === 0) return desiredX

  // Try the desired position first
  const isSafe = (x: number) =>
    existingFlowers.every((f) => Math.abs(f.x - x) >= MIN_HORIZONTAL_GAP)

  if (isSafe(desiredX)) return desiredX

  // Search outward from desired position
  for (let offset = MIN_HORIZONTAL_GAP; offset < 90; offset += 3) {
    const left = desiredX - offset
    const right = desiredX + offset

    if (left >= 4 && isSafe(left)) return left
    if (right <= 96 && isSafe(right)) return right
  }

  // Fallback: find the largest gap and place in the middle
  const sorted = [...existingFlowers].sort((a, b) => a.x - b.x)
  let bestGapCenter = desiredX
  let bestGapSize = 0

  // Check gap before first flower
  if (sorted[0].x > bestGapSize) {
    bestGapSize = sorted[0].x
    bestGapCenter = sorted[0].x / 2
  }

  // Check gaps between flowers
  for (let i = 0; i < sorted.length - 1; i++) {
    const gap = sorted[i + 1].x - sorted[i].x
    if (gap > bestGapSize) {
      bestGapSize = gap
      bestGapCenter = (sorted[i].x + sorted[i + 1].x) / 2
    }
  }

  // Check gap after last flower
  const trailingGap = 100 - sorted[sorted.length - 1].x
  if (trailingGap > bestGapSize) {
    bestGapCenter = (sorted[sorted.length - 1].x + 100) / 2
  }

  return Math.max(4, Math.min(96, bestGapCenter))
}

export function ValentineGarden() {
  const [flowers, setFlowers] = useState<FlowerData[]>([])
  const [showEnvelope, setShowEnvelope] = useState(false)
  const [letterClosed, setLetterClosed] = useState(false)
  const counterRef = useRef(0)
  const flowersRef = useRef<FlowerData[]>([])

  const handleTap = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (counterRef.current >= MAX_FLOWERS) return
      if (showEnvelope && !letterClosed) return

      let clientX: number
      if ("touches" in e) {
        clientX = e.touches[0].clientX
      } else {
        clientX = e.clientX
      }

      const screenWidth = window.innerWidth
      const baseX = (clientX / screenWidth) * 100
      const desiredX = Math.max(4, Math.min(96, baseX + (Math.random() - 0.5) * 10))

      const safeX = findSafeX(desiredX, flowersRef.current)

      const tier = flowerTiers[counterRef.current] || [2, 78]

      const newFlower: FlowerData = {
        id: Date.now() + Math.random(),
        type: Math.random() > 0.5 ? "rose" : "lily",
        x: safeX,
        bottomVh: tier[0],
        heightVh: tier[1],
      }

      counterRef.current += 1
      flowersRef.current = [...flowersRef.current, newFlower]

      setFlowers((prev) => [...prev, newFlower])

      if (counterRef.current >= MAX_FLOWERS) {
        setTimeout(() => {
          setShowEnvelope(true)
        }, 1200)
      }
    },
    [showEnvelope, letterClosed]
  )

  const handleLetterClose = useCallback(() => {
    setShowEnvelope(false)
    setLetterClosed(true)
  }, [])

  return (
    <main
      className="relative min-h-[100dvh] w-full overflow-hidden select-none cursor-pointer"
      style={{
        background:
          "linear-gradient(180deg, #c9b8e8 0%, #d8c4ee 25%, #e4d0f0 50%, #edd8ee 75%, #f5e0ea 100%)",
      }}
      onClick={handleTap}
      role="application"
      aria-label="Valentine's flower garden. Tap to grow flowers."
    >
      {/* Background particles */}
      <HeartParticles />

      {/* Butterflies */}
      <Butterflies />

      {/* Ground / grass area */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[1]"
        style={{ height: "8%" }}
      >
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full"
        >
          <path
            d="M0 40 Q180 10 360 35 Q540 60 720 30 Q900 5 1080 40 Q1260 70 1440 25 L1440 100 L0 100 Z"
            fill="#b8a0d4"
            fillOpacity={0.4}
          />
          <path
            d="M0 55 Q200 30 400 50 Q600 70 800 45 Q1000 25 1200 55 Q1350 75 1440 40 L1440 100 L0 100 Z"
            fill="#a890c8"
            fillOpacity={0.35}
          />
        </svg>
      </div>

      {/* Flowers layer */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {flowers.map((flower) => (
          <Flower
            key={flower.id}
            type={flower.type}
            x={flower.x}
            bottomVh={flower.bottomVh}
            heightVh={flower.heightVh}
            id={flower.id}
          />
        ))}
      </div>

      {/* Tap prompt */}
      <AnimatePresence>
        {flowers.length === 0 && !showEnvelope && (
          <div className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none">
            <div className="text-center px-6">
              <p className="font-serif text-3xl text-[#8b5ea0] mb-2 text-balance">
                Happy Valentine's Day!
              </p>
              <p className="font-sans text-sm text-[#9a7aad] tracking-wide">
                Each tap blooms a flower
              </p>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Flower counter */}
      {flowers.length > 0 && flowers.length < MAX_FLOWERS && !showEnvelope && (
        <div className="absolute top-6 right-6 z-[5] pointer-events-none">
          <div
            className="flex items-center gap-2 rounded-full px-4 py-2"
            style={{
              background: "rgba(245,240,252,0.85)",
              backdropFilter: "blur(8px)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#9b72cf">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className="font-sans text-sm text-[#8b5ea0] font-medium">
              {flowers.length} / {MAX_FLOWERS}
            </span>
          </div>
        </div>
      )}

      {/* Envelope overlay */}
      <AnimatePresence>
        {showEnvelope && !letterClosed && (
          <Envelope onClose={handleLetterClose} />
        )}
      </AnimatePresence>
    </main>
  )
}
