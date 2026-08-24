import React, {useEffect, useRef, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

type LoopingClipProps = {
  /** What the clip shows. Used as the accessible label; not rendered as text. */
  alt: string;
  /** Poster still, shown before playback and whenever motion is reduced. */
  poster: string;
  /** Silent, looping mp4. */
  src: string;
};

/**
 * A short silent screen capture that loops in place, with no chrome of its own.
 *
 * Click to expand to the full content width, click again to shrink. Readers who
 * have asked their system to reduce motion get the poster still instead.
 *
 * Place it inside a <ClipAside> to sit beside a paragraph, or on its own.
 */
export default function LoopingClip({alt, poster, src}: LoopingClipProps) {
  const posterUrl = useBaseUrl(poster);
  const srcUrl = useBaseUrl(src);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      setReduceMotion(query.matches);
      if (query.matches) {
        videoRef.current?.pause();
      }
    };
    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);

  const toggle = () => setExpanded((value) => !value);
  const onKey = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle();
    }
  };

  return (
    <div
      aria-expanded={expanded}
      aria-label={expanded ? 'Shrink clip' : 'Expand clip'}
      className={`looping-clip${expanded ? ' looping-clip--expanded' : ''}`}
      onClick={toggle}
      onKeyDown={onKey}
      role="button"
      tabIndex={0}
      title={expanded ? 'Click to shrink' : 'Click to expand'}
    >
      {reduceMotion ? (
        <img alt={alt} className="looping-clip__media" src={posterUrl} />
      ) : (
        <video
          aria-label={alt}
          autoPlay
          className="looping-clip__media"
          loop
          muted
          playsInline
          poster={posterUrl}
          preload="metadata"
          ref={videoRef}
          src={srcUrl}
        />
      )}
      <span aria-hidden="true" className="looping-clip__hint">
        {expanded ? 'shrink' : 'expand'}
      </span>
    </div>
  );
}
