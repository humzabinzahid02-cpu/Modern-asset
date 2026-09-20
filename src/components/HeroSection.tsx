import React from 'react';
import { motion } from 'framer-motion';
import { FadingVideo } from './FadingVideo';
import { BlurText } from './BlurText';

const ArrowUpRight: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
);

const PlayIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <polygon points="6 4 20 12 6 20 6 4" fill="currentColor" />
  </svg>
);

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex flex-col justify-between">
      {/* Background Video (120% scale, top-aligned, centered) */}
      <FadingVideo
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
        className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0 pointer-events-none"
        style={{ width: "120%", height: "120%" }}
      />

      {/* Navbar */}
      <header className="fixed top-4 left-0 right-0 px-8 lg:px-16 z-50 flex items-center justify-between pointer-events-none">
        {/* Logo */}
        <div className="w-12 h-12 liquid-glass rounded-full flex items-center justify-center pointer-events-auto cursor-pointer">
          <span className="font-heading italic text-2xl text-white">a</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex liquid-glass rounded-full px-1.5 py-1.5 items-center gap-1 pointer-events-auto">
          {['Home', 'Voyages', 'Worlds', 'Innovation', 'Plan Launch'].map((link) => (
            <a key={link} href="#" className="px-3 py-2 text-sm font-medium text-white/90 font-body hover:text-white transition-colors">
              {link}
            </a>
          ))}
          <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap flex items-center gap-1.5 hover:bg-white/90 transition-colors ml-1">
            <span>Claim a Spot</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* Right Spacer */}
        <div className="w-12 h-12 pointer-events-none" />
      </header>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center pt-24 px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="liquid-glass rounded-full inline-flex items-center p-1.5 pr-4 text-sm text-white/90 font-body mb-6"
        >
          <span className="bg-white text-black px-3 py-1 rounded-full text-xs font-semibold mr-3">New</span>
          <span>Maiden Crewed Voyage to Mars Arrives 2026</span>
        </motion.div>

        {/* Animated Word-by-Word Blur Headline */}
        <BlurText
          text="Venture Past Our Sky Across the Universe"
          className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] max-w-2xl justify-center tracking-[-4px]"
        />

        {/* Subheading */}
        <motion.p
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          className="mt-4 text-sm md:text-base text-white max-w-2xl font-body font-light leading-tight text-center"
        >
          Discover the universe in ways once unimaginable. Our pioneering vessels and breakthrough engineering bring deep-space exploration within reach—secure and extraordinary.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: 'easeOut' }}
          className="flex items-center gap-6 mt-6"
        >
          <button className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity">
            <span>Start Your Voyage</span>
            <ArrowUpRight className="h-5 w-5" />
          </button>

          <button className="flex items-center gap-2 text-sm font-medium text-white cursor-pointer hover:text-white/80 transition-colors">
            <PlayIcon className="h-4 w-4" />
            <span>View Liftoff</span>
          </button>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: 'easeOut' }}
          className="flex flex-wrap justify-center items-stretch gap-4 mt-8"
        >
          {/* Card 1 */}
          <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem] flex flex-col justify-between text-left">
            <svg className="w-7 h-7 text-white stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <div className="mt-6">
              <div className="text-4xl font-heading italic text-white tracking-[-1px] leading-none">34.5 Min</div>
              <div className="text-xs text-white font-body font-light mt-2">Average Videos Watch Time</div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem] flex flex-col justify-between text-left">
            <svg className="w-7 h-7 text-white stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <div className="mt-6">
              <div className="text-4xl font-heading italic text-white tracking-[-1px] leading-none">2.8B+</div>
              <div className="text-xs text-white font-body font-light mt-2">Users Across the Globe</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Partners Footer */}
      <motion.div
        initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
        animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center gap-4 pb-8 mt-12"
      >
        <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white">
          Collaborating with top aerospace pioneers globally
        </div>
        <div className="flex items-center justify-center gap-12 md:gap-16 font-heading italic text-white text-2xl md:text-3xl tracking-tight">
          <span>Aeon</span>
          <span>Vela</span>
          <span>Apex</span>
          <span>Orbit</span>
          <span>Zeno</span>
        </div>
      </motion.div>
    </section>
  );
};
