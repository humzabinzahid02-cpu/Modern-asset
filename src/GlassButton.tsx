import React, { useState, type ReactNode } from 'react'

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'default' | 'accent' | 'gold' | 'ghost' | 'ghost-white'
  size?: 'sm' | 'md' | 'lg'
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  style?: React.CSSProperties
}

export default function GlassButton({
  children,
  variant = 'gold',
  size = 'md',
  onClick,
  className = '',
  style = {},
  ...rest
}: GlassButtonProps) {
  const [pressed, setPressed] = useState(false)
  const [hovered, setHovered] = useState(false)

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

  let background = hovered ? '#FFFFFF' : '#E07B10'
  let border = hovered ? '1.5px solid #FFFFFF' : '1.5px solid #E07B10'
  let textColor = hovered ? '#E07B10' : '#FFFFFF'
  let glowColor = hovered ? 'rgba(255, 255, 255, 0.4)' : 'rgba(224, 123, 16, 0.35)'

  if (variant === 'ghost-white') {
    background = hovered ? '#FFFFFF' : 'rgba(255, 255, 255, 0.08)'
    border = hovered ? '1.5px solid #FFFFFF' : '1.5px solid rgba(255, 255, 255, 0.85)'
    textColor = hovered ? '#1B2B3A' : '#FFFFFF'
    glowColor = hovered ? 'rgba(255, 255, 255, 0.45)' : 'transparent'
  } else if (variant === 'ghost') {
    background = hovered ? '#1B2B3A' : 'transparent'
    border = '1.5px solid #1B2B3A'
    textColor = hovered ? '#FFFFFF' : '#1B2B3A'
    glowColor = 'rgba(27,43,58,0.06)'
  } else if (variant === 'accent') {
    background = hovered ? '#252D35' : '#1B2B3A'
    border = '1.5px solid #1B2B3A'
    textColor = '#FFFFFF'
    glowColor = 'rgba(27,43,58,0.2)'
  }

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        setPressed(false)
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onClick={onClick}
      className={`glass-button inline-flex items-center justify-center gap-2 cursor-pointer select-none outline-none relative overflow-hidden transition-all ${className}`.trim()}
      style={{
        background,
        border,
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: textColor,
        ...sizeStyles,
        boxShadow: pressed
          ? '0 1px 2px rgba(0,0,0,0.1)'
          : variant === 'ghost'
          ? '0 2px 8px rgba(23,50,77,0.04)'
          : `0 4px 14px ${glowColor}`,
        transform: pressed
          ? 'translateY(2px) scale(0.98)'
          : hovered
          ? 'translateY(-2px)'
          : 'translateY(0px)',
        transition: 'all 180ms cubic-bezier(0.16, 1, 0.3, 1)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  )
}
