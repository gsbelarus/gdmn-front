import { Middleware } from 'redux';
import { getType } from 'typesafe-actions';

import { gdmnWsActions } from '@src/app/scenes/gdmn/actions';
import { IWsMessageEventData } from '@core/gdmn-api/ws/IWsMessageEventData';
import { TWsMessageEventDataTypeEnum } from '@core/gdmn-api/ws/wsMessageEventDataType';
import { dataStoresActions } from '@src/app/scenes/datastores/actions';
import { GdmnApi } from '@src/app/services/GdmnApi';

const reloadDataMiddleware: Middleware = ({ dispatch, getState }) => next => action => {
  if (
    action.type === getType(gdmnWsActions.wsOnMessage) &&
    action.payload &&
    (<IWsMessageEventData>action.payload).type === TWsMessageEventDataTypeEnum.RESTORE_FINISHED
  ) {
    dispatch(dataStoresActions.loadDataStores());
  }

  return next(action);
};

// todo test async
const getLoadDataMiddleware = (apiService: GdmnApi): Middleware => ({ dispatch, getState }) => next => async (
  action: any
) => {
  if (action.type === getType(dataStoresActions.loadDataStores)) {
    dispatch(dataStoresActions.loadDataStoresAsync.request());
    try {
      const res = await apiService.loadDataStores();
      dispatch(dataStoresActions.loadDataStoresAsync.success(res));
    } catch (err) {
      dispatch(dataStoresActions.loadDataStoresAsync.failure(err));
    }
  }

  return next(action);
};

const getDatastoresMiddlewares = (apiService: GdmnApi): Middleware[] => [
  reloadDataMiddleware,
  getLoadDataMiddleware(apiService)
];

export { getDatastoresMiddlewares };
