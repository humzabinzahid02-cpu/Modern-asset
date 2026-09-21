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

      // Stacking depth animation: as each card is covered by the next,
      // gently scale down to 0.96 with subtle brightness depth.
      // NEVER set opacity < 1 or blur text, keeping cards 100% crisp and readable.
      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cardElements[i];
        const nextCard = cardElements[i + 1];
        if (!currentCard || !nextCard) continue;

        gsap.to(currentCard, {
          scale: 0.96,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: nextCard,
            start: 'top 85%',
            end: 'top 20%',
            scrub: 0.5,
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
          gap: 'clamp(120px, 22vh, 240px)',
          paddingBottom: '140px',
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
              top: `calc(clamp(80px, 11vh, 100px) + ${i * 12}px)`,
              zIndex: i + 1,
              transformOrigin: 'top center',
              background: '#FFFFFF',
              borderRadius: '28px',
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
