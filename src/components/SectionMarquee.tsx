import React from 'react'

interface SectionMarqueeProps {
  items: string[]
  direction?: 'ltr' | 'rtl'
  background?: string
  textSize?: number
  duration?: number
}

export default function SectionMarquee({
  items,
  direction = 'ltr',
  background = '#1B2B3A',
  textSize = 100,
  duration = 30,
}: SectionMarqueeProps) {
  const tripled = [...items, ...items, ...items]

  return (
    <div
      style={{
        background,
        overflow: 'hidden',
        lineHeight: 0,
        padding: 0,
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: `sectionMarquee${direction === 'rtl' ? 'RTL' : 'LTR'}_${duration} ${duration}s linear infinite`,
          lineHeight: 0.8,
        }}
      >
        {tripled.map((item, i) => (
          <span
            key={i}
            style={{
              flexShrink: 0,
              fontFamily: "'Poppins', sans-serif",
              fontSize: `clamp(${textSize * 0.4}px, ${textSize * 0.08}vw, ${textSize}px)`,
              fontWeight: 800,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'transparent',
              WebkitTextStroke: '1.5px rgba(224,123,16,0.5)',
              whiteSpace: 'nowrap',
              paddingRight: `clamp(${textSize * 0.3}px, 3vw, ${textSize * 0.5}px)`,
              userSelect: 'none',
              lineHeight: 1,
              display: 'inline-block',
              paddingTop: textSize * 0.18,
              paddingBottom: textSize * 0.18,
            }}
          >
            {item}
            <span
              style={{
                color: '#E07B10',
                marginLeft: `clamp(16px, 2vw, 32px)`,
                marginRight: `clamp(16px, 2vw, 32px)`,
                display: 'inline-flex',
                alignItems: 'center',
                verticalAlign: 'middle',
              }}
            >
              <svg
                style={{
                  width: `${Math.max(10, textSize * 0.22)}px`,
                  height: `${Math.max(10, textSize * 0.22)}px`,
                  fill: 'currentColor',
                }}
                viewBox="0 0 24 24"
              >
                <polygon points="12 2 22 12 12 22 2 12" />
              </svg>
            </span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes sectionMarqueeLTR_${duration} {
          from { transform: translateX(-33.333%); }
          to   { transform: translateX(0); }
        }
        @keyframes sectionMarqueeRTL_${duration} {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  )
}
