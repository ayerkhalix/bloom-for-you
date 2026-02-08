'use client'

import React from "react"

interface Heart {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  drift: number
  opacity: number
}

interface FloatingHeartsProps {
  dimmed?: boolean
}

// Generate hearts once at module level so they're consistent
const generateHearts = (): Heart[] => {
  const heartCount = 18
  const hearts: Heart[] = []
  
  for (let i = 0; i < heartCount; i++) {
    hearts.push({
      id: i,
      x: Math.random() * 100, // 0-100% of width
      y: Math.random() * 120 - 10, // Distributed across entire height
      size: Math.random() * 50 + 35, // 35-85px for more presence
      duration: Math.random() * 10 + 12, // 12-22 seconds - faster, more lively
      delay: -(Math.random() * 30), // Negative delay so animation is already in progress
      drift: (Math.random() - 0.5) * 60, // -30 to 30 horizontal drift - increased
      opacity: Math.random() * 0.2 + 0.12, // 0.12-0.32 opacity - more visible
    })
  }
  return hearts
}

const hearts = generateHearts()

export function FloatingHearts({ dimmed = false }: FloatingHeartsProps) {
  return (
    <div
      className={`fixed inset-0 pointer-events-none transition-all duration-1000 ${
        dimmed ? 'opacity-30 blur-sm' : 'opacity-100'
      }`}
      style={{ zIndex: 1 }}
    >
      {hearts.map((heart) => {
        // Alternate colors across purple/pink spectrum
        const hue = 300 + (heart.id % 3) * 15 // 300, 315, 330 (purple to pink)
        const saturation = 60 + (heart.id % 2) * 20 // 60 or 80
        
        return (
          <div
            key={heart.id}
            className="absolute will-change-transform"
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
              width: `${heart.size}px`,
              height: `${heart.size}px`,
              animation: `floatDrift ${heart.duration}s ease-in-out ${heart.delay}s infinite`,
              '--drift-x': `${heart.drift}px`,
              '--drift-y': `${(Math.random() - 0.5) * 60}px`,
            } as React.CSSProperties}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-full h-full"
              style={{
                filter: 'blur(1px) drop-shadow(0 0 8px rgba(255,255,255,0.3))',
                opacity: heart.opacity,
              }}
            >
              <defs>
                <linearGradient id={`heart-gradient-${heart.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={`hsl(${hue}, ${saturation}%, 85%)`} stopOpacity="0.9" />
                  <stop offset="50%" stopColor={`hsl(${hue}, ${saturation}%, 75%)`} stopOpacity="0.7" />
                  <stop offset="100%" stopColor={`hsl(${hue}, ${saturation}%, 90%)`} stopOpacity="0.5" />
                </linearGradient>
                <filter id={`glow-${heart.id}`}>
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <path 
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill={`url(#heart-gradient-${heart.id})`}
                filter={`url(#glow-${heart.id})`}
              />
            </svg>
          </div>
        )
      })}

      <style jsx>{`
        @keyframes floatDrift {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          20% {
            transform: translate(calc(var(--drift-x) * 0.6), calc(var(--drift-y) * -0.7)) rotate(8deg) scale(1.12);
          }
          40% {
            transform: translate(var(--drift-x), calc(var(--drift-y) * 0.3)) rotate(-5deg) scale(0.92);
          }
          60% {
            transform: translate(calc(var(--drift-x) * 0.4), var(--drift-y)) rotate(6deg) scale(1.08);
          }
          80% {
            transform: translate(calc(var(--drift-x) * -0.2), calc(var(--drift-y) * 0.5)) rotate(-4deg) scale(1.05);
          }
        }
      `}</style>
    </div>
  )
}
