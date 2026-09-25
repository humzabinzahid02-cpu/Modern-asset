import React, { useState, useEffect, useRef } from 'react'
import FluidMorphBg from './FluidMorphBg'


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
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[58px] font-black font-display text-[#E07B10] tracking-tight leading-none uppercase m-0 calendar-flip-anim"
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
      <section className="relative w-full bg-[#F6F5F1] overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 px-4 sm:px-8 lg:px-12 select-none">

        {/* FluidMorphBg: Organic Brand Fluid Wave Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-35 [transform:translateZ(0)]">
          <FluidMorphBg
            duration={7.5}
            colors={[
              '#E07B10', // Brand Amber Orange
              '#E89E30', // Warm Gold
              '#F3D9B5', // Soft Sand Amber
              '#EBDDC9', // Warm Industrial Cream
              '#E07B10', // Brand Accent Ribbon
              '#F7EFE4', // Luminous Sand
              '#C46C0C', // Deep Golden Ochre
            ]}
            backgroundColor="transparent"
          />
        </div>
        
        {/* Ambient Subtle Warm Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#E07B10]/[0.08] rounded-full blur-3xl pointer-events-none z-0 [transform:translateZ(0)]" />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#1B2B3A]/[0.04] rounded-full blur-3xl pointer-events-none z-0 [transform:translateZ(0)]" />

        {/* Background Kinetic Watermark Typography */}
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

        {/* Floating Background Aesthetic Badge (Top Right) */}
        <div className="hidden md:flex absolute top-28 right-16 z-0 items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#E2DFDC] shadow-xs text-[11px] font-bold tracking-widest uppercase text-[#E07B10] hero-badge-float pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-[#E07B10] animate-ping" />
          <span>Vision 2030 Fleet Compliant</span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-8 sm:gap-10 lg:gap-12">
          
          {/* ROW 1: Hero Typography & Mission Statement */}
          <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
            
            {/* Left Column: Fits strictly in 2 lines with Calendar Flip */}
            <div className="w-full lg:w-[50%] xl:w-[48%] flex flex-col items-start text-left select-none space-y-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[58px] font-black font-display text-[#1B2B3A] tracking-tight leading-[0.98] uppercase m-0 whitespace-nowrap">
                Engineered To
              </h1>
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[58px] font-black font-display text-[#1B2B3A] tracking-tight leading-[0.98] uppercase m-0 whitespace-nowrap">
                Outperform
              </div>
              <div className="pt-2">
                <CalendarFlip />
              </div>
            </div>

            {/* Right Column: Statement with smaller, refined typography */}
            <div className="w-full lg:w-[46%] xl:w-[44%] flex flex-col justify-center text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#E07B10] mb-3 font-body">
                <span className="w-2 h-2 rounded-full bg-[#E07B10]" />
                Industrial Fleet Leadership
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-[26px] xl:text-[28px] font-bold font-display text-[#1B2B3A] leading-snug tracking-tight m-0">
                We focus on transport strategies that deliver amazing business results.
              </h2>
              <p className="text-sm sm:text-base text-[#5C6470] font-normal font-body mt-3 leading-relaxed max-w-lg">
                Specialized cement bulkers, tipper dump trailers, and heavy-duty logistics platforms engineered for Saudi Vision 2030 fleets.
              </p>
            </div>

          </div>

          {/* ─── ROW 2: Overlapping Cards Stacking (Matching Reference Image) ─── */}
          <div className="w-full relative mt-8 sm:mt-10 lg:mt-14 pb-14 sm:pb-20 lg:pb-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-end relative">
              
              {/* Back Card: Video Frame (Columns 4 to 13, Row 1, z-10) */}
              <div className="order-1 lg:order-none lg:col-start-4 lg:col-end-13 lg:row-start-1 z-10 w-full rounded-3xl overflow-hidden bg-[#0C121A] border-2 border-[#E2DFDC] shadow-[0_20px_50px_rgba(27,43,58,0.14)] aspect-[16/10] sm:aspect-[16/9] lg:self-start relative group">
                <video
                  src="/hero-video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Subtle Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

                {/* Circular Rotating Reel Badge in theme */}
                <div
                  onClick={handleOpenClient}
                  className="absolute top-5 right-5 sm:top-7 sm:right-7 w-20 h-20 sm:w-26 sm:h-26 rounded-full border border-white/50 bg-black/55 backdrop-blur-md flex items-center justify-center select-none cursor-pointer group shadow-xl hover:scale-105 transition-transform z-20"
                >
                  <svg className="w-full h-full animate-[spin_14s_linear_infinite]" viewBox="0 0 100 100">
                    <path
                      id="reelCirclePath"
                      d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                      fill="none"
                    />
                    <text className="text-[7.5px] font-bold tracking-[0.24em] fill-white uppercase">
                      <textPath href="#reelCirclePath" startOffset="0%">
                        ★ PLAY REEL ★ HEAVY FLEETS ★ KSA ★
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

              {/* Front Card: Compact Text Card (Columns 1 to 6, Row 1, z-20) — Overlaps bottom-left of Video Card */}
              <div className="order-2 lg:order-none lg:col-start-1 lg:col-end-6 lg:row-start-1 z-20 w-full -mt-10 sm:-mt-14 lg:mt-0 lg:self-end lg:translate-y-12 xl:translate-y-16 max-w-[470px] xl:max-w-[500px] bg-[#0A0E14] text-white rounded-3xl p-6 sm:p-8 lg:p-9 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.65)] border border-white/10 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl sm:text-[28px] lg:text-[30px] xl:text-[32px] font-black font-display text-white tracking-tight leading-[1.14] mb-3.5">
                    Accelerate your fleet growth with <span className="text-[#E07B10]">Modern Assets</span>
                  </h2>

                  <p className="text-slate-300 font-body text-xs sm:text-[13px] lg:text-[13.5px] leading-relaxed mb-6">
                    Modern Assets is a premier heavy-duty vehicle and trailer manufacturer that uses skilled engineering, certified Hardox steel, and heavy-duty European running gear to help transport fleets expand with maximum uptime and unmatched operational reliability.
                  </p>
                </div>

                {/* Brand Orange Outline Button with chevron matching Image 2 reference */}
                <div>
                  <button
                    type="button"
                    onClick={handleOpenClient}
                    className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full border-2 border-[#E07B10] bg-transparent hover:bg-[#E07B10] text-[#E07B10] hover:text-[#0A0E14] font-extrabold text-xs sm:text-sm tracking-wider uppercase font-body shadow-[0_4px_16px_rgba(224,123,16,0.18)] hover:shadow-[0_6px_22px_rgba(224,123,16,0.35)] transition-all duration-300 cursor-pointer"
                  >
                    <span>BECOME A CLIENT</span>
                    <span className="text-base font-black transition-transform group-hover:translate-x-1">›</span>
                  </button>
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
