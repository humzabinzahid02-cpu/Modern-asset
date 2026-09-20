import { useState, type ReactNode } from 'react'

interface GlassButtonProps {
  children: ReactNode
  variant?: 'default' | 'accent'
  onClick?: () => void
}

export default function GlassButton({ children, variant = 'default', onClick }: GlassButtonProps) {
  const [pressed, setPressed] = useState(false)

  const isAccent = variant === 'accent'

  return (
    <button
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onClick={onClick}
      style={{
        /* Translucent glass body */
        background: isAccent
          ? 'linear-gradient(160deg, rgba(124,58,237,0.35) 0%, rgba(14,165,233,0.18) 100%)'
          : 'linear-gradient(160deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 100%)',
        backdropFilter: 'blur(18px) saturate(1.6)',
        WebkitBackdropFilter: 'blur(18px) saturate(1.6)',

        /* Top-edge highlight simulating glass thickness */
        borderTop: '1px solid rgba(255,255,255,0.45)',
        borderLeft: '1px solid rgba(255,255,255,0.22)',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',

        borderRadius: '14px',
        padding: '14px 36px',
        fontSize: '15px',
        fontWeight: '600',
        letterSpacing: '0.01em',
        color: 'rgba(255,255,255,0.92)',
        cursor: 'pointer',
        userSelect: 'none',
        outline: 'none',
        position: 'relative',

        /* Depth shadow: outer lift shadow + inner bottom-edge shadow */
        boxShadow: pressed
          ? /* Compressed: shadow collapses inward */
            `
            0 1px 2px rgba(0,0,0,0.45),
            0 2px 6px rgba(0,0,0,0.30),
            inset 0 1px 4px rgba(0,0,0,0.35),
            inset 0 -1px 2px rgba(255,255,255,0.08)
            `
          : /* Lifted: multi-layer depth */
            `
            0 4px 8px rgba(0,0,0,0.35),
            0 12px 28px rgba(0,0,0,0.30),
            0 1px 0px rgba(255,255,255,0.12) inset,
            0 -2px 6px rgba(0,0,0,0.25) inset
            `,

        /* Realistic compression: translate down and scale slightly flat */
        transform: pressed
          ? 'translateY(3px) scale(0.978) scaleY(0.97)'
          : 'translateY(0px) scale(1)',

        transition: pressed
          ? 'transform 60ms cubic-bezier(0.25,0,0.5,1), box-shadow 60ms ease'
          : 'transform 180ms cubic-bezier(0.34,1.2,0.64,1), box-shadow 180ms ease',
      }}
    >
      {/* Inner specular sheen */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, transparent 55%)',
          pointerEvents: 'none',
          opacity: pressed ? 0.5 : 1,
          transition: 'opacity 80ms ease',
        }}
      />
      {children}
    </button>
  )
}
