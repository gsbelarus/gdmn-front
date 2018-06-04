import React from 'react';
import { graphlib, layout } from 'dagre';
import { Phrase, Word } from 'gdmn-nlp';
import CSSModules from 'react-css-modules';
import { ICommand } from 'gdmn-nlp-agent';

import { Edge } from './components/edge';
import { Rect } from './components/rect';

const styles = require('./styles.css');

interface ISemanticsBoxProps {
  readonly text: string;
  readonly wordsSignatures: string[];
  readonly phrase: Phrase;
  readonly onSetText: (text: string) => any;
  readonly onClearText: () => any;
  readonly onParse: (text: string) => any;
  readonly command?: ICommand;
}

@CSSModules(styles)
class SemanticsBox extends React.Component<ISemanticsBoxProps, {}> {
  public render() {
    const { text, wordsSignatures, onSetText, onClearText, onParse, phrase, command } = this.props;

    // Create a new directed graph
    const g = new graphlib.Graph();

    if (phrase instanceof Phrase) {
      // Set an object for the graph label
      g.setGraph({});

      // Default to assigning a new object as a label for each new edge.
      g.setDefaultEdgeLabel(() => {
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
      if (!nd) return null;

      const x = nd.x - nd.width / 2;
      const y = nd.y - nd.height / 2;
      return (
        <Rect key={idx} x={x} y={y} width={nd.width} height={nd.height} text={nd.label} className={nd.className} />
      );
    };

    const makeEdge = (e: dagre.Edge, idx: number) => <Edge key={idx} points={g.edge(e).points} />;

    return (
      <React.Fragment>
        <div styleName="SemanticsInput">
          <div styleName="SemanticsText">
            <textarea
              value={text}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onSetText(e.currentTarget.value)}
            />
            <div styleName="SemanticsTextButtons">
              <button onClick={onClearText}>Clear</button>
              <button onClick={() => onParse(text)}>Parse</button>
            </div>
          </div>
        </div>
        <div styleName="SemanticsOutput">{wordsSignatures.map((p, idx) => <div key={idx}>{p}</div>)}</div>
        <div>{JSON.stringify(command, undefined, 2)}</div>
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
      </React.Fragment>
    );
  }
}

export { SemanticsBox, ISemanticsBoxProps };
