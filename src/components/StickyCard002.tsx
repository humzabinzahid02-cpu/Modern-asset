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
    // Keep cards clean and bright without darkening filters
  }, [cards]);

  return (
    <div className={cn('relative w-full', className)} ref={container}>
      <div
        className={cn(
          'relative w-full max-w-6xl xl:max-w-[1340px] mx-auto flex flex-col',
          containerClassName,
        )}
        style={{
          gap: 'clamp(140px, 24vh, 260px)',
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
              top: `calc(clamp(76px, 11vh, 96px) + ${i * 14}px)`,
              zIndex: i + 1,
              borderRadius: '34px',
              background: '#FFFFFF',
              boxShadow: '0 4px 16px rgba(27, 43, 58, 0.05)',
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
