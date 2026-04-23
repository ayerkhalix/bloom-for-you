"use client"

import { motion, AnimatePresence } from "framer-motion"

interface HappyValentinesProps {
  isVisible: boolean
}

export function HappyValentines({ isVisible }: HappyValentinesProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[50] pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Background glow */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at center, rgba(232, 216, 240, 0.3) 0%, transparent 70%)",
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          
          {/* Main text container */}
          <div className="relative text-center px-6 max-w-2xl">
            {/* Decorative top flourish */}
            <motion.div
              className="absolute -top-16 left-1/2 transform -translate-x-1/2"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "backOut" }}
            >
              <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
                <path
                  d="M40 0 C40 0, 30 20, 20 25 C10 30, 0 25, 0 25"
                  stroke="#c8a8e0"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M40 0 C40 0, 50 20, 60 25 C70 30, 80 25, 80 25"
                  stroke="#c8a8e0"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </motion.div>
            
            {/* Main text */}
            <motion.h1
              className="font-serif text-5xl md:text-6xl text-[#8b5ea0] mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            >
              Happy Valentine's
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p
              className="font-sans text-lg md:text-xl text-[#9a7aad] tracking-wider"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
            >
              Iloveyousomuch!
            </motion.p>
            
            {/* Decorative bottom flourish */}
            <motion.div
              className="absolute -bottom-12 left-1/2 transform -translate-x-1/2"
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.9, duration: 0.6, ease: "backOut" }}
            >
              <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
                <path
                  d="M40 40 C40 40, 30 20, 20 15 C10 10, 0 15, 0 15"
                  stroke="#c8a8e0"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M40 40 C40 40, 50 20, 60 15 C70 10, 80 15, 80 15"
                  stroke="#c8a8e0"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </motion.div>
            
            {/* Floating heart particles */}
            <motion.div
              className="absolute inset-0 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${20 + (i * 10)}%`,
                    top: `${30 + Math.sin(i) * 20}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.7, 0.3],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#c87aaa">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Gentle fade-out after delay */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 5, duration: 1.5, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}