import React, {useCallback, useEffect, useRef, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

type LoopingClipProps = {
  /** What the clip shows. Used as the accessible label; not rendered as text. */
  alt: string;
  /** Poster still, shown before playback starts. */
  poster: string;
  /** Silent, looping mp4. */
  src: string;
};

/** Seconds a skip button jumps. Docs clips are 8-20 s long. */
const SKIP_SECONDS = 2;

function Icon({name}: {name: 'back' | 'forward' | 'play' | 'pause'}) {
  const paths = {
    back: 'M11 6 4 12l7 6V6Zm9 0-7 6 7 6V6Z',
    forward: 'm13 6 7 6-7 6V6ZM4 6l7 6-7 6V6Z',
    play: 'M7 5v14l12-7L7 5Z',
    pause: 'M7 5h4v14H7V5Zm6 0h4v14h-4V5Z',
  };
  return (
    <svg aria-hidden="true" height="16" viewBox="0 0 24 24" width="16">
      <path d={paths[name]} fill="currentColor" />
    </svg>
  );
}

/**
 * A short silent screen capture that plays and loops in place.
 *
 * A slim bar under the clip pauses it, skips back or forward, and seeks. Click the
 * clip itself to expand it to the full content width, click again to shrink.
 * Readers who have asked their system to reduce motion get it paused on the poster.
 *
 * Place it inside a <ClipAside> to sit beside a paragraph, or on its own.
 */
export default function LoopingClip({alt, poster, src}: LoopingClipProps) {
  const posterUrl = useBaseUrl(poster);
  const srcUrl = useBaseUrl(src);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (query.matches) {
      videoRef.current?.pause();
    }
  }, []);

  // Smooth position bar while playing; timeupdate alone ticks only ~4 times a second.
  useEffect(() => {
    let frame = 0;
    const tick = () => {
      const video = videoRef.current;
      if (video && video.duration) {
        setProgress(video.currentTime / video.duration);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const toggleExpanded = () => setExpanded((value) => !value);
  const onStageKey = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleExpanded();
    }
  };

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  }, []);

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const time = Math.min(Math.max(video.currentTime + seconds, 0), video.duration - 0.05);
    video.currentTime = time;
    setProgress(time / video.duration);
  };

  const seek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const fraction = Number(event.target.value) / 1000;
    video.currentTime = fraction * video.duration;
    setProgress(fraction);
  };

  return (
    <div className={`looping-clip${expanded ? ' looping-clip--expanded' : ''}`}>
      <div
        aria-expanded={expanded}
        aria-label={expanded ? 'Shrink clip' : 'Expand clip'}
        className="looping-clip__stage"
        onClick={toggleExpanded}
        onKeyDown={onStageKey}
        role="button"
        tabIndex={0}
        title={expanded ? 'Click to shrink' : 'Click to expand'}
      >
        <video
          aria-label={alt}
          autoPlay
          className="looping-clip__media"
          loop
          muted
          onPause={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
          playsInline
          poster={posterUrl}
          preload="metadata"
          ref={videoRef}
          src={srcUrl}
        />
        <span aria-hidden="true" className="looping-clip__hint">
          {expanded ? 'shrink' : 'expand'}
        </span>
      </div>
      <div className="looping-clip__controls">
        <button
          aria-label={`Back ${SKIP_SECONDS} seconds`}
          className="looping-clip__button"
          onClick={() => skip(-SKIP_SECONDS)}
          title={`Back ${SKIP_SECONDS} s`}
          type="button"
        >
          <Icon name="back" />
        </button>
        <button
          aria-label={playing ? 'Pause' : 'Play'}
          className="looping-clip__button"
          onClick={togglePlay}
          title={playing ? 'Pause' : 'Play'}
          type="button"
        >
          <Icon name={playing ? 'pause' : 'play'} />
        </button>
        <button
          aria-label={`Forward ${SKIP_SECONDS} seconds`}
          className="looping-clip__button"
          onClick={() => skip(SKIP_SECONDS)}
          title={`Forward ${SKIP_SECONDS} s`}
          type="button"
        >
          <Icon name="forward" />
        </button>
        <input
          aria-label="Position in the clip"
          className="looping-clip__seek"
          max={1000}
          min={0}
          onChange={seek}
          style={{'--looping-clip-progress': `${progress * 100}%`} as React.CSSProperties}
          type="range"
          value={Math.round(progress * 1000)}
        />
      </div>
    </div>
  );
}
