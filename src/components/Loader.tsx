import React from 'react';

interface LoaderProps {
  progress: number;
  message?: string;
  hidden: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ progress, message, hidden }) => {
  return (
    <div
      id="loader"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--surface-0)',
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.8s',
        opacity: hidden ? 0 : 1,
        visibility: hidden ? 'hidden' : 'visible',
        pointerEvents: hidden ? 'none' : 'auto',
      }}
    >
      {/* Ambient glow behind loader */}
      <div
        style={{
          position: 'absolute',
          width: '40vmax',
          height: '40vmax',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-ghost) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div className="loader-brand">AERO-X LABS</div>

      <div className="loader-bar-track">
        <div
          className="loader-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="loader-message">
        {message || `Preloading 3D Frames... ${progress}%`}
      </div>
    </div>
  );
};
