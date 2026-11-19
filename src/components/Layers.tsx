import React from 'react';

type Layer = {
  /** Name shown on the bar, e.g. "Roof". */
  name: string;
  /** What it is, shown beside the bar. */
  text?: string;
  /** Marks a layer that repeats. */
  repeats?: boolean;
};

type LayersProps = {
  /** Top layer first. */
  layers: Layer[];
  label: string;
};

/**
 * A simple stack of bars, top layer first, for showing how something is built
 * up. Plain HTML and CSS, so it follows the light and dark theme.
 */
export default function Layers({layers, label}: LayersProps) {
  return (
    <div aria-label={label} className="layers" role="group">
      {layers.map((layer) => (
        <div className="layers__row" key={layer.name}>
          <span className={`layers__bar${layer.repeats ? ' layers__bar--repeat' : ''}`}>
            {layer.name}
            {layer.repeats ? <em>repeats</em> : null}
          </span>
          {layer.text ? <span className="layers__text">{layer.text}</span> : null}
        </div>
      ))}
    </div>
  );
}
