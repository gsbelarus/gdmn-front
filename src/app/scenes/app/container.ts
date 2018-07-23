import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { withProps } from 'recompose';

import { GdmnApi } from '@src/app/services/GdmnApi';
import { selectRootState, selectNLPDialogState } from '@src/app/store/selectors';
import { IState } from '@src/app/store/reducer';
import { actions as authActions } from '@src/app/scenes/auth/actions';
import { getERModelBoxContainer } from '@src/app/scenes/ermodel/container';
import { getSemanticsBoxContainer } from '@src/app/scenes/semantics/container';
import { Home, IHomeProps } from '@src/app/scenes/app/components/Home';
import { NLPDialogScroll } from '@src/app/scenes/app/components/NLPDialogScroll';
import { nlpDialogActions, TNLPDialogActions } from '@src/app/scenes/app/actions';
import { App, IAppProps, IAppStateProps, IAppActionsProps } from '@src/app/scenes/app/component';
import { TActions } from '@src/app/store/TActions';

const NLPDialogScrollContainer = connect(
  (state: IState) => ({
    ...selectNLPDialogState(state)
  }),
  (dispatch: Dispatch<TNLPDialogActions>) => ({
    onSetText: (text: string) => dispatch(nlpDialogActions.addNLPDialogText(text))
  })
)(NLPDialogScroll);

const getAppContainer = (apiService: GdmnApi) =>
  compose(
    hot(module),
    connect(
      (state: IState, ownProps: IAppProps): IAppStateProps => ({
        errorMessage: selectRootState(state).errorMessage
      }),
      (dispatch: Dispatch<TActions>): IAppActionsProps => ({
        signOut: bindActionCreators(authActions.signOut, dispatch)
      })
    ),
    withProps({
      renderHome: withProps<IHomeProps, IHomeProps>({ renderNlpDialogScrollContainer: NLPDialogScrollContainer })(Home),
      renderSemanticsBoxContainer: getSemanticsBoxContainer(apiService),
      renderERModelBoxContainer: getERModelBoxContainer(apiService)
    })
  )(App);

// if (isDevMode()) {
//   const { whyDidYouUpdate } = require('why-did-you-update');
//   whyDidYouUpdate(React, {exclude: [/^TableCell/, /^Rect/, /^Edge/]});
// }

export { getAppContainer };
