import { cn } from '../utils/cn'

export const AuroraBackground = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative flex flex-col min-h-screen w-full bg-white text-slate-950",
        className
      )}
      {...props}
    >
      {/* Optimized aurora - pure CSS, single layer, GPU accelerated */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          background: `
            linear-gradient(180deg, 
              rgba(147, 197, 253, 0.08) 0%,
              rgba(196, 181, 253, 0.12) 30%,
              rgba(251, 191, 36, 0.08) 60%,
              rgba(196, 181, 253, 0.12) 100%
            )
          `,
          backgroundSize: '100% 300%',
          animation: 'aurora 25s ease-in-out infinite',
          willChange: 'background-position',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
        }}
      />
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  )
}
