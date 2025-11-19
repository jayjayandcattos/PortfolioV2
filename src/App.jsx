import { useState, useEffect, useRef } from 'react'
import './App.css'
import LoadingScreen from './LoadingScreen'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const canvasRef = useRef(null)
  const heroRef = useRef(null)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Constellation stars
    const stars = []
    const starCount = 200
    const connectionDistance = 200

    class Star {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.opacity = Math.random() * 0.8 + 0.2
        this.twinkleSpeed = Math.random() * 0.02 + 0.01
        this.twinkleOffset = Math.random() * Math.PI * 2
      }

      draw() {
        // Twinkling effect
        const twinkle = Math.sin(Date.now() * this.twinkleSpeed + this.twinkleOffset) * 0.3 + 0.7
        const currentOpacity = this.opacity * twinkle

        // Draw star with glow
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3)
        gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`)
        gradient.addColorStop(0.5, `rgba(99, 102, 241, ${currentOpacity * 0.3})`)
        gradient.addColorStop(1, 'rgba(99, 102, 241, 0)')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
        ctx.fill()

        // Draw bright center
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create stars
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star())
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw connections between nearby stars
      stars.forEach((star, i) => {
        stars.slice(i + 1).forEach(otherStar => {
          const dx = star.x - otherStar.x
          const dy = star.y - otherStar.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.15
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(star.x, star.y)
            ctx.lineTo(otherStar.x, otherStar.y)
            ctx.stroke()
          }
        })
      })

      // Draw stars
      stars.forEach(star => {
        star.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // Redistribute stars on resize
      stars.forEach(star => {
        star.x = Math.random() * canvas.width
        star.y = Math.random() * canvas.height
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const startPosition = window.pageYOffset
      const targetPosition = element.offsetTop - 80 // Account for navbar height
      const distance = targetPosition - startPosition
      const duration = 1500 // 1.5 seconds for smooth Premiere Pro-like scroll
      let start = null

      function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      }

      function animation(currentTime) {
        if (start === null) start = currentTime
        const timeElapsed = currentTime - start
        const progress = Math.min(timeElapsed / duration, 1)
        const ease = easeInOutCubic(progress)
        
        window.scrollTo(0, startPosition + distance * ease)
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation)
        } else {
      setActiveSection(id)
        }
      }

      requestAnimationFrame(animation)
      setMenuOpen(false)
    }
  }

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
      const sections = ['home', 'about', 'skills', 'work', 'contact']
      const scrollPosition = window.scrollY + 300
          setScrolled(window.scrollY > 50)

          // Calculate scroll progress
          const windowHeight = window.innerHeight
          const documentHeight = document.documentElement.scrollHeight
          const scrollableHeight = documentHeight - windowHeight
          const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0
          setScrollProgress(progress)


          // Fade in elements on scroll
          const elements = document.querySelectorAll('.fade-on-scroll')
          elements.forEach((el) => {
            const rect = el.getBoundingClientRect()
            const elementVisible = 150
            if (rect.top < window.innerHeight - elementVisible && rect.bottom > 0) {
              el.classList.add('fade-in-visible')
            }
          })

          // Section detection
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
          }
          
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const checkLoading = () => {
      if (document.readyState === 'complete') {
        setTimeout(() => setIsLoading(false), 800)
      }
    }

    if (document.readyState === 'complete') {
      setTimeout(() => setIsLoading(false), 800)
    } else {
      window.addEventListener('load', checkLoading)
      return () => window.removeEventListener('load', checkLoading)
    }
  }, [])

  useEffect(() => {
    const animateNumbers = () => {
      const statNumbers = document.querySelectorAll('.stat-number')
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'))
            let current = 0
            const increment = target / 50
            const timer = setInterval(() => {
              current += increment
              if (current >= target) {
                entry.target.textContent = target
                clearInterval(timer)
              } else {
                entry.target.textContent = Math.floor(current)
              }
            }, 30)
            observer.unobserve(entry.target)
          }
        })
      }, { threshold: 0.5 })

      statNumbers.forEach(stat => observer.observe(stat))
    }

    animateNumbers()
  }, [])

  return (
    <div className="app relative min-h-screen bg-bg-dark text-white overflow-x-hidden font-sans" ref={scrollContainerRef}>
      {/* Scroll Progress Indicator */}
      <div className="scroll-progress-bar fixed top-0 left-0 w-full h-1 bg-transparent z-[1001] pointer-events-none">
        <div 
          className="scroll-progress-fill h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
      {/* Loading Screen */}
      <LoadingScreen isLoading={isLoading} />

      {/* Canvas Background */}
      <canvas ref={canvasRef} className="canvas-bg"></canvas>

      {/* Abstract Shapes */}
      <div className="abstract-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      {/* Enhanced Cursor Effect */}
      <div 
        className="cursor-glow"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`
        }}
      >
        <div className="cursor-glow-inner"></div>
        <div className="cursor-glow-outer"></div>
        <div className="cursor-glow-pulse"></div>
      </div>

      {/* Navigation */}
      <nav className={`nav fixed top-0 left-0 w-full flex justify-between items-center px-4 md:px-8 lg:px-16 py-5 md:py-6 z-[1000] transition-all duration-300 ${scrolled ? 'bg-[rgba(10,10,10,0.95)] border-b border-white/10' : 'bg-transparent'}`}>
        <div className="nav-left">
          <div className="logo cursor-pointer transition-all duration-300 hover:scale-105" onClick={() => scrollToSection('home')}>
            <span className="logo-main block text-xl md:text-2xl lg:text-3xl font-display font-extrabold mb-1 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent transition-all duration-300">jayjayandcattos</span>
            <span className="logo-sub block text-[0.65rem] md:text-[0.75rem] text-white/40 font-light uppercase tracking-[0.2em]">the final boss</span>
          </div>
        </div>
        
        {/* Desktop Navigation Links */}
        <div className="nav-links-desktop hidden lg:flex items-center gap-8 xl:gap-12">
          {[
            { num: '01', text: 'Home', id: 'home' },
            { num: '02', text: 'About', id: 'about' },
            { num: '03', text: 'Skills', id: 'skills' },
            { num: '04', text: 'Work', id: 'work' },
            { num: '05', text: 'Contact', id: 'contact' }
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
              className={`nav-link-desktop relative text-sm xl:text-base font-medium text-white/70 no-underline transition-all duration-300 hover:text-primary group ${activeSection === item.id ? 'text-primary' : ''}`}
            >
              <span className="nav-link-number text-xs text-white/30 mr-1">{item.num}</span>
              {item.text}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full ${activeSection === item.id ? 'w-full' : ''}`}></span>
            </a>
          ))}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="nav-right lg:hidden">
          <button 
            className={`menu-toggle relative w-10 h-8 bg-transparent border-none cursor-pointer z-[1001] flex flex-col justify-center gap-2 ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ display: 'flex', visibility: 'visible', opacity: 1 }}
          >
            <span className="block w-full h-0.5 bg-white transition-all duration-300 rounded-full" style={{ backgroundColor: '#ffffff' }}></span>
            <span className="block w-full h-0.5 bg-white transition-all duration-300 rounded-full" style={{ backgroundColor: '#ffffff' }}></span>
            <span className="block w-full h-0.5 bg-white transition-all duration-300 rounded-full" style={{ backgroundColor: '#ffffff' }}></span>
          </button>
        </div>
      </nav>

      {/* Menu Overlay */}
      <div className={`menu-overlay fixed inset-0 w-full h-screen bg-[rgba(10,10,10,0.98)] z-[999] flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-500 ${menuOpen ? 'open opacity-100 pointer-events-auto' : ''}`}>
        <div className="menu-content flex flex-col gap-12 md:gap-16 lg:gap-20 items-center">
          <div className="menu-links flex flex-col gap-6 md:gap-8 lg:gap-10">
            {[
              { num: '01', text: 'Home', id: 'home' },
              { num: '02', text: 'About', id: 'about' },
              { num: '03', text: 'Skills', id: 'skills' },
              { num: '04', text: 'Work', id: 'work' },
              { num: '05', text: 'Contact', id: 'contact' }
            ].map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`} 
                onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
                className={`menu-link flex items-center gap-6 md:gap-10 text-white no-underline font-display text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold transition-all duration-500 p-4 relative overflow-hidden group ${activeSection === item.id ? 'active' : ''}`}
              >
                <span className="menu-number text-xl md:text-2xl lg:text-3xl text-white/30 font-normal transition-all duration-300 group-hover:text-primary">{item.num}</span>
                <span className="menu-text relative">
                  {item.text}
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-secondary transition-all duration-500 group-hover:w-full"></span>
                </span>
              </a>
            ))}
          </div>
          <div className="menu-social flex flex-col sm:flex-row gap-6 md:gap-8">
            <a href="https://github.com/jayjayandcattos" target="_blank" rel="noopener noreferrer" className="text-white/40 no-underline text-base md:text-lg font-medium transition-all duration-300 hover:text-primary hover:scale-110">GitHub ↗</a>
            <a href="mailto:rivera.justin.santilla@gmail.com" className="text-white/40 no-underline text-base md:text-lg font-medium transition-all duration-300 hover:text-primary hover:scale-110">Email ↗</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/40 no-underline text-base md:text-lg font-medium transition-all duration-300 hover:text-primary hover:scale-110">Facebook ↗</a>
          </div>
        </div>
      </div>

      {/* Hero Section - Redesigned */}
      <section id="home" ref={heroRef} className="hero relative min-h-screen flex flex-col justify-center items-center px-4 md:px-8 lg:px-16 pt-32 md:pt-40 pb-20 md:pb-32 z-10 w-full overflow-x-hidden">
        {/* Enhanced Background Effects */}
        <div className="hero-bg-effects absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated gradient orbs */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-accent/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          
          {/* Mesh gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.1),transparent_50%)]"></div>
        </div>

        {/* Decorative SVG - Top Right Corner */}
        <div className="hero-svg-decoration absolute top-20 right-8 md:right-16 lg:right-24 xl:right-32 w-64 md:w-80 lg:w-96 xl:w-[500px] h-auto opacity-30 lg:opacity-50 pointer-events-none z-0">
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#ec4899" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Animated circles */}
            <circle cx="200" cy="100" r="60" fill="url(#gradient1)" opacity="0.6" className="animate-pulse-slow">
              <animate attributeName="r" values="60;70;60" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0.8;0.6" dur="4s" repeatCount="indefinite" />
            </circle>
            
            <circle cx="320" cy="180" r="40" fill="url(#gradient2)" opacity="0.5" className="animate-pulse-slow" style={{ animationDelay: '1s' }}>
              <animate attributeName="r" values="40;50;40" dur="5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0.7;0.5" dur="5s" repeatCount="indefinite" />
            </circle>
            
            <circle cx="280" cy="280" r="50" fill="url(#gradient1)" opacity="0.4" className="animate-pulse-slow" style={{ animationDelay: '2s' }}>
              <animate attributeName="r" values="50;60;50" dur="6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.6;0.4" dur="6s" repeatCount="indefinite" />
            </circle>
            
            {/* Abstract lines */}
            <path d="M 100 150 Q 200 100 300 150 T 350 200" stroke="url(#gradient1)" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round">
              <animate attributeName="d" values="M 100 150 Q 200 100 300 150 T 350 200;M 100 160 Q 200 110 300 160 T 350 210;M 100 150 Q 200 100 300 150 T 350 200" dur="8s" repeatCount="indefinite" />
            </path>
            
            <path d="M 150 250 Q 250 200 350 250" stroke="url(#gradient2)" strokeWidth="2" fill="none" opacity="0.4" strokeLinecap="round">
              <animate attributeName="d" values="M 150 250 Q 250 200 350 250;M 150 260 Q 250 210 350 260;M 150 250 Q 250 200 350 250" dur="10s" repeatCount="indefinite" />
            </path>
            
            {/* Geometric shapes */}
            <polygon points="250,120 280,180 220,180" fill="url(#gradient1)" opacity="0.3" className="animate-pulse-slow" style={{ animationDelay: '0.5s' }}>
              <animateTransform attributeName="transform" type="rotate" values="0 250 150;360 250 150" dur="20s" repeatCount="indefinite" />
            </polygon>
            
            <rect x="300" y="220" width="60" height="60" rx="8" fill="url(#gradient2)" opacity="0.25" className="animate-pulse-slow" style={{ animationDelay: '1.5s' }}>
              <animateTransform attributeName="transform" type="rotate" values="0 330 250;-15 330 250;0 330 250" dur="6s" repeatCount="indefinite" />
            </rect>
            
            {/* Floating particles */}
            <circle cx="120" cy="200" r="3" fill="#6366f1" opacity="0.6">
              <animate attributeName="cy" values="200;180;200" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0.9;0.6" dur="3s" repeatCount="indefinite" />
            </circle>
            
            <circle cx="180" cy="320" r="4" fill="#ec4899" opacity="0.5">
              <animate attributeName="cy" values="320;300;320" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0.8;0.5" dur="4s" repeatCount="indefinite" />
            </circle>
            
            <circle cx="340" cy="120" r="2.5" fill="#06b6d4" opacity="0.7">
              <animate attributeName="cy" values="120;100;120" dur="3.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;1;0.7" dur="3.5s" repeatCount="indefinite" />
            </circle>
            
            {/* More particles */}
            <circle cx="80" cy="80" r="2" fill="#6366f1" opacity="0.5">
              <animate attributeName="cy" values="80;60;80" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="360" cy="300" r="3" fill="#ec4899" opacity="0.6">
              <animate attributeName="cy" values="300;280;300" dur="3.5s" repeatCount="indefinite" />
            </circle>
            
            {/* Hexagon pattern */}
            <polygon points="150,50 170,70 150,90 130,90 110,70 130,50" fill="url(#gradient1)" opacity="0.2">
              <animateTransform attributeName="transform" type="rotate" values="0 150 70;360 150 70" dur="25s" repeatCount="indefinite" />
            </polygon>
            
            {/* Star shape */}
            <path d="M 300 50 L 310 75 L 335 75 L 315 90 L 325 115 L 300 100 L 275 115 L 285 90 L 265 75 L 290 75 Z" fill="url(#gradient2)" opacity="0.25">
              <animateTransform attributeName="transform" type="rotate" values="0 300 82.5;-360 300 82.5" dur="30s" repeatCount="indefinite" />
            </path>
            
            {/* Wave pattern */}
            <path d="M 50 200 Q 100 180 150 200 T 250 200" stroke="url(#gradient1)" strokeWidth="1.5" fill="none" opacity="0.3">
              <animate attributeName="d" values="M 50 200 Q 100 180 150 200 T 250 200;M 50 210 Q 100 190 150 210 T 250 210;M 50 200 Q 100 180 150 200 T 250 200" dur="7s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>
        
        {/* Decorative SVG - Bottom Left */}
        <div className="hero-svg-decoration-bottom absolute bottom-20 left-8 md:left-16 lg:left-24 xl:left-32 w-56 md:w-72 lg:w-96 xl:w-[400px] h-auto opacity-20 lg:opacity-30 pointer-events-none z-0">
          <svg viewBox="0 0 350 350" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#6366f1" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            
            {/* Large orb */}
            <circle cx="175" cy="175" r="80" fill="url(#gradient3)" opacity="0.4">
              <animate attributeName="r" values="80;95;80" dur="6s" repeatCount="indefinite" />
            </circle>
            
            {/* Concentric circles */}
            <circle cx="175" cy="175" r="60" stroke="url(#gradient3)" strokeWidth="2" fill="none" opacity="0.3">
              <animate attributeName="r" values="60;70;60" dur="8s" repeatCount="indefinite" />
            </circle>
            
            <circle cx="175" cy="175" r="40" stroke="url(#gradient3)" strokeWidth="1.5" fill="none" opacity="0.25">
              <animate attributeName="r" values="40;50;40" dur="10s" repeatCount="indefinite" />
            </circle>
            
            {/* Spiral pattern */}
            <path d="M 175 175 L 200 175 A 25 25 0 0 1 200 200 A 25 25 0 0 1 175 200 A 25 25 0 0 1 175 175" stroke="url(#gradient3)" strokeWidth="2" fill="none" opacity="0.3">
              <animateTransform attributeName="transform" type="rotate" values="0 175 175;360 175 175" dur="20s" repeatCount="indefinite" />
            </path>
            
            {/* Small floating elements */}
            <circle cx="100" cy="100" r="4" fill="#06b6d4" opacity="0.5">
              <animate attributeName="cy" values="100;80;100" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="250" cy="250" r="3.5" fill="#6366f1" opacity="0.6">
              <animate attributeName="cy" values="250;230;250" dur="5s" repeatCount="indefinite" />
            </circle>
            <circle cx="280" cy="120" r="3" fill="#ec4899" opacity="0.5">
              <animate attributeName="cy" values="120;100;120" dur="4.5s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
        
        {/* Decorative SVG - Top Left */}
        <div className="hero-svg-decoration-top-left absolute top-32 left-8 md:left-16 w-48 md:w-64 lg:w-80 h-auto opacity-15 lg:opacity-25 pointer-events-none z-0">
          <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            
            {/* Geometric pattern */}
            <polygon points="150,50 200,100 150,150 100,100" fill="url(#gradient4)" opacity="0.3">
              <animateTransform attributeName="transform" type="rotate" values="0 150 100;360 150 100" dur="15s" repeatCount="indefinite" />
            </polygon>
            
            <polygon points="150,150 200,200 150,250 100,200" fill="url(#gradient4)" opacity="0.25">
              <animateTransform attributeName="transform" type="rotate" values="360 150 200;0 150 200" dur="18s" repeatCount="indefinite" />
            </polygon>
            
            {/* Connecting lines */}
            <line x1="150" y1="50" x2="150" y2="150" stroke="url(#gradient4)" strokeWidth="1.5" opacity="0.2" />
            <line x1="150" y1="150" x2="150" y2="250" stroke="url(#gradient4)" strokeWidth="1.5" opacity="0.2" />
          </svg>
        </div>
        
        <div className="hero-container max-w-7xl mx-auto w-full text-center relative z-10">
          {/* Animated Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 mb-8 md:mb-12 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border border-primary/30 rounded-full backdrop-blur-sm animate-pulse-slow">
            <span className="w-2 h-2 bg-primary rounded-full animate-ping"></span>
            <span className="text-xs md:text-sm text-white/80 font-medium uppercase tracking-wider">Available for Opportunities</span>
          </div>

          {/* Main Heading */}
          <div className="hero-heading mb-6 md:mb-10">
            <div className="hero-greeting text-sm md:text-base lg:text-lg text-white/50 font-light uppercase tracking-[0.3em] mb-4 md:mb-6 animate-fade-in">
              Hey, I am
            </div>
            <h1 className="hero-name font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] mb-6 md:mb-8">
              <span className="name-line block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent bg-[length:300%_auto] animate-shimmer-fast">Justin</span>
              <span className="name-line block bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent bg-[length:300%_auto] animate-shimmer-fast" style={{ animationDelay: '0.2s' }}>Christopher</span>
              <span className="name-line block bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent bg-[length:300%_auto] animate-shimmer-fast" style={{ animationDelay: '0.4s' }}>S. Rivera</span>
          </h1>
            <div className="hero-tagline text-xl md:text-2xl lg:text-3xl text-white/60 font-light mb-8 md:mb-12">
              But you can call me <span className="font-display font-bold text-accent text-2xl md:text-3xl lg:text-4xl">jayzee</span>
            </div>
          </div>
            
          {/* Roles Grid */}
          <div className="hero-roles grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-12 md:mb-16 max-w-4xl mx-auto">
            {['Web Developer', 'Front-End Developer', 'Collegiate E-Sports Player'].map((role, index) => (
              <div 
                key={role}
                className="role-card group relative bg-gradient-to-br from-bg-card/50 to-bg-card-hover/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 transition-all duration-500 hover:border-primary/50 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/10 group-hover:to-secondary/10 rounded-2xl transition-all duration-500"></div>
                <div className="relative z-10">
                  <div className="role-icon text-2xl md:text-3xl mb-2">✨</div>
                  <div className="role-text text-sm md:text-base font-semibold text-white">{role}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hero-actions flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
            <button 
              className="btn-primary group relative px-8 md:px-12 py-4 md:py-5 text-base md:text-lg font-bold text-white rounded-full overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl"
              onClick={() => scrollToSection('work')}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-100 group-hover:opacity-90 transition-opacity duration-500"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-secondary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative z-10 flex items-center gap-3">
                View My Work
                <span className="text-xl md:text-2xl transition-transform duration-300 group-hover:translate-x-2">→</span>
              </span>
            </button>
            <button 
              className="btn-secondary group relative px-8 md:px-12 py-4 md:py-5 text-base md:text-lg font-bold text-white rounded-full border-2 border-primary/50 bg-transparent overflow-hidden transition-all duration-500 hover:border-primary hover:scale-110"
              onClick={() => scrollToSection('contact')}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary/0 to-secondary/0 group-hover:from-primary/10 group-hover:to-secondary/10 transition-all duration-500"></span>
              <span className="relative z-10 flex items-center gap-3">
                Get In Touch
                <span className="text-xl md:text-2xl transition-transform duration-300 group-hover:translate-x-2">→</span>
              </span>
            </button>
          </div>

        </div>
        
        {/* Scroll Indicator - Fixed Position */}
        <div className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow z-20">
          <span className="text-white/30 text-xs uppercase tracking-wider">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent"></div>
        </div>
      </section>

      {/* About Section - Redesigned */}
      <section id="about" className="section about relative px-4 md:px-8 lg:px-16 py-20 md:py-32 lg:py-40 z-10 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="section-header text-center mb-16 md:mb-24">
            <div className="section-badge inline-block px-4 py-2 mb-6 bg-primary/10 border border-primary/30 rounded-full">
              <span className="text-xs md:text-sm text-primary font-semibold uppercase tracking-wider">About Me</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Who am I?</span>
            </h2>
          </div>

          <div className="about-grid grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Text Content */}
            <div className="about-text space-y-8">
              <div className="about-intro">
                <p className="text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed font-light">
                  I'm a <span className="font-bold text-primary">3rd-year student</span> at <span className="font-bold text-secondary">Quezon City University (QCU)</span> with an unrelenting passion for both <span className="font-bold text-accent">technology</span> and <span className="font-bold text-primary">gaming</span>.
                </p>
        </div>
              <div className="about-details">
                <p className="text-base md:text-lg text-white/60 leading-relaxed">
                  I take everything I do seriously, whether it's academics or gaming. I don't slack off 👀 and always strive to stay on top of my game, no matter the challenge. Every project is an opportunity to push boundaries and create something extraordinary.
                </p>
              </div>
              
              {/* Stats */}
              <div className="stats-grid grid grid-cols-2 gap-4 md:gap-6 mt-12">
                <div className="stat-card group relative bg-gradient-to-br from-bg-card/80 to-bg-card-hover/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 text-center transition-all duration-500 hover:border-primary/50 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/10 group-hover:to-secondary/10 rounded-3xl transition-all duration-500"></div>
                  <div className="relative z-10">
                    <div className="stat-number font-display text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2" data-target="25">0</div>
                    <div className="stat-label text-xs md:text-sm text-white/50 uppercase tracking-wider font-medium">Projects</div>
                  </div>
                </div>
                <div className="stat-card group relative bg-gradient-to-br from-bg-card/80 to-bg-card-hover/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 text-center transition-all duration-500 hover:border-primary/50 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/10 group-hover:to-secondary/10 rounded-3xl transition-all duration-500"></div>
                  <div className="relative z-10">
                    <div className="stat-number font-display text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent mb-2" data-target="2">0</div>
                    <div className="stat-label text-xs md:text-sm text-white/50 uppercase tracking-wider font-medium">Years</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Element */}
            <div className="about-visual relative h-96 md:h-[500px] lg:h-[600px]">
              <div className="visual-container absolute inset-0 rounded-3xl overflow-hidden">
                <div className="visual-gradient absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 animate-pulse-slow"></div>
                <div className="visual-grid absolute inset-0 opacity-20" style={{
                  backgroundImage: 'linear-gradient(rgba(99,102,241,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.1) 1px, transparent 1px)',
                  backgroundSize: '50px 50px'
                }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="visual-center w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-primary to-secondary animate-spin-slow opacity-30 blur-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Redesigned */}
      <section id="skills" className="section skills relative px-4 md:px-8 lg:px-16 py-20 md:py-32 lg:py-40 z-10 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="section-header text-center mb-16 md:mb-24">
            <div className="section-badge inline-block px-4 py-2 mb-6 bg-secondary/10 border border-secondary/30 rounded-full">
              <span className="text-xs md:text-sm text-secondary font-semibold uppercase tracking-wider">My Expertise</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6">
              <span className="bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">Skills & Tech</span>
            </h2>
          </div>

          <div className="skills-layout grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Skill Categories */}
            <div className="skill-categories lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {[
                { title: 'Web Design', desc: 'My friends have helped me develop my design talents, and I will always be appreciative of their support as I continue to learn and work toward being a professional in this field.', icon: '🎨' },
                { title: 'Web Development', desc: 'A modest web developer, I strive to improve with each project, enhancing my skills and knowledge in the ever-changing field of web development.', icon: '💻' },
                { title: 'Filmmaking', desc: "I've been passionate about media since childhood and got involved in senior high school. My most recent project was entered into a film festival during my first year of college.", icon: '🎬' },
                { title: 'Graphic Design', desc: 'I am proficient in Capcut, Sony Vegas, and Canva. Feel free to reach out if you\'re interested in learning about the presets I use in Canva, my render settings for Vegas, or how I create edits in Capcut!', icon: '✨' }
              ].map((skill, index) => (
                <div
                  key={skill.title}
                  className="skill-card group relative bg-gradient-to-br from-bg-card/80 to-bg-card-hover/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 transition-all duration-500 hover:border-primary/50 hover:scale-105 hover:-translate-y-3 hover:shadow-2xl"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/10 group-hover:to-secondary/10 rounded-3xl transition-all duration-500"></div>
                  <div className="relative z-10">
                    <div className="skill-icon text-4xl md:text-5xl mb-4">{skill.icon}</div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">{skill.title}</h3>
                    <p className="text-sm md:text-base text-white/60 leading-relaxed">{skill.desc}</p>
              </div>
            </div>
              ))}
            </div>

            {/* Tech Stacks - Vertical Floating */}
            <div className="tech-stacks-wrapper">
              <div className="tech-stacks-header mb-8">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">Tech Stacks</h3>
                <p className="text-white/40 text-sm">Technologies I work with</p>
              </div>
              <div className="tech-icons-vertical flex flex-col gap-4 md:gap-5">
                {[
                  { name: 'JavaScript', icon: 'JS', color: '#F7DF1E' },
                  { name: 'React', icon: '⚛', color: '#61DAFB' },
                  { name: 'Vite', icon: '⚡', color: '#646CFF' },
                  { name: 'HTML5', icon: 'HTML', color: '#E34F26' },
                  { name: 'CSS3', icon: 'CSS', color: '#1572B6' },
                  { name: 'Python', icon: 'Py', color: '#3776AB' },
                  { name: 'PHP', icon: 'PHP', color: '#777BB4' },
                  { name: 'Java', icon: 'Java', color: '#ED8B00' },
                  { name: 'C#', icon: 'C#', color: '#239120' },
                  { name: 'C++', icon: 'C++', color: '#00599C' }
                ].map((tech, index) => (
                  <div
                    key={tech.name}
                    className="tech-icon-item group flex items-center gap-4 px-5 md:px-6 py-4 md:py-5 bg-gradient-to-br from-bg-card/80 to-bg-card-hover/80 backdrop-blur-2xl border border-white/10 rounded-2xl transition-all duration-500 hover:border-primary/50 hover:scale-105 hover:-translate-y-2 hover:shadow-xl cursor-default floating-tech"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className="tech-icon-wrapper w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/30 transition-all duration-300">
                      <span className="tech-icon text-xl md:text-2xl font-black" style={{ color: tech.color }}>{tech.icon}</span>
              </div>
                    <span className="tech-name text-base md:text-lg font-bold text-white group-hover:text-primary transition-colors duration-300">{tech.name}</span>
            </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section - Completely Redesigned */}
      <section id="work" className="section work relative px-4 md:px-8 lg:px-16 py-20 md:py-32 lg:py-40 z-10 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="section-header text-center mb-16 md:mb-24">
            <div className="section-badge inline-block px-4 py-2 mb-6 bg-accent/10 border border-accent/30 rounded-full">
              <span className="text-xs md:text-sm text-accent font-semibold uppercase tracking-wider">My Work</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4">
              <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">Featured Projects</span>
            </h2>
            <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto">A collection of my best work showcasing creativity, innovation, and technical expertise</p>
          </div>
          
          <div className="portfolio-masonry grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: 'ELECT', desc: 'Electronic Legislative Election Counting Tracker', category: 'Web App', gradient: 'from-primary via-secondary to-accent', featured: true },
              { title: 'TenantSphere', desc: 'Standalone Apartment Management System', category: 'Full Stack', gradient: 'from-accent via-primary to-secondary', featured: true },
              { title: 'Project 3', desc: 'Innovative Web Application', category: 'Frontend', gradient: 'from-secondary via-accent to-primary' },
              { title: 'Project 4', desc: 'Creative Design Solution', category: 'Design', gradient: 'from-primary via-accent to-secondary' },
              { title: 'Project 5', desc: 'Modern Tech Platform', category: 'Backend', gradient: 'from-accent via-secondary to-primary' },
              { title: 'Project 6', desc: 'Advanced Development Tool', category: 'Full Stack', gradient: 'from-secondary via-primary to-accent' }
            ].map((project, index) => (
              <div
                key={index}
                className={`portfolio-card-modern group relative overflow-hidden rounded-3xl transition-all duration-700 hover:scale-105 hover:-translate-y-4 ${project.featured ? 'md:col-span-2 lg:col-span-1 md:row-span-2' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
                <div className="relative z-10 h-full min-h-[400px] md:min-h-[500px] flex flex-col justify-between p-8 md:p-10">
                  <div>
                    <div className="project-category text-xs md:text-sm text-white/50 uppercase tracking-wider mb-4 font-semibold">{project.category}</div>
                    <div className="project-number text-7xl md:text-8xl font-display font-black text-white/5 mb-4 group-hover:text-white/10 transition-colors duration-500">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-white/70 text-base md:text-lg mb-8 leading-relaxed">
                      {project.desc}
                    </p>
                  </div>
                  <button className="project-btn w-full group/btn relative px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white font-semibold transition-all duration-500 hover:bg-primary hover:border-primary hover:scale-105 flex items-center justify-center gap-3">
                    <span>Explore Project</span>
                    <span className="text-xl transition-transform duration-300 group-hover/btn:translate-x-2">→</span>
                  </button>
                </div>
                <div className={`absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 rounded-full blur-3xl transition-opacity duration-500`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Redesigned */}
      <section id="contact" className="section contact relative px-4 md:px-8 lg:px-16 py-20 md:py-32 lg:py-40 z-10 w-full overflow-x-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className="section-header mb-16 md:mb-24">
            <div className="section-badge inline-block px-4 py-2 mb-6 bg-primary/10 border border-primary/30 rounded-full">
              <span className="text-xs md:text-sm text-primary font-semibold uppercase tracking-wider">Get In Touch</span>
        </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Let's Connect</span>
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
              Have a project in mind or just want to chat? I'd love to hear from you!
            </p>
          </div>

          <div className="contact-grid grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                label: 'Email', 
                value: 'Click me!', 
                href: 'mailto:rivera.justin.santilla@gmail.com', 
                icon: (
                  <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )
              },
              { 
                label: 'GitHub', 
                value: 'jayjayandcattos', 
                href: 'https://github.com/jayjayandcattos', 
                external: true,
                icon: (
                  <svg className="w-12 h-12 md:w-16 md:h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                )
              },
              { 
                label: 'Facebook', 
                value: 'Justin Rivera', 
                href: 'https://www.facebook.com/jayczera', 
                external: true,
                icon: (
                  <svg className="w-12 h-12 md:w-16 md:h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                )
              }
            ].map((contact, index) => (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.external ? '_blank' : undefined}
                rel={contact.external ? 'noopener noreferrer' : undefined}
                className="contact-card group relative bg-gradient-to-br from-bg-card/80 to-bg-card-hover/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10 transition-all duration-500 hover:border-primary/50 hover:scale-105 hover:-translate-y-3 hover:shadow-2xl no-underline"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/10 group-hover:to-secondary/10 rounded-3xl transition-all duration-500"></div>
                <div className="relative z-10">
                  <div className="contact-icon mb-4 text-white group-hover:text-primary transition-colors duration-300 flex justify-center">
                    {contact.icon}
                  </div>
                  <div className="contact-label text-xs md:text-sm text-white/50 uppercase tracking-wider mb-3 font-semibold">{contact.label}</div>
                  <div className="contact-value text-base md:text-lg font-bold text-white group-hover:text-primary transition-colors duration-300 break-all">
                    {contact.value} ↗
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer relative px-4 md:px-8 lg:px-16 py-12 md:py-16 text-center border-t border-white/10 text-white/40 z-10">
        <p className="text-sm md:text-base font-light">
          Crafted with <span className="text-primary">❤️</span> by <strong className="text-primary font-semibold">Justin Rivera</strong> © 2025
        </p>
      </footer>
    </div>
  )
}

export default App
