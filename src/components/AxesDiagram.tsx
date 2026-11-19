import React from 'react';

/**
 * The axis contract for a Wall or Curve piece: X runs along the spline, Y points
 * out from the wall, Z is up, and the pivot sits on a bottom corner. Drawn as SVG
 * with the site's colour variables, so it follows the light and dark theme.
 */
export default function AxesDiagram() {
  return (
    <figure className="axes-diagram">
      <svg
        aria-label="A wall piece drawn as a box. X runs along its length, Y out from its face, Z up. The pivot is the bottom corner where the three axes meet."
        role="img"
        viewBox="0 0 560 300"
      >
        <defs>
          <marker id="axes-arrow" markerHeight="8" markerWidth="8" orient="auto" refX="6" refY="4">
            <path className="axes-diagram__head" d="M0 0 L8 4 L0 8 z" />
          </marker>
        </defs>
        {/* The piece: front face, top face, side face. */}
        <polygon className="axes-diagram__face" points="150,250 410,250 410,100 150,100" />
        <polygon className="axes-diagram__face axes-diagram__face--top" points="150,100 410,100 470,60 210,60" />
        <polygon className="axes-diagram__face axes-diagram__face--side" points="410,250 470,210 470,60 410,100" />
        {/* Axes from the pivot. */}
        <line className="axes-diagram__axis" markerEnd="url(#axes-arrow)" x1="150" x2="330" y1="250" y2="250" />
        <line className="axes-diagram__axis" markerEnd="url(#axes-arrow)" x1="150" x2="150" y1="250" y2="150" />
        <line className="axes-diagram__axis" markerEnd="url(#axes-arrow)" x1="150" x2="198" y1="250" y2="214" />
        <circle className="axes-diagram__pivot" cx="150" cy="250" r="7" />
        <text className="axes-diagram__text" x="338" y="268">X  length, along the spline</text>
        <text className="axes-diagram__text" x="40" y="132">Z  height</text>
        <text className="axes-diagram__text" x="204" y="212">Y  depth, out</text>
        <text className="axes-diagram__text axes-diagram__text--pivot" x="20" y="280">Pivot: a bottom corner</text>
      </svg>
    </figure>
  );
}
