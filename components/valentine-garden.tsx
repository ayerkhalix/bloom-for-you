"use client"

import React from "react"
import { useState, useCallback, useRef, useMemo } from "react"
import { AnimatePresence } from "framer-motion"
import { HeartParticles } from "./heart-particles"
import { Flower } from "./flower"
import { Butterflies } from "./butterflies"
import { Bees } from "./bees"
import { Envelope } from "./envelope"
import { Grass } from "./grass"
import { HappyValentines } from "./happy-valentines" // New import

const MAX_FLOWERS = 14
const MIN_HORIZONTAL_GAP = 8 // minimum % distance between flower centers

interface FlowerData {
  id: number
  type: "rose" | "lily"
  x: number
  bottomVh: number
  heightVh: number
}

export function ValentineGarden() {
  const [flowers, setFlowers] = useState<FlowerData[]>([])
  const [showEnvelope, setShowEnvelope] = useState(false)
  const [letterClosed, setLetterClosed] = useState(false)
  const [showFinalMessage, setShowFinalMessage] = useState(false) // New state for final message
  const counterRef = useRef(0)
  const flowersRef = useRef<FlowerData[]>([])
  
  const roseCount = useMemo(() => flowers.filter(f => f.type === "rose").length, [flowers])
  const lilyCount = useMemo(() => flowers.filter(f => f.type === "lily").length, [flowers])

  function generateHeightVh(index: number, total: number, type: "rose" | "lily"): number {
    const centerRatio = Math.abs((index - (total - 1) / 2) / total) * 2
    const base = type === "lily" ? 55 : 65
    const range = type === "lily" ? 18 : 27
    const centerBonus = (1 - centerRatio) * 8
    return base + Math.random() * range + centerBonus
  }

  function findSafeX(desiredX: number, existingFlowers: FlowerData[]): number {
    if (existingFlowers.length === 0) return desiredX

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

    const handleTap = useCallback(
      (e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
        if (counterRef.current >= MAX_FLOWERS) return
        if (showEnvelope && !letterClosed) return
        if (showFinalMessage) return

        let clientX: number
        if ("touches" in e) {
          clientX = e.touches[0].clientX
        } else {
          clientX = e.clientX
        }


  

      const screenWidth =
      typeof window !== "undefined" ? window.innerWidth : 1

      const baseX = (clientX / screenWidth) * 100
      const desiredX = Math.max(4, Math.min(96, baseX + (Math.random() - 0.5) * 12))

      const safeX = findSafeX(desiredX, flowersRef.current)

      // Ensure exactly 7 of each type
      let type: "rose" | "lily"
      if (roseCount >= 7) {
        type = "lily"
      } else if (lilyCount >= 7) {
        type = "rose"
      } else {
        type = Math.random() > 0.5 ? "rose" : "lily"
      }

      const newFlower: FlowerData = {
        id: Date.now() + Math.random(),
        type,
        x: safeX,
        bottomVh: 0, // Always grow from bottom
        heightVh: generateHeightVh(counterRef.current, MAX_FLOWERS, type),
      }

      counterRef.current += 1
      flowersRef.current = [...flowersRef.current, newFlower]

      setFlowers((prev) => [...prev, newFlower])

      if (counterRef.current >= MAX_FLOWERS) {
        setTimeout(() => {
          setShowEnvelope(true)
        }, 1500)
      }
    },
    [showEnvelope, letterClosed, roseCount, lilyCount, showFinalMessage]
  )

  const handleLetterClose = useCallback(() => {
    setShowEnvelope(false)
    setLetterClosed(true)
    
    // Trigger the final "Happy Valentine's" message after envelope closes
    setTimeout(() => {
      setShowFinalMessage(true)
      
      // Auto-dismiss the final message after 6 seconds
      setTimeout(() => {
        setShowFinalMessage(false)
      }, 6000)
    }, 500)
  }, [])

  return (
    <main
      className="relative min-h-[100dvh] w-full overflow-hidden select-none cursor-pointer"
      style={{
        background:
          "linear-gradient(180deg, #f0e6ff 0%, #e8d8f5 15%, #e0d0f0 30%, #d8c8eb 45%, #d0c0e6 60%, #c8b8e1 75%, #c0b0dc 90%, #b8a8d7 100%)",
      }}
      onClick={handleTap}
      role="application"
      aria-label="Valentine's flower garden. Tap to grow flowers."
    >
      {/* Background particles */}
      <HeartParticles />

      {/* Butterflies */}
      <Butterflies />

      {/* Bees */}
      <Bees />

      {/* Layered grass */}
      <Grass />

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
        {flowers.length === 0 && !showEnvelope && !showFinalMessage && (
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
      {flowers.length > 0 && flowers.length < MAX_FLOWERS && !showEnvelope && !showFinalMessage && (
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
              Roses: {roseCount}/7 • Lilies: {lilyCount}/7
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

      {/* Final "Happy Valentine's" overlay */}
      <HappyValentines isVisible={showFinalMessage} />
    </main>
  )
}