import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { withProps } from 'recompose';

import { GdmnApi } from '@src/app/services/GdmnApi';
import { selectNLPDialogState } from '@src/app/store/selectors';
import { IState } from '@src/app/store/reducer';
import { actions as authActions } from '@src/app/scenes/auth/actions';
import { getERModelBoxContainer } from '@src/app/scenes/ermodel/container';
import { getSemanticsBoxContainer } from '@src/app/scenes/semantics/container';
import { Home, IHomeProps } from '@src/app/scenes/app/components/Home';
import { INLPDialogScrollActionsProps, NLPDialogScroll } from '@src/app/scenes/app/components/NLPDialogScroll';
import { nlpDialogActions } from '@src/app/scenes/app/actions';
import { App } from '@src/app/scenes/app/component';
import { getAppsBoxContainer } from '@src/app/scenes/applications/container';

const NLPDialogScrollContainer = connect(
  (state: IState) => ({
    ...selectNLPDialogState(state)
  }),
  (dispatch): INLPDialogScrollActionsProps => ({
    addNlpMessage: bindActionCreators(nlpDialogActions.addNlpMessage, dispatch)
  })
)(NLPDialogScroll);

const getAppContainer = (apiService: GdmnApi) => <any>compose(
    connect(
      null,
      dispatch => ({
        signOut: bindActionCreators(authActions.signOut, dispatch)
      })
    ),
    withProps({
      renderHome: withProps<IHomeProps, IHomeProps>({ renderNlpDialogScrollContainer: NLPDialogScrollContainer })(Home),
      renderSemanticsBoxContainer: getSemanticsBoxContainer(apiService),
      renderERModelBoxContainer: getERModelBoxContainer(apiService),
      renderAppsBoxContainer: getAppsBoxContainer(apiService)
    })
  )(App);

export { getAppContainer };

// if (isDevMode()) {
//   const { whyDidYouUpdate } = require('why-did-you-update');
//   whyDidYouUpdate(React, {exclude: [/^TableCell/, /^Rect/, /^Edge/]});
// }
