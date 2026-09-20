import { useState } from 'react'
import IntroAnimation from './components/IntroAnimation'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Ticker from './components/Ticker'
import Products from './components/Products'
import Process from './components/Process'
import WhyUs from './components/WhyUs'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <>
      {!introDone && <IntroAnimation onDone={() => setIntroDone(true)} />}
      <div style={{
        opacity: introDone ? 1 : 0,
        transition: 'opacity 600ms ease',
        pointerEvents: introDone ? 'auto' : 'none',
      }}>
        <Nav />
        <Hero />
        <Stats />
        <Ticker />
        <Products />
        <Process />
        <WhyUs />
        <Contact />
        <Footer />
      </div>
    </>
  )
}
