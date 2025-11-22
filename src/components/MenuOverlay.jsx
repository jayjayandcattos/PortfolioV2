function MenuOverlay({ menuOpen, setMenuOpen, activeSection, scrollToSection, theme }) {
  const menuItems = [
    { num: '01', text: 'Home', id: 'home' },
    { num: '02', text: 'About', id: 'about' },
    { num: '03', text: 'Skills', id: 'skills' },
    { num: '04', text: 'Work', id: 'work' },
    { num: '05', text: 'Contact', id: 'contact' }
  ]

  return (
    <div 
      className={`fixed inset-0 w-full h-full bg-white/95 dark:bg-black/95 backdrop-blur-md z-[999] flex items-center justify-center transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'}`}
      onClick={() => setMenuOpen(false)}
      style={{ visibility: menuOpen ? 'visible' : 'hidden' }}
    >
      <div className="flex flex-col gap-8 md:gap-12 lg:gap-16 items-center max-w-4xl w-full px-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 w-full">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={(e) => { 
                e.preventDefault(); 
                e.stopPropagation();
                scrollToSection(item.id);
                setMenuOpen(false);
              }}
              className={`flex items-center gap-3 md:gap-4 text-black dark:text-white no-underline font-display text-xl sm:text-2xl md:text-3xl font-bold transition-all duration-300 p-2 md:p-3 relative overflow-hidden group bg-transparent border-none cursor-pointer ${activeSection === item.id ? 'text-black dark:text-white' : 'hover:text-gray-600 dark:hover:text-gray-400'}`}
            >
              <span className="text-sm md:text-base text-gray-400 dark:text-gray-600 font-normal transition-all duration-300 group-hover:text-black dark:group-hover:text-white">{item.num}</span>
              <span>{item.text}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-4">
          <a href="https://github.com/jayjayandcattos" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 no-underline text-sm md:text-base font-medium transition-all duration-300 hover:text-black dark:hover:text-white hover:scale-110">GitHub ↗</a>
          <a href="mailto:rivera.justin.santilla@gmail.com" className="text-gray-600 dark:text-gray-400 no-underline text-sm md:text-base font-medium transition-all duration-300 hover:text-black dark:hover:text-white hover:scale-110">Email ↗</a>
          <a href="https://www.facebook.com/jayczera" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 no-underline text-sm md:text-base font-medium transition-all duration-300 hover:text-black dark:hover:text-white hover:scale-110">Facebook ↗</a>
        </div>
      </div>
    </div>
  )
}

export default MenuOverlay

