import { useEffect, useRef } from 'react'

function ShapeBackground() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const shapes = []
    const shapeCount = 12

    // Create geometric shapes
    for (let i = 0; i < shapeCount; i++) {
      const shape = document.createElement('div')
      const size = Math.random() * 150 + 80
      const x = Math.random() * 100
      const y = Math.random() * 100
      const rotation = Math.random() * 360
      const duration = Math.random() * 30 + 20
      const delay = Math.random() * 5
      const shapeType = Math.floor(Math.random() * 3) // 0: circle, 1: triangle, 2: square

      let clipPath = ''
      if (shapeType === 0) {
        clipPath = 'circle(50%)'
      } else if (shapeType === 1) {
        clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)'
      } else {
        clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
      }

      shape.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        top: ${y}%;
        background: rgba(255, 255, 255, 0.015);
        border: 1px solid rgba(255, 255, 255, 0.05);
        clip-path: ${clipPath};
        transform: rotate(${rotation}deg) translateZ(0);
        transform-origin: center;
        will-change: transform;
        pointer-events: none;
        opacity: 0.4;
        filter: blur(0.5px);
      `

      container.appendChild(shape)
      shapes.push({ element: shape, duration, delay, x, y })
    }

    // Animate shapes with requestAnimationFrame
    let animationId
    let startTime = null

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const elapsed = (currentTime - startTime) / 1000

      shapes.forEach((shape) => {
        const time = (elapsed + shape.delay) % shape.duration
        const progress = time / shape.duration

        // Smooth floating motion
        const xOffset = Math.sin(progress * Math.PI * 2) * 40
        const yOffset = Math.cos(progress * Math.PI * 2) * 40
        const rotation = progress * 360

        shape.element.style.transform = `
          translate(${xOffset}px, ${yOffset}px) 
          rotate(${rotation}deg)
          translateZ(0)
        `
      })

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      shapes.forEach(shape => {
        if (shape.element.parentNode) {
          shape.element.parentNode.removeChild(shape.element)
        }
      })
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
          radial-gradient(ellipse 60% 40% at 20% 80%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
          radial-gradient(ellipse 50% 30% at 80% 60%, rgba(255, 255, 255, 0.015) 0%, transparent 50%),
          #000000
        `
      }}
    >
      {/* Apple-style mesh gradient overlay */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.04) 0%, transparent 70%)
          `,
          mixBlendMode: 'overlay'
        }}
      />
      
      {/* Depth layers with soft glows */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 60% at 50% -20%, rgba(255, 255, 255, 0.05) 0%, transparent 60%),
            radial-gradient(ellipse 70% 50% at 0% 100%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 100% 100%, rgba(255, 255, 255, 0.02) 0%, transparent 50%)
          `
        }}
      />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Subtle vignette effect for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)
          `
        }}
      />
    </div>
  )
}

export default ShapeBackground
