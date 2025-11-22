import { useEffect } from 'react'

function About() {
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
    <section 
      id="about" 
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-16 py-20 md:py-32 lg:py-40 z-10 w-full"
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12 md:mb-16 lg:mb-24">
          <div className="inline-block px-4 py-2 mb-6 bg-black/10 dark:bg-white/10 border border-black/30 dark:border-white/30 rounded-full">
            <span className="text-[10px] xs:text-xs sm:text-sm md:text-base text-black dark:text-white font-semibold uppercase tracking-wider">About Me</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-black dark:text-white mb-4 sm:mb-5 md:mb-6">
            <span>Who am I?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="space-y-6 md:space-y-8">
            <div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-800 dark:text-gray-200 leading-relaxed sm:leading-relaxed md:leading-relaxed font-light">
                I'm a <span className="font-bold text-black dark:text-white">3rd-year student</span> at <span className="font-bold text-black dark:text-white">Quezon City University (QCU)</span> with an unrelenting passion for both <span className="font-bold text-gray-700 dark:text-gray-300">technology</span> and <span className="font-bold text-black dark:text-white">gaming</span>.
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-400 leading-relaxed sm:leading-relaxed">
                I take everything I do seriously, whether it's academics or gaming. I don't slack off 👀 and always strive to stay on top of my game, no matter the challenge. Every project is an opportunity to push boundaries and create something extraordinary.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-12">
              <div className="stat-card group relative bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 text-center transition-all duration-500 hover:border-black dark:hover:border-white hover:scale-105 hover:-translate-y-2 hover:shadow-2xl">
                <div className="absolute inset-0 bg-black/0 dark:bg-white/0 group-hover:bg-black/5 dark:group-hover:bg-white/10 rounded-3xl transition-all duration-500"></div>
                <div className="relative z-10">
                  <div className="stat-number font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-black dark:text-white mb-1 sm:mb-2" data-target="25">0</div>
                  <div className="text-[10px] xs:text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 uppercase tracking-wider font-medium">Projects</div>
                </div>
              </div>
              <div className="stat-card group relative bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 text-center transition-all duration-500 hover:border-black dark:hover:border-white hover:scale-105 hover:-translate-y-2 hover:shadow-2xl">
                <div className="absolute inset-0 bg-black/0 dark:bg-white/0 group-hover:bg-black/5 dark:group-hover:bg-white/10 rounded-3xl transition-all duration-500"></div>
                <div className="relative z-10">
                  <div className="stat-number font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black dark:text-white mb-2" data-target="2">0</div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider font-medium">Years</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px]">
            <div className="absolute inset-0 rounded-3xl overflow-hidden bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-gray-200 dark:border-gray-800 shadow-2xl group">
              <img 
                src="assets/portrait.png" 
                alt="Justin Christopher S. Rivera" 
                className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700"
                onError={(e) => {
                  // Fallback if image not found
                  e.target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900';
                  fallback.innerHTML = '<div class="text-gray-400 dark:text-gray-600 text-sm">Add portrait.jpg to public folder</div>';
                  e.target.parentElement.appendChild(fallback);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

