import { getType } from 'typesafe-actions';

import { rootActions, TRootActions } from '@src/app/scenes/root/actions';

interface IRootState {
  refererPath?: string;
  errorMessage?: string;
}

const initialState: IRootState = {
  errorMessage: ''
};

function reducer(state: IRootState = initialState, action: TRootActions) {
  switch (action.type) {
    case getType(rootActions.onAccessDenied):
    case getType(rootActions.onNotAuthorizedAccess): {
      return {
        ...state,
        refererPath: action.payload
      };
    }
    case getType(rootActions.showError): {
      return {
        ...state,
        errorMessage: action.payload
      };
    }
    case getType(rootActions.hideError): {
      return {
        ...state,
        errorMessage: ''
      };
    }
    // TODO ON_ERROR
    default:
      return state;
  }
}

export { reducer, IRootState };
