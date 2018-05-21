import 'styles/semanticsBox.css';

import * as React from 'react';
import { Phrase, Word } from 'gdmn-nlp';
import { graphlib, layout } from 'dagre';
import { Rect } from './rect';
import { Edge } from './edge';

export interface SemanticsBoxProps {
  readonly text: string;
  readonly parsedText: string[];
  readonly phrase: Phrase;
  readonly onSetText: (text: string) => any;
  readonly onClearText: () => any;
  readonly onParse: (text: string) => any;
}

export class SemanticsBox extends React.Component<SemanticsBoxProps, {}> {
  render() {
    const { text, parsedText, onSetText, onClearText, onParse, phrase } = this.props;

    // Create a new directed graph
    let g = new graphlib.Graph();

    if (phrase instanceof Phrase) {
      // Set an object for the graph label
      g.setGraph({});

      // Default to assigning a new object as a label for each new edge.
      g.setDefaultEdgeLabel(function() {
        return {};
      });

      const recurs = (phr: Word | Phrase) => {
        if (phr instanceof Phrase) {
          const label = phr.constructor.name;
          g.setNode(phr.id.toString(), {
            label,
            width: label.length * 9 + 8,
            height: 26,
            className: 'phrase'
          });
          phr.items.forEach(p => {
            g.setEdge(phr.id.toString(), p.id.toString());
            recurs(p);
          });
        } else {
          const label = phr.getText();
          g.setNode(phr.id.toString(), {
            label,
            width: label.length * 9 + 8,
            height: 26,
            className: 'word',
            rank: 'min'
          });
        }
      };

      recurs(phrase);

      g.graph().ranksep = 36;
      g.graph().marginx = 2;
      g.graph().marginy = 2;
      layout(g);
    }

    const makeRect = (n: string, idx: number) => {
      const nd = g.node(n);
      if (nd) {
        const x = nd.x - nd.width / 2;
        const y = nd.y - nd.height / 2;
        return (
          <Rect key={idx} x={x} y={y} width={nd.width} height={nd.height} text={nd.label} className={nd.className} />
        );
      } else {
        return null;
      }
    };

    const makeEdge = (e: dagre.Edge, idx: number) => <Edge key={idx} points={g.edge(e).points} />;

    return (
      <div>
        <div className="SemanticsInput">
          <div className="SemanticsText">
            <textarea
              value={text}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onSetText(e.currentTarget.value)}
            />
            <div className="SemanticsTextButtons">
              <button onClick={onClearText}>Clear</button>
              <button onClick={() => onParse(text)}>Parse</button>
            </div>
          </div>
        </div>
        <div className="SemanticsOutput">{parsedText.map((p, idx) => <div key={idx}>{p}</div>)}</div>
        <div>
          {g.graph() ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={g.graph().width}
              height={g.graph().height}
              viewBox={'0 0 ' + g.graph().width + ' ' + g.graph().height}
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerUnits="strokeWidth"
                  markerWidth="8"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M 0 0 L 10 5 L 0 10 Z" style={{ strokeWidth: '1' }} />
                </marker>
              </defs>
              <g>
                {g.nodes().map((n, idx) => makeRect(n, idx))}
                {g.edges().map((e, idx) => makeEdge(e, idx))}
              </g>
            </svg>
          ) : null}
        </div>
      </div>
    );
  }
}
