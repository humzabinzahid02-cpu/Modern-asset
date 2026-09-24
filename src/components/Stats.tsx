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
    <section className="bg-white border-y border-[#E2DFDC] py-8 sm:py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-8 md:gap-12 lg:gap-16">
        
        {/* Left: Trusted Badge Header */}
        <div className="md:border-r border-[#E2DFDC] md:pr-10 lg:pr-12 shrink-0 flex items-center md:items-start justify-between md:justify-start pb-4 md:pb-0 border-b md:border-b-0 border-[#E2DFDC]/60">
          <div>
            <div className="font-display text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#E07B10] mb-0.5">
              ESTABLISHED TRACK RECORD
            </div>
            <div className="font-display text-sm sm:text-base font-extrabold tracking-[0.15em] uppercase text-[#1B2B3A] leading-tight">
              Trusted By Industry Leaders
            </div>
          </div>
          <div className="md:hidden w-8 h-8 rounded-full bg-[#E07B10]/10 flex items-center justify-center text-[#E07B10] font-bold text-xs">
            KSA
          </div>
        </div>

        {/* Right: Responsive 2x2 on Mobile, 4 columns on Tablet/Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 flex-1">
          {STATS.map(s => (
            <div key={s.label} className="flex flex-col">
              <div className="font-display font-black text-4xl sm:text-5xl lg:text-[3.25rem] text-[#1B2B3A] leading-none tracking-tight">
                <CountUp target={s.value} suffix={s.suffix} />
              </div>
              <div className="font-body text-xs sm:text-sm text-[#5C6470] mt-1.5 font-medium leading-snug">
                {s.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
