import './Hero.css'

function Hero({ scrollToSection }) {
  const roles = ['Web Developer', 'Front-End Developer', 'Collegiate E-Sports Player']

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-16 py-20 md:py-32 z-10 w-full overflow-x-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 md:w-96 md:h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 md:w-72 md:h-72 bg-accent/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto text-center flex flex-col items-center justify-center -translate-y-10">
        <div className="mb-6 md:mb-10 w-full flex flex-col items-center justify-center">
          <div className="text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-400 font-light uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4 md:mb-6 text-center">
            Hey, I am
          </div>
          <h1 className="font-display text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black leading-[0.9] mb-4 sm:mb-6 md:mb-8 text-black dark:text-white">
            <span className="block">Justin</span>
            <span className="block">Christopher</span>
            <span className="block">S. Rivera</span>
          </h1>
          <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-gray-700 dark:text-gray-300 font-light mb-6 sm:mb-8 md:mb-12 text-center px-4">
            But you can call me <span className="font-display font-bold text-gray-900 dark:text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">jayzeeeee</span>
          </div>
        </div>
            
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-12 md:mb-16 max-w-4xl mx-auto w-full">
          {roles.map((role) => (
            <div 
              key={role}
              className="group relative bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl p-4 md:p-6 transition-all duration-500 hover:border-black dark:hover:border-white hover:scale-105 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-black/0 dark:bg-white/0 group-hover:bg-black/5 dark:group-hover:bg-white/10 rounded-2xl transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-black dark:text-white">{role}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
          <button 
            className="group relative px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg font-bold text-white dark:text-black bg-black dark:bg-white rounded-full overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl"
            onClick={() => scrollToSection('work')}
          >
            <span className="relative z-10 flex items-center gap-3">
              View My Work
              <span className="text-lg sm:text-xl md:text-2xl transition-transform duration-300 group-hover:translate-x-2">→</span>
            </span>
          </button>
          <button 
            className="group relative px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg font-bold text-black dark:text-white rounded-full border-2 border-black dark:border-white bg-transparent overflow-hidden transition-all duration-500 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black hover:scale-110"
            onClick={() => scrollToSection('contact')}
          >
            <span className="relative z-10 flex items-center gap-3">
              Get In Touch
              <span className="text-lg sm:text-xl md:text-2xl transition-transform duration-300 group-hover:translate-x-2">→</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero

