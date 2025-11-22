import { useState, useEffect } from 'react'

function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollableHeight = documentHeight - windowHeight
      const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-[1001] pointer-events-none">
      <div 
        className="h-full bg-black dark:bg-white transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      ></div>
    </div>
  )
}

export default ScrollProgress

