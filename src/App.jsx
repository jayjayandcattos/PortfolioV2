import { useState, useEffect } from 'react'
import './App.css'
import LoadingScreen from './LoadingScreen'
import ThemeToggle from './components/ThemeToggle'
import ShapeBackground from './components/ShapeBackground'
import { AuroraBackground } from './components/AuroraBackground'
import CursorGlow from './components/CursorGlow'
import ScrollProgress from './components/ScrollProgress'
import HamburgerMenu from './components/HamburgerMenu'
import MenuOverlay from './components/MenuOverlay'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(savedTheme)
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const scrollToSection = (id, fromMenu = false) => {
    const element = document.getElementById(id)
    if (element) {
      if (fromMenu) {
        // Close menu first, then scroll after animation completes
        setMenuOpen(false)
        setTimeout(() => {
          const headerOffset = 0
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
          
          setActiveSection(id)
        }, 300) // Wait for menu close animation (500ms duration, but 300ms is enough)
      } else {
        // Direct scroll without menu delay
        const headerOffset = 0
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
        
        setActiveSection(id)
      }
    }
  }

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = ['home', 'about', 'skills', 'work', 'contact']
          const scrollPosition = window.scrollY + window.innerHeight / 2

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
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }, 100)
    
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const checkLoading = () => {
      if (document.readyState === 'complete') {
        setTimeout(() => {
          setIsLoading(false)
          window.scrollTo(0, 0)
        }, 800)
      }
    }

    if (document.readyState === 'complete') {
      setTimeout(() => {
        setIsLoading(false)
        window.scrollTo(0, 0)
      }, 800)
    } else {
      window.addEventListener('load', checkLoading)
      return () => window.removeEventListener('load', checkLoading)
    }
  }, [])

  return (
    <div className={`app relative min-h-screen text-gray-900 dark:text-white overflow-x-hidden font-sans transition-colors duration-300`}>
      {theme === 'dark' ? (
        <>
          <ShapeBackground />
          <div className="relative z-10">
            <ScrollProgress theme={theme} />
            <LoadingScreen isLoading={isLoading} theme={theme} />
            <CursorGlow theme={theme} />
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <HamburgerMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} theme={theme} />
            <MenuOverlay 
              menuOpen={menuOpen} 
              setMenuOpen={setMenuOpen} 
              activeSection={activeSection}
              scrollToSection={scrollToSection}
              theme={theme}
            />
            <Hero scrollToSection={scrollToSection} theme={theme} />
            <About theme={theme} />
            <Skills theme={theme} />
            <Work theme={theme} />
            <Contact theme={theme} />
            <Footer theme={theme} />
          </div>
        </>
      ) : (
        <AuroraBackground>
          <ScrollProgress theme={theme} />
          <LoadingScreen isLoading={isLoading} theme={theme} />
          <CursorGlow theme={theme} />
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <HamburgerMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} theme={theme} />
          <MenuOverlay 
            menuOpen={menuOpen} 
            setMenuOpen={setMenuOpen} 
            activeSection={activeSection}
            scrollToSection={scrollToSection}
            theme={theme}
          />
          <Hero scrollToSection={scrollToSection} theme={theme} />
          <About theme={theme} />
          <Skills theme={theme} />
          <Work theme={theme} />
          <Contact theme={theme} />
          <Footer theme={theme} />
        </AuroraBackground>
      )}
    </div>
  )
}

export default App
