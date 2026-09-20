import React from 'react';
import { StoryCardData } from '../types/store';

interface StoryCardProps {
  data: StoryCardData;
  visible: boolean;
}

export const StoryCard: React.FC<StoryCardProps> = ({ data, visible }) => {
  return (
    <div
      className={`story-card liquid-glass-strong shimmer-on-visible ${data.position} ${visible ? 'visible' : ''}`}
    >
      <span className="font-heading italic text-base sm:text-lg block mb-1" style={{ color: 'var(--accent)' }}>
        {data.num}
      </span>
      <h3 className="font-heading italic text-2xl sm:text-3xl text-white tracking-tight leading-none mb-2">
        {data.title}
      </h3>
      <p className="text-xs sm:text-sm text-white/65 font-body font-light leading-snug">
        {data.desc}
      </p>
    </div>
  );
};
