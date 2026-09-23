import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const WORDS = [
  { text: 'مرحباً', lang: 'Arabic', dir: 'rtl' },
  { text: 'Hello', lang: 'English', dir: 'ltr' },
  { text: 'Bonjour', lang: 'French', dir: 'ltr' },
  { text: 'Hola', lang: 'Spanish', dir: 'ltr' },
  { text: '你好', lang: 'Chinese', dir: 'ltr' },
  { text: 'नमस्ते', lang: 'Hindi', dir: 'ltr' },
  { text: 'Merhaba', lang: 'Turkish', dir: 'ltr' },
  { text: 'Hallo', lang: 'German', dir: 'ltr' },
  { text: 'こんにちは', lang: 'Japanese', dir: 'ltr' },
  { text: 'Olá', lang: 'Portuguese', dir: 'ltr' },
]

const HOLD = 320    // ms each word is fully visible
const TRANS = 200   // ms fade transition
const STEP = HOLD + TRANS

interface Props {
  onDone: () => void
}

type Phase = 'word' | 'brand' | 'docking' | 'exit'

export default function IntroAnimation({ onDone }: Props) {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('word')
  const [wordVisible, setWordVisible] = useState(true)
  const [bgFade, setBgFade] = useState(false)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  const triggerDocking = () => {
    clearAllTimers()
    setPhase('docking')
    setBgFade(true)

    // After docking completes, notify parent
    const exitTimer = setTimeout(() => {
      setPhase('exit')
      onDone()
    }, 800)
    timersRef.current.push(exitTimer)
  }

  const handleSkip = () => {
    if (phase === 'docking' || phase === 'exit') return
    triggerDocking()
  }

  useEffect(() => {
    WORDS.forEach((_, i) => {
      // fade in each word
      timersRef.current.push(
        setTimeout(() => {
          setIndex(i)
          setWordVisible(true)
        }, i * STEP)
      )

      // fade out each word
      timersRef.current.push(
        setTimeout(() => {
          setWordVisible(false)
        }, i * STEP + HOLD)
      )
    })

    const brandStart = WORDS.length * STEP + 80

    // Show centered brand name
    timersRef.current.push(
      setTimeout(() => {
        setPhase('brand')
        setWordVisible(true)
      }, brandStart)
    )

    // Start seamless docking transition into navbar logo
    timersRef.current.push(
      setTimeout(() => {
        triggerDocking()
      }, brandStart + 1100)
    )

    return clearAllTimers
  }, [onDone])

  const word = WORDS[index]

  if (phase === 'exit') return null

  const isDocking = phase === 'docking'

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
        background: bgFade ? 'rgba(244,243,239,0)' : '#F6F5F1',
        pointerEvents: isDocking ? 'none' : 'auto',
        transition: 'background 750ms cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden',
        cursor: isDocking ? 'default' : 'pointer',
      }}
    >
      {/* Subtle ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(500px, 85vw)',
          height: 'min(500px, 85vw)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(224,123,16,0.12) 0%, transparent 68%)',
          pointerEvents: 'none',
          opacity: isDocking ? 0 : 1,
          transition: 'opacity 500ms ease',
        }}
      />

      {/* Decorative center accent line */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(224,123,16,0.25), transparent)',
          transform: 'translateY(-50%)',
          opacity: isDocking ? 0 : 0.6,
          transition: 'opacity 400ms ease',
        }}
      />

      {/* Multilingual greetings phase */}
      {phase === 'word' && (
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
              animation: wordVisible
                ? 'introIn 200ms cubic-bezier(0.22,1,0.36,1) forwards'
                : 'introOut 200ms ease forwards',
            }}
          >
            <div
              dir={word?.dir}
              style={{
                fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                fontSize: 'clamp(48px, 14vw, 130px)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                color: '#1B2B3A',
                textAlign: 'center',
                wordBreak: 'break-word',
              }}
            >
              {word?.text}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                fontSize: 'clamp(10px, 2.5vw, 12px)',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                fontWeight: 700,
                color: '#E07B10',
                marginTop: 12,
                textAlign: 'center',
              }}
            >
              {word?.lang}
            </div>
          </div>
        </div>
      )}

      {/* Brand presentation & seamless docking into nav logo */}
      {(phase === 'brand' || isDocking) && (
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            transformOrigin: isDocking ? 'top left' : 'center center',
            top: isDocking ? 18 : '50%',
            left: isDocking ? 'clamp(16px, 4vw, 80px)' : '50%',
            transform: isDocking
              ? 'translate(0, 0)'
              : 'translate(-50%, -50%)',
            transition: 'top 750ms cubic-bezier(0.16, 1, 0.3, 1), left 750ms cubic-bezier(0.16, 1, 0.3, 1), transform 750ms cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex',
            flexDirection: isDocking ? 'row' : 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isDocking ? 10 : 16,
            maxWidth: isDocking ? 'none' : '90vw',
          }}
        >
          {/* Logo Box with "M" */}
          <div
            style={{
              width: isDocking ? 36 : 48,
              height: isDocking ? 36 : 48,
              borderRadius: isDocking ? 8 : 10,
              background: 'linear-gradient(135deg, #E07B10 0%, #C46C0C 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: isDocking
                ? 'none'
                : '0 10px 30px rgba(224,123,16,0.3)',
              transition: 'all 750ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                fontWeight: 900,
                fontSize: isDocking ? 19 : 26,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                transition: 'font-size 750ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              M
            </span>
          </div>

          {/* "MODERN ASSETS" Typography */}
          <div
            style={{
              fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
              fontWeight: 800,
              fontSize: isDocking ? 'clamp(18px, 4vw, 20px)' : 'clamp(36px, 8vw, 84px)',
              letterSpacing: isDocking ? '0.04em' : '0.03em',
              textTransform: 'uppercase',
              lineHeight: 1,
              whiteSpace: 'nowrap',
              color: '#1B2B3A',
              transition: 'all 750ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            Modern Assets
          </div>

          {/* Subtitle that gracefully fades out during docking */}
          <div
            style={{
              fontFamily: 'var(--font-body, "Outfit", sans-serif)',
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

  if (typeof document === 'undefined') return null
  return createPortal(content, document.body)
}
