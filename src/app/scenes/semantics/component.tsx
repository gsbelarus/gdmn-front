import React, { ChangeEvent, Component, Fragment, PureComponent } from 'react';
import { graphlib, layout } from 'dagre';
import { Phrase, Word } from 'gdmn-nlp';
import { ICommand } from 'gdmn-nlp-agent';
import CSSModules from 'react-css-modules';

import { Edge } from './components/edge';
import { Rect } from './components/rect';
import { ERModelBox } from '@src/app/scenes/ermodel/component';
import { InfiniteTableLayout, TableRow } from '@src/app/scenes/ermodel/components/data-grid-mui';
import { ITableColumn, ITableRow } from '@src/app/scenes/ermodel/components/data-grid-core';

const styles = require('./styles.css');

interface ISemanticsBoxProps {
  readonly text: string;
  readonly wordsSignatures: string[];
  readonly phrase: Phrase;
  readonly onSetText: (text: string) => any;
  readonly onClearText: () => any;
  readonly onParse: (text: string) => any;
  readonly command?: ICommand;
  readonly err?: string;
  // data table
  dataTableColumns?: ITableColumn[];
  dataTableHeadRows?: ITableRow[];
  dataTableBodyRows?: ITableRow[];
  dataTableFootRows?: ITableRow[];
  // actions
  loadErModel: () => any; // TODO
  loadData: () => any; // TODO
}

@CSSModules(styles)
class SemanticsBox extends PureComponent<ISemanticsBoxProps, {}> {
  public render() {
    console.log('render SemanticsBox');

    const {
      text,
      wordsSignatures,
      onSetText,
      onClearText,
      onParse,
      phrase,
      command,
      err,
      dataTableColumns,
      dataTableHeadRows,
      dataTableBodyRows,
      loadErModel,
      loadData
    } = this.props;

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

    const displayCommand = () => {
      return (
        command && (
          <div styleName="command">
            <div styleName={`action${command.action}`} />
            {command.objects &&
              command.objects.map((co, idx) => (
                <div styleName="commandObject" key={idx}>
                  <div styleName="entityName">{co.entity.name}</div>
                  {co.conditions &&
                    co.conditions.map((cond, idx2) => (
                      <div styleName="condition" key={idx2}>
                        <div styleName="attr">{cond.attr.name}</div>
                        <div styleName={`op${cond.op}`} />
                        <div styleName="value">{cond.value}</div>
                      </div>
                    ))}
                </div>
              ))}
          </div>
        )
      );
    };

    return (
      <Fragment>
        <div styleName="SemanticsInput">
          <div styleName="SemanticsText">
            <textarea
              value={text}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onSetText(e.currentTarget.value)}
            />
            <div styleName="SemanticsTextButtons">
              <button onClick={onClearText}>Clear</button>
              <button
                onClick={() => {
                  onParse(text);
                }}
              >
                Parse
              </button>
            </div>
          </div>
        </div>
        <div styleName="SemanticsOutput">{wordsSignatures.map((p, idx) => <div key={idx}>{p}</div>)}</div>
        <div styleName="CommandAndGraph">
          {err || displayCommand()}
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

        <InfiniteTableLayout
          tableHeight={'40vh'}
          headRows={dataTableHeadRows}
          columns={dataTableColumns}
          bodyRows={dataTableBodyRows}
          renderHeadCell={ERModelBox.renderHeadCell}
          renderBodyCell={ERModelBox.renderBodyCell}
          //
          tableHeightPx={0}
          tableMinWidthPx={0}
        />
      </Fragment>
    );
  }
}

export { SemanticsBox, ISemanticsBoxProps };
