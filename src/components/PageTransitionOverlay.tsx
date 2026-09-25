import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface PageTransitionOverlayProps {
  isTransitioning: boolean
  transitionText?: string
  onCovered?: () => void
  onComplete?: () => void
}

export default function PageTransitionOverlay({
  isTransitioning,
  transitionText = 'DESIGNED FOR RESULTS',
  onCovered,
  onComplete,
}: PageTransitionOverlayProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const creamLayerRef = useRef<HTMLDivElement | null>(null)
  const navyLayerRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const activeTimeline = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (!isTransitioning) return

    const cream = creamLayerRef.current
    const navy = navyLayerRef.current
    const content = contentRef.current

    if (!cream || !navy || !content) return

    // Kill any existing timeline
    if (activeTimeline.current) {
      activeTimeline.current.kill()
    }

    // Prepare initial states: both curtains positioned below the screen (100%)
    gsap.set([cream, navy], {
      yPercent: 100,
      force3D: true,
    })
    gsap.set(content, {
      opacity: 0,
      y: 35,
      force3D: true,
    })

    const tl = gsap.timeline({
      onComplete: () => {
        // Reset positions below screen for next transition
        gsap.set([cream, navy], { yPercent: 100 })
        activeTimeline.current = null
        if (onComplete) onComplete()
      },
    })

    activeTimeline.current = tl

    // Phase 1: Cream layer sweeps up from bottom, closely followed by Deep Navy layer
    tl.to(cream, {
      yPercent: 0,
      duration: 0.75,
      ease: 'power4.inOut',
    })
      .to(
        navy,
        {
          yPercent: 0,
          duration: 0.75,
          ease: 'power4.inOut',
        },
        '-=0.55'
      )
      .to(
        content,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.3'
      )

      // Phase 2: Exact moment screen is fully covered -> trigger route/page switch
      .call(() => {
        if (onCovered) onCovered()
      })

      // Brief fluid hold so text is readable
      .to({}, { duration: 0.55 })

      // Phase 3: Content fades up, then Navy and Cream sweep up and out off the top
      .to(content, {
        opacity: 0,
        y: -30,
        duration: 0.35,
        ease: 'power2.in',
      })
      .to(
        navy,
        {
          yPercent: -100,
          duration: 0.75,
          ease: 'power4.inOut',
        },
        '-=0.12'
      )
      .to(
        cream,
        {
          yPercent: -100,
          duration: 0.75,
          ease: 'power4.inOut',
        },
        '-=0.55'
      )

    return () => {
      if (activeTimeline.current) {
        activeTimeline.current.kill()
      }
    }
  }, [isTransitioning, onCovered, onComplete])

  if (!isTransitioning) return null

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        pointerEvents: isTransitioning ? 'all' : 'none',
      }}
    >
      {/* ── Layer 1: Site Cream Layer (#F6F5F1) ── */}
      <div
        ref={creamLayerRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: '#F6F5F1',
          borderTop: '2px solid #E07B10',
          boxShadow: '0 -20px 50px rgba(0,0,0,0.12)',
          willChange: 'transform',
        }}
      />

      {/* ── Layer 2: Site Deep Navy Blue Layer (#1B2B3A) ── */}
      <div
        ref={navyLayerRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(145deg, #14212D 0%, #1B2B3A 55%, #24384B 100%)',
          borderTop: '2px solid #E07B10',
          boxShadow: '0 -25px 60px rgba(27,43,58,0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          willChange: 'transform',
        }}
      >
        {/* Subtle geometric dot pattern on navy curtain */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.06,
            backgroundImage: 'radial-gradient(#F6F5F1 1.5px, transparent 1.5px)',
            backgroundSize: '32px 32px',
            pointerEvents: 'none',
          }}
        />

        {/* Dynamic Transition Content */}
        <div
          ref={contentRef}
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 24px',
            textAlign: 'center',
            willChange: 'transform, opacity',
          }}
        >
          <img src="/modern-assets-logo.png" alt="Modern Assets — Heavy Vehicle Solutions" style={{ width: 'min(72vw, 360px)', height: 100, objectFit: 'contain', marginBottom: 24 }} />

          {/* Big Bold Display Headline in Site Cream */}
          <h1
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(44px, 8vw, 112px)',
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: '#F6F5F1',
              margin: 0,
              textShadow: '0 4px 24px rgba(0,0,0,0.3)',
            }}
          >
            {transitionText}
          </h1>

          {/* Subtitle with Site Golden Amber Accent */}
          <p
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '13px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#E07B10',
              fontWeight: 700,
              marginTop: 18,
            }}
          >
            Modern Assets • Heavy-Duty Engineering • KSA
          </p>
        </div>
      </div>
    </div>
  )
}
