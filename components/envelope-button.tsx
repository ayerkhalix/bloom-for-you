'use client'

export function EnvelopeButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative group cursor-pointer"
      aria-label="Open love letter"
    >
      <div className="relative w-24 h-20 transition-transform duration-300 hover:scale-110 active:scale-95 animate-float">
        {/* Envelope body */}
        <div className="absolute inset-0 bg-gradient-to-br from-white to-pink-50 rounded-lg shadow-xl border-2 border-primary/20 transition-shadow duration-300 group-hover:shadow-2xl">
          {/* Decorative heart seal */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:animate-pulse">
            <span className="text-xl">💜</span>
          </div>
        </div>
        
        {/* Envelope flap */}
        <div 
          className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-br from-pink-100 to-purple-100 rounded-t-lg border-2 border-primary/20 border-b-0 transition-all duration-300 origin-top group-hover:-rotate-12"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 50% 70%)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg animate-shimmer" />
        
        {/* Idle shimmer */}
        <div className="absolute inset-0 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-idle-shimmer" />
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes idle-shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out;
        }
        
        .animate-idle-shimmer {
          animation: idle-shimmer 4s ease-in-out infinite;
        }
      `}</style>
    </button>
  )
}
