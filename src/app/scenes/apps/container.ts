import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { selectAppsState } from '@src/app/store/selectors';
import { GdmnApi } from '@src/app/services/GdmnApi';
import { IState } from '@src/app/store/reducer';
import {
  IAppsViewStateProps,
  TAppsViewProps,
  AppsView,
  IAppsViewActionsProps
} from '@src/app/scenes/apps/component';
import { TAppsActions, appsActions } from '@src/app/scenes/apps/actions';

interface IDispatchToProps extends IAppsViewActionsProps {
  dispatch: any;
}

const getAppsContainer = (apiService: GdmnApi) =>
  connect(
    (state: IState, ownProps: TAppsViewProps): IAppsViewStateProps => {
      return {
        ...selectAppsState(state)
      };
    },
    (dispatch: Dispatch<TAppsActions>): IDispatchToProps => {
      return {
        async loadApps() {
          dispatch(appsActions.loadAppsRequest());
          try {
            const res = await apiService.loadApps();
            dispatch(appsActions.loadAppsRequestOk(res));
          } catch (err) {
            dispatch(appsActions.loadAppsRequestError(err));
          }
        },
        async deleteApp(uid: string) {
          dispatch(appsActions.deleteAppRequest());
          try {
            const res = await apiService.deleteApp(uid);
            dispatch(appsActions.deleteAppRequestOk(res));
          } catch (err) {
            dispatch(appsActions.deleteAppRequestError(err));
          }
          // reload
          await this.loadApps();
        },
        async createApp(alias: string) {
          dispatch(appsActions.createAppRequest());
          try {
            const res = await apiService.createApp(alias);
            dispatch(appsActions.createAppRequestOk(res));
          } catch (err) {
            dispatch(appsActions.createAppRequestError(err));
          }
          // reload
          await this.loadApps();
        },
        dispatch
      };
    }
  )(AppsView);

export { getAppsContainer };
