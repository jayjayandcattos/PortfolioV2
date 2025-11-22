import './Skills.css'

function Skills() {
  const skillCategories = [
    { title: 'Web Design', desc: 'My friends have helped me develop my design talents, and I will always be appreciative of their support as I continue to learn and work toward being a professional in this field.', icon: '🎨' },
    { title: 'Web Development', desc: 'A modest web developer, I strive to improve with each project, enhancing my skills and knowledge in the ever-changing field of web development.', icon: '💻' },
    { title: 'Filmmaking', desc: "I've been passionate about media since childhood and got involved in senior high school. My most recent project was entered into a film festival during my first year of college.", icon: '🎬' },
    { title: 'Graphic Design', desc: 'I am proficient in Capcut, Sony Vegas, and Canva. Feel free to reach out if you\'re interested in learning about the presets I use in Canva, my render settings for Vegas, or how I create edits in Capcut!', icon: '🎨' }
  ]

  const techStacks = [
    { name: 'JavaScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'React', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Vite', iconUrl: 'https://raw.githubusercontent.com/vitejs/vite/main/docs/public/logo.svg' },
    { name: 'HTML5', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'Python', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'PHP', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
    { name: 'Java', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'C#', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
    { name: 'C++', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' }
  ]

  return (
    <section 
      id="skills" 
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-16 py-20 md:py-32 lg:py-40 z-10 w-full"
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12 md:mb-16 lg:mb-24">
          <div className="inline-block px-4 py-2 mb-6 bg-black/10 dark:bg-white/10 border border-black/30 dark:border-white/30 rounded-full">
            <span className="text-[10px] xs:text-xs sm:text-sm md:text-base text-black dark:text-white font-semibold uppercase tracking-wider">My Expertise</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-black dark:text-white mb-4 sm:mb-5 md:mb-6">
            <span>Skills & Tech</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            {skillCategories.map((skill) => (
              <div
                key={skill.title}
                className="group relative bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-gray-200 dark:border-gray-800 rounded-3xl p-5 md:p-6 lg:p-8 transition-all duration-500 hover:border-black dark:hover:border-white hover:scale-105 hover:-translate-y-3 hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-black/0 dark:bg-white/0 group-hover:bg-black/5 dark:group-hover:bg-white/10 rounded-3xl transition-all duration-500"></div>
                <div className="relative z-10">
                  <div className="text-3xl sm:text-4xl md:text-5xl mb-3 md:mb-4">{skill.icon}</div>
                  <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-black dark:text-white mb-2 md:mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">{skill.title}</h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">{skill.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="mb-6 md:mb-8">
              <h3 className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-black dark:text-white mb-2">Tech Stacks</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base">Technologies I work with</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 md:gap-4">
              {techStacks.map((tech, index) => (
                <div
                  key={tech.name}
                  className={`group flex items-center gap-3 md:gap-4 px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-gray-200 dark:border-gray-800 rounded-xl md:rounded-2xl transition-all duration-500 hover:border-black dark:hover:border-white hover:scale-105 hover:-translate-y-2 hover:shadow-xl cursor-default floating-tech`}
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg md:rounded-xl bg-white dark:bg-white/10 flex items-center justify-center border border-gray-200 dark:border-gray-700 group-hover:border-black dark:group-hover:border-white transition-all duration-300 flex-shrink-0 p-1.5 md:p-2">
                    <img 
                      src={tech.iconUrl} 
                      alt={tech.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `<span class="text-xs md:text-sm font-black text-black dark:text-white">${tech.name.substring(0, 2)}</span>`;
                      }}
                    />
                  </div>
                  <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-black dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300 truncate">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills

