function HamburgerMenu({ menuOpen, setMenuOpen, theme }) {
  return (
    <button
      className="fixed top-4 right-4 md:top-6 md:right-6 z-[1000] w-12 h-12 md:w-14 md:h-14 bg-white/80 dark:bg-black/80 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-full flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 hover:bg-white dark:hover:bg-black hover:scale-110 active:scale-95 shadow-lg"
      onClick={() => setMenuOpen(!menuOpen)}
      aria-label="Toggle menu"
      aria-expanded={menuOpen}
    >
      <span className={`block w-5 h-0.5 bg-black dark:bg-white rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
      <span className={`block w-5 h-0.5 bg-black dark:bg-white rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
      <span className={`block w-5 h-0.5 bg-black dark:bg-white rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
    </button>
  )
}

export default HamburgerMenu

