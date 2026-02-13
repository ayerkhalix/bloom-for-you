"use client"

import { useMemo, useEffect, useState } from "react"
import { motion } from "framer-motion"

interface GrassBladeData {
  id: number
  x: number
  height: number
  width: number
  tilt: number
  color: string
  swayDelay: number
  swayAmount: number
  layer: 1 | 2 | 3 // 1: background, 2: middle, 3: foreground
}

// --- SVG Components ---

function GrassBladeSVG({ color, width, height }: { color: string; width: number; height: number }) {
  return (
    <svg 
      width={`${width}px`} 
      height={`${height}px`} 
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      <path
        d={`M${width/2} 0 
            Q${width*0.7} ${height*0.3}, ${width*0.8} ${height*0.7}
            Q${width*0.6} ${height*0.85}, ${width/2} ${height}
            Q${width*0.4} ${height*0.85}, ${width*0.2} ${height*0.7}
            Q${width*0.3} ${height*0.3}, ${width/2} 0
            Z`}
        fill={color}
        fillOpacity={0.9}
      />
      <path
        d={`M${width/2} ${height*0.1} 
            Q${width*0.55} ${height*0.4}, ${width*0.6} ${height*0.6}
            Q${width*0.45} ${height*0.7}, ${width/2} ${height*0.9}
            Z`}
        fill="rgba(255, 255, 255, 0.15)"
      />
    </svg>
  )
}

function ClusterBladeSVG({ color, width, height }: { color: string; width: number; height: number }) {
  return (
    <svg 
      width={`${width}px`} 
      height={`${height}px`} 
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      <g fill={color}>
        <path d={`M${width/2} 0 L${width*0.55} ${height*0.4} L${width*0.5} ${height} L${width*0.45} ${height*0.4} Z`} fillOpacity={0.7} />
        <path d={`M${width*0.3} ${height*0.2} L${width*0.4} ${height*0.6} L${width*0.35} ${height} L${width*0.25} ${height*0.6} Z`} fillOpacity={0.5} />
        <path d={`M${width*0.7} ${height*0.2} L${width*0.6} ${height*0.6} L${width*0.65} ${height} L${width*0.75} ${height*0.6} Z`} fillOpacity={0.5} />
      </g>
    </svg>
  )
}

// --- Main Component ---

export function Grass() {
  const [mounted, setMounted] = useState(false)
  const [viewport, setViewport] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setMounted(true)
    const updateSize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight })
    }
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  const grassBlades = useMemo<GrassBladeData[]>(() => {
    const baseColors = ["#b9d8c2", "#cbe6d3", "#a7cbb2", "#b5d5bd", "#c2e0ca"]
    const accentColors = ["#d6c3e8", "#efd3e6", "#e0c9f0", "#f5d9ec"]
    const blades: GrassBladeData[] = []
    let bladeId = 0

    // Density Upgrade: Increased cluster sizes and added more clusters
    const clusters = [
      { x: 5, size: 15 }, { x: 15, size: 22 }, { x: 28, size: 25 },
      { x: 42, size: 30 }, { x: 55, size: 35 }, { x: 68, size: 28 },
      { x: 82, size: 22 }, { x: 95, size: 15 }
    ]

    clusters.forEach((cluster) => {
      for (let i = 0; i < cluster.size; i++) {
        const layer = i < cluster.size * 0.35 ? 1 : i < cluster.size * 0.7 ? 2 : 3
        const isAccent = Math.random() < 0.12
        const color = isAccent ? accentColors[i % accentColors.length] : baseColors[i % baseColors.length]
        
        blades.push({
          id: bladeId++,
          x: cluster.x + (Math.random() - 0.5) * 14,
          height: layer === 3 ? 7 + Math.random() * 6 : layer === 2 ? 4 + Math.random() * 5 : 2 + Math.random() * 3,
          width: layer === 3 ? 0.7 + Math.random() * 0.5 : 0.3 + Math.random() * 0.4,
          tilt: (Math.random() - 0.5) * 18,
          color: color,
          swayDelay: Math.random() * -10, // Negative delay makes it look active instantly
          swayAmount: 1.2 + Math.random() * 2,
          layer: layer as 1 | 2 | 3,
        })
      }
    })

    // Random Background Scatter (filling the deep gaps)
    for (let i = 0; i < 80; i++) {
      blades.push({
        id: bladeId++,
        x: Math.random() * 100,
        height: 1.5 + Math.random() * 3,
        width: 0.2 + Math.random() * 0.3,
        tilt: (Math.random() - 0.5) * 25,
        color: baseColors[Math.floor(Math.random() * baseColors.length)],
        swayDelay: Math.random() * -10,
        swayAmount: 0.8,
        layer: 1,
      })
    }

    return blades
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 1. Ground Base */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-[0]"
        style={{ 
          height: "12%",
          background: "linear-gradient(to top, #d0e0d8 0%, #f8fcf8 100%)",
        }}
      />

      {/* 2. Layer Rendering */}
      {[1, 2, 3].map((layerNum) => (
        <div 
          key={`layer-${layerNum}`}
          className="absolute bottom-0 left-0 right-0" 
          style={{ height: "12%", zIndex: layerNum + 1 }}
        >
          {grassBlades
            .filter(blade => blade.layer === layerNum)
            .map((blade) => {
              const isCluster = blade.layer === 3 && blade.id % 4 === 0
              const calcWidth = (isCluster ? blade.width * 1.4 : blade.width) * viewport.width / 100
              const calcHeight = blade.height * viewport.height / 100

              return (
                <motion.div
                  key={blade.id}
                  className="absolute bottom-0"
                  style={{
                    left: `${blade.x}%`,
                    width: isCluster ? `${blade.width * 1.4}vw` : `${blade.width}vw`,
                    height: `${blade.height}vh`,
                    transformOrigin: "bottom center",
                    opacity: layerNum === 1 ? 0.4 : layerNum === 2 ? 0.7 : 1,
                    filter: layerNum === 1 ? "blur(0.7px)" : "none",
                  }}
                  animate={{
                    rotate: [blade.tilt - blade.swayAmount, blade.tilt + blade.swayAmount],
                  }}
                  transition={{
                    duration: 4 + (blade.id % 4),
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: blade.swayDelay,
                  }}
                >
                  {isCluster ? (
                    <ClusterBladeSVG color={blade.color} width={calcWidth} height={calcHeight} />
                  ) : (
                    <GrassBladeSVG color={blade.color} width={calcWidth} height={calcHeight} />
                  )}
                </motion.div>
              )
            })}
        </div>
      ))}

      {/* 3. Depth Blur Overlay */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-[10]"
        style={{ 
          height: "15%",
          background: "linear-gradient(to top, rgba(248, 252, 248, 0.4) 0%, transparent 50%)",
          backdropFilter: "blur(0.4px)",
        }}
      />
    </div>
  )
}