import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../LanguageContext'
import LicensePage from '../pages/LicensePage'

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
  const { isArabic } = useLanguage()
  const [showLicense, setShowLicense] = useState(false)

  return (
    <>
      <section className="bg-white border-y border-[#E2DFDC] py-8 sm:py-12 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
          
          {/* Left: Trusted Badge Header & Government CR Accreditation */}
          <div className="lg:border-r border-[#E2DFDC] lg:pr-10 shrink-0 flex flex-col justify-center pb-6 lg:pb-0 border-b lg:border-b-0 border-[#E2DFDC]/60">
            <div>
              <div className="font-display text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#E07B10] mb-0.5">
                {isArabic ? 'سجل حافل بالإنجازات' : 'ESTABLISHED TRACK RECORD'}
              </div>
              <div className="font-display text-sm sm:text-base font-extrabold tracking-[0.15em] uppercase text-[#1B2B3A] leading-tight">
                {isArabic ? 'محل ثقة رواد الصناعة' : 'Trusted By Industry Leaders'}
              </div>
            </div>

            {/* Official Government Verification Card */}
            <button
              type="button"
              onClick={() => setShowLicense(true)}
              className="mt-3 group text-start flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#F8F9FA] via-[#F3F4F6] to-[#ECEEF1] hover:from-[#FFF9F3] hover:to-[#FFF3E6] border border-[#E2DFDC] hover:border-[#E07B10]/50 transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
              title={isArabic ? 'عرض شهادة السجل التجاري الرسمية' : 'View Official Commercial Registration Certificate'}
            >
              <div className="w-9 h-9 rounded-lg bg-[#1B2B3A] group-hover:bg-[#E07B10] text-[#E07B10] group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-xs">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#1B2B3A] group-hover:text-[#E07B10] transition-colors tracking-wide">
                    {isArabic ? 'سجل تجاري معتمد' : 'Ministry of Commerce Certified'}
                  </span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    {isArabic ? 'موثق' : 'Active'}
                  </span>
                </div>
                <div className="text-[11px] text-[#6B7280] font-mono mt-0.5 flex items-center gap-1.5">
                  <span className="font-semibold text-[#1B2B3A]">CR #7038446733</span>
                  <span className="text-[#D1D5DB]">•</span>
                  <span className="text-[#E07B10] font-sans font-semibold text-[10px] group-hover:underline flex items-center gap-0.5">
                    {isArabic ? 'الشهادة الرسمية' : 'Official Credentials'}
                    <svg className="w-2.5 h-2.5 rtl:rotate-180 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Right: Responsive 2x2 on Mobile, 4 columns on Tablet/Desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 flex-1">
            {(isArabic ? ['سنوات من الخبرة', 'مشروع منجز', 'مركبة مخصصة', 'دول نخدمها'] : STATS.map(s => s.label)).map((label, i) => (
              <div key={label} className="flex flex-col">
                <div className="font-display font-black text-4xl sm:text-5xl lg:text-[3.25rem] text-[#1B2B3A] leading-none tracking-tight">
                  <CountUp target={STATS[i].value} suffix={STATS[i].suffix} />
                </div>
                <div className="font-body text-xs sm:text-sm text-[#5C6470] mt-1.5 font-medium leading-snug">
                  {label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* License / Commercial Registration Modal */}
      {showLicense && <LicensePage onClose={() => setShowLicense(false)} />}
    </>
  )
}
