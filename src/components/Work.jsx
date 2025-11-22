function Work() {
  const projects = [
    { 
      title: 'ELECT', 
      desc: 'Electronic Legislative Election Counting Tracker', 
      category: 'Web App', 
      logo: 'assets/elect-logo.svg',
      link: 'https://github.com/jayjayandcattos/ELECT'
    },
    { 
      title: 'LabGuard', 
      desc: 'Laboratory RFID System', 
      category: 'Web App', 
      logo: 'assets/labguard-logo.svg',
      link: 'https://github.com/jayjayandcattos/LabGuard'
    },
    { 
      title: 'NeuKai', 
      desc: 'Fashion Donation Platform', 
      category: 'Web App', 
      logo: 'assets/neukai-logo.svg',
      link: 'https://github.com/jayjayandcattos/NeuKai'
    },
    { 
      title: 'TenantSphere', 
      desc: 'Standalone Apartment Management System', 
      category: 'Web App', 
      logo: 'assets/tenantsphere-logo.svg',
      link: 'https://github.com/jayjayandcattos/ApartmentManagementSystem'
    },
    { 
      title: 'Evergreen', 
      desc: 'Banking Supersystem', 
      category: 'Web App', 
      logo: 'assets/evergreen-logo.svg',
      link: 'https://github.com/jayjayandcattos/Evergreen'
    },
    { 
      title: 'PinoyDemons', 
      desc: 'Zentry Clone Website', 
      category: 'Web App', 
      logo: 'assets/pinoydemonyos-logo.svg',
      link: 'https://github.com/jayjayandcattos/Zentry-Demonyos'
    }
  ]

  return (
    <section 
      id="work" 
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-16 py-20 md:py-32 lg:py-40 z-10 w-full"
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12 md:mb-16 lg:mb-24">
          <div className="inline-block px-4 py-2 mb-6 bg-black/10 dark:bg-white/10 border border-black/30 dark:border-white/30 rounded-full">
            <span className="text-[10px] xs:text-xs sm:text-sm md:text-base text-black dark:text-white font-semibold uppercase tracking-wider">My Work</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-black dark:text-white mb-3 sm:mb-4 md:mb-5">
            <span>Featured Projects</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-4">A collection of my best work showcasing creativity, innovation, and technical expertise</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl transition-all duration-700 hover:scale-105 hover:-translate-y-4"
            >
              <div className="absolute inset-0 bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-opacity duration-500"></div>
              <div className="relative z-10 h-full min-h-[350px] sm:min-h-[400px] md:min-h-[500px] flex flex-col justify-between p-6 sm:p-8 md:p-10 bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl">
                <div>
                  <div className="text-[10px] xs:text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2 sm:mb-3 md:mb-4 font-semibold">{project.category}</div>
                  <div className="mb-4 md:mb-6 flex items-center gap-4">
                    {project.logo && (
                      <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center text-black dark:text-white opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        <img 
                          src={project.logo} 
                          alt={`${project.title} logo`}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black text-gray-200 dark:text-gray-800 group-hover:text-gray-300 dark:group-hover:text-gray-700 transition-colors duration-500">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-black dark:text-white mb-2 sm:mb-3 md:mb-4 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg mb-4 sm:mb-5 md:mb-6 lg:mb-8 leading-relaxed">
                    {project.desc}
                  </p>
                </div>
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full group/btn relative px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 bg-black dark:bg-white border border-black dark:border-white rounded-2xl text-white dark:text-black text-xs sm:text-sm md:text-base font-semibold transition-all duration-500 hover:bg-gray-800 dark:hover:bg-gray-200 hover:scale-105 flex items-center justify-center gap-2 sm:gap-3"
                >
                  <span>Explore Project</span>
                  <span className="text-base sm:text-lg md:text-xl transition-transform duration-300 group-hover/btn:translate-x-2">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Work

