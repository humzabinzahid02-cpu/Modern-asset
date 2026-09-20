'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface GenerateButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The hue value (0-360) for the button's highlight color.
   * Default is 46 (Gold for Modern Assets) or 210 (Blue).
   */
  hue?: number;
  /**
   * Primary text label. Defaults to "Generate".
   */
  text?: string;
  /**
   * Active/focused state label. Defaults to "Generating".
   */
  activeText?: string;
  /**
   * If true, forces the button into its "Generating" state.
   * By default, the button also enters this state when focused or clicked.
   */
  isGenerating?: boolean;
}

export function GenerateButton({
  hue = 46,
  text = 'Generate',
  activeText = 'Generating',
  isGenerating: controlledIsGenerating,
  className,
  onClick,
  style,
  ...props
}: GenerateButtonProps) {
  const [isFocused, setIsFocused] = useState(false);

  const isGenerating = controlledIsGenerating !== undefined ? controlledIsGenerating : isFocused;
  const maxChars = Math.max(text.length, activeText.length);

  return (
    <div className="relative inline-block group" style={style}>
      <style>{`
        .gen-btn {
          --border-radius: 24px;
          --padding: 4px;
          --transition: 0.4s;
          --button-color: #101010;
          --highlight-color-hue: ${hue}deg;

          user-select: none;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.6em 1.2em 0.6em 1.1em;
          font-family: var(--font-display, "Barlow Condensed", "Poppins", sans-serif);
          font-size: 1em;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;

          background-color: var(--button-color);

          box-shadow:
            inset 0px 1px 1px rgba(255, 255, 255, 0.2),
            inset 0px 2px 2px rgba(255, 255, 255, 0.15),
            inset 0px 4px 4px rgba(255, 255, 255, 0.1),
            inset 0px 8px 8px rgba(255, 255, 255, 0.05),
            inset 0px 16px 16px rgba(255, 255, 255, 0.05),
            0px -1px 1px rgba(0, 0, 0, 0.02),
            0px -2px 2px rgba(0, 0, 0, 0.03), 
            0px -4px 4px rgba(0, 0, 0, 0.05),
            0px -8px 8px rgba(0, 0, 0, 0.06), 
            0px -16px 16px rgba(0, 0, 0, 0.08);

          border: solid 1px rgba(245, 197, 24, 0.25);
          border-radius: var(--border-radius);
          cursor: pointer;

          transition: box-shadow var(--transition), border var(--transition), background-color var(--transition);
        }
        
        .gen-btn::before {
          content: "";
          position: absolute;
          top: calc(0px - var(--padding));
          left: calc(0px - var(--padding));
          width: calc(100% + var(--padding) * 2);
          height: calc(100% + var(--padding) * 2);
          border-radius: calc(var(--border-radius) + var(--padding));
          pointer-events: none;
          background-image: linear-gradient(0deg, rgba(0,0,0,0.267), rgba(0,0,0,0.667));

          z-index: -1;
          transition: box-shadow var(--transition), filter var(--transition);
          box-shadow: 0 -8px 8px -6px rgba(0,0,0,0) inset, 
            0 -16px 16px -8px rgba(0,0,0,0) inset,
            1px 1px 1px rgba(255,255,255,0.133), 
            2px 2px 2px rgba(255,255,255,0.067), 
            -1px -1px 1px rgba(0,0,0,0.133),
            -2px -2px 2px rgba(0,0,0,0.067);
        }
        
        .gen-btn::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          pointer-events: none;
          background-image: linear-gradient(
            0deg,
            #fff,
            hsl(var(--highlight-color-hue), 100%, 70%),
            hsla(var(--highlight-color-hue), 100%, 70%, 50%),
            8%,
            transparent
          );
          background-position: 0 0;
          opacity: 0;
          transition: opacity var(--transition), filter var(--transition);
        }

        .gen-btn-letter {
          position: relative;
          display: inline-block;
          color: rgba(255,255,255,0.7);
          animation: gen-letter-anim 2s ease-in-out infinite;
          transition: color var(--transition), text-shadow var(--transition), opacity var(--transition);
        }

        @keyframes gen-letter-anim {
          50% {
            text-shadow: 0 0 6px hsl(var(--highlight-color-hue), 100%, 70%);
            color: #fff;
          }
        }

        .gen-btn-svg {
          flex-shrink: 0;
          height: 20px;
          width: 20px;
          margin-right: 0.6rem;
          fill: #F5C518;
          animation: gen-flicker 2s linear infinite;
          animation-delay: 0.5s;
          filter: drop-shadow(0 0 4px rgba(245,197,24,0.6));
          transition: fill var(--transition), filter var(--transition), opacity var(--transition);
        }
        
        @keyframes gen-flicker {
          50% { opacity: 0.4; }
        }

        .gen-txt-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          white-space: nowrap;
        }
        
        .gen-txt-1,
        .gen-txt-2 {
          display: flex;
          align-items: center;
          white-space: nowrap;
        }
        
        .gen-txt-1 {
          animation: gen-appear-anim 1s ease-in-out forwards;
        }
        
        .gen-txt-2 {
          position: absolute;
          inset: 0;
          opacity: 0;
          pointer-events: none;
        }
        
        @keyframes gen-appear-anim {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        /* Generating (Focus/Active) state */
        .gen-btn[data-generating="true"] .gen-txt-1 {
          animation: gen-opacity-anim 0.3s ease-in-out forwards;
          animation-delay: 0.8s;
        }
        .gen-btn[data-generating="true"] .gen-txt-2 {
          animation: gen-opacity-anim 0.3s ease-in-out reverse forwards;
          animation-delay: 0.8s;
        }
        
        @keyframes gen-opacity-anim {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }

        .gen-btn[data-generating="true"] .gen-btn-letter {
          animation: gen-focused-letter-anim 1s ease-in-out forwards, gen-letter-anim 1.2s ease-in-out infinite;
          animation-delay: 0s, 1s;
        }
        
        @keyframes gen-focused-letter-anim {
          0%, 100% { filter: blur(0px); }
          50% {
            transform: scale(1.4);
            filter: blur(4px) brightness(150%) drop-shadow(-20px 8px 10px hsl(var(--highlight-color-hue), 100%, 70%));
          }
        }
        
        .gen-btn[data-generating="true"] .gen-btn-svg {
          animation-duration: 1.2s;
          animation-delay: 0.2s;
          fill: #ffffff;
        }

        .gen-btn[data-generating="true"]::before {
          box-shadow: 0 -8px 12px -6px rgba(255,255,255,0.2) inset,
            0 -16px 16px -8px hsla(var(--highlight-color-hue), 100%, 70%, 30%) inset,
            1px 1px 1px rgba(255,255,255,0.2), 
            2px 2px 2px rgba(255,255,255,0.067), 
            -1px -1px 1px rgba(0,0,0,0.133),
            -2px -2px 2px rgba(0,0,0,0.067);
        }
        
        .gen-btn[data-generating="true"]::after {
          opacity: 0.7;
          mask-image: linear-gradient(0deg, #fff, transparent);
          filter: brightness(120%);
        }

        /* Hover & Active states */
        .gen-btn:active {
          border: solid 1px hsla(var(--highlight-color-hue), 100%, 80%, 70%);
          background-color: hsla(var(--highlight-color-hue), 50%, 20%, 0.5);
        }
        .gen-btn:active::before {
          box-shadow: 0 -8px 12px -6px rgba(255,255,255,0.667) inset,
            0 -16px 16px -8px hsla(var(--highlight-color-hue), 100%, 70%, 80%) inset,
            1px 1px 1px rgba(255,255,255,0.267), 
            2px 2px 2px rgba(255,255,255,0.133), 
            -1px -1px 1px rgba(0,0,0,0.133),
            -2px -2px 2px rgba(0,0,0,0.067);
        }
        .gen-btn:active::after {
          opacity: 1;
          mask-image: linear-gradient(0deg, #fff, transparent);
          filter: brightness(200%);
        }
        .gen-btn:active .gen-btn-letter {
          text-shadow: 0 0 1px hsla(var(--highlight-color-hue), 100%, 90%, 90%);
          animation: none;
        }

        .gen-btn:hover {
          border: solid 1px hsla(var(--highlight-color-hue), 100%, 80%, 60%);
          box-shadow: 0 0 24px hsla(var(--highlight-color-hue), 100%, 50%, 0.25);
        }
        .gen-btn:hover::before {
          box-shadow: 0 -8px 8px -6px rgba(255,255,255,0.667) inset,
            0 -16px 16px -8px hsla(var(--highlight-color-hue), 100%, 70%, 30%) inset,
            1px 1px 1px rgba(255,255,255,0.133), 
            2px 2px 2px rgba(255,255,255,0.067), 
            -1px -1px 1px rgba(0,0,0,0.133),
            -2px -2px 2px rgba(0,0,0,0.067);
        }
        .gen-btn:hover::after {
          opacity: 1;
          mask-image: linear-gradient(0deg, #fff, transparent);
        }
        .gen-btn:hover .gen-btn-svg {
          fill: #fff;
          filter: drop-shadow(0 0 4px hsl(var(--highlight-color-hue), 100%, 70%)) drop-shadow(0 -4px 6px rgba(0,0,0,0.6));
          animation: none;
        }
      `}</style>

      <button
        type="button"
        className={cn('gen-btn', className)}
        data-generating={isGenerating}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onClick={(e) => {
          setIsFocused(true);
          onClick?.(e);
        }}
        {...props}
      >
        <svg className="gen-btn-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
          />
        </svg>

        <div className="gen-txt-wrapper" style={{ minWidth: `${Math.max(maxChars * 0.58, 5.5)}em` }}>
          <div className="gen-txt-1">
            {text.split('').map((letter, i) => (
              <span
                key={`t1-${i}`}
                className="gen-btn-letter"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </div>
          <div className="gen-txt-2">
            {activeText.split('').map((letter, i) => (
              <span
                key={`t2-${i}`}
                className="gen-btn-letter"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </div>
        </div>
      </button>
    </div>
  );
}

export default GenerateButton;
