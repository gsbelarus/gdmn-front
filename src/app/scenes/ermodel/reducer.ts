import { Key } from 'react';
import { ERModel } from 'gdmn-orm';
import { ERTranslatorRU } from 'gdmn-nlp-agent';

import { ActionTypes, Actions } from './actions';
import { TableColumn, TableRowData } from './components/data-grid-core';

// demo data
let id = 0;
function createData(name: any, calories: any, fat: any, carbs: any, protein: any): TableRowData {
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
function createTableColumn(key: Key, widthPx?: number | null, align?: string | null): TableColumn {
  return { id: key, widthPx, align };
}
const demoFootRows = [
  createData({ title: 'Result: ' }, { title: '1000' }, { title: '1001' }, { title: '1002' }, { title: '1003' })
];
const demoBodyRows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
];

export interface IState {
  readonly erTranslatorRU?: ERTranslatorRU;

  readonly erModel: ERModel;
  readonly err?: string | null; // todo .toString()
  // demo
  readonly columns: TableColumn[];
  readonly headRows: TableRowData[];
  readonly bodyRows: TableRowData[];
  readonly footRows: TableRowData[];
}

const initialState: IState = {
  erModel: new ERModel(),
  // demo
  columns: [
    createTableColumn('name', 200),
    createTableColumn('calories', null, 'right'),
    createTableColumn('fat', null, 'right'),
    createTableColumn('carbs', null, 'right'),
    createTableColumn('protein', null, 'right')
  ],
  headRows: [
    createData(
      { title: 'Dessert (100g serving)' },
      { title: 'Calories' },
      { title: 'Fat (g)' },
      { title: 'Carbs (g)' },
      { title: 'Protein (g)' }
    )
  ],
  bodyRows: demoBodyRows,
  footRows: demoFootRows
};

// todo combineReducers<IState, RootAction>

export function reducer(state: IState = initialState, action: Actions): IState {
  switch (action.type) {
    case ActionTypes.LOAD_ERMODEL_OK: {
      return {
        ...state,
        erTranslatorRU: new ERTranslatorRU(action.payload),
        erModel: action.payload,
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
