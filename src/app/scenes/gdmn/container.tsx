import { withProps, compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getAppsContainer } from '@src/app/scenes/apps/container';
import { GdmnApi } from '@src/app/services/GdmnApi';
import { GdmnView, IGdmnViewProps } from '@src/app/scenes/gdmn/component';
import { getERModelBoxContainer } from '@src/app/scenes/ermodel/container';
import { actions as authActions } from '@src/app/scenes/auth/actions';

const getGdmnContainer = (apiService: GdmnApi) =>
  compose<IGdmnViewProps, IGdmnViewProps>(
    connect(
      null,
      dispatch => ({
        signOut: bindActionCreators(authActions.signOut, dispatch)
      })
    ),
    withProps<any, IGdmnViewProps>({
      renderAppsViewContainer: getAppsContainer(apiService),
      renderERModelBoxContainer: getERModelBoxContainer(apiService)
    })
  )(GdmnView);

export { getGdmnContainer };
