import { Middleware } from 'redux';
import { getType } from 'typesafe-actions';

import { gdmnWsActions } from '@src/app/scenes/gdmn/actions';
import { IWsMessageEventData } from '@core/gdmn-api/ws/IWsMessageEventData';
import { TWsMessageEventDataTypeEnum } from '@core/gdmn-api/ws/wsMessageEventDataType';
import { GdmnApi } from '@src/app/services/GdmnApi';
import { backupActions } from '@src/app/scenes/backups/actions';
import { selectBackupsState } from '@src/app/store/selectors';

const reloadDataMiddleware: Middleware = ({ dispatch, getState }) => next => action => {
  if (
    action.type === getType(gdmnWsActions.wsOnMessage) &&
    action.payload &&
    (<IWsMessageEventData>action.payload).type === TWsMessageEventDataTypeEnum.BACKUP_FINISHED &&
    !!selectBackupsState(getState()).appId
  ) {
    dispatch(backupActions.loadBackups(selectBackupsState(getState()).appId!));
  }

  return next(action);
};

// todo test async
const getLoadDataMiddleware = (apiService: GdmnApi): Middleware => ({ dispatch, getState }) => next => async (
  action: any
) => {
  if (action.type === getType(backupActions.loadBackups)) {
    dispatch(backupActions.loadBackupsRequest());
    try {
      const res = await apiService.loadBackups(action.payload);

      dispatch(backupActions.loadBackupsRequestOk(res, action.payload));
    } catch (err) {
      dispatch(backupActions.loadBackupsRequestError(err));
    }
  }

  return next(action);
};

const getBackupsMiddlewares = (apiService: GdmnApi): Middleware[] => [
  reloadDataMiddleware,
  getLoadDataMiddleware(apiService)
];

export { getBackupsMiddlewares };
