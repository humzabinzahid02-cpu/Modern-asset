import React, { useRef, useState } from 'react';

interface FadingVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}

export const FadingVideo: React.FC<FadingVideoProps> = ({ src, className, style }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [opacity, setOpacity] = useState(0);
  const fadingOutRef = useRef<boolean>(false);

  const FADE_OUT_LEAD = 0.5;

  const handleLoadedData = () => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
    setOpacity(1);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const remaining = video.duration - video.currentTime;
    if (!fadingOutRef.current && remaining <= FADE_OUT_LEAD && remaining > 0) {
      fadingOutRef.current = true;
      setOpacity(0);
    }
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;
    setOpacity(0);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
        fadingOutRef.current = false;
        setOpacity(1);
      }
    }, 150);
  };

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      style={{
        opacity,
        transition: 'opacity 500ms ease-out',
        willChange: 'opacity',
        ...style,
      }}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      onLoadedData={handleLoadedData}
      onTimeUpdate={handleTimeUpdate}
      onEnded={handleEnded}
    />
  );
};
