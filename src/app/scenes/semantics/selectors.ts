import { createSelector } from 'reselect';

import { selectSemanticsState } from '@src/app/store/selectors';
import { createDataBodyRows, createTableMeta } from '@src/app/scenes/ermodel/utils';
import { createCommand } from '@src/app/scenes/semantics/utils';
import { rootActions } from '@src/app/scenes/root/actions';

const parsedTextPhraseSelector = (state: any, props: any) => selectSemanticsState(state).phrase;

const erTranslatorRUSelector = (state: any, props: any) => selectSemanticsState(state).erTranslatorRU;

const commandSelector = createSelector([erTranslatorRUSelector, parsedTextPhraseSelector], createCommand);

const tableDataSelector = (state: any, props: any) => selectSemanticsState(state).tableData;

const dataTableBodyRowsSelector = createSelector([tableDataSelector], createDataBodyRows);

const dataTableMetaSelector = createSelector([tableDataSelector], createTableMeta);

const sqlDataSelector = (state: any, props: any) =>
  !!selectSemanticsState(state).tableData ? selectSemanticsState(state).tableData.sql : null;

const sqlQuerySelector = createSelector([sqlDataSelector], (sqlData: any) => {
  if (!sqlData) return '';
  if (!sqlData.params) return sqlData.query;

  let query = sqlData.query || '';

  Object.keys(sqlData.params).map((value, index) => {
    query = query.replace(value, sqlData.params[value]);
  });

  return query;
});

export {
  parsedTextPhraseSelector,
  erTranslatorRUSelector,
  commandSelector,
  tableDataSelector,
  dataTableBodyRowsSelector,
  dataTableMetaSelector,
  sqlQuerySelector
};
