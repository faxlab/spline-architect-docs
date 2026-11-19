import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

type Panel = {
  /** Image path under static/, e.g. img/screens/foo.webp. */
  src: string;
  /** Short name shown on the panel, e.g. "Best Fit". */
  label: string;
  /** Optional second line, e.g. the setting and value. */
  detail?: string;
  /** What this panel shows. Defaults to label + detail. */
  alt?: string;
};

type CompareProps = {
  panels: Panel[];
  /** Columns on a wide screen. Default: 2 for 2 or 4 panels, 3 otherwise. */
  columns?: number;
  /** Image shape, as CSS aspect-ratio. Default 16 / 9. */
  ratio?: string;
  /** One line under the grid: what changes between panels. */
  caption?: string;
};

/**
 * Same subject, one setting changed: a grid of panels, each with its name on it.
 * Labels are real text, so they match the site's colours in light and dark.
 */
export default function Compare({panels, columns, ratio = '16 / 9', caption}: CompareProps) {
  const cols = columns ?? (panels.length === 2 || panels.length === 4 ? 2 : 3);
  return (
    <figure className="compare">
      <div className="compare__grid" style={{['--compare-cols' as string]: cols}}>
        {panels.map((panel) => (
          <PanelView key={panel.src} panel={panel} ratio={ratio} />
        ))}
      </div>
      {caption ? <figcaption className="compare__caption">{caption}</figcaption> : null}
    </figure>
  );
}

function PanelView({panel, ratio}: {panel: Panel; ratio: string}) {
  const url = useBaseUrl(panel.src);
  const alt = panel.alt ?? (panel.detail ? `${panel.label}: ${panel.detail}` : panel.label);
  return (
    <div className="compare__panel">
      <img alt={alt} loading="lazy" src={url} style={{aspectRatio: ratio}} />
      <span className="compare__label">
        <strong>{panel.label}</strong>
        {panel.detail ? <span>{panel.detail}</span> : null}
      </span>
    </div>
  );
}
