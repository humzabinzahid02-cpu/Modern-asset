import React, { useState, useEffect, useRef } from 'react'
import FluidMorphBg from './FluidMorphBg'

// The rotating 3D highlight words representing Modern Assets industrial capabilities
const FLIP_WORDS = ['POWER', 'PRECISION', 'INTEGRITY', 'DURABILITY', 'INNOVATION']

const SITE_HERO_COLORS = ['#F6F5F1', '#E07B10', '#1B2B3A', '#D87308', '#253B4F']

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIsFlipping(true)
      setTimeout(() => {
        setWordIdx((prev) => (prev + 1) % FLIP_WORDS.length)
        setIsFlipping(false)
      }, 450)
    }, 3200)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const currentWord = FLIP_WORDS[wordIdx]

  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden bg-[#F6F5F1] flex items-center pt-24 pb-12 sm:pt-28 sm:pb-16"
    >
      {/* Fluid Morphing Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FluidMorphBg
          className="w-full h-full opacity-100"
          backgroundColor="#F6F5F1"
          duration={6.5}
          colors={SITE_HERO_COLORS}
        />
        {/* Soft top gradient to keep navbar clean and unified */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#F6F5F1] via-[#F6F5F1]/65 to-transparent pointer-events-none" />

        {/* Soft left diffusion so headline typography has crisp readability while waves flow visibly */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[52%] bg-gradient-to-r from-[#F6F5F1]/80 via-[#F6F5F1]/30 to-transparent pointer-events-none" />

        {/* Soft bottom fade to seamlessly blend into subsequent section */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#F6F5F1] via-[#F6F5F1]/50 to-transparent pointer-events-none" />
      </div>

      {/* Main Responsive Grid Container */}
      <div className="relative z-10 w-full max-w-7xl xl:max-w-[1380px] 2xl:max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 xl:gap-12 items-center min-h-0 lg:min-h-[calc(100vh-8rem)] py-4 sm:py-6 lg:py-12">
          
          {/* Left Column: Headline & Subtitle (6 cols) */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 font-body text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase font-bold text-[#E07B10] bg-white px-3 sm:px-3.5 py-1.5 rounded-full border border-[#E2DFDC] shadow-xs w-fit mb-4 sm:mb-5">
              <span className="w-2 h-2 rounded-full bg-[#E07B10] animate-pulse" />
              Heavy-Duty Vehicle Solutions • KSA
            </div>

            {/* Main Headline: Fixed Top Lines + 3D Flipping Yellow Line */}
            <div className="font-display font-black text-headings leading-[0.92] uppercase tracking-tight mb-4 sm:mb-6">
              <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[3.75rem] xl:text-[4.75rem] 2xl:text-[5.5rem] text-[#1B2B3A]">
                BUILT WITH
              </span>
              <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[3.75rem] xl:text-[4.75rem] 2xl:text-[5.5rem] text-[#1B2B3A]">
                PRECISION &amp;
              </span>

              {/* Yellow/Orange 3D Flip Word Container */}
              <div className="h-[1.15em] overflow-hidden inline-flex items-center text-4xl sm:text-6xl md:text-7xl lg:text-[3.75rem] xl:text-[4.75rem] 2xl:text-[5.5rem] text-[#E07B10] [perspective:1000px]">
                <div
                  key={wordIdx}
                  className="inline-flex [transform-style:preserve-3d]"
                >
                  {currentWord.split('').map((char, charIdx) => (
                    <span
                      key={`${currentWord}-${charIdx}`}
                      style={{
                        transformOrigin: '50% 50% -18px',
                        animation: isFlipping
                          ? `letterFlipOut 400ms ease ${charIdx * 25}ms forwards`
                          : `letterFlipIn 500ms cubic-bezier(0.16, 1, 0.3, 1) ${charIdx * 35}ms forwards`,
                      }}
                      className="inline-block"
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Hero Subtitle */}
            <p className="font-body text-sm sm:text-base md:text-lg text-[#5C6470] max-w-xl leading-relaxed mb-6">
              Custom truck bodies, petroleum tankers, abnormal load trailers and specialized heavy-duty transport platforms — designed for extreme desert duty cycles and engineered for Saudi Vision 2030 fleets.
            </p>

            {/* Quick Action Link to Explore */}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  const p = document.getElementById('products')
                  if (p) p.scrollIntoView({ behavior: 'smooth' })
                }}
                className="group flex items-center gap-2.5 text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-[#1B2B3A] hover:text-[#E07B10] transition-colors cursor-pointer bg-transparent border-none p-0 outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-white border border-[#E2DFDC] shadow-xs flex items-center justify-center text-[#E07B10] group-hover:bg-[#E07B10] group-hover:text-white transition-all">
                  <span className="text-xs">↓</span>
                </div>
                <span>Scroll to Explore Fleet &amp; Specifications</span>
              </button>
            </div>

          </div>

          {/* Right Column: Large, Clean Video Card (6 cols) */}
          <div className="lg:col-span-6 xl:col-span-6 w-full relative flex justify-center lg:justify-end mt-2 lg:mt-0">
            
            {/* Ambient Warm Golden Glow behind Card */}
            <div className="absolute -top-12 -right-8 w-64 sm:w-[450px] h-64 sm:h-[450px] bg-[#E07B10]/20 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute -bottom-10 -left-8 w-56 sm:w-96 h-56 sm:h-96 bg-[#E07B10]/15 rounded-full blur-3xl pointer-events-none -z-10" />

            {/* Large Clean Video Frame Card */}
            <div className="relative rounded-2xl sm:rounded-[36px] overflow-hidden bg-[#0E1721] border border-[#E2DFDC]/70 shadow-[0_20px_50px_rgba(27,43,58,0.18)] aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] w-full max-w-[640px]">
              
              {/* Pure Video: Big, Crisp, Muted, Continuous Loop */}
              <video
                src="/hero-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />

            </div>
          </div>

        </div>
      </div>

      {/* Vertical Fixed Scroll Indicator (on large screens) */}
      <div className="hidden lg:flex absolute right-6 md:right-10 bottom-8 flex-col items-center gap-2 z-10 pointer-events-none">
        <span className="font-display text-[11px] tracking-[0.25em] uppercase text-[#8C949C] [writing-mode:vertical-rl] font-bold">
          SCROLL
        </span>
        <div className="w-[2px] h-12 bg-gradient-to-b from-[#E07B10] to-transparent" />
      </div>

      {/* 3D Flip Fade Text Keyframes */}
      <style>{`
        @keyframes letterFlipIn {
          0% {
            opacity: 0;
            transform: rotateX(-90deg) translateY(24px);
            filter: blur(4px);
          }
          60% {
            opacity: 1;
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: rotateX(0deg) translateY(0px);
            filter: blur(0px);
          }
        }

        @keyframes letterFlipOut {
          0% {
            opacity: 1;
            transform: rotateX(0deg) translateY(0px);
            filter: blur(0px);
          }
          100% {
            opacity: 0;
            transform: rotateX(90deg) translateY(-24px);
            filter: blur(4px);
          }
        }
      `}</style>
    </section>
  )
}
