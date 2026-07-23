import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

type Callout = {
  label: string;
  x: number;
  y: number;
};

type AnnotatedShotProps = {
  alt: string;
  callouts: Callout[];
  src: string;
};

export default function AnnotatedShot({alt, callouts, src}: AnnotatedShotProps) {
  return (
    <figure className="annotated-shot">
      <div className="annotated-shot__image">
        <img src={useBaseUrl(src)} alt={alt} />
        {callouts.map((callout, index) => (
          <span
            aria-hidden="true"
            className="annotated-shot__pin"
            key={callout.label}
            style={{left: `${callout.x}%`, top: `${callout.y}%`}}
          >
            {index + 1}
          </span>
        ))}
      </div>
      <figcaption>
        {callouts.map((callout, index) => (
          <span key={callout.label}>
            <strong>{index + 1}</strong> {callout.label}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
