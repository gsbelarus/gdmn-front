import { Key } from 'react';
import { ERModel } from 'gdmn-orm';

import { ActionTypes, TErModelActions } from './actions';
import { ITableColumn, ITableRow } from './components/data-grid-core';

interface IErmodelState {
  readonly selectedFields?: string[];
  readonly selectedEntityName?: string;
  readonly erModel: ERModel;
  readonly err?: string | null; // todo .toString()
  // er model table
  readonly columns: ITableColumn[];
  readonly headRows?: ITableRow[];
  readonly bodyRows?: ITableRow[];
  readonly footRows?: ITableRow[];
  // entity fields table
  readonly fieldsTableColumns?: ITableColumn[];
  readonly fieldsTableHeadRows?: ITableRow[];
  readonly fieldsTableBodyRows?: ITableRow[];
  readonly fieldsTableFootRows?: ITableRow[];
  // entity data table
  readonly dataTableColumns?: ITableColumn[];
  readonly dataTableHeadRows?: ITableRow[];
  readonly dataTableBodyRows?: ITableRow[];
  readonly dataTableFootRows?: ITableRow[];
}

function createTableColumn(key: Key, widthPx?: number, align?: string): ITableColumn {
  return { id: key, widthPx, align };
}

const initialState: IErmodelState = {
  erModel: new ERModel(),
  // er models table
  columns: [createTableColumn('name', 200)],
  headRows: [{ id: 1, name: { title: 'entity.NAME' } }],
  // entity fields table
  fieldsTableColumns: [createTableColumn('name', 200)],
  fieldsTableHeadRows: [{ id: 1, name: { title: 'field.NAME' } }]
};

// todo combineReducers<IState, RootAction>

function reducer(state: IErmodelState = initialState, action: TErModelActions): IErmodelState {
  switch (action.type) {
    case ActionTypes.LOAD_ERMODEL_OK: {
      return {
        ...state,
        erModel: action.payload,
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

export { reducer, IErmodelState };
