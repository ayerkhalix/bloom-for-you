"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface EnvelopeProps {
  onClose: () => void
}

export function Envelope({ onClose }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="envelope"
            className="relative cursor-pointer focus:outline-none"
            initial={{ scale: 0, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onClick={() => setIsOpen(true)}
            aria-label="Open Valentine letter"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="120" height="90" viewBox="0 0 120 90" fill="none">
                {/* Envelope body */}
                <rect x="5" y="20" width="110" height="65" rx="6" fill="#e0d4f0" stroke="#b8a0d4" strokeWidth="2" />
                {/* Envelope flap */}
                <path d="M5 20 L60 55 L115 20" fill="#eee4f5" stroke="#b8a0d4" strokeWidth="2" strokeLinejoin="round" />
                {/* Heart seal */}
                <path
                  d="M60 50 l-1 -1 C55 45.5 53 43.8 53 41.8 53 40.2 54.2 39 55.8 39c.9 0 1.7.4 2.2 1 .5-.6 1.3-1 2.2-1 1.6 0 2.8 1.2 2.8 2.8 0 2-2 3.7-5.6 7.2L60 50z"
                  fill="#b07acc"
                />
                {/* Sparkle accents */}
                <motion.circle cx="30" cy="35" r="1.5" fill="#c4a8e0"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.circle cx="90" cy="40" r="1.5" fill="#c4a8e0"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }}
                />
                <motion.circle cx="50" cy="75" r="1" fill="#c4a8e0"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                />
              </svg>
              <p className="text-center mt-3 font-serif text-sm text-[#8b5ea0] tracking-wide">
                Tap to open
              </p>
            </motion.div>
          </motion.button>
        ) : (
          <motion.div
            key="letter"
            className="relative mx-4 w-full max-w-sm"
            initial={{ scale: 0.8, opacity: 0, rotateX: -20 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Letter card */}
            <div
              className="relative rounded-2xl p-8 shadow-xl"
              style={{
                background: "linear-gradient(145deg, #f5f0fa 0%, #ece0f5 50%, #e8d8f0 100%)",
                border: "2px solid #d0b8e4",
              }}
            >
              {/* Decorative corner hearts */}
              <div className="absolute top-3 left-3 text-[#c4a8e0] opacity-40">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <div className="absolute top-3 right-3 text-[#c4a8e0] opacity-40">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-center"
              >
             <h2 className="font-serif text-2xl text-[#8b5ea0] mb-4 text-balance">
              To My Dearest Valentine
            </h2>

            <div className="w-16 h-[2px] mx-auto mb-5 bg-[#c4a8e0] opacity-50 rounded-full" />

            <p className="font-sans text-base leading-relaxed text-[#5a3a6a] mb-4">
              These aren’t the only flowers you’ll get.
            </p>

            <p className="font-sans text-base leading-relaxed text-[#5a3a6a] mb-4">
              This little garden is just a preview,
              abangan mo na ung delivery hehe 💐
            </p>

            <p className="font-sans text-base leading-relaxed text-[#5a3a6a] mb-6">
              Happy Valentine’s Day!
              <br />
              I love you so much! ❤️
            </p>

            <p className="font-serif text-lg text-[#8b5ea0]">
              Always yours,
            </p>
            <p className="font-serif text-lg text-[#8b5ea0]">
              Ayer
            </p>

                <div className="flex justify-center mt-2">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#b07acc">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
              </motion.div>

              {/* Close button */}
              <motion.button
                className="mt-6 mx-auto block px-6 py-2 rounded-full text-sm font-sans cursor-pointer focus:outline-none"
                style={{
                  background: "linear-gradient(135deg, #b88ed0, #9b72c0)",
                  color: "#fff",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
              >
                Back to Garden
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
