import { Key } from 'react';
import { ERModel } from 'gdmn-orm';
import { getType } from 'typesafe-actions';

import { IERModelBoxStateProps } from '@src/app/scenes/ermodel/component';
import { actions, TErModelActions } from './actions';
import { ITableColumn } from './components/data-grid-core';

interface IErmodelState extends IERModelBoxStateProps {
  readonly entitiesSelectedRowId?: Key;
  readonly fieldsSelectedRowIds?: Key[];
  readonly tableData?: object;
}

function createTableColumn(key: Key, widthPx?: number, align?: string): ITableColumn {
  return { id: key, widthPx, align };
}

const initialState: IErmodelState = {
  erModel: new ERModel(),
  entitiesTableColumns: [createTableColumn('name', 400)],
  entitiesTableHeadRows: [{ id: 1, name: { title: 'entity.NAME' } }],
  fieldsTableColumns: [createTableColumn('name', 200)],
  fieldsTableHeadRows: [{ id: 1, name: { title: 'field.NAME' } }]
};

// todo combineReducers<IState, RootAction>

function reducer(state: IErmodelState = initialState, action: TErModelActions): IErmodelState {
  switch (action.type) {
    case getType(actions.loadERModelOk): {
      return {
        ...state,
        erModel: action.payload,

        err: null
      };
    }
    case getType(actions.loadError): {
      return {
        ...state,
        err: action.payload,

        erModel: new ERModel()
      };
    }
    case getType(actions.singleselectToggleEntitiesRow): {
      if (action.payload === undefined) return state;

      // single selection

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
    case getType(actions.multiselectToggleFieldsRow): {
      if (action.payload === undefined) return state;

      // multiple selection

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
    case getType(actions.loadEntityDataOk): {
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
