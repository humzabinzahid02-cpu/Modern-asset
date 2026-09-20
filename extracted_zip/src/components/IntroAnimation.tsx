import { useState, useEffect } from 'react'

const WORDS = [
  { text: 'مرحباً',    lang: 'Arabic',     dir: 'rtl' },
  { text: 'Hello',     lang: 'English',    dir: 'ltr' },
  { text: 'Bonjour',   lang: 'French',     dir: 'ltr' },
  { text: 'Hola',      lang: 'Spanish',    dir: 'ltr' },
  { text: '你好',       lang: 'Chinese',    dir: 'ltr' },
  { text: 'नमस्ते',    lang: 'Hindi',      dir: 'ltr' },
  { text: 'Merhaba',   lang: 'Turkish',    dir: 'ltr' },
  { text: 'Hallo',     lang: 'German',     dir: 'ltr' },
  { text: 'こんにちは', lang: 'Japanese',  dir: 'ltr' },
  { text: 'Olá',       lang: 'Portuguese', dir: 'ltr' },
]

const HOLD = 420    // ms each word is fully visible
const TRANS = 260   // ms fade transition
const STEP = HOLD + TRANS

interface Props {
  onDone: () => void
}

type Phase = 'word' | 'brand' | 'exit'

export default function IntroAnimation({ onDone }: Props) {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('word')
  const [wordVisible, setWordVisible] = useState(true)
  const [curtain, setCurtain] = useState(false)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    WORDS.forEach((_, i) => {
      // fade in each word
      timers.push(setTimeout(() => {
        setIndex(i)
        setWordVisible(true)
      }, i * STEP))

      // fade out each word
      timers.push(setTimeout(() => {
        setWordVisible(false)
      }, i * STEP + HOLD))
    })

    const brandStart = WORDS.length * STEP + 100

    // show brand name
    timers.push(setTimeout(() => {
      setPhase('brand')
      setWordVisible(true)
    }, brandStart))

    // start exit curtain
    timers.push(setTimeout(() => {
      setPhase('exit')
      setCurtain(true)
    }, brandStart + 1000))

    // call done
    timers.push(setTimeout(() => {
      onDone()
    }, brandStart + 1700))

    return () => timers.forEach(clearTimeout)
  }, [onDone])

  const word = WORDS[index]

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0c0c14',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,197,24,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Thin horizontal rule */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(245,197,24,0.25), transparent)',
      }} />

      {phase === 'word' && (
        <div
          style={{
            textAlign: 'center',
            animation: wordVisible
              ? 'introIn 260ms cubic-bezier(0.22,1,0.36,1) forwards'
              : 'introOut 260ms ease forwards',
          }}
        >
          <div
            dir={word?.dir}
            style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: 'clamp(72px, 15vw, 160px)',
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-0.01em',
              background: 'linear-gradient(135deg, #F5C518 0%, #ffffff 65%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {word?.text}
          </div>
          <div style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
            marginTop: 12,
          }}>
            {word?.lang}
          </div>
        </div>
      )}

      {phase === 'brand' && (
        <div style={{
          textAlign: 'center',
          animation: wordVisible ? 'introIn 500ms cubic-bezier(0.22,1,0.36,1) forwards' : undefined,
        }}>
          {/* MA monogram */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            marginBottom: 16,
          }}>
            <div style={{
              width: 40,
              height: 40,
              background: 'linear-gradient(135deg,#F5C518,#E6A800)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontWeight: 900,
                fontSize: 20,
                color: '#0c0c14',
                letterSpacing: '-0.02em',
              }}>M</span>
            </div>
          </div>
          <div style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontSize: 'clamp(52px, 10vw, 110px)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            background: 'linear-gradient(90deg, #F5C518 0%, #ffffff 55%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Modern Assets
          </div>
          <div style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
            marginTop: 14,
          }}>
            Custom Fabrication Solutions
          </div>
        </div>
      )}

      {/* Curtain slide up */}
      {curtain && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: '#0c0c14',
          animation: 'curtainUp 700ms cubic-bezier(0.76,0,0.24,1) forwards',
        }} />
      )}
    </div>
  )
}
