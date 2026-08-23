import React from 'react';

type ClipAsideProps = {
  /** The LoopingClip (or any media) to show beside the text. */
  media: React.ReactNode;
  /** The paragraph(s) to sit next to it. */
  children: React.ReactNode;
};

/**
 * Text on the left, a clip on the right, sharing one row. On narrow screens the
 * clip drops below the text. When the clip is expanded it takes the full width.
 */
export default function ClipAside({media, children}: ClipAsideProps) {
  return (
    <div className="clip-aside">
      <div className="clip-aside__text">{children}</div>
      <div className="clip-aside__media">{media}</div>
    </div>
  );
}
