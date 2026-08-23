import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

type ClipAsideProps = {
  /** A LoopingClip or any element to show beside the text. */
  media?: React.ReactNode;
  /** Shortcut for a plain still: the image path under static/, plus its alt text. */
  image?: string;
  alt?: string;
  /** The paragraph(s) to sit next to it. */
  children: React.ReactNode;
};

/**
 * Text on the left, media on the right, sharing one row. On narrow screens the
 * media drops below the text. An expanded clip takes the full row.
 *
 * Pass `media` for a clip, or `image` + `alt` for a still.
 */
export default function ClipAside({media, image, alt, children}: ClipAsideProps) {
  const imageUrl = useBaseUrl(image ?? '');
  return (
    <div className="clip-aside">
      <div className="clip-aside__text">{children}</div>
      <div className="clip-aside__media">
        {media ?? (image ? <img alt={alt ?? ''} className="clip-aside__still" src={imageUrl} /> : null)}
      </div>
    </div>
  );
}
