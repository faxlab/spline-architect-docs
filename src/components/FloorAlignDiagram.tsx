import React from 'react';

type Item = {label: string; value: string; slabY: number};

const ITEMS: Item[] = [
  {label: 'Bottom', value: 'default', slabY: 142},
  {label: 'Center', value: '', slabY: 98},
  {label: 'Top', value: '', slabY: 54},
];

/**
 * Side view of a wall and where its floor slab sits for each Align To choice.
 * Drawn as SVG with the site's colour variables, so it follows light and dark theme.
 */
export default function FloorAlignDiagram() {
  return (
    <figure className="floor-align">
      <svg
        aria-label="Three side views of the same wall with its floor slab. Align To Bottom puts the slab at the foot of the wall, Center puts it halfway up, Top puts it at the top."
        role="img"
        viewBox="0 0 620 220"
      >
        {ITEMS.map((item, index) => {
          const x = 10 + index * 205;
          return (
            <g key={item.label} transform={`translate(${x} 0)`}>
              {/* Wall: a tall outline on each side of the room. */}
              <rect className="floor-align__wall" height="140" width="14" x="10" y="20" />
              <rect className="floor-align__wall" height="140" width="14" x="156" y="20" />
              {/* Floor slab. */}
              <rect className="floor-align__slab" height="12" width="132" x="24" y={item.slabY} />
              <text className="floor-align__title" textAnchor="middle" x="90" y="190">
                Align To
              </text>
              <text className="floor-align__title floor-align__title--value" textAnchor="middle" x="90" y="210">
                {item.label}
                {item.value ? ` (${item.value})` : ''}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
