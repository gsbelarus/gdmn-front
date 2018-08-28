import { getType } from 'typesafe-actions';

import { IBackupsViewStateProps } from '@src/app/scenes/backups/component';
import { backupActions, TBackupActions } from '@src/app/scenes/backups/actions';

interface IBackupsState extends IBackupsViewStateProps {
  appId: string | null;
}

const initialState: IBackupsState = {
  appId: null,
  backups: [],
  accessToken: null // todo remove
};

function backupsReducer(state: IBackupsState = initialState, action: TBackupActions): IBackupsState {
  switch (action.type) {
    case getType(backupActions.setAccessToken): {
      return {
        ...state,
        accessToken: action.payload
      };
    }
    case backupActions.loadBackupsAsync.failure(new Error()).type: {
      return {
        ...state,
        appId: null,
        backups: []
      };
    }
    case getType(backupActions.loadBackupsAsync.success): {
      return {
        ...state,
        appId: action.payload.appId,
        backups: action.payload.backups
      };
    }
    default:
      return state;
  }
}

export { backupsReducer, IBackupsState };
