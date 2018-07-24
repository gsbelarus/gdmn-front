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
        loadApps: () => {
          dispatch(actions.loadAppsRequest());
          apiService
            .loadApps()
            .then((res: any) => dispatch(actions.loadAppsRequestOk(res)))
            .catch((err: Error) => dispatch(actions.loadAppsRequestError(err)));
        },
        deleteApp: (uid: string) => {
          dispatch(actions.deleteAppRequest());

          apiService
            .deleteApp(uid)
            .then((res: any) => dispatch(actions.deleteAppRequestOk(res)))
            .catch((err: Error) => dispatch(actions.deleteAppRequestError(err)))
            .then(() => {
              dispatch(actions.loadAppsRequest());

              apiService
                .loadApps()
                .then((res: any) => dispatch(actions.loadAppsRequestOk(res)))
                .catch((err: Error) => dispatch(actions.loadAppsRequestError(err)));
            });
        },
        createApp: (alias: string) => {
          dispatch(actions.createAppRequest());

          apiService
            .createApp(alias)
            .then((res: any) => dispatch(actions.createAppRequestOk(res)))
            .catch((err: Error) => dispatch(actions.createAppRequestError(err)))
            .then(() => {
              dispatch(actions.loadAppsRequest());

              apiService
                .loadApps()
                .then((res: any) => dispatch(actions.loadAppsRequestOk(res)))
                .catch((err: Error) => dispatch(actions.loadAppsRequestError(err)));
            });
        },
        dispatch
      };
    }
  )(ApplicationsBox);

export { getAppsBoxContainer };
