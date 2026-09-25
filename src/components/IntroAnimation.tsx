import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  onDone: () => void
}

interface IntroItem {
  type: 'word' | 'brand'
  text?: string
  lang?: string
  dir?: 'ltr' | 'rtl'
  theme: 'dark' | 'light'
}

// Alternating Dark -> Light -> Dark -> Light -> Dark -> Light (Modern Assets)
const SEQUENCE: IntroItem[] = [
  { type: 'word', text: 'مرحباً', lang: 'Arabic', dir: 'rtl', theme: 'dark' },
  { type: 'word', text: 'Hello', lang: 'English', dir: 'ltr', theme: 'light' },
  { type: 'word', text: 'Bonjour', lang: 'French', dir: 'ltr', theme: 'dark' },
  { type: 'word', text: 'Hola', lang: 'Spanish', dir: 'ltr', theme: 'light' },
  { type: 'word', text: 'Merhaba', lang: 'Turkish', dir: 'ltr', theme: 'dark' },
  { type: 'brand', theme: 'light' }, // Final: Modern Assets brand on light theme matching the website
]

const HOLD_DURATION = 650    // ms each word is held stably before wipe
const WIPE_DURATION = 1100    // ms for each left-to-right physical theme wipe
const FINAL_BRAND_HOLD = 650 // ms Modern Assets holds before logo docks into navbar

type Phase = 'sequence' | 'docking' | 'exit'

export default function IntroAnimation({ onDone }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState<number | null>(null)
  const [wipeProgress, setWipeProgress] = useState(0) // 0% to 100%
  const [isWiping, setIsWiping] = useState(false)
  const [phase, setPhase] = useState<Phase>('sequence')
  const [bgFade, setBgFade] = useState(false)

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const animFrameRef = useRef<number | null>(null)
  const isCancelledRef = useRef(false)

  const clearAllTimers = () => {
    isCancelledRef.current = true
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current)
      animFrameRef.current = null
    }
  }

  const triggerDocking = () => {
    clearAllTimers()
    setPhase('docking')
    setBgFade(true)

    // After docking completes (750ms transition + small buffer), finish intro
    const exitTimer = setTimeout(() => {
      setPhase('exit')
      onDone()
    }, 850)
    timersRef.current.push(exitTimer)
  }

  const handleSkip = () => {
    if (phase === 'docking' || phase === 'exit') return
    triggerDocking()
  }

  // Orchestrate the sequential L-to-R theme wipe transitions
  useEffect(() => {
    isCancelledRef.current = false

    const runWipeTransition = (fromIdx: number, toIdx: number) => {
      if (isCancelledRef.current) return

      setPrevIndex(fromIdx)
      setCurrentIndex(toIdx)
      setIsWiping(true)
      setWipeProgress(0)

      let startTimestamp: number | null = null

      const step = (now: number) => {
        if (isCancelledRef.current) return
        if (!startTimestamp) startTimestamp = now
        const elapsed = now - startTimestamp
        const progress = Math.min(elapsed / WIPE_DURATION, 1)

        // Smooth cubic ease-in-out curve
        const ease =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2

        setWipeProgress(ease * 100)

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(step)
        } else {
          // Wipe completed
          setWipeProgress(100)
          setIsWiping(false)
          setPrevIndex(null)

          if (toIdx === SEQUENCE.length - 1) {
            // Reached final brand slide ("Modern Assets" on light theme)
            const dockTimer = setTimeout(() => {
              triggerDocking()
            }, FINAL_BRAND_HOLD)
            timersRef.current.push(dockTimer)
          } else {
            // Hold clean word, then trigger next wipe
            const nextTimer = setTimeout(() => {
              runWipeTransition(toIdx, toIdx + 1)
            }, HOLD_DURATION)
            timersRef.current.push(nextTimer)
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(step)
    }

    // Initial hold on the first item (مرحباً on dark)
    const initialTimer = setTimeout(() => {
      runWipeTransition(0, 1)
    }, HOLD_DURATION + 150)
    timersRef.current.push(initialTimer)

    return clearAllTimers
  }, [onDone])

  if (phase === 'exit') return null

  const isDocking = phase === 'docking'
  const isBeamVisible = isWiping && wipeProgress > 0.5 && wipeProgress < 99.5

  const currentItem = SEQUENCE[currentIndex]
  const prevItem = prevIndex !== null ? SEQUENCE[prevIndex] : null

  // Helper to render content for a given sequence item
  const renderItemContent = (item: IntroItem) => {
    const isDark = item.theme === 'dark'
    const textColor = isDark ? '#FFFFFF' : '#1B2B3A'
    const subColor = '#E07B10'
    const horizonOpacity = isDocking ? 0 : isDark ? 0.35 : 0.25

    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            item.theme === 'light' && bgFade
              ? 'rgba(246,245,241,0)'
              : item.theme === 'dark'
              ? '#0B131E'
              : '#F6F5F1',
          transition: isDocking ? 'background 750ms cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
          overflow: 'hidden',
          pointerEvents: isDocking ? 'none' : 'auto',
        }}
      >
        {/* Subtle Ambient Radial Lighting */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(600px, 85vw)',
            height: 'min(600px, 85vw)',
            borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle, rgba(224,123,16,0.18) 0%, rgba(11,19,30,0) 70%)'
              : 'radial-gradient(circle, rgba(224,123,16,0.12) 0%, transparent 68%)',
            pointerEvents: 'none',
            opacity: isDocking ? 0 : 1,
            transition: 'opacity 500ms ease',
          }}
        />

        {/* Decorative Center Accent Horizon Line */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: 1,
            background: isDark
              ? 'linear-gradient(90deg, transparent, rgba(224,123,16,0.35), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(224,123,16,0.25), transparent)',
            transform: 'translateY(-50%)',
            opacity: horizonOpacity,
            transition: 'opacity 400ms ease',
          }}
        />

        {/* Word Greetings Content */}
        {item.type === 'word' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 20px',
              pointerEvents: 'none',
              zIndex: 5,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                maxWidth: '90vw',
                userSelect: 'none',
              }}
            >
              <div
                dir={item.dir}
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 'clamp(48px, 14vw, 130px)',
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: '-0.01em',
                  color: textColor,
                  textAlign: 'center',
                  wordBreak: 'break-word',
                  textShadow: isDark ? '0 4px 30px rgba(0,0,0,0.6)' : 'none',
                }}
              >
                {item.text}
              </div>
              <div
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 'clamp(10px, 2.5vw, 12px)',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  color: subColor,
                  marginTop: 14,
                  textAlign: 'center',
                }}
              >
                {item.lang}
              </div>
            </div>
          </div>
        )}

        {/* Brand Presentation ("Modern Assets" logo + docking into navbar) */}
        {item.type === 'brand' && (
          <div
            style={{
              position: 'absolute',
              zIndex: 10,
              transformOrigin: isDocking ? 'top left' : 'center center',
              top: isDocking ? 18 : '50%',
              left: isDocking ? 'clamp(16px, 4vw, 80px)' : '50%',
              transform: isDocking ? 'translate(0, 0)' : 'translate(-50%, -50%)',
              transition:
                'top 750ms cubic-bezier(0.16, 1, 0.3, 1), left 750ms cubic-bezier(0.16, 1, 0.3, 1), transform 750ms cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              maxWidth: isDocking ? 'none' : '90vw',
              userSelect: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}modern-assets-logo.png`}
              alt="Modern Assets — Heavy Vehicle Solutions"
              style={{ width: isDocking ? 205 : 'min(76vw, 520px)', height: isDocking ? 58 : 'auto', objectFit: 'contain', transition: 'all 750ms cubic-bezier(0.16, 1, 0.3, 1)' }}
            />

            {/* Subtitle that gracefully fades out during docking */}
            <div
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(9px, 2.5vw, 11px)',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: '#5C6470',
                opacity: isDocking ? 0 : 1,
                transform: isDocking ? 'translateY(10px) scale(0.9)' : 'translateY(0) scale(1)',
                transition: 'opacity 350ms ease, transform 350ms ease',
                pointerEvents: 'none',
                marginTop: isDocking ? 0 : 6,
                display: isDocking ? 'none' : 'block',
                textAlign: 'center',
              }}
            >
              Custom Fabrication Solutions
            </div>
          </div>
        )}
      </div>
    )
  }

  const content = (
    <div
      onClick={handleSkip}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100dvh',
        zIndex: 99999,
        background: '#0B131E',
        pointerEvents: isDocking ? 'none' : 'auto',
        overflow: 'hidden',
        cursor: isDocking ? 'default' : 'pointer',
      }}
    >
      {/* CASE 1: Currently wiping between previous and current items */}
      {isWiping && prevItem && (
        <>
          {/* Layer 1: Outgoing previous word (clipped from left as wipe advances) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              clipPath: `inset(0 0 0 ${wipeProgress}%)`,
              WebkitClipPath: `inset(0 0 0 ${wipeProgress}%)`,
              zIndex: 1,
            }}
          >
            {renderItemContent(prevItem)}
          </div>

          {/* Layer 2: Incoming current word (revealed from left to right) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              clipPath: `inset(0 ${100 - wipeProgress}% 0 0)`,
              WebkitClipPath: `inset(0 ${100 - wipeProgress}% 0 0)`,
              zIndex: 2,
            }}
          >
            {renderItemContent(currentItem)}
          </div>

          {/* Moving Illuminated Wipe Beam with Glowing Flare */}
          {isBeamVisible && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${wipeProgress}%`,
                width: 3,
                transform: 'translateX(-50%)',
                zIndex: 50,
                pointerEvents: 'none',
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, #FFFFFF 20%, #FFFFFF 80%, rgba(255,255,255,0.2) 100%)',
                boxShadow: `
                  0 0 15px 2px #FFFFFF,
                  0 0 35px 8px rgba(224, 123, 16, 0.8),
                  -12px 0 50px 12px rgba(255, 255, 255, 0.7),
                  12px 0 50px 12px rgba(27, 43, 58, 0.5)
                `,
              }}
            >
              {/* Central glowing flare */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 160,
                  height: 420,
                  borderRadius: '50%',
                  background:
                    'radial-gradient(ellipse at center, rgba(255,255,255,0.85) 0%, rgba(224,123,16,0.45) 45%, transparent 75%)',
                  filter: 'blur(12px)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          )}
        </>
      )}

      {/* CASE 2: Holding on current item (not wiping, or docking) */}
      {!isWiping && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          {renderItemContent(currentItem)}
        </div>
      )}
    </div>
  )

  if (typeof document === 'undefined') return null
  return createPortal(content, document.body)
}
