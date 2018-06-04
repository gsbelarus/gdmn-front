import { Key } from 'react';
import { ERModel } from 'gdmn-orm';
import { ERTranslatorRU } from 'gdmn-nlp-agent';

import { ActionTypes, TActions } from './actions';
import { ITableColumn, ITableRowData } from './components/data-grid-core';

interface IState {
  readonly selectedFields?: string[];
  readonly selectedEntityName?: string;
  readonly erModel: ERModel;
  readonly err?: string | null; // todo .toString()
  // er model table
  readonly columns: ITableColumn[];
  readonly headRows?: ITableRowData[];
  readonly bodyRows?: ITableRowData[];
  readonly footRows?: ITableRowData[];
  // entity fields table
  readonly fieldsTableColumns?: ITableColumn[];
  readonly fieldsTableHeadRows?: ITableRowData[];
  readonly fieldsTableBodyRows?: ITableRowData[];
  readonly fieldsTableFootRows?: ITableRowData[];
  // entity data table
  readonly dataTableColumns?: ITableColumn[];
  readonly dataTableHeadRows?: ITableRowData[];
  readonly dataTableBodyRows?: ITableRowData[];
  readonly dataTableFootRows?: ITableRowData[];
  // internal
  readonly erTranslatorRU?: ERTranslatorRU;
}

function createTableColumn(key: Key, widthPx?: number | null, align?: string | null): ITableColumn {
  return { id: key, widthPx, align };
}

const initialState: IState = {
  erModel: new ERModel(),
  // er models table
  columns: [createTableColumn('name', 200)],
  headRows: [{ id: 1, name: { title: 'entity.NAME' } }],
  // entity fields table
  fieldsTableColumns: [createTableColumn('name', 200)],
  fieldsTableHeadRows: [{ id: 1, name: { title: 'field.NAME' } }]
};

// todo combineReducers<IState, RootAction>

function reducer(state: IState = initialState, action: TActions): IState {
  switch (action.type) {
    case ActionTypes.LOAD_ERMODEL_OK: {
      return {
        ...state,
        erModel: action.payload,
        erTranslatorRU: new ERTranslatorRU(action.payload), // todo ?
        err: null
      };
    }
    case ActionTypes.LOAD_ERROR: {
      return {
        ...state,
        erModel: new ERModel(),
        err: action.payload
      };
    }
    case ActionTypes.SELECT_ENTITY: {
      return {
        ...state,
        selectedEntityName: action.payload
      };
    }
    case ActionTypes.SELECT_FIELDS: {
      return {
        ...state,
        selectedFields: action.payload
      };
    }
    default:
      return state;
  }
}

export { reducer, IState, initialState };
