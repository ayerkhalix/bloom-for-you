'use client'

import { useEffect, useRef } from 'react'

interface PixelBouquetProps {
  onAnimationComplete?: () => void
  hasCompleted?: boolean
}

export function PixelBouquet({ onAnimationComplete, hasCompleted }: PixelBouquetProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameIdRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size - MUCH LARGER for mobile visibility
    const scale = 12 // Larger pixel size for clarity
    const width = 50 // Grid width in pixels
    const height = 60 // Grid height in pixels
    
    canvas.width = width * scale
    canvas.height = height * scale
    
    // Enable smooth pixel rendering with slight softness
    ctx.imageSmoothingEnabled = false

    // Color palette - richer, more vibrant
    const colors = {
      // Purples (for lilies and roses)
      deepPurple: '#7B2CBF',
      mediumPurple: '#9D4EDD',
      lightPurple: '#C77DFF',
      softPurple: '#E0AAFF',
      
      // Pinks/Reds (for spotted lilies)
      hotPink: '#FF006E',
      coral: '#FF6B9D',
      lightPink: '#FFB3D9',
      softPink: '#FFCCE7',
      
      // Greens (foliage)
      darkGreen: '#2D6A4F',
      medGreen: '#40916C',
      lightGreen: '#74C69D',
      
      // Accents
      white: '#FFFFFF',
      cream: '#FFF8F0',
      gold: '#FFD700',
    }
    
    // Organize by draw order for proper animation sequencing
    const stems: Array<{ x: number; y: number; color: string }> = []
    const leaves: Array<{ x: number; y: number; color: string }> = []
    const flowers: Array<{ x: number; y: number; color: string }> = []
    const details: Array<{ x: number; y: number; color: string }> = []

    // Helper functions
    const addStem = (x: number, y: number, color: string) => stems.push({ x, y, color })
    const addLeaf = (x: number, y: number, color: string) => leaves.push({ x, y, color })
    const addFlower = (x: number, y: number, color: string) => flowers.push({ x, y, color })
    const addDetail = (x: number, y: number, color: string) => details.push({ x, y, color })

    // ===== STAGE 1: STEMS (bottom 40% of composition) =====
    // Main central stems
    for (let y = 35; y < 58; y++) {
      addStem(24, y, colors.darkGreen)
      addStem(25, y, colors.medGreen)
      addStem(26, y, colors.darkGreen)
    }
    
    // Left stems
    for (let y = 38; y < 56; y++) {
      const offset = Math.floor((56 - y) * 0.3)
      addStem(24 - offset, y, colors.darkGreen)
      addStem(23 - offset, y, colors.medGreen)
    }
    
    // Right stems
    for (let y = 38; y < 56; y++) {
      const offset = Math.floor((56 - y) * 0.3)
      addStem(26 + offset, y, colors.darkGreen)
      addStem(27 + offset, y, colors.medGreen)
    }

    // ===== STAGE 2: LEAVES (scattered throughout middle) =====
    // Left side foliage
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        addLeaf(8 + j, 20 + i, colors.medGreen)
      }
    }
    addLeaf(7, 21, colors.darkGreen)
    addLeaf(11, 21, colors.lightGreen)
    addLeaf(8, 19, colors.lightGreen)
    
    // Right side foliage
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        addLeaf(39 + j, 22 + i, colors.medGreen)
      }
    }
    addLeaf(38, 23, colors.darkGreen)
    addLeaf(42, 23, colors.lightGreen)
    addLeaf(40, 21, colors.lightGreen)
    
    // Top scattered leaves
    for (let i = 0; i < 2; i++) {
      addLeaf(18 + i, 12, colors.medGreen)
      addLeaf(31 + i, 13, colors.medGreen)
    }
    addLeaf(19, 11, colors.lightGreen)
    addLeaf(32, 12, colors.lightGreen)
    
    // Bottom foliage
    for (let i = 0; i < 3; i++) {
      addLeaf(15 + i, 28, colors.medGreen)
      addLeaf(33 + i, 29, colors.medGreen)
    }
    addLeaf(16, 27, colors.lightGreen)
    addLeaf(34, 28, colors.darkGreen)

    // ===== STAGE 3: FLOWERS =====
    
    // CENTRAL PURPLE LILY (largest focal point - center)
    // Center
    addFlower(24, 15, colors.gold)
    addFlower(25, 15, colors.gold)
    addFlower(26, 15, colors.gold)
    addFlower(24, 16, colors.gold)
    addFlower(25, 16, colors.gold)
    addFlower(26, 16, colors.gold)
    
    // 6 large petals radiating out
    // Top petal
    for (let i = 0; i < 5; i++) {
      addFlower(24, 10 + i, colors.mediumPurple)
      addFlower(25, 10 + i, colors.mediumPurple)
      addFlower(26, 10 + i, colors.lightPurple)
    }
    addFlower(23, 11, colors.deepPurple)
    addFlower(27, 11, colors.deepPurple)
    
    // Bottom petal
    for (let i = 0; i < 5; i++) {
      addFlower(24, 17 + i, colors.mediumPurple)
      addFlower(25, 17 + i, colors.mediumPurple)
      addFlower(26, 17 + i, colors.lightPurple)
    }
    addFlower(23, 19, colors.deepPurple)
    addFlower(27, 19, colors.deepPurple)
    
    // Left petal
    for (let i = 0; i < 5; i++) {
      addFlower(19 + i, 15, colors.mediumPurple)
      addFlower(19 + i, 16, colors.lightPurple)
    }
    addFlower(20, 14, colors.deepPurple)
    addFlower(20, 17, colors.deepPurple)
    
    // Right petal
    for (let i = 0; i < 5; i++) {
      addFlower(27 + i, 15, colors.mediumPurple)
      addFlower(27 + i, 16, colors.lightPurple)
    }
    addFlower(30, 14, colors.deepPurple)
    addFlower(30, 17, colors.deepPurple)
    
    // Top-left diagonal petal
    for (let i = 0; i < 3; i++) {
      addFlower(20 + i, 11 + i, colors.mediumPurple)
      addFlower(21 + i, 11 + i, colors.lightPurple)
    }
    addFlower(20, 11, colors.deepPurple)
    
    // Top-right diagonal petal
    for (let i = 0; i < 3; i++) {
      addFlower(28 + i, 11 + i, colors.mediumPurple)
      addFlower(27 + i, 11 + i, colors.lightPurple)
    }
    addFlower(30, 11, colors.deepPurple)

    // SPOTTED PINK LILIES (like stargazers - left and right)
    // Left pink lily
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        addFlower(10 + j, 8 + i, colors.lightPink)
      }
    }
    addFlower(11, 9, colors.hotPink) // spots
    addFlower(11, 10, colors.coral)
    addFlower(10, 9, colors.softPink)
    addFlower(12, 10, colors.white)
    addFlower(11, 7, colors.coral)
    
    // Right pink lily
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        addFlower(37 + j, 10 + i, colors.lightPink)
      }
    }
    addFlower(38, 11, colors.hotPink) // spots
    addFlower(38, 12, colors.coral)
    addFlower(37, 11, colors.softPink)
    addFlower(39, 12, colors.white)
    addFlower(38, 9, colors.coral)
    
    // PURPLE ROSES (scattered)
    // Top left purple rose
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if ((i + j) >= 2 && (i + j) <= 5) {
          addFlower(12 + j, 16 + i, colors.deepPurple)
        }
      }
    }
    addFlower(14, 18, colors.mediumPurple)
    addFlower(14, 17, colors.mediumPurple)
    
    // Bottom left purple rose
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        addFlower(15 + j, 25 + i, colors.mediumPurple)
      }
    }
    addFlower(16, 26, colors.lightPurple)
    
    // Top right purple rose
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if ((i + j) >= 2 && (i + j) <= 5) {
          addFlower(34 + j, 18 + i, colors.deepPurple)
        }
      }
    }
    addFlower(36, 20, colors.mediumPurple)
    addFlower(36, 19, colors.lightPurple)
    
    // WHITE ROSES
    // Bottom center white rose
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if ((i + j) >= 2 && (i + j) <= 5) {
          addFlower(23 + j, 26 + i, colors.white)
        }
      }
    }
    addFlower(25, 28, colors.cream)
    addFlower(25, 27, colors.cream)
    
    // Right white rose
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        addFlower(34 + j, 26 + i, colors.white)
      }
    }
    addFlower(35, 27, colors.cream)
    
    // Small purple filler flowers
    for (let i = 0; i < 2; i++) {
      addDetail(14, 14 + i, colors.softPurple)
      addDetail(35, 15 + i, colors.softPurple)
      addDetail(22, 23 + i, colors.softPurple)
      addDetail(28, 24 + i, colors.softPurple)
    }
    
    // ===== ADDITIONAL FLOWERS FOR FULLNESS (5 purple + 3 pink) =====
    
    // Additional Purple Flowers (5 total)
    // Purple flower 1 - top center area
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        addFlower(24 + j, 6 + i, colors.mediumPurple)
      }
    }
    addFlower(25, 7, colors.lightPurple)
    
    // Purple flower 2 - left middle
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        addFlower(10 + j, 14 + i, colors.deepPurple)
      }
    }
    addFlower(11, 15, colors.mediumPurple)
    
    // Purple flower 3 - right middle
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        addFlower(37 + j, 16 + i, colors.mediumPurple)
      }
    }
    addFlower(38, 17, colors.lightPurple)
    
    // Purple flower 4 - bottom left area
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        addFlower(19 + j, 24 + i, colors.deepPurple)
      }
    }
    addFlower(19, 25, colors.mediumPurple)
    
    // Purple flower 5 - bottom right area
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        addFlower(30 + j, 24 + i, colors.mediumPurple)
      }
    }
    addFlower(30, 25, colors.lightPurple)
    
    // Additional Pink Flowers (3 total)
    // Pink flower 1 - top left area
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 2; j++) {
        addFlower(14 + j, 10 + i, colors.lightPink)
      }
    }
    addFlower(14, 11, colors.coral)
    addFlower(15, 11, colors.softPink)
    
    // Pink flower 2 - top right area
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 2; j++) {
        addFlower(33 + j, 12 + i, colors.softPink)
      }
    }
    addFlower(33, 13, colors.hotPink)
    addFlower(34, 13, colors.coral)
    
    // Pink flower 3 - bottom center
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 3; j++) {
        addFlower(24 + j, 23 + i, colors.lightPink)
      }
    }
    addFlower(25, 23, colors.coral)
    
    // ===== EXTREME FULLNESS - ADDITIONAL 20 FLOWERS =====
    
    // +5 PURPLE FLOWERS
    // Purple #6 - top left corner
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        addFlower(6 + j, 10 + i, colors.deepPurple)
      }
    }
    addFlower(7, 11, colors.mediumPurple)
    
    // Purple #7 - top right corner
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        addFlower(41 + j, 8 + i, colors.mediumPurple)
      }
    }
    addFlower(42, 9, colors.lightPurple)
    
    // Purple #8 - left center
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        addFlower(7 + j, 18 + i, colors.deepPurple)
      }
    }
    addFlower(8, 19, colors.mediumPurple)
    
    // Purple #9 - right center
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        addFlower(41 + j, 19 + i, colors.mediumPurple)
      }
    }
    addFlower(42, 20, colors.lightPurple)
    
    // Purple #10 - bottom center-left
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 2; j++) {
        addFlower(20 + j, 27 + i, colors.deepPurple)
      }
    }
    addFlower(21, 28, colors.mediumPurple)
    
    // +5 RED FLOWERS
    // Red #1 - top right area
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        addFlower(36 + j, 6 + i, colors.hotPink)
      }
    }
    addFlower(37, 7, colors.coral)
    
    // Red #2 - right upper middle
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 3; j++) {
        addFlower(43 + j, 14 + i, colors.coral)
      }
    }
    addFlower(44, 15, colors.hotPink)
    
    // Red #3 - left lower area
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 2; j++) {
        addFlower(11 + j, 22 + i, colors.hotPink)
      }
    }
    addFlower(12, 23, colors.coral)
    
    // Red #4 - bottom right corner
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        addFlower(38 + j, 27 + i, colors.coral)
      }
    }
    addFlower(39, 28, colors.hotPink)
    
    // Red #5 - center upper
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        addFlower(27 + j, 8 + i, colors.hotPink)
      }
    }
    addFlower(28, 9, colors.coral)
    
    // +5 WHITE FLOWERS
    // White #1 - top left
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        addFlower(8 + j, 6 + i, colors.white)
      }
    }
    addFlower(9, 7, colors.cream)
    
    // White #2 - top center
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 3; j++) {
        addFlower(21 + j, 5 + i, colors.white)
      }
    }
    addFlower(22, 6, colors.cream)
    
    // White #3 - left middle
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        addFlower(6 + j, 15 + i, colors.white)
      }
    }
    addFlower(7, 16, colors.cream)
    
    // White #4 - right middle lower
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 2; j++) {
        addFlower(42 + j, 23 + i, colors.white)
      }
    }
    addFlower(43, 24, colors.cream)
    
    // White #5 - bottom left corner
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        addFlower(9 + j, 28 + i, colors.white)
      }
    }
    addFlower(10, 29, colors.cream)
    
    // +5 PINK FLOWERS
    // Pink #4 - top area
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        addFlower(16 + j, 7 + i, colors.lightPink)
      }
    }
    addFlower(17, 8, colors.softPink)
    
    // Pink #5 - top right
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 2; j++) {
        addFlower(30 + j, 6 + i, colors.softPink)
      }
    }
    addFlower(31, 7, colors.lightPink)
    
    // Pink #6 - left area
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        addFlower(13 + j, 20 + i, colors.lightPink)
      }
    }
    addFlower(14, 21, colors.coral)
    
    // Pink #7 - right area
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 3; j++) {
        addFlower(39 + j, 21 + i, colors.softPink)
      }
    }
    addFlower(40, 22, colors.lightPink)
    
    // Pink #8 - bottom center
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        addFlower(27 + j, 28 + i, colors.lightPink)
      }
    }
    addFlower(28, 29, colors.softPink)
    
    // ===== STAGE 4: DETAILS (white accents, highlights) =====
    // Baby's breath white accents scattered throughout for extra fullness
    addDetail(11, 13, colors.white)
    addDetail(20, 19, colors.cream)
    addDetail(30, 20, colors.white)
    addDetail(39, 15, colors.cream)
    addDetail(18, 22, colors.white)
    addDetail(32, 23, colors.cream)
    addDetail(25, 11, colors.white)
    addDetail(13, 20, colors.white)
    addDetail(37, 24, colors.cream)
    addDetail(17, 15, colors.white)
    addDetail(33, 20, colors.cream)
    addDetail(21, 21, colors.white)
    addDetail(29, 22, colors.cream)
    addDetail(12, 17, colors.white)
    addDetail(38, 18, colors.cream)
    addDetail(23, 13, colors.white)
    addDetail(27, 19, colors.cream)
    addDetail(15, 25, colors.white)
    addDetail(35, 25, colors.cream)

    // Combine all elements in proper draw order
    const allPixels = [...stems, ...leaves, ...flowers, ...details]
    
    // If already completed, render instantly and return
    if (hasCompleted) {
      allPixels.forEach(pixel => {
        ctx.fillStyle = pixel.color
        ctx.fillRect(pixel.x * scale, pixel.y * scale, scale, scale)
      })
      return
    }
    
    // TIME-BASED animation (works at any FPS)
    let currentPixel = 0
    const animationDuration = 15000 // EXACTLY 15 seconds
    const totalPixels = allPixels.length
    
    let startTime: number | null = null
    let completed = false

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp

      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / animationDuration, 1)

      const targetPixel = Math.floor(progress * totalPixels)

      // Draw pixels incrementally up to target (never clear canvas)
      while (currentPixel < targetPixel) {
        const pixel = allPixels[currentPixel]
        ctx.fillStyle = pixel.color
        ctx.fillRect(pixel.x * scale, pixel.y * scale, scale, scale)
        currentPixel++
      }

      // Check if animation is complete
      if (progress >= 1 && !completed) {
        completed = true
        onAnimationComplete?.()
        return
      }

      // Continue animation
      animationFrameIdRef.current = requestAnimationFrame(animate)
    }

    // Start animation immediately
    animationFrameIdRef.current = requestAnimationFrame(animate)

    // Cleanup function
    return () => {
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current)
        animationFrameIdRef.current = null
      }
    }
  }, [onAnimationComplete, hasCompleted])

  return (
    <div className="flex items-center justify-center w-full">
      <canvas
        ref={canvasRef}
        className="w-[85vw] md:w-[70vw] max-w-2xl h-auto"
        style={{ 
          imageRendering: 'pixelated',
          imageRendering: '-moz-crisp-edges',
          imageRendering: 'crisp-edges',
        }}
      />
    </div>
  )
}
