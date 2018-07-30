import { getType } from 'typesafe-actions';

import { IAppsViewStateProps } from '@src/app/scenes/apps/component';
import { TAppsActions, appsActions } from '@src/app/scenes/apps/actions';

type TAppsState = IAppsViewStateProps;

const initialState: TAppsState = {
  apps: []
};

function appsReducer(state: TAppsState = initialState, action: TAppsActions): TAppsState {
  switch (action.type) {
    case getType(appsActions.loadAppsRequestOk): {
      return {
        ...state,
        apps: action.payload
      };
    }
    default:
      return state;
  }
}

export { appsReducer, TAppsState };
