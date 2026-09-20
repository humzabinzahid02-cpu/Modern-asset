import React, { useEffect, useMemo, useRef, type ReactNode, type RefObject, type CSSProperties } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollFloatProps {
  children?: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
  scrub?: boolean | number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div' | 'p';
  style?: CSSProperties;
  textStyle?: CSSProperties;
}

export default function ScrollFloat({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 0.9,
  ease = 'back.out(1.8)',
  scrollStart = 'top 92%',
  scrollEnd = 'top 45%',
  stagger = 0.02,
  scrub = false,
  as: Component = 'h2',
  style,
  textStyle,
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    const words = text.split(' ');

    return words.map((word, wordIndex) => (
      <span key={wordIndex} className="scroll-float-word" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
        {word.split('').map((char, charIndex) => (
          <span className="char" key={charIndex} style={{ display: 'inline-block' }}>
            {char}
          </span>
        ))}
        {wordIndex < words.length - 1 && (
          <span className="char space" style={{ display: 'inline-block' }}>
            &nbsp;
          </span>
        )}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const charElements = el.querySelectorAll('.char');
    if (!charElements.length) return;

    const ctx = gsap.context(() => {
      const triggerConfig: Record<string, any> = {
        trigger: el,
        scroller,
        start: scrollStart,
        end: scrollEnd,
      };

      if (scrub) {
        triggerConfig.scrub = scrub;
      } else {
        triggerConfig.toggleActions = 'play none none none';
        triggerConfig.once = true;
      }

      gsap.from(charElements, {
        opacity: 0,
        yPercent: 75,
        scaleY: 1.8,
        scaleX: 0.8,
        transformOrigin: '50% 0%',
        duration: animationDuration,
        ease: ease,
        stagger: stagger,
        scrollTrigger: triggerConfig,
      });
    }, el);

    return () => ctx.revert();
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger, scrub]);

  return (
    // @ts-expect-error dynamic component tag ref
    <Component ref={containerRef} className={`scroll-float ${containerClassName}`} style={style}>
      <span className={`scroll-float-text ${textClassName}`} style={textStyle}>
        {splitText}
      </span>
    </Component>
  );
}
