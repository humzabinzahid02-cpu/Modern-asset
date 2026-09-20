import React from 'react';

interface TransitionBannerProps {
  id: string;
  tag: string;
  title: string;
  description: string;
  hintText: string;
}

export const TransitionBanner: React.FC<TransitionBannerProps> = ({
  id,
  tag,
  title,
  description,
  hintText,
}) => {
  return (
    <section id={id} className="transition-banner">
      <div className="banner-tag">{tag}</div>

      <h2 className="banner-title">{title}</h2>

      <p className="banner-desc">{description}</p>

      <div className="banner-hint">
        <span>{hintText}</span>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M7 10l5 5 5-5" />
        </svg>
      </div>
    </section>
  );
};
