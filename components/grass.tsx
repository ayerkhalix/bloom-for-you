"use client"

import { useMemo } from "react"
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

function GrassBladeSVG({ color, width, height }: { color: string; width: number; height: number }) {
  return (
    <svg 
      width={`${width}px`} 
      height={`${height}px`} 
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      {/* Organic grass blade shape - tapered with pointed tip */}
      <path
        d={`M${width/2} 0 
           Q${width*0.7} ${height*0.3}, ${width*0.8} ${height*0.7}
           Q${width*0.6} ${height*0.85}, ${width/2} ${height}
           Q${width*0.4} ${height*0.85}, ${width*0.2} ${height*0.7}
           Q${width*0.3} ${height*0.3}, ${width/2} 0
           Z`}
        fill={color}
        fillOpacity={0.9}
        stroke="none"
      />
      {/* Subtle highlight */}
      <path
        d={`M${width/2} ${height*0.1} 
           Q${width*0.55} ${height*0.4}, ${width*0.6} ${height*0.6}
           Q${width*0.45} ${height*0.7}, ${width/2} ${height*0.9}
           Z`}
        fill="rgba(255, 255, 255, 0.15)"
        stroke="none"
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
      {/* Cluster of 4-5 slender blades */}
      <g>
        {/* Center blade */}
        <path
          d={`M${width/2} 0 
             L${width*0.52} ${height*0.3}
             L${width*0.48} ${height*0.6}
             L${width*0.51} ${height*0.9}
             L${width/2} ${height}
             L${width*0.49} ${height*0.9}
             L${width*0.52} ${height*0.6}
             L${width*0.48} ${height*0.3}
             Z`}
          fill={color}
          fillOpacity={0.7}
        />
        {/* Left blade 1 */}
        <path
          d={`M${width*0.35} ${height*0.1} 
             L${width*0.37} ${height*0.4}
             L${width*0.33} ${height*0.7}
             L${width*0.36} ${height}
             L${width*0.34} ${height*0.95}
             L${width*0.31} ${height*0.65}
             L${width*0.35} ${height*0.35}
             Z`}
          fill={color}
          fillOpacity={0.6}
        />
        {/* Right blade 1 */}
        <path
          d={`M${width*0.65} ${height*0.15} 
             L${width*0.67} ${height*0.45}
             L${width*0.63} ${height*0.75}
             L${width*0.66} ${height*0.95}
             L${width*0.64} ${height*0.9}
             L${width*0.61} ${height*0.7}
             L${width*0.65} ${height*0.4}
             Z`}
          fill={color}
          fillOpacity={0.6}
        />
        {/* Left blade 2 */}
        <path
          d={`M${width*0.25} ${height*0.2} 
             L${width*0.27} ${height*0.5}
             L${width*0.23} ${height*0.8}
             L${width*0.26} ${height*0.9}
             L${width*0.24} ${height*0.85}
             L${width*0.21} ${height*0.75}
             L${width*0.25} ${height*0.45}
             Z`}
          fill={color}
          fillOpacity={0.5}
        />
        {/* Right blade 2 */}
        <path
          d={`M${width*0.75} ${height*0.25} 
             L${width*0.77} ${height*0.55}
             L${width*0.73} ${height*0.85}
             L${width*0.76} ${height*0.92}
             L${width*0.74} ${height*0.88}
             L${width*0.71} ${height*0.8}
             L${width*0.75} ${height*0.5}
             Z`}
          fill={color}
          fillOpacity={0.5}
        />
      </g>
    </svg>
  )
}

export function Grass() {
  const grassBlades = useMemo<GrassBladeData[]>(() => {
    const baseColors = [
      "#b9d8c2", // Soft sage
      "#cbe6d3", // Light mint
      "#a7cbb2", // Muted green
      "#b5d5bd", // Medium sage
      "#c2e0ca", // Pale mint
    ]
    
    const accentColors = [
      "#d6c3e8", // Lavender tint
      "#efd3e6", // Pink tint
      "#e0c9f0", // Light lavender
      "#f5d9ec", // Soft pink
    ]
    
    const blades: GrassBladeData[] = []
    let bladeId = 0
    
    // Create main clusters
    const mainClusters = [
      { x: 10, size: 12 },  // Left cluster
      { x: 25, size: 14 },  // Left-center
      { x: 40, size: 16 },  // Center-left
      { x: 55, size: 18 },  // Center (largest)
      { x: 70, size: 15 },  // Center-right
      { x: 85, size: 13 },  // Right
    ]
    
    // Add micro-clusters around main clusters
    const microClusters = [
      { x: 5, size: 6 },    // Far left
      { x: 18, size: 5 },   // Between cluster 1-2
      { x: 33, size: 7 },   // Between cluster 2-3
      { x: 48, size: 6 },   // Between cluster 3-4
      { x: 62, size: 8 },   // Between cluster 4-5
      { x: 78, size: 5 },   // Between cluster 5-6
      { x: 95, size: 4 },   // Far right
    ]
    
    // Generate blades for main clusters (40% of total)
    mainClusters.forEach((cluster, clusterIndex) => {
      const useAccentColor = Math.random() < 0.12 // ~12% chance
      const clusterColor = useAccentColor
        ? accentColors[clusterIndex % accentColors.length]
        : baseColors[clusterIndex % baseColors.length]
      
      // Lightness variation for this cluster
      const lightnessVariation = (Math.random() - 0.5) * 0.08 // ±8%
      const clusterColorAdjusted = adjustColorLightness(clusterColor, lightnessVariation)
      
      for (let i = 0; i < cluster.size; i++) {
        // Determine layer based on position in cluster
        let layer: 1 | 2 | 3
        if (i < Math.floor(cluster.size * 0.4)) {
          layer = 1 // 40% background
        } else if (i < Math.floor(cluster.size * 0.75)) {
          layer = 2 // 35% middle
        } else {
          layer = 3 // 25% foreground
        }
        
        // Width variation by layer
        let width: number
        if (layer === 1) {
          width = 0.3 + Math.random() * 0.2 // Thin: 0.3-0.5vw
        } else if (layer === 2) {
          width = 0.5 + Math.random() * 0.3 // Normal: 0.5-0.8vw
        } else {
          width = 0.8 + Math.random() * 0.4 // Cluster: 0.8-1.2vw
        }
        
        blades.push({
          id: bladeId++,
          x: cluster.x + (Math.random() - 0.5) * 10, // Spread within cluster
          height: layer === 3 
            ? 6 + Math.random() * 6  // Foreground: 6-12vh
            : layer === 2 
              ? 4 + Math.random() * 4  // Middle: 4-8vh
              : 2 + Math.random() * 3,  // Background: 2-5vh
          width,
          tilt: (Math.random() - 0.5) * 12, // Gentle tilt
          color: clusterColorAdjusted,
          swayDelay: Math.random() * 6,
          swayAmount: 0.5 + Math.random() * 1, // Max ±1.5°
          layer,
        })
      }
    })
    
    // Generate blades for micro-clusters (35% of total)
    microClusters.forEach((microCluster, clusterIndex) => {
      const useAccentColor = Math.random() < 0.15 // ~15% chance
      const clusterColor = useAccentColor
        ? accentColors[(clusterIndex + 2) % accentColors.length]
        : baseColors[(clusterIndex + 3) % baseColors.length]
      
      const lightnessVariation = (Math.random() - 0.5) * 0.06 // ±6%
      const clusterColorAdjusted = adjustColorLightness(clusterColor, lightnessVariation)
      
      for (let i = 0; i < microCluster.size; i++) {
        const layer: 1 | 2 | 3 = i < 2 ? 1 : i < 4 ? 2 : 3
        
        let width: number
        if (layer === 1) {
          width = 0.3 + Math.random() * 0.15 // Thin: 0.3-0.45vw
        } else if (layer === 2) {
          width = 0.4 + Math.random() * 0.2 // Normal: 0.4-0.6vw
        } else {
          width = 0.7 + Math.random() * 0.3 // Smaller cluster: 0.7-1.0vw
        }
        
        blades.push({
          id: bladeId++,
          x: microCluster.x + (Math.random() - 0.5) * 6, // Tighter spread
          height: layer === 3 
            ? 5 + Math.random() * 5  // 5-10vh
            : layer === 2 
              ? 3 + Math.random() * 3  // 3-6vh
              : 1.5 + Math.random() * 2, // 1.5-3.5vh
          width,
          tilt: (Math.random() - 0.5) * 10,
          color: clusterColorAdjusted,
          swayDelay: Math.random() * 5,
          swayAmount: 0.4 + Math.random() * 0.8,
          layer,
        })
      }
    })
    
    // Add scattered individual blades to fill gaps (25% of total)
    const scatterCount = 40
    for (let i = 0; i < scatterCount; i++) {
      const layer: 1 | 2 | 3 = Math.random() < 0.4 ? 1 : Math.random() < 0.7 ? 2 : 3
      
      const useAccentColor = Math.random() < 0.1 // 10% accent blades in scatter
      const color = useAccentColor
        ? accentColors[i % accentColors.length]
        : baseColors[i % baseColors.length]
      
      const lightnessVariation = (Math.random() - 0.5) * 0.05 // ±5%
      const colorAdjusted = adjustColorLightness(color, lightnessVariation)
      
      let width: number
      if (layer === 1) {
        width = 0.25 + Math.random() * 0.15 // Very thin: 0.25-0.4vw
      } else if (layer === 2) {
        width = 0.35 + Math.random() * 0.2 // Thin-normal: 0.35-0.55vw
      } else {
        width = 0.5 + Math.random() * 0.3 // Normal: 0.5-0.8vw
      }
      
      blades.push({
        id: bladeId++,
        x: Math.random() * 96 + 2, // Avoid edges
        height: layer === 3 
          ? 4 + Math.random() * 4  // 4-8vh
          : layer === 2 
            ? 3 + Math.random() * 3  // 3-6vh
            : 1 + Math.random() * 2,  // 1-3vh
        width,
        tilt: (Math.random() - 0.5) * 15,
        color: colorAdjusted,
        swayDelay: Math.random() * 4,
        swayAmount: 0.3 + Math.random() * 0.7,
        layer,
      })
    }
    
    return blades
  }, [])

  // Helper function to adjust color lightness
  function adjustColorLightness(color: string, adjustment: number): string {
    // Simple lightness adjustment for hex colors
    const hex = color.replace('#', '')
    let r = parseInt(hex.substr(0, 2), 16)
    let g = parseInt(hex.substr(2, 2), 16)
    let b = parseInt(hex.substr(4, 2), 16)
    
    const adjust = (value: number) => {
      const newValue = value * (1 + adjustment)
      return Math.min(255, Math.max(0, Math.round(newValue)))
    }
    
    r = adjust(r)
    g = adjust(g)
    b = adjust(b)
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
  }

  return (
    <>
      {/* Soft ground base - single gradient */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-[0]"
        style={{ 
          height: "12%",
          background: "linear-gradient(to top, #d0e0d8 0%, #e0ece4 40%, #f0f8f4 80%, #f8fcf8 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4)",
        }}
      />
      
      {/* Subtle texture overlay */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-[1] pointer-events-none"
        style={{ 
          height: "12%",
          backgroundImage: `
            radial-gradient(circle at 20% 95%, rgba(214, 195, 232, 0.08) 0%, transparent 60%),
            radial-gradient(circle at 50% 90%, rgba(239, 211, 230, 0.06) 0%, transparent 65%),
            radial-gradient(circle at 80% 95%, rgba(224, 201, 240, 0.07) 0%, transparent 70%)
          `,
          mixBlendMode: "overlay",
        }}
      />
      
      {/* Background layer blades (40% of total, thin, short, blurred) */}
      <div className="absolute bottom-0 left-0 right-0 z-[2]" style={{ height: "12%" }}>
        {grassBlades
          .filter(blade => blade.layer === 1)
          .map((blade) => (
            <motion.div
              key={`bg-${blade.id}`}
              className="absolute bottom-0"
              style={{
                left: `${blade.x}%`,
                width: `${blade.width}vw`,
                height: `${blade.height}vh`,
                transformOrigin: "bottom center",
                opacity: 0.5,
                filter: "blur(0.6px)",
                transform: `rotate(${blade.tilt}deg)`,
              }}
              animate={{
                rotate: [
                  blade.tilt,
                  blade.tilt + blade.swayAmount * 0.3,
                  blade.tilt - blade.swayAmount * 0.2,
                  blade.tilt + blade.swayAmount * 0.15,
                  blade.tilt,
                ],
              }}
              transition={{
                duration: 9 + blade.swayDelay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <GrassBladeSVG 
                color={blade.color} 
                width={blade.width * window.innerWidth / 100}
                height={blade.height * window.innerHeight / 100}
              />
            </motion.div>
          ))}
      </div>
      
      {/* Middle layer blades (35% of total) */}
      <div className="absolute bottom-0 left-0 right-0 z-[3]" style={{ height: "12%" }}>
        {grassBlades
          .filter(blade => blade.layer === 2)
          .map((blade) => (
            <motion.div
              key={`mid-${blade.id}`}
              className="absolute bottom-0"
              style={{
                left: `${blade.x}%`,
                width: `${blade.width}vw`,
                height: `${blade.height}vh`,
                transformOrigin: "bottom center",
                opacity: 0.75,
                filter: "blur(0.25px)",
                transform: `rotate(${blade.tilt}deg)`,
              }}
              animate={{
                rotate: [
                  blade.tilt,
                  blade.tilt + blade.swayAmount * 0.6,
                  blade.tilt - blade.swayAmount * 0.5,
                  blade.tilt + blade.swayAmount * 0.35,
                  blade.tilt,
                ],
              }}
              transition={{
                duration: 8 + blade.swayDelay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <GrassBladeSVG 
                color={blade.color} 
                width={blade.width * window.innerWidth / 100}
                height={blade.height * window.innerHeight / 100}
              />
            </motion.div>
          ))}
      </div>
      
      {/* Foreground layer blades (25% of total - clusters) */}
      <div className="absolute bottom-0 left-0 right-0 z-[4]" style={{ height: "12%" }}>
        {grassBlades
          .filter(blade => blade.layer === 3)
          .map((blade, index) => {
            const isCluster = index % 2 === 0 // 50% clusters in foreground
            
            return (
              <motion.div
                key={`fg-${blade.id}`}
                className="absolute bottom-0"
                style={{
                  left: `${blade.x}%`,
                  width: `${isCluster ? blade.width * 1.3 : blade.width}vw`,
                  height: `${blade.height}vh`,
                  transformOrigin: "bottom center",
                  opacity: 0.9,
                  transform: `rotate(${blade.tilt}deg)`,
                }}
                animate={{
                  rotate: [
                    blade.tilt,
                    blade.tilt + blade.swayAmount,
                    blade.tilt - blade.swayAmount * 0.85,
                    blade.tilt + blade.swayAmount * 0.65,
                    blade.tilt,
                  ],
                }}
                transition={{
                  duration: 7 + blade.swayDelay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {isCluster ? (
                  <ClusterBladeSVG 
                    color={blade.color} 
                    width={(isCluster ? blade.width * 1.3 : blade.width) * window.innerWidth / 100}
                    height={blade.height * window.innerHeight / 100}
                  />
                ) : (
                  <GrassBladeSVG 
                    color={blade.color} 
                    width={blade.width * window.innerWidth / 100}
                    height={blade.height * window.innerHeight / 100}
                  />
                )}
              </motion.div>
            )
          })}
      </div>
      
      {/* Depth blur overlay */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-[5] pointer-events-none"
        style={{ 
          height: "15%",
          background: "linear-gradient(to top, rgba(248, 252, 248, 0.35) 0%, transparent 40%)",
          backdropFilter: "blur(0.5px)",
        }}
      />
    </>
  )
}