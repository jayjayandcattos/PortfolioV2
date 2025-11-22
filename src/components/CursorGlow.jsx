import { useState, useEffect } from 'react'

function CursorGlow({ theme }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  if (theme === 'light') {
    return (
      <div 
        className="fixed w-[500px] h-[500px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[2] transition-opacity duration-300 mix-blend-screen hidden md:block"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`
        }}
      >
        <div className="absolute top-1/2 left-1/2 w-[120px] h-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 animate-cursorPulse" style={{ background: 'radial-gradient(circle, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 40%, transparent 70%)' }}></div>
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full -translate-x-1/2 -translate-y-1/2 animate-cursorRotate" style={{ background: 'radial-gradient(circle, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.03) 30%, transparent 50%)' }}></div>
      </div>
    )
  }

  return (
    <div 
      className="fixed w-[500px] h-[500px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[2] transition-opacity duration-300 mix-blend-screen hidden md:block"
      style={{
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`
      }}
    >
      <div className="absolute top-1/2 left-1/2 w-[120px] h-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 animate-cursorPulse" style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 70%)' }}></div>
      <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full -translate-x-1/2 -translate-y-1/2 animate-cursorRotate" style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.03) 30%, transparent 50%)' }}></div>
    </div>
  )
}

export default CursorGlow

