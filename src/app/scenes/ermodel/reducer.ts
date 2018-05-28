import { ERModel } from 'gdmn-orm';
import { ActionType, getType } from 'typesafe-actions';
import { ERTranslatorRU } from 'gdmn-nlp-agent';

import * as actions from './actions';
import { TableColumn, TableRowData } from './components/data-grid-core';
import { Key } from 'react';

export type ERMAction = ActionType<typeof actions>;

export interface State {
  readonly erModel: ERModel;
  readonly err: string;
  readonly erTranslatorRU?: ERTranslatorRU;

  readonly columns?: TableColumn[];
  readonly headRows?: TableRowData[];
  readonly bodyRows?: TableRowData[];
  readonly footRows?: TableRowData[];
}

// test data

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
const gridDemoInitialState = {
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
  ]
  // fetching: false
};
const footRows = [
  createData({ title: 'Result: ' }, { title: '1000' }, { title: '1001' }, { title: '1002' }, { title: '1003' })
];
const bodyRows = [
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

export const initialState: State = {
  erModel: new ERModel(),
  err: '',
  // todo tmp
  ...gridDemoInitialState,
  bodyRows,
  footRows
};

export default function reducer(state: State = initialState, action: ERMAction): State {
  switch (action.type) {
    case getType(actions.loadERModel): {
      return {
        erTranslatorRU: new ERTranslatorRU(action.payload),
        erModel: action.payload, err: '' };
    }

    case getType(actions.loadERModelError): {
      return { erModel: new ERModel(), err: action.payload };
    }

    default:
      return state;
  }
}
