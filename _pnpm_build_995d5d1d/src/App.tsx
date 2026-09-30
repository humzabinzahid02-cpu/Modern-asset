import { lazy, Suspense, useState, useEffect } from 'react'
import { LanguageContext } from './LanguageContext'
import IntroAnimation from './components/IntroAnimation'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Ticker from './components/Ticker'
import Products from './components/Products'
import Process from './components/Process'
import WhyUs from './components/WhyUs'
import StartWithUsCTA from './components/StartWithUsCTA'
import Footer from './components/Footer'
import SectionMarquee from './components/SectionMarquee'
import PageTransitionOverlay from './components/PageTransitionOverlay'
const QuotePage = lazy(() => import('./pages/QuotePage'))

import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function App() {
  const [introDone, setIntroDone] = useState(() => {
    if (typeof window === 'undefined') return false
    const skipIntro = window.matchMedia('(max-width: 767px), (prefers-reduced-motion: reduce)').matches
    try {
      return skipIntro || window.sessionStorage.getItem('modern-assets-intro-seen') === '1'
    } catch {
      return skipIntro
    }
  })
  const [isArabic, setIsArabic] = useState(true)
  const [currentPage, setCurrentPage] = useState<'home' | 'quote'>('home')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionText, setTransitionText] = useState('DESIGNED FOR RESULTS')
  const [pendingNav, setPendingNav] = useState<{ page: 'home' | 'quote'; sectionId?: string } | null>(null)

  const handleIntroDone = () => {
    try {
      window.sessionStorage.setItem('modern-assets-intro-seen', '1')
    } catch {
      // The intro can still finish when storage is unavailable.
    }
    setIntroDone(true)
  }

  useEffect(() => {
    const languageClass = isArabic ? 'app-language-ar' : 'app-language-en'
    const oppositeClass = isArabic ? 'app-language-en' : 'app-language-ar'
    for (const element of [document.documentElement, document.body]) {
      element.classList.remove(oppositeClass)
      element.classList.add(languageClass)
      element.lang = isArabic ? 'ar' : 'en'
    }
  }, [isArabic])

  // Listen to hash on load or back button
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash
      if (hash === '#quote' || hash === '#contact-form') {
        setCurrentPage('quote')
      } else if (hash === '#home' || hash === '' || hash === '#products') {
        setCurrentPage('home')
      }
    }

    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  // Refresh ScrollTrigger once intro completes
  useEffect(() => {
    if (introDone) {
      const t1 = setTimeout(() => ScrollTrigger.refresh(), 100)
      const t2 = setTimeout(() => ScrollTrigger.refresh(), 650)
      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
      }
    }
  }, [introDone])

  // Trigger page transition (down-to-up curtain)
  const triggerNavigation = (targetPage: 'home' | 'quote', sectionId?: string) => {
    if (targetPage === currentPage && sectionId) {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      return
    }

    if (targetPage === currentPage) return

    setTransitionText(targetPage === 'quote' ? (isArabic ? 'صُممت لتحقيق أفضل النتائج' : 'DESIGNED FOR RESULTS') : (isArabic ? 'مودرن أسيتس' : 'MODERN ASSETS'))
    setPendingNav({ page: targetPage, sectionId })
    setIsTransitioning(true)
  }

  const handleCovered = () => {
    if (pendingNav) {
      setCurrentPage(pendingNav.page)
      window.scrollTo({ top: 0, behavior: 'instant' })
      window.history.replaceState(null, '', pendingNav.page === 'quote' ? '#quote' : '#home')
    }
  }

  const handleComplete = () => {
    setIsTransitioning(false)
    if (pendingNav?.sectionId) {
      const id = pendingNav.sectionId
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 60)
    }
    setPendingNav(null)
  }

  return (
    <LanguageContext.Provider value={{ isArabic, toggleLanguage: () => setIsArabic((value) => !value) }}>
    <div lang={isArabic ? 'ar' : 'en'} dir="ltr" className={`app-shell ${isArabic ? 'app-language-ar' : 'app-language-en'}`}>
      {/* Initial Splash Animation */}
      {!introDone && <IntroAnimation onDone={handleIntroDone} />}

      {/* Down-to-Up Full-Screen Page Transition Overlay */}
      <PageTransitionOverlay
        isTransitioning={isTransitioning}
        transitionText={transitionText}
        onCovered={handleCovered}
        onComplete={handleComplete}
      />

      <div
        style={{
          opacity: introDone ? 1 : 0,
          transition: 'opacity 600ms ease',
          pointerEvents: introDone ? 'auto' : 'none',
        }}
      >
        {currentPage === 'home' ? (
          /* ── Main Landing Page ── */
          <>
            <Nav
              currentPage="home"
              onNavigate={(page, sectionId) => triggerNavigation(page, sectionId)}
            />
            <Hero onOpenQuote={() => triggerNavigation('quote')} />
            <Stats />
            <Ticker />
            <Products />

            {/* Marquee transition: Products → Process */}
            <SectionMarquee
              items={isArabic ? ['التميز الهندسي', 'آلية العمل', 'من الفكرة إلى الطريق'] : ['Engineering Excellence', 'Our Process', 'From Concept to Road']}
              direction="ltr"
              background="#1B2B3A"
              textSize={90}
              duration={28}
            />

            <Process />

            {/* WhyUs section */}
            <WhyUs />

            {/* Start With Us CTA (Replaces inline form with INQUIRE QUOTE button) */}
            <StartWithUsCTA onOpenQuote={() => triggerNavigation('quote')} />

            <Footer />
          </>
        ) : (
          /* ── Dedicated Quote & Custom Fleet Request Page ── */
          <Suspense fallback={<div className="min-h-screen bg-[#F6F5F1]" aria-busy="true" />}>
            <QuotePage onBackToHome={() => triggerNavigation('home')} />
          </Suspense>
        )}
      </div>
    </div>
    </LanguageContext.Provider>
  )
}
