import { getType } from 'typesafe-actions';

import { IDataStoresViewStateProps } from '@src/app/scenes/datastores/component';
import { TDataStoresActions, dataStoresActions } from '@src/app/scenes/datastores/actions';

type TDataStoresState = IDataStoresViewStateProps;

const initialState: TDataStoresState = {
  dataStores: []
};

function dataStoresReducer(state: TDataStoresState = initialState, action: TDataStoresActions): TDataStoresState {
  switch (action.type) {
    case getType(dataStoresActions.loadDataStoresAsync.success): {
      return {
        ...state,
        dataStores: action.payload
      };
    }
    default:
      return state;
  }
}

export { dataStoresReducer, TDataStoresState };
