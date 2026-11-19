import React from 'react';

type Lot = {x: number; y: number; w: number; h: number; zone: 'res' | 'com' | 'none'};

// Two rows of lots, seen from above. The Residential loop reaches into the fourth
// lot but not its centre, so that lot stays unlabelled. The loops are drawn after.
const LOTS: Lot[] = [
  {x: 20, y: 40, w: 90, h: 70, zone: 'res'},
  {x: 120, y: 40, w: 90, h: 70, zone: 'res'},
  {x: 220, y: 40, w: 90, h: 70, zone: 'res'},
  {x: 320, y: 40, w: 90, h: 70, zone: 'none'},
  {x: 420, y: 40, w: 90, h: 70, zone: 'com'},
  {x: 520, y: 40, w: 90, h: 70, zone: 'com'},
  {x: 20, y: 130, w: 90, h: 70, zone: 'res'},
  {x: 120, y: 130, w: 90, h: 70, zone: 'res'},
  {x: 220, y: 130, w: 90, h: 70, zone: 'res'},
  {x: 320, y: 130, w: 90, h: 70, zone: 'none'},
  {x: 420, y: 130, w: 90, h: 70, zone: 'com'},
  {x: 520, y: 130, w: 90, h: 70, zone: 'com'},
];

/**
 * Top view of a block of lots and two Lot Zone loops. A lot takes the zone when
 * its centre falls inside the loop. Drawn as SVG with the site's colour variables.
 */
export default function LotZoneDiagram() {
  return (
    <figure className="lot-zone-diagram">
      <svg
        aria-label="Top view of two rows of lots. A Residential loop encloses the centres of the six lots on the left, so they are Residential. A Commercial loop encloses the four lots on the right. The lot between them is partly under the Residential loop but its centre is outside both, so it has no zone."
        role="img"
        viewBox="0 0 630 250"
      >
        {LOTS.map((lot) => (
          <g key={`${lot.x}-${lot.y}`}>
            <rect
              className={`lot-zone-diagram__lot lot-zone-diagram__lot--${lot.zone}`}
              height={lot.h}
              width={lot.w}
              x={lot.x}
              y={lot.y}
            />
            <circle
              className="lot-zone-diagram__centre"
              cx={lot.x + lot.w / 2}
              cy={lot.y + lot.h / 2}
              r="3.5"
            />
          </g>
        ))}
        {/* Loops */}
        <rect className="lot-zone-diagram__loop lot-zone-diagram__loop--res" height="178" rx="14" width="318" x="12" y="32" />
        <rect className="lot-zone-diagram__loop lot-zone-diagram__loop--com" height="178" rx="14" width="206" x="412" y="32" />
        <text className="lot-zone-diagram__text lot-zone-diagram__text--res" x="16" y="22">
          Residential
        </text>
        <text className="lot-zone-diagram__text lot-zone-diagram__text--com" x="416" y="22">
          Commercial
        </text>
        <text className="lot-zone-diagram__note" textAnchor="middle" x="365" y="232">
          No zone: the centre is outside both loops
        </text>
      </svg>
    </figure>
  );
}
