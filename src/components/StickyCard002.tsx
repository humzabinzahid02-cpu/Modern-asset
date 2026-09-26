import React, { useRef } from 'react';
import { cn } from '@/lib/utils';

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

  return (
    <div className={cn('relative w-full', className)} ref={container}>
      <div
        className={cn(
          'relative w-full max-w-6xl xl:max-w-[1340px] mx-auto flex flex-col',
          'gap-6 sm:gap-10 lg:gap-[clamp(120px,20vh,240px)] pb-2 sm:pb-4 lg:pb-4',
          containerClassName,
        )}
      >
        {cards.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={cn('w-full will-change-transform sticky-card-item', cardClassName)}
            data-index={i}
          >
            {renderCard ? (
              renderCard(card, i, false)
            ) : (
              <img
                src={card.image}
                alt={card.alt || ''}
                className="h-full w-full rounded-2xl sm:rounded-3xl object-cover shadow-xl"
              />
            )}
          </div>
        ))}
      </div>
      <style>{`
        .sticky-card-item {
          position: sticky;
          top: 84px;
          border-radius: 24px;
          background: #FFFFFF;
          box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.05), 0 16px 40px rgba(27, 43, 58, 0.09);
          transition: transform 0.2s ease-out;
        }
        ${cards.map((_, i) => `
          .sticky-card-item[data-index="${i}"] {
            z-index: ${i + 1};
          }
        `).join('\n')}
        @media (min-width: 1024px) {
          .sticky-card-item {
            border-radius: 34px;
            /* Safe distance below fixed navbar so card never goes inside navbar */
            top: clamp(104px, 15vh, 118px);
          }
        }
      `}</style>
    </div>
  );
}

export default StickyCard002;
