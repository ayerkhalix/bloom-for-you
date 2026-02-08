'use client'

import { useState, useEffect } from 'react'
import { PixelBouquet } from '@/components/pixel-bouquet'
import { FloatingHearts } from '@/components/floating-hearts'
import { EnvelopeButton } from '@/components/envelope-button'
import { Sparkles } from '@/components/sparkles'

export default function ValentinePage() {
  const [mounted, setMounted] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [showBouquet, setShowBouquet] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [hasBloomed, setHasBloomed] = useState(false) // PERSISTENT: bouquet has animated
  const [showEnvelopeButton, setShowEnvelopeButton] = useState(false) // PERSISTENT: envelope button unlocked
  const [showLetter, setShowLetter] = useState(false)
  const [letterHasOpened, setLetterHasOpened] = useState(false) // PERSISTENT: letter opened at least once
  const [isFirstOpen, setIsFirstOpen] = useState(true) // Track first open for animation

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleBloom = () => {
    setIsTransitioning(true)
    setShowBouquet(true)
  }

  const handleAnimationComplete = () => {
    // Mark bouquet as completed - this only happens ONCE
    setHasBloomed(true)
    setTimeout(() => {
      setShowEnvelopeButton(true) // Envelope button appears and stays forever
    }, 800)
  }

  const handleEnvelopePress = () => {
    // Play subtle sound if available
    try {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZTA0PVqzn77BfGhBBmt7xwW0fBSyAzvLYiTcIGWi77OSfTRAMUKfj8LZjHAY4kdfyzHksBS2Bzw==')
      audio.volume = 0.3
      audio.play().catch(() => {}) // Silently fail if blocked
    } catch (e) {
      // Sound not available
    }

    setLetterHasOpened(true) // Mark that letter has been opened
    setShowLetter(true)
  }

  const handleCloseLetter = () => {
    setShowLetter(false)
    setIsFirstOpen(false) // After first close, subsequent opens skip animation
  }

  // Prevent hydration mismatch - don't render dynamic content until mounted
  if (!mounted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-red-50 px-4 relative overflow-hidden">
        <div className="w-full max-w-2xl flex flex-col items-center justify-center gap-8 relative z-10 px-4">
          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-primary text-balance">
              For You
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Happy Valentine's!
            </p>
          </div>

          <button
            className="px-8 py-4 md:px-10 md:py-5 bg-primary text-primary-foreground rounded-full text-lg md:text-xl font-semibold shadow-lg"
          >
            Tap to Bloom 💜
          </button>

          <div className="text-center text-sm text-muted-foreground">
            Made with love
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-red-50 px-4 relative overflow-hidden">
      {/* Subtle vignette */}
      <div 
        className="fixed inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(123, 44, 191, 0.08) 100%)',
          opacity: showBouquet ? 1 : 0,
        }}
      />
      
      <FloatingHearts dimmed={showLetter} />
      
      <div className="w-full max-w-2xl flex flex-col items-center justify-center gap-8 relative z-10 px-4">
        <div
          className={`flex flex-col items-center gap-8 transition-opacity duration-1000 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {!showBouquet && (
            <>
              <div className="text-center space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold text-primary text-balance">
                  For You
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground">
                  Happy Valentine's!
                </p>
              </div>

              <button
                onClick={handleBloom}
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
                onMouseLeave={() => setIsPressed(false)}
                onTouchStart={() => setIsPressed(true)}
                onTouchEnd={() => setIsPressed(false)}
                className={`
                  px-8 py-4 md:px-10 md:py-5
                  bg-primary text-primary-foreground
                  rounded-full
                  text-lg md:text-xl font-semibold
                  shadow-lg hover:shadow-xl
                  transition-all duration-200
                  ${isPressed ? 'scale-95 shadow-md' : 'scale-100'}
                  active:scale-95
                `}
              >
                Tap to Bloom 💜
              </button>

              <div className="text-center text-sm text-muted-foreground">
                Made with love
              </div>
            </>
          )}
        </div>

        {showBouquet && (
          <div className="w-full flex flex-col items-center gap-8">
            <div className="relative w-full flex items-center justify-center">
              <Sparkles visible={hasBloomed} />
              
              <div 
                className={`relative transition-all duration-1000 ${
                  hasBloomed ? 'animate-glow' : ''
                }`}
              >
                <PixelBouquet 
                  onAnimationComplete={handleAnimationComplete} 
                  hasCompleted={hasBloomed}
                />
              </div>
            </div>
            
            {showEnvelopeButton && (
              <div className="animate-in fade-in zoom-in duration-700">
                <EnvelopeButton onClick={handleEnvelopePress} />
              </div>
            )}
            
            {showLetter && (
              <div 
                className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${
                  showLetter ? 'bg-black/25 backdrop-blur-md' : 'bg-transparent'
                }`}
                style={{
                  animation: isFirstOpen ? 'fadeIn 0.5s ease-out' : 'none',
                  backdropFilter: showLetter ? 'blur(12px) saturate(180%)' : 'none',
                }}
              >
                <div 
                  className="relative bg-gradient-to-br from-white to-pink-50 p-8 md:p-12 rounded-3xl shadow-2xl max-w-md w-full border-4 border-primary/10"
                  style={{
                    animation: isFirstOpen ? 'envelopeOpen 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none'
                  }}
                >
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <span className="text-2xl">💜</span>
                  </div>
                  
                  <div 
                    className="text-center space-y-6"
                    style={{
                      animation: isFirstOpen ? 'slideDown 0.8s ease-out 0.4s both' : 'none'
                    }}
                  >
                    <div className="text-sm text-primary/60 font-medium tracking-wide">
                      For Rachel 💜
                    </div>
                    
                    <div className="text-2xl md:text-3xl font-bold text-primary leading-relaxed text-balance">
                      These aren’t the only flowers you’ll get hehe
                      <br />
                      Abangan mo ung delivery soon 💐
                      <br />
                      Happy Valentine’s Day,
                      <br />
                      I love you so much!! ❤️
                    </div>
                    
                    <button
                      onClick={handleCloseLetter}
                      className="mt-6 px-6 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes envelopeOpen {
          0% {
            transform: scale(0.3) rotateX(-90deg);
            opacity: 0;
          }
          50% {
            transform: scale(0.95) rotateX(-10deg);
          }
          100% {
            transform: scale(1) rotateX(0deg);
            opacity: 1;
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes glow {
          0% {
            filter: drop-shadow(0 0 0px rgba(157, 78, 221, 0));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(157, 78, 221, 0.4));
          }
          100% {
            filter: drop-shadow(0 0 8px rgba(157, 78, 221, 0.2));
          }
        }
        
        .animate-glow {
          animation: glow 2s ease-out forwards;
        }
      `}</style>
    </main>
  )
}
