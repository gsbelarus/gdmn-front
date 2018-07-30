import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { selectApplicationsState } from '@src/app/store/selectors';
import { GdmnApi } from '@src/app/services/GdmnApi';
import { IState } from '@src/app/store/reducer';
import {
  IApplicationsBoxStateProps,
  TApplicationsBoxProps,
  ApplicationsBox,
  IApplicationsBoxActionsProps
} from '@src/app/scenes/applications/component';
import { TAppsActions, actions } from '@src/app/scenes/applications/actions';

interface IDispatchToProps extends IApplicationsBoxActionsProps {
  dispatch: any;
}

const getAppsBoxContainer = (apiService: GdmnApi) =>
  connect(
    (state: IState, ownProps: TApplicationsBoxProps): IApplicationsBoxStateProps => {
      return {
        ...selectApplicationsState(state)
      };
    },
    (dispatch: Dispatch<TAppsActions>): IDispatchToProps => {
      return {
        async loadApps() {
          dispatch(actions.loadAppsRequest());
          try {
            const res = await apiService.loadApps();
            dispatch(actions.loadAppsRequestOk(res));
          } catch (err) {
            dispatch(actions.loadAppsRequestError(err));
          }
        },
        async deleteApp(uid: string) {
          dispatch(actions.deleteAppRequest());
          try {
            const res = await apiService.deleteApp(uid);
            dispatch(actions.deleteAppRequestOk(res));
          } catch (err) {
            dispatch(actions.deleteAppRequestError(err));
          }
          // reload
          await this.loadApps();
        },
        async createApp(alias: string) {
          dispatch(actions.createAppRequest());
          try {
            const res = await apiService.createApp(alias);
            dispatch(actions.createAppRequestOk(res));
          } catch (err) {
            dispatch(actions.createAppRequestError(err));
          }
          // reload
          await this.loadApps();
        },
        dispatch
      };
    }
  )(ApplicationsBox);

export { getAppsBoxContainer };
