import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const canvasRef = useRef(null)

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

    const particles = []
    const particleCount = 50

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.5 + 0.2
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
      setMenuOpen(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'work', 'contact']
      const scrollPosition = window.scrollY + 300

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
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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
    <div className="app">
      {/* Canvas Background */}
      <canvas ref={canvasRef} className="canvas-bg"></canvas>

      {/* Abstract Shapes */}
      <div className="abstract-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      {/* Cursor Effect */}
      <div 
        className="cursor-glow"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`
        }}
      ></div>

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-left">
          <div className="logo" onClick={() => scrollToSection('home')}>
            <span className="logo-main">jayjayandcattos</span>
            <span className="logo-sub">the final boss</span>
          </div>
        </div>
        <div className="nav-right">
          <button 
            className={`menu-toggle ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Menu Overlay */}
      <div className={`menu-overlay ${menuOpen ? 'open' : ''}`}>
        <div className="menu-content">
          <div className="menu-links">
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
              className={activeSection === 'home' ? 'active' : ''}
            >
              <span className="menu-number">01</span>
              <span className="menu-text">Home</span>
            </a>
            <a 
              href="#about" 
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              className={activeSection === 'about' ? 'active' : ''}
            >
              <span className="menu-number">02</span>
              <span className="menu-text">About</span>
            </a>
            <a 
              href="#skills" 
              onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}
              className={activeSection === 'skills' ? 'active' : ''}
            >
              <span className="menu-number">03</span>
              <span className="menu-text">Skills</span>
            </a>
            <a 
              href="#work" 
              onClick={(e) => { e.preventDefault(); scrollToSection('work'); }}
              className={activeSection === 'work' ? 'active' : ''}
            >
              <span className="menu-number">04</span>
              <span className="menu-text">Work</span>
            </a>
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              className={activeSection === 'contact' ? 'active' : ''}
            >
              <span className="menu-number">05</span>
              <span className="menu-text">Contact</span>
            </a>
          </div>
          <div className="menu-social">
            <a href="https://github.com/jayjayandcattos" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href="mailto:rivera.justin.santilla@gmail.com">Email ↗</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook ↗</a>
          </div>
        </div>
      </div>

      {/* Home Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-intro">
            <span className="hero-greeting">Hey, I am</span>
          </div>
          <h1 className="hero-name">
            <span className="name-line">Justin</span>
            <span className="name-line">Christopher</span>
            <span className="name-line">S. Rivera</span>
          </h1>
          <div className="hero-subtitle">
            <span>But you can call me</span>
            <span className="hero-nickname">jayzee</span>
          </div>
          <div className="hero-roles">
            <p>I am a <span className="role-highlight">Web Developer</span>,</p>
            <p><span className="role-highlight">Front-End Developer</span>,</p>
            <p><span className="role-highlight">Gamer</span> &</p>
            <p><span className="role-highlight">Leader</span></p>
          </div>
          <div className="hero-actions">
            <button className="btn-creative" onClick={() => scrollToSection('work')}>
              <span>View Projects</span>
              <span className="btn-arrow">→</span>
            </button>
            <button className="btn-creative secondary" onClick={() => scrollToSection('contact')}>
              <span>Get In Touch</span>
              <span className="btn-arrow">→</span>
            </button>
          </div>
        </div>
        <div className="hero-side">
          <div className="hero-card">
            <div className="card-label">Profile</div>
            <div className="card-value">Front-End Developer</div>
            <div className="card-label">Email</div>
            <div className="card-value">rivera.justin.santilla@gmail.com</div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about">
        <div className="section-header">
          <span className="section-number">01</span>
          <h2 className="section-title">About</h2>
        </div>
        <div className="about-content">
          <div className="about-text">
            <p className="about-description">
              I'm a <strong>2nd-year student</strong> at <strong>Quezon City University (QCU)</strong> with a passion for video games. 
              I take everything I do seriously, whether it's academics or gaming. I don't slack off 👀 and always strive to stay 
              on top of my game, no matter the challenge.
            </p>
            <div className="stats">
              <div className="stat">
                <div className="stat-number" data-target="25">0</div>
                <div className="stat-label">Works Completed</div>
              </div>
              <div className="stat">
                <div className="stat-number" data-target="2">0</div>
                <div className="stat-label">Years Experience</div>
              </div>
            </div>
          </div>
          <div className="about-visual">
            <div className="visual-box"></div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section skills">
        <div className="section-header">
          <span className="section-number">02</span>
          <h2 className="section-title">Skills</h2>
        </div>
        <div className="skills-content">
          <div className="skill-categories">
            <div className="skill-category">
              <h3>Web Design</h3>
              <p>My friends have helped me develop my design talents, and I will always be appreciative of their support as I continue to learn and work toward being a professional in this field.</p>
            </div>
            <div className="skill-category">
              <h3>Web Development</h3>
              <p>A modest web developer, I strive to improve with each project, enhancing my skills and knowledge in the ever-changing field of web development.</p>
            </div>
            <div className="skill-category">
              <h3>Photography/Videography</h3>
              <p>I've been passionate about media since childhood and got involved in senior high school. My most recent project was entered into a film festival during my first year of college.</p>
            </div>
            <div className="skill-category">
              <h3>Graphic Design & Video Editing</h3>
              <p>I am proficient in Capcut, Sony Vegas, and Canva. Feel free to reach out if you're interested in learning about the presets I use in Canva, my render settings for Vegas, or how I create edits in Capcut!</p>
            </div>
          </div>
          <div className="skill-bars">
            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span>HTML</span>
                <span>85%</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span>CSS3</span>
                <span>73%</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" style={{ width: '73%' }}></div>
              </div>
            </div>
            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span>PHP</span>
                <span>56%</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" style={{ width: '56%' }}></div>
              </div>
            </div>
            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span>JAVASCRIPT</span>
                <span>31%</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" style={{ width: '31%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="section work">
        <div className="section-header">
          <span className="section-number">03</span>
          <h2 className="section-title">Portfolio</h2>
        </div>
        <p className="section-subtitle">Highlighted Projects Only</p>
        <div className="portfolio-grid">
          <div className="portfolio-item">
            <div className="portfolio-image">
              <div className="portfolio-overlay">
                <h3>ELECT</h3>
                <p>Electronic Legislative Election Counting Tracker</p>
                <button className="portfolio-btn">View →</button>
              </div>
            </div>
          </div>
          <div className="portfolio-item">
            <div className="portfolio-image">
              <div className="portfolio-overlay">
                <h3>TenantSphere</h3>
                <p>Standalone Apartment Management System</p>
                <button className="portfolio-btn">View →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact">
        <div className="section-header">
          <span className="section-number">04</span>
          <h2 className="section-title">Contact</h2>
        </div>
        <div className="contact-content">
          <div className="contact-item">
            <div className="contact-label">Email</div>
            <a href="mailto:rivera.justin.santilla@gmail.com" className="contact-link">
              rivera.justin.santilla@gmail.com ↗
            </a>
          </div>
          <div className="contact-item">
            <div className="contact-label">GitHub</div>
            <a href="https://github.com/jayjayandcattos" target="_blank" rel="noopener noreferrer" className="contact-link">
              jayjayandcattos ↗
            </a>
          </div>
          <div className="contact-item">
            <div className="contact-label">Facebook</div>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="contact-link">
              Lunat1ko ↗
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Created and developed by <strong>Justin</strong> © 2025</p>
      </footer>
    </div>
  )
}

export default App
