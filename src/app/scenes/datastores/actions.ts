import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';

import { IAppCreateResponse } from '@core/gdmn-api/app/IAppCreateResponse';
import { IAppDeleteResponse } from '@core/gdmn-api/app/IAppDeleteResponse';
import { TAppGetResponse } from '@core/gdmn-api/app/TAppGetResponse';

const dataStoresActions = {
  // TODO tmp
  selectDS: createAction('gdmn/selectDS', resolve => {
    return () => resolve();
  }),
  loadDataStores: createAction('gdmn/datastores/LOAD_DATA_STORES', resolve => {
    // todo async
    return () => resolve();
  }),
  loadDataStoresAsync: createAsyncAction(
    'gdmn/datastores/LOAD_DATA_STORES_REQUEST',
    'gdmn/datastores/LOAD_DATA_STORES_REQUEST_OK',
    'gdmn/datastores/LOAD_DATA_STORES_REQUEST_ERROR'
  )<void, TAppGetResponse, Error>(),
  deleteDataStoreAsync: createAsyncAction(
    'gdmn/datastores/DELETE_DATA_STORE_REQUEST',
    'gdmn/datastores/DELETE_DATA_STORE_REQUEST_OK',
    'gdmn/datastores/DELETE_DATA_STORE_REQUEST_ERROR'
  )<void, IAppDeleteResponse, Error>(),
  createDataStoreAsync: createAsyncAction(
    'gdmn/datastores/CREATE_DATA_STORE_REQUEST',
    'gdmn/datastores/CREATE_DATA_STORE_REQUEST_OK',
    'gdmn/datastores/CREATE_DATA_STORE_REQUEST_ERROR'
  )<void, IAppCreateResponse, Error>()
};

type TDataStoresActions = ActionType<typeof dataStoresActions>;

// FIXME
// dataStoresActions.loadDataStoresRequestError = (error: Error) => ({
//   type: 'gdmn/datastores/LOAD_DATA_STORES_REQUEST_ERROR',
//   payload: error,
//   error: true
// });
// dataStoresActions.deleteDataStoreRequestError = (error: Error) => ({
//   type: 'gdmn/datastores/DELETE_DATA_STORE_REQUEST_ERROR',
//   payload: error,
//   error: true
// });
// dataStoresActions.createDataStoreRequestError = (error: Error) => ({
//   type: 'gdmn/datastores/CREATE_DATA_STORE_REQUEST_ERROR',
//   payload: error,
//   error: true
// });

export { dataStoresActions, TDataStoresActions };
