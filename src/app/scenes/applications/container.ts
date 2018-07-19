import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Api } from '@src/app/services/Api';
import { IRootState } from '@src/app/store/rootReducer';

import { IApplicationsBoxStateProps, TApplicationsBoxProps, ApplicationsBox, IApplicationsBoxActionsProps } from './component';
import { TAppsModelActions, actions } from '@src/app/scenes/applications/actions';
import { selectApplicationsState } from '@src/app/store/selectors';

const config = require('configFile');

interface IDispatchToProps extends IApplicationsBoxActionsProps {
  dispatch: any;
}

interface IStateToProps extends IApplicationsBoxStateProps {
  applications: object[];
}

const appsEndPoint = `${config.server.http.host}:${config.server.http.port}/app`;
const creatingAppEndPoint = appsEndPoint;

const ApplicationsBoxContainer = connect(
  (state: IRootState, ownProps: TApplicationsBoxProps): IStateToProps => {
    const { applications, ...props } = selectApplicationsState(state);

    return {
      ...props,
      applications
    };
  },
  (dispatch: Dispatch<TAppsModelActions>): IDispatchToProps => {
    return {
      loadData: () => {
        Api.fetch(appsEndPoint)
          .then(res => {
            return JSON.parse(res); 
          })
          .then(res => {
            dispatch(actions.loadApplicationsDataOk(res));
          })
          .catch((err: Error) => dispatch(actions.loadError(err.message)));
      },
      deleteApp: (uid: string) => {
        const options = {
          method: 'DELETE',
        };
        const deleteAppEndPoint = `${appsEndPoint}/${uid}`;
        dispatch(actions.loadApplicationsData());
        Api.fetch(deleteAppEndPoint, options)
          .then(res => {
            console.log('result of app deletion: ', JSON.parse(res));
          })
          .then(() => {
            return Api.fetch(appsEndPoint)
          })
          .then(res => {
            return JSON.parse(res); 
          })
          .then(res => {
            dispatch(actions.loadApplicationsDataOk(res));
          })
          .catch((err: Error) => dispatch(actions.loadError(err.message)));
      },
      createApp: (alias: string) => {
        const options = {
          method: 'POST',
          body: JSON.stringify({ alias: alias }),
        };

        Api.fetch(creatingAppEndPoint, options)
          .then(res => {
            dispatch(actions.createApplication());
            console.log('Raw Result of creation', res);
            const parsedRes = JSON.parse(res);
            console.log('Parsed Result of creation', parsedRes)
          })
          .then(() => {
            dispatch(actions.createApplicationOk());
            dispatch(actions.loadApplicationsData());
            return Api.fetch(appsEndPoint);
          })
          .then((res) => {
            const parsedRes = JSON.parse(res); 
            console.log('All apps after creating new one: ', parsedRes);
            dispatch(actions.loadApplicationsDataOk(parsedRes));
          })
          .catch((err: Error) => dispatch(actions.loadError(err.message)));
      },
      dispatch,
    };
})(ApplicationsBox);

export { ApplicationsBoxContainer };
