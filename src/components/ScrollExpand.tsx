import React, { useCallback, useEffect, useRef } from 'react';
import './ScrollExpand.css';

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

export interface ScrollExpandProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  mediaType?: 'image' | 'video';
  poster?: string;
  alt?: string;
  title?: string;
  badge?: string;
  cardTint?: string;
  scrollHint?: string;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  overlayScrim?: number;
  useWindowScroll?: boolean;
  enabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const ScrollExpand: React.FC<ScrollExpandProps> = ({
  src = '',
  mediaType = 'image',
  poster = '',
  alt = '',
  title = '',
  badge = '',
  cardTint,
  scrollHint = '',
  startWidth = 76,
  startHeight = 78,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.25,
  scrollDistance = 0.9,
  holdDistance = 0.15,
  smoothing = 0.03,
  overlayScrim = 0.5,
  useWindowScroll = true,
  enabled = true,
  children,
  className = '',
  style,
  ...rest
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const borderGlowRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const propsRef = useRef({
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    useWindowScroll,
    enabled,
  });

  propsRef.current = {
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    useWindowScroll,
    enabled,
  };

  const applyProgress = useCallback((p: number) => {
    const card = cardRef.current;
    const media = mediaRef.current;
    if (!card || !media) return;
    const c = propsRef.current;

    const e = smoothstep(0, 1, p);

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const isTablet = typeof window !== 'undefined' && window.innerWidth < 1024;
    const baseStartWidth = isMobile ? 90 : isTablet ? 82 : (c.startWidth || 76);
    const baseStartHeight = isMobile ? 68 : isTablet ? 74 : (c.startHeight || 78);

    const sx = (baseStartWidth / 100) + (1 - baseStartWidth / 100) * e;
    const sy = (baseStartHeight / 100) + (1 - baseStartHeight / 100) * e;
    const r = c.startRadius + (c.endRadius - c.startRadius) * e;

    card.style.transform = `scale3d(${sx.toFixed(4)}, ${sy.toFixed(4)}, 1)`;
    card.style.borderRadius = `${r.toFixed(1)}px`;

    const zoom = c.mediaZoom + (1 - c.mediaZoom) * e;
    media.style.transform = `scale(${zoom.toFixed(4)})`;

    if (borderGlowRef.current) {
      const borderFade = smoothstep(0.7, 0.98, p);
      borderGlowRef.current.style.opacity = `${(1 - borderFade).toFixed(3)}`;
    }

    if (scrimRef.current) {
      scrimRef.current.style.opacity = `${(c.overlayScrim * e).toFixed(3)}`;
    }

    if (titleRef.current) {
      const out = smoothstep(0.2, 0.65, p);
      titleRef.current.style.opacity = `${(1 - out).toFixed(3)}`;
      titleRef.current.style.transform = `translate3d(0, ${(-20 * out).toFixed(1)}px, 0)`;
    }

    if (hintRef.current) {
      const gone = smoothstep(0, 0.12, p);
      hintRef.current.style.opacity = `${(1 - gone).toFixed(3)}`;
      hintRef.current.style.transform = `translate3d(0, ${(8 * gone).toFixed(1)}px, 0)`;
    }

    if (overlayRef.current) {
      const inn = smoothstep(0.45, 0.9, p);
      overlayRef.current.style.opacity = `${inn.toFixed(3)}`;
      overlayRef.current.style.transform = `translate3d(0, ${(16 * (1 - inn)).toFixed(1)}px, 0)`;
      overlayRef.current.style.pointerEvents = inn > 0.5 ? 'auto' : 'none';
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let current = 0;
    let target = 0;
    let stageH = 0;
    let trackDocTop = 0;
    let running = false;

    const measure = () => {
      const c = propsRef.current;
      const navOffset = c.useWindowScroll ? 90 : 0;
      stageH = c.useWindowScroll ? window.innerHeight - navOffset : root.clientHeight;
      if (stageH <= 0) return;
      stage.style.height = `${stageH}px`;
      stage.style.top = `${navOffset}px`;
      const totalSpanMultiplier = 1 + Math.max(0, c.scrollDistance) + Math.max(0, c.holdDistance);
      track.style.height = `${stageH * totalSpanMultiplier}px`;

      // Cache document-relative top position to prevent forced reflows on scroll
      const rect = track.getBoundingClientRect();
      trackDocTop = rect.top + (window.pageYOffset || document.documentElement.scrollTop);
    };

    const readProgress = () => {
      const c = propsRef.current;
      if (!c.enabled) return 1;
      const span = stageH * Math.max(0.01, c.scrollDistance);
      if (c.useWindowScroll) {
        const navOffset = 90;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const top = trackDocTop - scrollY - navOffset;
        return clamp(-top / span, 0, 1);
      }
      return clamp(root.scrollTop / span, 0, 1);
    };

    const tick = () => {
      const c = propsRef.current;
      const k = c.smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * Math.max(0.01, c.smoothing)));
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0005) {
        current = target;
        running = false;
      }
      applyProgress(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) return;
      running = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      if (propsRef.current.smoothing <= 0 || reduceMotion) {
        current = target;
        applyProgress(current);
        return;
      }
      kick();
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    measure();
    target = readProgress();
    current = target;
    applyProgress(current);

    const scroller = useWindowScroll ? window : root;
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(root);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, [applyProgress, useWindowScroll]);

  const media =
    mediaType === 'video' ? (
      <video
        ref={mediaRef as React.RefObject<HTMLVideoElement>}
        className="scroll-expand__media"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
      />
    ) : (
      <img
        ref={mediaRef as React.RefObject<HTMLImageElement>}
        className="scroll-expand__media"
        src={src}
        alt={alt}
        draggable={false}
      />
    );

  return (
    <div
      ref={rootRef}
      className={`scroll-expand ${useWindowScroll ? '' : 'scroll-expand--scroller'} ${className}`.trim()}
      style={style}
      {...rest}
    >
      <div ref={trackRef} className="scroll-expand__track">
        <div ref={stageRef} className="scroll-expand__stage">
          {/* Single unified hardware-composited card */}
          <div ref={cardRef} className="scroll-expand__card">
            {media}

            {/* Color tint & gradient overlay */}
            <div
              className="scroll-expand__card-tint"
              style={cardTint ? { background: cardTint } : undefined}
            />

            {/* Darkening Scrim */}
            <div ref={scrimRef} className="scroll-expand__scrim" />

            {/* Border and Shadow glow layer with GPU-composited opacity fade */}
            <div ref={borderGlowRef} className="scroll-expand__border-glow" />

            {/* Initial Center Title and Chapter Badge */}
            {title ? (
              <div ref={titleRef} className="scroll-expand__title-wrapper">
                {badge && (
                  <div className="scroll-expand__badge">
                    <span className="scroll-expand__badge-dot" />
                    <span>{badge}</span>
                  </div>
                )}
                <h2 className="scroll-expand__title">
                  {title}
                </h2>
              </div>
            ) : null}

            {/* Initial Scroll Hint */}
            {scrollHint ? (
              <div ref={hintRef} className="scroll-expand__hint">
                <span>{scrollHint}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
              </div>
            ) : null}

            {/* Expanded Full-Bleed Overlay Content */}
            {children ? (
              <div ref={overlayRef} className="scroll-expand__overlay">
                {children}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollExpand;
