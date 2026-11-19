import React from 'react';

type Step = {
  /** Short name of the step. */
  title: string;
  /** One short line under it. */
  text?: string;
};

type FlowProps = {
  steps: Step[];
  /** Draw an arrow after the last step too, for a loop that returns to the first. */
  loop?: boolean;
  /** Describes the diagram for screen readers. */
  label: string;
};

/**
 * A row of numbered steps joined by arrows. It wraps on narrow screens.
 * Plain HTML and CSS, so it follows the light and dark theme.
 */
export default function Flow({steps, loop, label}: FlowProps) {
  return (
    <ol aria-label={label} className={`flow${loop ? ' flow--loop' : ''}`}>
      {steps.map((step, index) => (
        <li className="flow__step" key={step.title}>
          <span aria-hidden="true" className="flow__num">
            {index + 1}
          </span>
          <strong>{step.title}</strong>
          {step.text ? <span>{step.text}</span> : null}
        </li>
      ))}
    </ol>
  );
}
