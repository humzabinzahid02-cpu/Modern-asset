import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProductConfig } from '../types/store';
import { StoryCard } from './StoryCard';

gsap.registerPlugin(ScrollTrigger);

interface ShoeScrollSectionProps {
  sectionId: string;
  config: ProductConfig;
  frames: HTMLImageElement[];
}

export const ShoeScrollSection: React.FC<ShoeScrollSectionProps> = ({
  sectionId,
  config,
  frames,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);

  const [activeCards, setActiveCards] = useState<boolean[]>([false, false, false]);
  const activeCardsRef = useRef<boolean[]>([false, false, false]);
  const lastFrameRef = useRef<number>(-1);
  const pendingFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !frames.length || !frames[0]) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const seq = { frame: 0 };

    const paintFrame = (frameIdx: number) => {
      const clamped = Math.min(Math.max(Math.round(frameIdx), 0), frames.length - 1);
      if (clamped === lastFrameRef.current) return;
      lastFrameRef.current = clamped;

      const img = frames[clamped];
      if (!img || !img.naturalWidth) return;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    const resize = () => {
      const img = frames[0];
      if (!img || !img.naturalWidth) return;

      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const aspect = iw / ih;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      let drawW: number;
      let drawH: number;
      if (vw / vh > aspect) {
        drawH = vh * (vw < 768 ? 0.82 : 0.92);
        drawW = drawH * aspect;
      } else {
        drawW = vw * (vw < 768 ? 0.92 : 0.96);
        drawH = drawW / aspect;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(drawW * dpr);
      canvas.height = Math.round(drawH * dpr);
      canvas.style.width = `${Math.round(drawW)}px`;
      canvas.style.height = `${Math.round(drawH)}px`;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium';

      lastFrameRef.current = -1;
      paintFrame(seq.frame);
    };

    resize();
    window.addEventListener('resize', resize);

    const tween = gsap.to(seq, {
      frame: config.count - 1,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.05,
        onUpdate: (self) => {
          const p = self.progress;
          const targetFrame = Math.min(
            Math.max(Math.round(p * (config.count - 1)), 0),
            config.count - 1
          );

          if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = requestAnimationFrame(() => paintFrame(targetFrame));

          // Hero card shrink/fade — direct DOM manipulation, no React state
          if (heroRef.current) {
            if (p < 0.12) {
              const f = 1 - p / 0.12;
              heroRef.current.style.opacity = `${f}`;
              heroRef.current.style.transform = `scale(${0.9 + f * 0.1}) translateY(${(1 - f) * -40}px)`;
            } else {
              heroRef.current.style.opacity = '0';
              heroRef.current.style.pointerEvents = 'none';
            }
          }

          // Story cards visibility — only setState when values change
          const c0 = p >= 0.15 && p <= 0.38;
          const c1 = p >= 0.40 && p <= 0.65;
          const c2 = p >= 0.68 && p <= 0.98;

          if (
            c0 !== activeCardsRef.current[0] ||
            c1 !== activeCardsRef.current[1] ||
            c2 !== activeCardsRef.current[2]
          ) {
            const nextState = [c0, c1, c2];
            activeCardsRef.current = nextState;
            setActiveCards(nextState);
          }
        },
      },
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener('resize', resize);
      tween.kill();
    };
  }, [frames, config]);

  const sectionHeightVh = Math.max(140, Math.round((config.count / 240) * 200 + 120));

  return (
    <section
      ref={sectionRef}
      className="shoe-scroll-section"
      id={sectionId}
      style={{ height: `${sectionHeightVh}vh` }}
    >
      <div className="pinned-stage">
        {/* Floating Particle Motes */}
        <div className="floating-motes">
          <span /><span /><span /><span /><span /><span />
        </div>

        {/* Ambient Backlight Glow */}
        <div className="ambient-canvas-glow" />
        <div className="canvas-overlay-darkener" />
        <canvas ref={canvasRef} className="shoe-canvas" />

        {/* Hero Overlay */}
        <div
          ref={heroRef}
          className="absolute z-20 inset-0 flex flex-col items-center justify-center pt-20 sm:pt-24 px-4 text-center pointer-events-auto"
        >
          {/* Badge */}
          <div className="liquid-glass rounded-full inline-flex items-center p-1 sm:p-1.5 pr-3 sm:pr-4 text-xs sm:text-sm text-white/90 font-body mb-4 sm:mb-6">
            <span className="accent-glow-btn text-white px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold mr-2 sm:mr-3">New</span>
            <span className="truncate max-w-[200px] sm:max-w-none">{config.badge}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.9] sm:leading-[0.8] max-w-3xl justify-center tracking-[-2px] sm:tracking-[-4px] mb-3 sm:mb-4">
            {config.name}
          </h1>

          {/* Subheading */}
          <p className="text-xs sm:text-sm md:text-base text-[var(--accent)] font-medium max-w-xl font-body leading-tight text-center mb-5 sm:mb-6 px-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {config.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3 sm:gap-6 mb-6 sm:mb-8">
            <button className="accent-glow-btn rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white flex items-center gap-1.5 sm:gap-2 cursor-pointer">
              <span>Explore</span>
              <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </button>

            <div className="liquid-glass rounded-full px-3.5 sm:px-4 py-2 text-[11px] sm:text-xs font-medium text-white/70 flex items-center gap-1.5 sm:gap-2">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24" style={{ color: 'var(--accent)' }}>
                <polygon points="6 4 20 12 6 20 6 4" />
              </svg>
              <span>Scroll down</span>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex flex-row justify-center items-stretch gap-3 sm:gap-4 w-full max-w-[460px] px-2">
            <div className="liquid-glass p-3.5 sm:p-5 flex-1 rounded-[1rem] sm:rounded-[1.25rem] flex flex-col justify-between text-left">
              <svg className="w-5 h-5 sm:w-7 sm:h-7 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" style={{ color: 'var(--accent)' }}>
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <div className="mt-4 sm:mt-6">
                <div className="text-2xl sm:text-4xl font-heading italic text-white tracking-[-1px] leading-none">34.5 Min</div>
                <div className="text-[10px] sm:text-xs text-white/50 font-body font-light mt-1 sm:mt-2">Avg Watch Time</div>
              </div>
            </div>

            <div className="liquid-glass p-3.5 sm:p-5 flex-1 rounded-[1rem] sm:rounded-[1.25rem] flex flex-col justify-between text-left">
              <svg className="w-5 h-5 sm:w-7 sm:h-7 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" style={{ color: 'var(--accent)' }}>
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <div className="mt-4 sm:mt-6">
                <div className="text-2xl sm:text-4xl font-heading italic accent-text tracking-[-1px] leading-none">{config.price}</div>
                <div className="text-[10px] sm:text-xs text-white/50 font-body font-light mt-1 sm:mt-2">Aerospace Grade</div>
              </div>
            </div>
          </div>
        </div>

        {/* Story Cards */}
        {config.cards.map((card, i) => (
          <StoryCard key={card.id} data={card} visible={activeCards[i]} />
        ))}
      </div>
    </section>
  );
};
