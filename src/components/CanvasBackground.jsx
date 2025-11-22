import { useEffect, useRef } from 'react'

function CanvasBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let stars = []
    let animationFrameId = null
    
    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      const width = window.innerWidth
      const height = window.innerHeight
      
      const currentWidth = canvas.width / (canvas.style.width ? parseFloat(canvas.style.width) / width : dpr)
      const currentHeight = canvas.height / (canvas.style.height ? parseFloat(canvas.style.height) / height : dpr)
      
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      
      if (stars.length > 0 && currentWidth > 0 && currentHeight > 0) {
        const scaleX = width / currentWidth
        const scaleY = height / currentHeight
        stars.forEach(star => {
          star.x *= scaleX
          star.y *= scaleY
        })
      }
    }
    
    const initStars = () => {
      const starCount = window.innerWidth < 768 ? 100 : 200
      const connectionDistance = window.innerWidth < 768 ? 150 : 200
      
      class Star {
        constructor() {
          this.x = Math.random() * window.innerWidth
          this.y = Math.random() * window.innerHeight
          this.size = Math.random() * 2 + 0.5
          this.opacity = Math.random() * 0.8 + 0.2
          this.twinkleSpeed = Math.random() * 0.02 + 0.01
          this.twinkleOffset = Math.random() * Math.PI * 2
        }

        draw() {
          const twinkle = Math.sin(Date.now() * this.twinkleSpeed + this.twinkleOffset) * 0.3 + 0.7
          const currentOpacity = this.opacity * twinkle

          const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3)
          gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`)
          gradient.addColorStop(0.5, `rgba(30, 64, 175, ${currentOpacity * 0.3})`)
          gradient.addColorStop(1, 'rgba(30, 64, 175, 0)')
          
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
          ctx.fill()

          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      stars = []
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star())
      }
      
      return connectionDistance
    }
    
    updateCanvasSize()
    let connectionDistance = initStars()

    function animate() {
      const width = window.innerWidth
      const height = window.innerHeight
      ctx.clearRect(0, 0, width, height)
      
      stars.forEach((star, i) => {
        stars.slice(i + 1).forEach(otherStar => {
          const dx = star.x - otherStar.x
          const dy = star.y - otherStar.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.15
            ctx.strokeStyle = `rgba(30, 64, 175, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(star.x, star.y)
            ctx.lineTo(otherStar.x, otherStar.y)
            ctx.stroke()
          }
        })
        star.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      updateCanvasSize()
      connectionDistance = initStars()
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-0 opacity-100 pointer-events-none will-change-transform bg-transparent m-0 p-0"
      style={{ imageRendering: 'crisp-edges' }}
    />
  )
}

export default CanvasBackground

