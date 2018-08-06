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
        async loadDataStores() {
          dispatch(dataStoresActions.loadDataStoresRequest());
          try {
            const res = await apiService.loadDataStores();
            dispatch(dataStoresActions.loadDataStoresRequestOk(res));
          } catch (err) {
            dispatch(dataStoresActions.loadDataStoresRequestError(err));
          }
        },
        async deleteDataStore(uid: string) {
          dispatch(dataStoresActions.deleteDataStoreRequest());
          try {
            const res = await apiService.deleteDataStore(uid);
            dispatch(dataStoresActions.deleteDataStoreRequestOk(res));
          } catch (err) {
            dispatch(dataStoresActions.deleteDataStoreRequestError(err));
          }
          // reload
          await this.loadDataStores();
        },
        async createDataStore(alias: string) {
          dispatch(dataStoresActions.createDataStoreRequest());
          try {
            const res = await apiService.createDataStore(alias);
            dispatch(dataStoresActions.createDataStoreRequestOk(res));
          } catch (err) {
            dispatch(dataStoresActions.createDataStoreRequestError(err));
          }
          // reload
          await this.loadDataStores();
        },
        dispatch
      };
    }
  )(DataStoresView);

export { getDataStoresContainer };
