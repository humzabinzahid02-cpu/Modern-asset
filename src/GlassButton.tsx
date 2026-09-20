import React, { useState, type ReactNode } from 'react'

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'default' | 'accent' | 'gold' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  style?: React.CSSProperties
}

export default function GlassButton({
  children,
  variant = 'default',
  size = 'md',
  onClick,
  className = '',
  style = {},
  ...rest
}: GlassButtonProps) {
  const [pressed, setPressed] = useState(false)

  const sizeStyles = {
    sm: {
      padding: '8px 20px',
      fontSize: '13px',
      borderRadius: '9999px',
    },
    md: {
      padding: '12px 28px',
      fontSize: '14px',
      borderRadius: '12px',
    },
    lg: {
      padding: '16px 36px',
      fontSize: '16px',
      borderRadius: '14px',
    },
  }[size]

  let background = 'linear-gradient(160deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 100%)'
  let borderTop = '1px solid rgba(255,255,255,0.45)'
  let textColor = '#ffffff'
  let glowColor = 'rgba(255,255,255,0.1)'

  if (variant === 'accent') {
    background = 'linear-gradient(160deg, rgba(124,58,237,0.45) 0%, rgba(14,165,233,0.25) 100%)'
    borderTop = '1px solid rgba(168,85,247,0.6)'
    glowColor = 'rgba(124,58,237,0.35)'
  } else if (variant === 'gold') {
    background = 'linear-gradient(135deg, rgba(245,197,24,0.32) 0%, rgba(230,168,0,0.14) 100%)'
    borderTop = '1px solid rgba(245,197,24,0.75)'
    textColor = '#F5C518'
    glowColor = 'rgba(245,197,24,0.25)'
  } else if (variant === 'ghost') {
    background = 'rgba(12,12,20,0.4)'
    borderTop = '1px solid rgba(255,255,255,0.2)'
    textColor = 'rgba(255,255,255,0.85)'
  }

  return (
    <button
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onClick={onClick}
      className={`glass-button inline-flex items-center justify-center gap-2 cursor-pointer select-none outline-none relative overflow-hidden transition-all ${className}`.trim()}
      style={{
        background,
        backdropFilter: 'blur(16px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(16px) saturate(1.5)',

        borderTop,
        borderLeft: '1px solid rgba(255,255,255,0.18)',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',

        fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: textColor,

        ...sizeStyles,

        boxShadow: pressed
          ? `0 1px 2px rgba(0,0,0,0.5), inset 0 1px 4px rgba(0,0,0,0.4), inset 0 -1px 2px rgba(255,255,255,0.06)`
          : `0 4px 14px rgba(0,0,0,0.35), 0 0 20px ${glowColor}, inset 0 1px 0px rgba(255,255,255,0.15), inset 0 -2px 6px rgba(0,0,0,0.25)`,

        transform: pressed
          ? 'translateY(2px) scale(0.98) scaleY(0.97)'
          : 'translateY(0px) scale(1)',

        transition: pressed
          ? 'transform 60ms cubic-bezier(0.25,0,0.5,1), box-shadow 60ms ease'
          : 'transform 180ms cubic-bezier(0.34,1.2,0.64,1), box-shadow 180ms ease',

        ...style,
      }}
      {...rest}
    >
      {/* Specular sheen */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.16) 0%, transparent 55%)',
          pointerEvents: 'none',
          opacity: pressed ? 0.35 : 1,
          transition: 'opacity 80ms ease',
        }}
      />
      {children}
    </button>
  )
}
