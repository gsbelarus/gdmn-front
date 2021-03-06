import React, { ChangeEvent, Fragment, PureComponent } from 'react';
import { Edge as DagreEdge, graphlib, layout } from 'dagre';
import { Phrase } from 'gdmn-nlp';
import { ERModel } from 'gdmn-orm';
import { ICommand } from 'gdmn-nlp-agent';
import CSSModules from 'react-css-modules';
import { InputLabel, LinearProgress, Select } from '@material-ui/core';

import { InfiniteTableLayout } from '@core/components/data-grid-mui';
import { ITableColumn, ITableRow } from '@core/components/data-grid-core';
import { ERModelBox } from '@src/app/scenes/ermodel/component';
import { Edge } from '@src/app/scenes/semantics/components/Edge';
import { Rect } from '@src/app/scenes/semantics/components/Rect';
import { TDataStoresState } from '@src/app/scenes/datastores/reducer';

const styles = require('./styles.css');

interface ISemanticsBoxStateProps {
  readonly text: string;
  readonly wordsSignatures: string[];
  readonly phrase?: any; // FIXME Phrase;
  readonly dataLoading?: boolean;
}

interface ISemanticsBoxSelectorProps extends TDataStoresState {
  command?: ICommand | Error;
  sqlQuery?: string;
  erModel?: ERModel;
  dataTableColumns?: ITableColumn[];
  dataTableHeadRows?: ITableRow[];
  dataTableBodyRows?: ITableRow[];
  dataTableFootRows?: ITableRow[];
}

interface ISemanticsBoxActionsProps {
  onSelectDatastore: (appId: string) => void;
  loadErModel: (appId: string) => void;
  loadData: (command: any, appId: string) => void;
  onSetText: (text: string) => void;
  onClearText: () => void;
  onParse: (text: string) => void;

  onError: (error: Error) => void;
}

type TSemanticsBoxProps = ISemanticsBoxStateProps & ISemanticsBoxSelectorProps & ISemanticsBoxActionsProps;

@CSSModules(styles)
class SemanticsBox extends PureComponent<TSemanticsBoxProps, {}> {
  private datastoreSelectRef: HTMLSelectElement | null = null;

  public componentWillReceiveProps(nextProps: TSemanticsBoxProps) {
    const {
      command: commandOrError,
      onError
    } = this.props;

    // TODO REMOVE !!!
    if (nextProps.command instanceof Error && nextProps.command !== commandOrError) {
      onError(nextProps.command); // todo tmp
    }
  }

  public render() {
    // console.log('render SemanticsBox');

    const {
      text,
      wordsSignatures,
      onSetText,
      onClearText,
      onParse,
      phrase,
      command: commandOrError,
      dataTableColumns,
      dataTableHeadRows,
      dataTableBodyRows,
      loadErModel,
      loadData,
      dataLoading,
      sqlQuery,
      dataStores,
      onSelectDatastore,

      onError
    } = this.props;

    // TODO REMOVE !!!
    let command: ICommand | undefined;
    if (commandOrError instanceof Error) {
      command = undefined;
    } else {
      command = commandOrError;
    }

    // Create a new directed graph
    const g = new graphlib.Graph();

    if (phrase instanceof Phrase) {
      // Set an object for the graph label
      g.setGraph({});

      // Default to assigning a new object as a label for each new edge.
      g.setDefaultEdgeLabel(() => {
        return {};
      });

      const recurs = (
        phr: any
        // FIXME Word | Phrase
      ) => {
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

    const makeEdge = (e: DagreEdge, idx: number) => <Edge key={idx} points={g.edge(e).points} />;

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
              <button onClick={onClearText}>clear</button>
              <button
                onClick={() => {
                  onParse(text);
                }}
              >
                1. ANALYZE EXPRESSION
              </button>
            </div>
          </div>
        </div>
        <div styleName="SemanticsOutput">
          {wordsSignatures.map((p, idx) => (
            <div key={idx}>{p}</div>
          ))}
        </div>
        <div styleName="CommandAndGraph">
          <div>
            {displayCommand()}
            {!!sqlQuery && (
              <textarea
                styleName="command"
                style={{ width: '100%', minHeight: 70, resize: 'vertical', marginTop: 2 }}
                disabled={true}
                value={sqlQuery}
              />
            )}
          </div>
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

        <div style={{ backgroundColor: 'lightgray', margin: '32px 0 0px' }}>
          <div style={{ padding: 8 }}>
            <label htmlFor="age-native-simple" style={{ fontSize: 11, color: 'black' }}>
              2. SELECT DATASTORE:{' '}
            </label>
            <select
              onChange={e => onSelectDatastore(e.target.value)}
              ref={select => (this.datastoreSelectRef = select)}
              style={{ marginRight: 8 }}
              name="age"
              id="age-native-simple"
            >
              {!!dataStores && dataStores.length > 0 ? (
                dataStores.map(dataStore => (
                  <option key={dataStore.uid} value={dataStore.uid}>
                    {dataStore.alias}
                  </option>
                ))
              ) : (
                <option value="" />
              )}
            </select>
            <button
              style={{ marginRight: 8 }}
              disabled={!phrase || !this.datastoreSelectRef || !this.datastoreSelectRef.value}
              onClick={() => loadErModel(this.datastoreSelectRef!.value)}
            >
              3. BUILD COMMAND (load er-model)
            </button>
            <button disabled={!command} onClick={() => loadData(command, this.datastoreSelectRef!.value)}>
              4. RUN COMMAND (load data)
            </button>
          </div>
          {dataLoading && <LinearProgress color="secondary" />}
        </div>
        <InfiniteTableLayout
          bodyRows={dataTableBodyRows}
          columns={dataTableColumns}
          headRows={dataTableHeadRows}
          heavyWeightRow={true}
          renderBodyCell={ERModelBox.renderBodyCell}
          renderHeadCell={ERModelBox.renderHeadCell}
          tableHeight={'36vh'}
          tableHeightPx={0}
          tableMinWidthPx={0}
        />
      </Fragment>
    );
  }
}

export {
  SemanticsBox,
  TSemanticsBoxProps,
  ISemanticsBoxStateProps,
  ISemanticsBoxSelectorProps,
  ISemanticsBoxActionsProps
};
