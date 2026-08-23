import React, {useEffect, useRef, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

type LoopingClipProps = {
  /** Short sentence describing what the clip shows. Also the accessible label. */
  caption: string;
  /** Poster still, shown before playback and whenever motion is reduced. */
  poster: string;
  /** Silent, looping mp4. */
  src: string;
};

/**
 * A short silent screen capture that loops in place.
 *
 * Readers who have asked their system to reduce motion get the poster still
 * instead of a moving image, with the caption still describing the action.
 */
export default function LoopingClip({caption, poster, src}: LoopingClipProps) {
  const posterUrl = useBaseUrl(poster);
  const srcUrl = useBaseUrl(src);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

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

  return (
    <figure className="looping-clip">
      {reduceMotion ? (
        <img alt={caption} className="looping-clip__media" src={posterUrl} />
      ) : (
        <video
          aria-label={caption}
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
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
