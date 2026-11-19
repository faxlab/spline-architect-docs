import React from 'react';

/**
 * Side view of what one Streets layer builds beside a road: the road, the curb step
 * (Curb Height), the sidewalk band (Sidewalk Width) and the lot ground behind it.
 * Drawn as SVG with the site's colour variables, so it follows light and dark theme.
 */
export default function StreetSection() {
  return (
    <figure className="street-section">
      <svg
        aria-label="Cross-section beside a road. The road is level with the street. The lot ground and sidewalk rise together by Curb Height, which makes the curb. The sidewalk is the band along the lot edge; the rest of the raised block is lot ground."
        role="img"
        viewBox="0 0 640 300"
      >
        {/* Road, level with the street. */}
        <rect className="street-section__road" height="50" width="230" x="10" y="200" />
        {/* Raised block: lot ground, with the sidewalk band along its edge. */}
        <rect className="street-section__block" height="100" width="390" x="240" y="150" />
        <rect className="street-section__sidewalk" height="30" width="130" x="240" y="150" />
        <line className="street-section__curb" x1="240" x2="240" y1="150" y2="200" />
        <line className="street-section__level" x1="240" x2="320" y1="200" y2="200" />
        {/* Curb Height */}
        <line className="street-section__dim" x1="220" x2="220" y1="152" y2="198" />
        <line className="street-section__dim" x1="213" x2="227" y1="152" y2="152" />
        <line className="street-section__dim" x1="213" x2="227" y1="198" y2="198" />
        <text className="street-section__text" textAnchor="end" x="204" y="181">Curb Height</text>
        {/* Sidewalk Width */}
        <line className="street-section__dim" x1="240" x2="370" y1="128" y2="128" />
        <line className="street-section__dim" x1="240" x2="240" y1="121" y2="135" />
        <line className="street-section__dim" x1="370" x2="370" y1="121" y2="135" />
        <text className="street-section__text" x="240" y="112">Sidewalk Width</text>
        {/* Labels */}
        <text className="street-section__label" textAnchor="middle" x="125" y="230">Road</text>
        <text className="street-section__label street-section__label--on" textAnchor="middle" x="305" y="171">Sidewalk</text>
        <text className="street-section__label" textAnchor="middle" x="500" y="208">Lot ground</text>
        <text className="street-section__note" x="10" y="284">The road, junctions and corner pads stay at street level.</text>
      </svg>
    </figure>
  );
}
