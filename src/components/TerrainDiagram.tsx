import React from 'react';

/**
 * Side view of what SA Landscape Patch does to a slope: before, the ground runs
 * through the lot surface; after, the ground is flat across the lot and eases back
 * to the slope over the edge fade. Drawn as SVG with the site's colour variables.
 */
export default function TerrainDiagram() {
  const panel = (x: number, flattened: boolean, title: string) => (
    <g transform={`translate(${x} 0)`}>
      <text className="terrain-diagram__title" x="10" y="26">
        {title}
      </text>
      {/* Lot surface, flat. */}
      <rect className="terrain-diagram__lot" height="8" width="150" x="85" y="106" />
      <text className="terrain-diagram__small" x="160" y="98" textAnchor="middle">
        Lot surface
      </text>
      {/* Ground: a slope from upper left to lower right, or flat under the lot. */}
      <path
        className="terrain-diagram__ground"
        d={
          flattened
            ? 'M10 62 L60 82 Q85 114 100 114 L220 114 Q235 114 260 132 L310 152 L310 190 L10 190 Z'
            : 'M10 62 L310 152 L310 190 L10 190 Z'
        }
      />
      {flattened ? (
        <text className="terrain-diagram__small" x="160" y="140" textAnchor="middle">
          flat under the lot
        </text>
      ) : null}
    </g>
  );
  return (
    <figure className="terrain-diagram">
      <svg
        aria-label="Two side views of a slope with a flat lot surface across it. Before: the ground slopes through the lot surface. After: SA Landscape Patch has flattened the ground under the lot so it meets the lot surface, and it eases back to the slope at the edges."
        role="img"
        viewBox="0 0 660 200"
      >
        {panel(0, false, 'Before: the slope cuts through the lot')}
        {panel(340, true, 'After: ground meets the lot surface')}
      </svg>
    </figure>
  );
}
