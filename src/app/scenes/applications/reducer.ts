import { getType } from 'typesafe-actions';

import { IApplicationsBoxStateProps } from '@src/app/scenes/applications/component';
import { TAppsActions, actions } from '@src/app/scenes/applications/actions';

type TAppsState = IApplicationsBoxStateProps;

const initialState: TAppsState = {
  applications: []
};

function applicationReducer(state: TAppsState = initialState, action: TAppsActions): TAppsState {
  switch (action.type) {
    case getType(actions.loadAppsRequestOk): {
      return {
        ...state,
        applications: action.payload
      };
    }
    default:
      return state;
  }
}

export { applicationReducer, TAppsState };
