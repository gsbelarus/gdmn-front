import { createSelector } from 'reselect';

import { selectSemanticsState } from '@src/app/store/selectors';
import { createDataBodyRows, createTableMeta } from '@src/app/scenes/ermodel/utils';
import { createCommand } from './utils';

const parsedTextPhraseSelector = (state: any, props: any) => selectSemanticsState(state).phrase;

const erTranslatorRUSelector = (state: any, props: any) => selectSemanticsState(state).erTranslatorRU;

const commandSelector = createSelector([erTranslatorRUSelector, parsedTextPhraseSelector], createCommand);

const tableDataSelector = (state: any, props: any) => selectSemanticsState(state).tableData;

const dataTableBodyRowsSelector = createSelector([tableDataSelector], createDataBodyRows);

const dataTableMetaSelector = createSelector([tableDataSelector], createTableMeta);

export {
  parsedTextPhraseSelector,
  erTranslatorRUSelector,
  commandSelector,
  tableDataSelector,
  dataTableBodyRowsSelector,
  dataTableMetaSelector
};
