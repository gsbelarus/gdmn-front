import { Key } from 'react';
import { parsePhrase } from 'gdmn-nlp';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { deserializeERModel, IERModel } from 'gdmn-orm';
import { createSelector } from 'reselect';

import { Api } from '@src/app/services/Api';
import { IRootState } from '@src/app/store/rootReducer';
import { selectErmodelState, selectSemanticsState } from '@src/app/store/selectors';
import { EQueryTranslator } from '@src/app/scenes/semantics/EQueryTranslator';
import { ITableColumn, ITableRow } from '@src/app/scenes/ermodel/components/data-grid-core';
import { actions as erModelActions } from '@src/app/scenes/ermodel/actions';
import { TRootActions } from '@src/app/store/RootActions';
import { actions } from './actions';
import {
  ISemanticsBoxActionsProps,
  ISemanticsBoxSelectorProps,
  ISemanticsBoxStateProps,
  SemanticsBox,
  TSemanticsBoxProps
} from './component';

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

const ermodelSelector = (state: any, props: any) => selectErmodelState(state).erModel; // TODO import

function createCommand(erTranslatorRU: any, parsedTextPhrase: any) {
  if (!erTranslatorRU || !parsedTextPhrase) return;

  // try {
  const command = erTranslatorRU.process(<
    any // FIXME
  >parsedTextPhrase);

  return command;

  // TODO
  // } catch (err) {
  //   if (err instanceof Error) {
  //     dispatch(actions.setError(err.message));
  //   }
  // }
}
const parsedTextPhraseSelector = (state: any, props: any) => selectSemanticsState(state).phrase;
const erTranslatorRUSelector = (state: any, props: any) => selectSemanticsState(state).erTranslatorRU;
const commandSelector = createSelector([erTranslatorRUSelector, parsedTextPhraseSelector], createCommand);

const SemanticsBoxContainer = connect(
  (state: IRootState, ownProps: TSemanticsBoxProps): ISemanticsBoxStateProps & ISemanticsBoxSelectorProps => {
    const { erTranslatorRU, tableData, ...props } = selectSemanticsState(state); // exclude, do not remove!

    return {
      ...props,
      ...dataTableMetaSelector(state, ownProps),
      dataTableBodyRows: dataTableBodyRowsSelector(state, ownProps),
      erModel: ermodelSelector(state, ownProps),
      command: commandSelector(state, ownProps)
    };
  },
  (dispatch: Dispatch<TRootActions>): ISemanticsBoxActionsProps => ({
    onSetText: bindActionCreators(actions.setSemText, dispatch),
    onClearText: () => dispatch(actions.setSemText('')),
    onParse: (text: string) => dispatch(actions.setParsedText(parsePhrase(text))),
    loadErModel: () => {
      Api.fetchEr()
        .then(res => dispatch(erModelActions.loadERModelOk(deserializeERModel(<IERModel>res))))
        .catch((err: Error) => dispatch(erModelActions.loadError(err.message)));
    },
    loadData: (command: any) => {
      dispatch(actions.tableDataLoadStart());

      const queries = EQueryTranslator.process(command);

      Promise.all(
        queries.map(query =>
          Api.fetchQuery(query, 'command')
            .then(res => dispatch(actions.setTableData(res))) // TODO command id
            .catch((err: Error) => console.log(err))
        )
      );
    }
  })
)(SemanticsBox);

export { SemanticsBoxContainer };
