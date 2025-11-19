import { useEffect, useState } from 'react'

function LoadingScreen({ isLoading }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 2
        })
      }, 30)
      return () => clearInterval(interval)
    }
  }, [isLoading])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-bg-dark flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        {/* Crown Icon with Animation */}
        <div className="relative">
          <svg
            className="w-20 h-20 md:w-24 md:h-24 animate-spin-slow"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <defs>
              <linearGradient id="crownGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <path
              d="M12 2L9 8h6l-3-6zm-2 6l-3 4h10l-3-4H10zm-4 4l-2 6h16l-2-6H6zm2 6h8v2H8v-2z"
              fill="url(#crownGradient)"
              className="animate-pulse"
            />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-20 blur-xl animate-pulse"></div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
            Loading Portfolio
          </h2>
          <p className="text-white/50 text-sm md:text-base">Preparing something amazing...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 md:w-80 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Progress Percentage */}
        <p className="text-white/70 text-sm font-mono">{progress}%</p>
      </div>
    </div>
  )
}

export default LoadingScreen

