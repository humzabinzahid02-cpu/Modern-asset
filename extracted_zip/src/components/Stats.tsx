import { useEffect, useRef, useState } from 'react'

const STATS = [
  { value: 15, suffix: '+', label: 'Years of Experience' },
  { value: 500, suffix: '+', label: 'Projects Completed' },
  { value: 200, suffix: '+', label: 'Custom Vehicles Built' },
  { value: 10, suffix: '+', label: 'Countries Served' },
]

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1400
        const steps = 50
        const inc = target / steps
        let current = 0
        const timer = setInterval(() => {
          current = Math.min(current + inc, target)
          setCount(Math.round(current))
          if (current >= target) clearInterval(timer)
        }, duration / steps)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section style={{
      background: '#13131f',
      borderTop: '1px solid rgba(245,197,24,0.1)',
      borderBottom: '1px solid rgba(245,197,24,0.1)',
      padding: '48px clamp(24px,6vw,100px)',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        alignItems: 'center',
        gap: '32px 60px',
        maxWidth: 1200,
        margin: '0 auto',
      }}>
        <div style={{ borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: 48 }}>
          <div style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.6,
          }}>
            Trusted<br />By Industry<br />Leaders
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '16px 40px',
        }}>
          {STATS.map(s => (
            <div key={s.label}>
              <div style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: 'clamp(36px, 5vw, 52px)',
                fontWeight: 800,
                lineHeight: 1,
                background: 'linear-gradient(90deg, #F5C518, #ffffff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                <CountUp target={s.value} suffix={s.suffix} />
              </div>
              <div style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.45)',
                marginTop: 4,
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
