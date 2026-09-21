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

  let background = hovered ? '#C8750D' : '#E58A16'
  let border = '1.5px solid transparent'
  let textColor = '#FFFFFF'
  let glowColor = 'rgba(229,138,22,0.3)'

  if (variant === 'ghost') {
    background = hovered ? '#20262B' : 'transparent'
    border = '1.5px solid #20262B'
    textColor = hovered ? '#FFFFFF' : '#20262B'
    glowColor = 'rgba(32,38,43,0.06)'
  } else if (variant === 'accent') {
    background = hovered ? '#343B40' : '#20262B'
    border = '1.5px solid #20262B'
    textColor = '#FFFFFF'
    glowColor = 'rgba(32,38,43,0.2)'
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
        fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
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
