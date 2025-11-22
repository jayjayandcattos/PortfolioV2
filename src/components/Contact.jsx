function Contact() {
  const contacts = [
    { 
      label: 'Email', 
      value: 'Click me!', 
      href: 'mailto:rivera.justin.santilla@gmail.com', 
      icon: (
        <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" fill="currentColor" viewBox="0 0 24 24">
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
        <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    }
  ]

  return (
    <section 
      id="contact" 
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-16 py-20 md:py-32 lg:py-40 z-10 w-full"
    >
      <div className="relative z-10 max-w-4xl mx-auto text-center w-full">
        <div className="mb-12 md:mb-16 lg:mb-24">
          <div className="inline-block px-4 py-2 mb-6 bg-black/10 dark:bg-white/10 border border-black/30 dark:border-white/30 rounded-full">
            <span className="text-xs md:text-sm text-black dark:text-white font-semibold uppercase tracking-wider">Get In Touch</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-black dark:text-white mb-6">
            <span>Let's Connect</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {contacts.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.external ? '_blank' : undefined}
              rel={contact.external ? 'noopener noreferrer' : undefined}
              className="group relative bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 md:p-10 transition-all duration-500 hover:border-black dark:hover:border-white hover:scale-105 hover:-translate-y-3 hover:shadow-2xl no-underline"
            >
              <div className="absolute inset-0 bg-black/0 dark:bg-white/0 group-hover:bg-black/5 dark:group-hover:bg-white/10 rounded-3xl transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="mb-3 md:mb-4 text-black dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300 flex justify-center">
                  {contact.icon}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2 md:mb-3 font-semibold">{contact.label}</div>
                <div className="text-sm sm:text-base md:text-lg font-bold text-black dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300 break-all">
                  {contact.value} ↗
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact

