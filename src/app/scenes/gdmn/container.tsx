import { withProps, compose, lifecycle } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getDataStoresContainer } from '@src/app/scenes/datastores/container';
import { GdmnApi } from '@src/app/services/GdmnApi';
import { GdmnView, IGdmnViewProps, TGdmnViewStateProps } from '@src/app/scenes/gdmn/component';
import { actions as authActions } from '@src/app/scenes/auth/actions';
import { IState } from '@src/app/store/reducer';
import { selectDataStoresState } from '@src/app/store/selectors';
import { getDatastoreContainer } from '@src/app/scenes/datastore/container';
import { dataStoresActions } from '@src/app/scenes/datastores/actions';
import { RefObject } from 'react';
import { IDatastoreViewProps } from '@src/app/scenes/datastore/component';

const getGdmnContainer = (apiService: GdmnApi) =>
  compose<IGdmnViewProps, IGdmnViewProps>(
    connect(
      (state: IState, ownProps: IGdmnViewProps): TGdmnViewStateProps => ({
        ...selectDataStoresState(state)
      }),
      dispatch => ({
        signOut: bindActionCreators(authActions.signOut, dispatch),
        async loadDataStores() {
          dispatch(dataStoresActions.loadDataStoresRequest());
          try {
            const res = await apiService.loadDataStores();
            dispatch(dataStoresActions.loadDataStoresRequestOk(res));
          } catch (err) {
            dispatch(dataStoresActions.loadDataStoresRequestError(err));
          }
        }
      })
    ),
    withProps<any, IGdmnViewProps>({
      renderDataStoresViewContainer: getDataStoresContainer(apiService),
      renderDatastoreViewContainer: getDatastoreContainer(apiService),
      getDatastoreViewContainer: (appBarPortalTargetRef: RefObject<HTMLDivElement>) =>
        withProps<any, IDatastoreViewProps>({ appBarPortalTargetRef })(getDatastoreContainer(apiService))
    }),
    lifecycle<IGdmnViewProps, any>({
      async componentDidMount() {
        await this.props.loadDataStores();
      }
    })
  )(GdmnView);

export { getGdmnContainer };
