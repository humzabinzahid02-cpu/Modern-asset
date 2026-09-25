import React, { useState, useEffect, useRef } from 'react'

const MARQUEE_LTR = [
  'CEMENT BULKERS',
  'HEAVY LOWBEDS',
  'TIPPER TRAILERS',
  'FLATBED TRANSPORTERS',
  'CUSTOM TRUCK BODIES',
  'PETROLEUM TANKERS',
]

const MARQUEE_RTL = [
  'ENGINEERED IN SAUDI ARABIA',
  'VISION 2030 FLEET COMPLIANCE',
  'HARDOX STEEL FABRICATION',
  'MAXIMUM PAYLOAD EFFICIENCY',
  'UNCOMPROMISING DURABILITY',
]

const BG_WORDS_TRACK_1 = [
  'ENGINEERING EXCELLENCE',
  'HEAVY HAULAGE',
  'VISION 2030',
  'HARDOX STEEL',
  'MAXIMUM PAYLOAD',
  'MODERN ASSETS',
]

const BG_WORDS_TRACK_2 = [
  'PRECISION TANKERS',
  'BPW AXLES',
  'ADR CERTIFIED',
  'ZERO DEFLECTION',
  'INDUSTRIAL FLEETS',
  '150 TON RATING',
]

const FLIP_WORDS = ['ENDURE', 'SECURE', 'ASSURE']

function CalendarFlip() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % FLIP_WORDS.length)
    }, 2600)
    return () => clearInterval(timer)
  }, [])

  const currentWord = FLIP_WORDS[index]

  return (
    <div className="relative inline-block select-none my-1">
      {/* Top Binder Rings of Calendar */}
      <div className="flex items-center gap-2 mb-1.5 pl-1">
        <span className="w-2.5 h-2.5 rounded-full bg-[#1B2B3A]/30 border border-[#1B2B3A]/50 inline-block shadow-inner" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#1B2B3A]/30 border border-[#1B2B3A]/50 inline-block shadow-inner" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#1B2B3A]/30 border border-[#1B2B3A]/50 inline-block shadow-inner" />
        <span className="text-[10px] font-bold tracking-widest uppercase text-[#E07B10] ml-2">
          PILLAR 0{index + 1} / 03
        </span>
      </div>

      {/* 3D Flip Card */}
      <div
        className="relative overflow-hidden rounded-2xl bg-[#1B2B3A] border-2 border-[#E07B10] px-5 sm:px-8 py-2.5 sm:py-3.5 shadow-xl"
        style={{ perspective: 1000 }}
      >
        {/* Horizontal center crease line */}
        <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-black/60 z-20 pointer-events-none shadow-[0_1px_1px_rgba(255,255,255,0.12)]" />

        {/* Flipping Word */}
        <div
          key={currentWord}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black font-display text-[#E07B10] tracking-tight leading-none uppercase m-0 calendar-flip-anim"
        >
          {currentWord}
        </div>
      </div>
    </div>
  )
}

interface HeroProps {
  onOpenQuote?: () => void
}

export default function Hero({ onOpenQuote }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Interactive constellation particles on cream background (#F6F5F1)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let isVisible = true
    const observer = new IntersectionObserver(([entry]) => {
      const wasVisible = isVisible
      isVisible = entry.isIntersecting
      if (isVisible && !wasVisible) {
        animId = requestAnimationFrame(render)
      }
    }, { threshold: 0.05 })
    observer.observe(canvas)

    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth)
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 600)

    const handleResize = () => {
      if (!canvas.parentElement) return
      width = canvas.width = canvas.parentElement.offsetWidth
      height = canvas.height = canvas.parentElement.offsetHeight
    }
    window.addEventListener('resize', handleResize)

    // Particle nodes
    const count = Math.min(Math.floor((width * height) / 16000), 50)
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.6 + 1.2,
      isOrange: Math.random() > 0.65,
    }))

    const render = () => {
      if (!isVisible) return
      ctx.clearRect(0, 0, width, height)

      // Update positions
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.isOrange ? 'rgba(224, 123, 16, 0.4)' : 'rgba(27, 43, 58, 0.18)'
        ctx.fill()
      })

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 135) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(27, 43, 58, ${0.1 * (1 - dist / 135)})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animId)
      observer.disconnect()
    }
  }, [])

  const handleOpenClient = () => {
    if (onOpenQuote) {
      onOpenQuote()
    } else {
      const el = document.getElementById('contact')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div id="home" className="relative w-full overflow-hidden">
      
      {/* ─────────────────────────────────────────────────────────────
          PART 1: HERO TOP WITH SLASH (Modern Assets Light Cream Theme)
          Light Cream Background (#F6F5F1) + Animated Background Words
          Left:
            Think Like A
            Challenger
            Trendsetter
            Innovator
          Center:
            Thick angled brand orange "/"
          Right:
            We focus on transport strategies that deliver amazing business results.
      ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full bg-[#F6F5F1] overflow-hidden pt-32 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32 px-6 sm:px-12 lg:px-20 flex items-center min-h-[500px] lg:min-h-[560px]">
        
        {/* Ambient Subtle Warm Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#E07B10]/[0.08] rounded-full blur-3xl pointer-events-none z-0 [transform:translateZ(0)]" />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#1B2B3A]/[0.04] rounded-full blur-3xl pointer-events-none z-0 [transform:translateZ(0)]" />

        {/* ── Background Kinetic Watermark Typography (Never Empty) ── */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 flex flex-col justify-between py-6 opacity-60">
          
          {/* Top Drift Track: Drifting Left */}
          <div className="w-full overflow-hidden">
            <div className="hero-bg-drift-left flex w-max">
              {[...BG_WORDS_TRACK_1, ...BG_WORDS_TRACK_1, ...BG_WORDS_TRACK_1].map((w, idx) => (
                <span
                  key={`bg-w1-${idx}`}
                  className="shrink-0 font-display font-black text-6xl sm:text-8xl lg:text-[115px] uppercase tracking-wider px-8 text-transparent [-webkit-text-stroke:1.2px_rgba(27,43,58,0.08)] opacity-70 flex items-center"
                >
                  <span>{w}</span>
                  <span className="text-[#E07B10] [-webkit-text-stroke:0] opacity-40 mx-4 inline-flex items-center">
                    <svg className="w-6 h-6 sm:w-10 sm:h-10 fill-current" viewBox="0 0 24 24">
                      <polygon points="12 2 22 12 12 22 2 12" />
                    </svg>
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Drift Track: Drifting Right */}
          <div className="w-full overflow-hidden">
            <div className="hero-bg-drift-right flex w-max">
              {[...BG_WORDS_TRACK_2, ...BG_WORDS_TRACK_2, ...BG_WORDS_TRACK_2].map((w, idx) => (
                <span
                  key={`bg-w2-${idx}`}
                  className="shrink-0 font-display font-black text-5xl sm:text-7xl lg:text-[100px] uppercase tracking-wider px-8 text-transparent [-webkit-text-stroke:1.2px_rgba(224,123,16,0.12)] opacity-70 flex items-center"
                >
                  <span>{w}</span>
                  <span className="text-[#1B2B3A] [-webkit-text-stroke:0] opacity-35 mx-4 inline-flex items-center">
                    <svg className="w-5 h-5 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5Z" />
                    </svg>
                  </span>
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* ── Floating Background Aesthetic Badges ── */}
        <div className="hidden md:flex absolute top-28 right-16 z-0 items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#E2DFDC] shadow-xs text-[11px] font-bold tracking-widest uppercase text-[#E07B10] hero-badge-float pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-[#E07B10] animate-ping" />
          <span>Vision 2030 Fleet Compliant</span>
        </div>

        <div className="hidden lg:flex absolute bottom-24 left-10 z-0 items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#E2DFDC] shadow-xs text-[11px] font-bold tracking-widest uppercase text-[#1B2B3A] hero-badge-float-delay pointer-events-none">
          <svg className="w-3.5 h-3.5 text-[#E07B10] fill-current" viewBox="0 0 24 24">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span>Hardox 500 Tuf Steel Fabrication</span>
        </div>

        {/* Constellation Particle Canvas Overlay */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* Left Column: Stacked with Calendar Flip */}
          <div className="w-full lg:w-[48%] flex flex-col items-start text-left select-none space-y-1">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black font-display text-[#1B2B3A] tracking-tight leading-[0.92] uppercase m-0">
              Engineered To
            </h1>
            <div className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black font-display text-[#1B2B3A] tracking-tight leading-[0.92] uppercase m-0">
              Outperform
            </div>
            <div className="pt-2">
              <CalendarFlip />
            </div>
          </div>

          {/* Center Column: The Thick Slash "/" in brand orange */}
          <div className="hidden lg:flex items-center justify-center shrink-0 select-none px-6">
            <div
              className="text-[#E07B10] text-[140px] xl:text-[180px] font-black leading-none select-none font-display drop-shadow-[0_4px_12px_rgba(224,123,16,0.2)]"
              style={{
                transform: 'scaleX(1.15) skewX(-12deg)',
              }}
            >
              /
            </div>
          </div>

          {/* Mobile Slash Divider */}
          <div className="lg:hidden text-6xl font-black text-[#E07B10] leading-none my-2 select-none font-display">
            /
          </div>

          {/* Right Column: Statement in dark navy text */}
          <div className="w-full lg:w-[42%] flex flex-col justify-center text-left">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#E07B10] mb-3 font-body">
              <span className="w-2 h-2 rounded-full bg-[#E07B10]" />
              Industrial Fleet Leadership
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#1B2B3A] leading-[1.05] uppercase tracking-tight m-0">
              We focus on transport strategies that deliver amazing business results.
            </h2>
            <p className="text-base sm:text-lg text-[#5C6470] font-normal font-body mt-5 leading-relaxed max-w-lg">
              Specialized cement bulkers, tipper dump trailers, and heavy-duty logistics platforms engineered for Saudi Vision 2030 fleets.
            </p>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          DOUBLE MARQUEE TRACK (Light Stone/Cream Theme)
          LTR (Dark Navy outline) + RTL (Amber outline)
      ───────────────────────────────────────────────────────────── */}
      <div className="w-full overflow-hidden bg-[#ECEAE5] py-3.5 sm:py-5 border-y border-[#E2DFDC] space-y-2 select-none">
        
        {/* Track 1: LTR Large */}
        <div className="marquee-ltr-wrap overflow-hidden">
          <div className="marquee-ltr-track flex w-max">
            {[...MARQUEE_LTR, ...MARQUEE_LTR, ...MARQUEE_LTR, ...MARQUEE_LTR].map((item, idx) => (
              <span
                key={`ltr-${idx}`}
                className="shrink-0 text-transparent font-display font-black tracking-wider uppercase px-8 sm:px-14 whitespace-nowrap text-5xl sm:text-7xl lg:text-8xl [-webkit-text-stroke:1.6px_#1B2B3A] opacity-85 inline-flex items-center"
              >
                <span>{item}</span>
                <span className="text-[#E07B10] [-webkit-text-stroke:0] ml-6 sm:ml-10 opacity-80 inline-flex items-center">
                  <svg className="w-5 h-5 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24">
                    <polygon points="12 2 22 12 12 22 2 12" />
                  </svg>
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Track 2: RTL Medium */}
        <div className="marquee-rtl-wrap overflow-hidden">
          <div className="marquee-rtl-track flex w-max">
            {[...MARQUEE_RTL, ...MARQUEE_RTL, ...MARQUEE_RTL, ...MARQUEE_RTL].map((item, idx) => (
              <span
                key={`rtl-${idx}`}
                className="shrink-0 text-transparent font-display font-extrabold tracking-wider uppercase px-6 sm:px-10 whitespace-nowrap text-3xl sm:text-5xl lg:text-6xl [-webkit-text-stroke:1.5px_#E07B10] opacity-75 inline-flex items-center"
              >
                <span>{item}</span>
                <span className="text-[#1B2B3A] [-webkit-text-stroke:0] ml-5 sm:ml-8 opacity-75 inline-flex items-center">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5Z" />
                  </svg>
                </span>
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          PART 2: ON-SCROLL VIDEO SECTION (Refined Light Cream Theme #F6F5F1)
          Left: Clean Light Card with Dark Navy & Brand Orange typography
          Right: Video Player with Circular Reel Stamp
      ───────────────────────────────────────────────────────────── */}
      <section className="relative z-10 w-full overflow-hidden bg-[#F6F5F1] py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-12 select-none border-t border-[#E2DFDC]">
        
        {/* Subtle Ambient Background Warm Glows */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#E07B10]/[0.06] rounded-full blur-3xl pointer-events-none -z-0 [transform:translateZ(0)]" />
        <div className="absolute -bottom-10 right-1/4 w-80 h-80 bg-[#1B2B3A]/[0.03] rounded-full blur-3xl pointer-events-none -z-0 [transform:translateZ(0)]" />

        {/* Content: Clean White Card (Left) + Video Frame (Right) */}
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* Left Card: Elegant White Card in Light Theme */}
          <div className="w-full lg:w-[48%] xl:w-[46%] relative z-20 bg-white text-[#1B2B3A] rounded-3xl p-7 sm:p-10 lg:p-12 shadow-[0_16px_40px_rgba(27,43,58,0.06)] border border-[#E2DFDC] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#E07B10] mb-3 font-body">
                <span className="w-2 h-2 rounded-full bg-[#E07B10]" />
                Industrial Fleet Partner
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black font-display text-[#1B2B3A] uppercase tracking-tight leading-[1.05] mb-5">
                Accelerate your fleet growth with <span className="text-[#E07B10]">Modern Assets</span>
              </h2>

              <p className="text-[#5C6470] font-body text-sm sm:text-base leading-relaxed mb-8">
                Modern Assets is a premier heavy-duty vehicle and trailer manufacturer that uses skilled engineering, certified Hardox steel, and heavy-duty European running gear to help transport fleets expand with maximum uptime. Together, we can outpace the competition and accomplish unmatched operational reliability for your business.
              </p>
            </div>

            {/* Brand Orange Button */}
            <div>
              <button
                type="button"
                onClick={handleOpenClient}
                className="group inline-flex items-center gap-3.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#E07B10] hover:bg-[#C46C0C] text-white font-extrabold text-sm sm:text-base tracking-wider uppercase font-body shadow-[0_8px_20px_rgba(224,123,16,0.28)] transition-all duration-300 cursor-pointer"
              >
                <span>BECOME A CLIENT</span>
                <span className="text-lg font-black transition-transform group-hover:translate-x-1">›</span>
              </button>
            </div>
          </div>

          {/* Right Video Player Frame */}
          <div className="w-full lg:w-[52%] relative z-10">
            <div className="relative rounded-3xl overflow-hidden bg-[#0C121A] border-2 border-[#E2DFDC] shadow-[0_20px_50px_rgba(27,43,58,0.12)] aspect-[16/10] sm:aspect-[16/9] w-full">
              <video
                src="/hero-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Circular Rotating Reel Badge in theme */}
              <div
                onClick={handleOpenClient}
                className="absolute top-5 right-5 sm:top-7 sm:right-7 w-20 h-20 sm:w-26 sm:h-26 rounded-full border border-white/50 bg-black/45 backdrop-blur-md flex items-center justify-center select-none cursor-pointer group shadow-xl hover:scale-105 transition-transform"
              >
                <svg className="w-full h-full animate-[spin_14s_linear_infinite]" viewBox="0 0 100 100">
                  <path
                    id="reelCirclePath"
                    d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                    fill="none"
                  />
                  <text className="text-[7.5px] font-bold tracking-[0.24em] fill-white uppercase">
                    <textPath href="#reelCirclePath" startOffset="0%">
                      • PLAY REEL • HEAVY FLEETS • KSA •
                    </textPath>
                  </text>
                </svg>
                {/* Center Play Icon */}
                <div className="absolute w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#E07B10] flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 translate-x-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Marquee & Background Kinetic Keyframes */}
      <style>{`
        .marquee-ltr-track {
          animation: heroMarqueeLTR 26s linear infinite;
        }
        .marquee-rtl-track {
          animation: heroMarqueeRTL 24s linear infinite;
        }

        .hero-bg-drift-left {
          animation: heroBgDriftLeft 45s linear infinite;
          will-change: transform;
          transform: translateZ(0);
        }
        .hero-bg-drift-right {
          animation: heroBgDriftRight 40s linear infinite;
          will-change: transform;
          transform: translateZ(0);
        }

        .hero-badge-float {
          animation: heroBadgeFloat 4.5s ease-in-out infinite;
        }
        .hero-badge-float-delay {
          animation: heroBadgeFloat 5.2s ease-in-out 1.8s infinite;
        }

        @keyframes calendarFlipDown {
          0% {
            transform: rotateX(85deg);
            opacity: 0;
            filter: brightness(0.65);
          }
          65% {
            transform: rotateX(-10deg);
            opacity: 1;
            filter: brightness(1.1);
          }
          100% {
            transform: rotateX(0deg);
            opacity: 1;
            filter: brightness(1);
          }
        }

        .calendar-flip-anim {
          transform-origin: 50% 50%;
          animation: calendarFlipDown 550ms cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes heroMarqueeLTR {
          from { transform: translateX(-25%); }
          to   { transform: translateX(0); }
        }
        @keyframes heroMarqueeRTL {
          from { transform: translateX(0); }
          to   { transform: translateX(-25%); }
        }

        @keyframes heroBgDriftLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes heroBgDriftRight {
          from { transform: translateX(-33.333%); }
          to   { transform: translateX(0); }
        }

        @keyframes heroBadgeFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

    </div>
  )
}
