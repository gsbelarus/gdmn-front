import { parsePhrase, Phrase } from 'gdmn-nlp';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Api } from '@src/app/services/Api';
import { IRootState } from '@src/app/store/rootReducer';
import { selectErmodelState, selectSemanticsState } from '@src/app/store/selectors';
import { actions, TSemanticsActions } from './actions';
import { SemanticsBox } from './component';
import { EQueryTranslator } from '@src/app/scenes/semantics/EQueryTranslator';
import { Key } from 'react';
import { ITableColumn, ITableRow } from '@src/app/scenes/ermodel/components/data-grid-core';
import { loadERModelOk, loadError } from '@src/app/scenes/ermodel/actionCreators';
import { deserializeERModel, IERModel } from 'gdmn-orm';
import { TRootActions } from '@src/app/store/RootActions';
import { createSelector } from 'reselect';
import { pure } from 'recompose';

const tableDataSelector = (state: any, props: any) => selectSemanticsState(state).tableData;

function createBodyRows(data?: any): ITableRow[] {
  if (!data || !data.data) return [];

  return data.data.map((dataItem: any, index: number) => ({ id: index, ...dataItem }));
}
const dataTableBodyRowsSelector = createSelector([tableDataSelector], createBodyRows);

function createTableMeta(data?: any) {
  if (!data || !data.aliases) return { dataTableHeadRows: [], dataTableColumns: [] };

  const headrow: { [t: string]: any } = {};
  const dataTableColumns: ITableColumn[] = [];

  data.aliases.forEach((item: any) => {
    addHeadRowCell(item, headrow);
    dataTableColumns.push(createColumn(item));
  });
  const dataTableHeadRows = [{ id: 1, ...headrow }];

  return {
    dataTableHeadRows,
    dataTableColumns
  };
}

function addHeadRowCell(itemAlias: any, headrow: any) {
  headrow[itemAlias.values[itemAlias.attribute]] = { title: `${itemAlias.alias}.${itemAlias.attribute}` };
}

function createColumn(itemAlias: any) {
  return _createTableColumn(itemAlias.values[itemAlias.attribute], 200);
}
function _createTableColumn(key: Key, widthPx?: number, align?: string): ITableColumn {
  return { id: key, widthPx, align };
}
const dataTableMetaSelector = createSelector([tableDataSelector], createTableMeta);

const SemanticsBoxContainer = pure(
  connect(
    (state: IRootState, ownProps) => ({
      ...selectSemanticsState(state),
      ...dataTableMetaSelector(state, ownProps),
      dataTableBodyRows: dataTableBodyRowsSelector(state, ownProps)
    }),
    (dispatch: Dispatch<TRootActions>) => ({
      dispatch,
      onSetText: (text: string) => dispatch(actions.setSemText(text)),
      onClearText: () => dispatch(actions.setSemText('')),
      loadErModel: () => {
        Api.fetchEr()
          .then(res => {
            return dispatch(loadERModelOk(deserializeERModel(<IERModel>res)));
          })
          .catch((err: Error) => dispatch(loadError(err.message)));
      },
      loadData: () => {
        // TODO
      }
    }),
    (state, events) => ({
      ...state,
      ...events,
      onParse: (text: string) => {
        const parsedText = parsePhrase(text);
        events.dispatch(actions.setParsedText(parsedText));
        const erTranslatorRU = state.erTranslatorRU;
        if (!erTranslatorRU || !parsedText.phrase) return;
        try {
          const command = erTranslatorRU.process(parsedText.phrase);
          events.dispatch(actions.setCommand(command));

          // TODO extract

          const queries = EQueryTranslator.process(command);

          Promise.all(
            queries.map(query =>
              Api.fetchQuery(query, 'command')
                .then(res => events.dispatch(actions.setTableData(res)))
                .catch((err: Error) => console.log(err))
            )
          );
        } catch (err) {
          if (err instanceof Error) {
            events.dispatch(actions.setError(err.message));
          }
        }
      }
    })
  )(<any>SemanticsBox)
);

export { SemanticsBoxContainer };
