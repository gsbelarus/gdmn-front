import { getType } from 'typesafe-actions';

import { IBackupsViewStateProps } from '@src/app/scenes/backups/component';
import { backupActions, TBackupActions } from '@src/app/scenes/backups/actions';

type TBackupsState = IBackupsViewStateProps;

const initialState: TBackupsState = {
  backups: [],
  accessToken: null
};

function backupsReducer(state: TBackupsState = initialState, action: TBackupActions): TBackupsState {
  switch (action.type) {
    case getType(backupActions.setAccessToken): {
      return {
        ...state,
        accessToken: action.payload
      };
    }
    case backupActions.loadBackupsRequestError(new Error()).type: {
      return {
        ...state,
        backups: []
      };
    }
    case getType(backupActions.loadBackupsRequestOk): {
      return {
        ...state,
        backups: action.payload
      };
    }
    default:
      return state;
  }
}

export { backupsReducer, TBackupsState };
