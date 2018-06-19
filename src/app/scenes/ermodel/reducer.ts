import { Key } from 'react';
import { ERModel } from 'gdmn-orm';

import { ActionTypes, TErModelActions } from './actions';
import { ITableColumn, ITableRow } from './components/data-grid-core';

interface IErmodelState {
  // readonly entitiesSelectedName?: string;
  readonly entitiesSelectedRowId?: Key;
  readonly fieldsSelectedRowIds?: Key[];
  readonly tableData?: object;

  readonly erModel: ERModel;
  readonly err?: string | null;
  // er model table
  readonly entitiesTableColumns: ITableColumn[];
  readonly entitiesTableHeadRows?: ITableRow[];
  readonly entitiesTableBodyRows?: ITableRow[];
  readonly entitiesTableFootRows?: ITableRow[];
  // entity fields table
  readonly fieldsTableColumns?: ITableColumn[];
  readonly fieldsTableHeadRows?: ITableRow[];
  readonly fieldsTableBodyRows?: ITableRow[];
  readonly fieldsTableFootRows?: ITableRow[];
  // entity data table
  // readonly dataTableColumns?: ITableColumn[];
  // readonly dataTableHeadRows?: ITableRow[];
  // readonly dataTableBodyRows?: ITableRow[];
  // readonly dataTableFootRows?: ITableRow[];
}

function createTableColumn(key: Key, widthPx?: number, align?: string): ITableColumn {
  return { id: key, widthPx, align };
}

const initialState: IErmodelState = {
  erModel: new ERModel(),
  // er models table
  entitiesTableColumns: [createTableColumn('name', 400)],
  entitiesTableHeadRows: [{ id: 1, name: { title: 'entity.NAME' } }],
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
    case ActionTypes.TOGGLE_ENTITITES_ROW: {
      if (action.payload === undefined) return state;

      // single selection mode

      return {
        ...state,
        entitiesSelectedRowId:
          state.entitiesSelectedRowId === action.payload.entitiesSelectedRowId
            ? undefined
            : action.payload.entitiesSelectedRowId,
        fieldsSelectedRowIds: undefined,
        tableData: undefined
      };
    }
    case ActionTypes.TOGGLE_FIELD_ROW: {
      if (action.payload === undefined) return state;

      // miltiple selection mode

      const selectedRowIds = [...(state.fieldsSelectedRowIds || [])];

      if (
        !!state.fieldsSelectedRowIds &&
        state.fieldsSelectedRowIds.find(value => value === action.payload) !== undefined
      ) {
        selectedRowIds.splice(selectedRowIds.indexOf(action.payload), 1);
      } else {
        selectedRowIds.push(action.payload);
      }

      return {
        ...state,
        fieldsSelectedRowIds: selectedRowIds,
        tableData: undefined
      };
    }

    case ActionTypes.LOAD_ENTITY_DATA_OK: {
      return {
        ...state,
        tableData: action.payload
      };
    }

    default:
      return state;
  }
}

export { reducer, IErmodelState };
