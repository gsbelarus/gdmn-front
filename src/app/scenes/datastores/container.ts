import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { selectDataStoresState } from '@src/app/store/selectors';
import { GdmnApi } from '@src/app/services/GdmnApi';
import { IState } from '@src/app/store/reducer';
import {
  IDataStoresViewStateProps,
  TDataStoresViewProps,
  DataStoresView,
  IDataStoresViewActionsProps
} from '@src/app/scenes/datastores/component';
import { TDataStoresActions, dataStoresActions } from '@src/app/scenes/datastores/actions';

interface IDispatchToProps extends IDataStoresViewActionsProps {
  dispatch: any;
}

const getDataStoresContainer = (apiService: GdmnApi) =>
  connect(
    (state: IState, ownProps: TDataStoresViewProps): IDataStoresViewStateProps => {
      return {
        ...selectDataStoresState(state)
      };
    },
    (dispatch: Dispatch<TDataStoresActions>): IDispatchToProps => {
      return {
        async deleteDataStore(uid: string) {
          dispatch(dataStoresActions.deleteDataStoreAsync.request());
          try {
            const res = await apiService.deleteDataStore(uid);
            dispatch(dataStoresActions.deleteDataStoreAsync.success(res));
          } catch (err) {
            dispatch(dataStoresActions.deleteDataStoreAsync.failure(err));
          }
          // reload
          this.loadDataStores();
        },
        async createDataStore(alias: string) {
          dispatch(dataStoresActions.createDataStoreAsync.request());
          try {
            const res = await apiService.createDataStore(alias);
            dispatch(dataStoresActions.createDataStoreAsync.success(res));
          } catch (err) {
            dispatch(dataStoresActions.createDataStoreAsync.failure(err));
          }
          // reload
          this.loadDataStores();
        },
        loadDataStores() {
          dispatch(dataStoresActions.loadDataStores());
        },
        dispatch
      };
    }
  )(DataStoresView);

export { getDataStoresContainer };
