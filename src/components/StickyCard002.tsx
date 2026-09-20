import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export interface CardData {
  id: number | string;
  image?: string;
  alt?: string;
  [key: string]: any;
}

export interface StickyCard002Props<T extends CardData = CardData> {
  cards: T[];
  className?: string;
  containerClassName?: string;
  cardClassName?: string;
  renderCard?: (card: T, index: number, isCurrent: boolean) => React.ReactNode;
}

export function StickyCard002<T extends CardData = CardData>({
  cards,
  className,
  containerClassName,
  cardClassName,
  renderCard,
}: StickyCard002Props<T>) {
  const container = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = container.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const cardElements = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const totalCards = cardElements.length;

      if (!totalCards) return;

      // 1. Entrance animation for EVERY card as it scrolls into view
      cardElements.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
            scale: 0.93,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // 2. Overlap stacking animation: each card shrinks, rotates, and blurs as the next card stacks on top
      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cardElements[i];
        const nextCard = cardElements[i + 1];
        if (!currentCard || !nextCard) continue;

        gsap.to(currentCard, {
          scale: 0.88,
          rotation: i % 2 === 0 ? 2.5 : -2.5,
          opacity: 0.45,
          filter: 'blur(3px)',
          ease: 'power1.out',
          scrollTrigger: {
            trigger: nextCard,
            start: 'top 75%',
            end: 'top 20%',
            scrub: true,
          },
        });
      }

      // 3. Last card animation as it scrolls past
      if (totalCards > 0) {
        const lastCard = cardElements[totalCards - 1];
        gsap.to(lastCard, {
          scale: 0.92,
          opacity: 0.7,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: el,
            start: 'bottom 85%',
            end: 'bottom 15%',
            scrub: true,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [cards]);

  return (
    <div className={cn('relative w-full', className)} ref={container}>
      <div
        className={cn(
          'relative w-full max-w-5xl mx-auto flex flex-col',
          containerClassName,
        )}
        style={{
          gap: 'clamp(32px, 5vh, 60px)',
          paddingBottom: '60px',
        }}
      >
        {cards.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={cn('w-full will-change-transform', cardClassName)}
            style={{
              position: 'sticky',
              top: 'clamp(90px, 12vh, 120px)',
              zIndex: i + 1,
              transformOrigin: 'top center',
            }}
          >
            {renderCard ? (
              renderCard(card, i, false)
            ) : (
              <img
                src={card.image}
                alt={card.alt || ''}
                className="h-full w-full rounded-3xl object-cover shadow-2xl"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StickyCard002;
