import { Key } from 'react';
import { ERModel } from 'gdmn-orm';
import { ERTranslatorRU } from 'gdmn-nlp-agent';

import { ActionTypes, Actions } from './actions';
import { TableColumn, TableRowData } from './components/data-grid-core';

export interface IState {
  readonly erModel: ERModel;
  readonly err?: string | null; // todo .toString()
  // er model table
  readonly columns: TableColumn[];
  readonly headRows?: TableRowData[];
  readonly bodyRows?: TableRowData[];
  readonly footRows?: TableRowData[];
  // entity data table
  readonly dataTableColumns?: TableColumn[];
  readonly dataTableHeadRows?: TableRowData[];
  readonly dataTableBodyRows?: TableRowData[];
  readonly dataTableFootRows?: TableRowData[];
  // internal
  readonly erTranslatorRU?: ERTranslatorRU;
}

function createTableColumn(key: Key, widthPx?: number | null, align?: string | null): TableColumn {
  return { id: key, widthPx, align };
}

const initialState: IState = {
  erModel: new ERModel(),
  // er models table
  columns: [createTableColumn('name', 200)],
  headRows: [{ id: 1, name: { title: 'entity.NAME' } }]
};

// todo combineReducers<IState, RootAction>

export function reducer(state: IState = initialState, action: Actions): IState {
  switch (action.type) {
    case ActionTypes.LOAD_ERMODEL_OK: {
      return {
        ...state,
        erModel: action.payload,
        erTranslatorRU: new ERTranslatorRU(action.payload), // todo ?
        err: null
      };
    }
    case ActionTypes.LOAD_ERMODEL_ERROR: {
      return {
        ...state,
        erModel: new ERModel(),
        err: action.payload
      };
    }
    default:
      return state;
  }
}

// demo data
let id = 0;
function createDemoRowData(name: any, calories: any, fat: any, carbs: any, protein: any): TableRowData {
  id += 1;
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein
  };
}
const demoFootRows = [
  createDemoRowData({ title: 'Result: ' }, { title: '1000' }, { title: '1001' }, { title: '1002' }, { title: '1003' })
];
const demoBodyRows = [
  createDemoRowData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createDemoRowData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createDemoRowData('Eclair', 262, 16.0, 24, 6.0),
  createDemoRowData('Cupcake', 305, 3.7, 67, 4.3),
  createDemoRowData('Gingerbread', 356, 16.0, 49, 3.9),
  createDemoRowData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createDemoRowData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createDemoRowData('Eclair', 262, 16.0, 24, 6.0),
  createDemoRowData('Cupcake', 305, 3.7, 67, 4.3),
  createDemoRowData('Gingerbread', 356, 16.0, 49, 3.9),
  createDemoRowData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createDemoRowData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createDemoRowData('Eclair', 262, 16.0, 24, 6.0),
  createDemoRowData('Cupcake', 305, 3.7, 67, 4.3),
  createDemoRowData('Gingerbread', 356, 16.0, 49, 3.9),
  createDemoRowData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createDemoRowData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createDemoRowData('Eclair', 262, 16.0, 24, 6.0),
  createDemoRowData('Cupcake', 305, 3.7, 67, 4.3),
  createDemoRowData('Gingerbread', 356, 16.0, 49, 3.9)
];
const demoColumns = [
  createTableColumn('name', 200),
  createTableColumn('calories', null, 'right'),
  createTableColumn('fat', null, 'right'),
  createTableColumn('carbs', null, 'right'),
  createTableColumn('protein', null, 'right')
];
const demoHeadRows = [
  createDemoRowData(
    { title: 'Dessert (100g serving)' },
    { title: 'Calories' },
    { title: 'Fat (g)' },
    { title: 'Carbs (g)' },
    { title: 'Protein (g)' }
  )
];
