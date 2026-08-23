import React, {useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

type ClipAsideProps = {
  /** A LoopingClip or any element to show beside the text. */
  media?: React.ReactNode;
  /** Shortcut for a plain still: the image path under static/, plus its alt text. */
  image?: string;
  alt?: string;
  /**
   * Fraction of natural size to show the still at while compact, e.g. 0.25 for a
   * quarter. Click shows it at 100%. Omit to fill the column.
   */
  scale?: number;
  /** The paragraph(s) to sit next to it. */
  children: React.ReactNode;
};

/**
 * Text on the left, media on the right, sharing one row. On narrow screens the
 * media drops below the text. Expanded media takes the full row.
 *
 * Pass `media` for a clip, or `image` + `alt` for a still. A still with `scale`
 * renders small and shows at natural size when clicked.
 */
export default function ClipAside({media, image, alt, scale, children}: ClipAsideProps) {
  const imageUrl = useBaseUrl(image ?? '');
  const [expanded, setExpanded] = useState(false);
  const [natural, setNatural] = useState<{w: number; h: number} | null>(null);

  const toggle = () => setExpanded((value) => !value);
  const onKey = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle();
    }
  };

  let still: React.ReactNode = null;
  if (image) {
    const scaled = scale !== undefined && !expanded;
    const style =
      scaled && natural ? {width: Math.round(natural.w * scale), height: 'auto'} : undefined;
    still = scale === undefined ? (
      <img alt={alt ?? ''} className="clip-aside__still" src={imageUrl} />
    ) : (
      <div
        aria-expanded={expanded}
        aria-label={expanded ? 'Shrink image' : 'Show image at full size'}
        className={`clip-aside__zoom${expanded ? ' clip-aside__zoom--expanded' : ''}`}
        onClick={toggle}
        onKeyDown={onKey}
        role="button"
        tabIndex={0}
        title={expanded ? 'Click to shrink' : 'Click to see at full size'}
      >
        <img
          alt={alt ?? ''}
          className="clip-aside__still"
          onLoad={(event) => {
            const img = event.currentTarget;
            setNatural({w: img.naturalWidth, h: img.naturalHeight});
          }}
          src={imageUrl}
          style={style}
        />
        <span aria-hidden="true" className="looping-clip__hint">
          {expanded ? 'shrink' : 'full size'}
        </span>
      </div>
    );
  }

  return (
    <div className={`clip-aside${expanded ? ' clip-aside--expanded' : ''}`}>
      <div className="clip-aside__text">{children}</div>
      <div className="clip-aside__media">{media ?? still}</div>
    </div>
  );
}
