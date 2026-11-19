import React from 'react';

type Branch = {
  /** The output pin the branch leaves from. */
  label: string;
  /** The node it goes to. */
  to: string;
};

type ChainNode = {
  name: string;
  /** Settings or values worth showing under the name. */
  notes?: string[];
  /** Outputs that go on to different nodes. */
  branches?: Branch[];
};

type NodeChainProps = {
  nodes: ChainNode[];
};

/**
 * A PCG node chain drawn as connected boxes: read left to right, wraps on narrow
 * screens. Plain HTML and CSS, so it follows the light and dark theme.
 */
export default function NodeChain({nodes}: NodeChainProps) {
  const summary = nodes.map((node) => node.name).join(', then ');
  return (
    <div aria-label={`Node chain: ${summary}`} className="node-chain" role="group">
      {nodes.map((node, index) => (
        <div className="node-chain__item" key={`${node.name}-${index}`}>
          <div className="node-chain__node">
            <strong>{node.name}</strong>
            {node.notes?.map((note) => (
              <code key={note}>{note}</code>
            ))}
          </div>
          {node.branches ? (
            <div className="node-chain__branches">
              {node.branches.map((branch) => (
                <div className="node-chain__branch" key={branch.label}>
                  <span className="node-chain__pin">{branch.label}</span>
                  <div className="node-chain__node">
                    <strong>{branch.to}</strong>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
