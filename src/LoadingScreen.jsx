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
    <div className="fixed inset-0 z-[9999] bg-white dark:bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
      
        <div className="relative">
          <svg
            className="w-20 h-20 md:w-24 md:h-24 animate-spin-slow"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 2L9 8h6l-3-6zm-2 6l-3 4h10l-3-4H10zm-4 4l-2 6h16l-2-6H6zm2 6h8v2H8v-2z"
              fill="currentColor"
              className="text-black dark:text-white animate-pulse"
            />
          </svg>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-black dark:text-white mb-2">
            Loading Portfolio
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">Preparing something amazing...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 md:w-80 h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-black dark:bg-white rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Progress Percentage */}
        <p className="text-gray-700 dark:text-gray-300 text-sm font-mono">{progress}%</p>
      </div>
    </div>
  )
}

export default LoadingScreen

