/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Minimalistic color palette
        primary: '#000000',
        'primary-light': '#1a1a1a',
        'primary-dark': '#000000',
        secondary: '#ffffff',
        'secondary-light': '#f5f5f5',
        accent: '#808080',
        'accent-light': '#a0a0a0',
        'bg-dark': '#000000',
        'bg-darker': '#000000',
        'bg-card': 'rgba(255, 255, 255, 0.05)',
        'bg-card-hover': 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease backwards',
        'shimmer': 'shimmer 3s linear infinite',
        'float': 'float 20s infinite ease-in-out',
        'slide-in': 'slideIn 0.8s ease',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
        'bounce-slow': 'bounceSlow 2s ease-in-out infinite',
        'spin-slow': 'spinSlow 3s linear infinite',
        'floatShape': 'floatShape 25s infinite ease-in-out',
        'cursorPulse': 'cursorPulse 4s ease-in-out infinite',
        'cursorRotate': 'cursorRotate 15s linear infinite',
        'cursorPulseOuter': 'cursorPulseOuter 5s ease-in-out infinite',
        'float-tech': 'floatTech 4s ease-in-out infinite',
        'aurora': 'aurora 60s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(50px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-30px, 30px) scale(0.9)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.02)' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        spinSlow: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        floatShape: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(60px, -60px) scale(1.15)' },
          '66%': { transform: 'translate(-40px, 40px) scale(0.85)' },
        },
        cursorPulse: {
          '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: '0.6' },
          '50%': { transform: 'translate(-50%, -50%) scale(1.1)', opacity: '0.8' },
        },
        cursorRotate: {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
        },
        cursorPulseOuter: {
          '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: '0.3' },
          '50%': { transform: 'translate(-50%, -50%) scale(1.2)', opacity: '0.4' },
        },
        floatTech: {
          '0%, 100%': { transform: 'translateY(0px) translateZ(0)' },
          '50%': { transform: 'translateY(-20px) translateZ(0)' },
        },
        aurora: {
          '0%, 100%': {
            backgroundPosition: '0% 0%',
          },
          '50%': {
            backgroundPosition: '0% 100%',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        'iphone': '375px',
      },
    },
  },
  plugins: [],
}

