import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { withProps } from 'recompose';

import { GdmnApi } from '@src/app/services/GdmnApi';
import { selectNLPDialogState } from '@src/app/store/selectors';
import { IState } from '@src/app/store/reducer';
import { actions as authActions } from '@src/app/scenes/auth/actions';
import { getSemanticsBoxContainer } from '@src/app/scenes/semantics/container';
import { Home, IHomeProps } from '@src/app/scenes/demos/components/Home';
import { INLPDialogScrollActionsProps, NLPDialogScroll } from '@src/app/scenes/demos/components/NLPDialogScroll';
import { nlpDialogActions } from '@src/app/scenes/demos/actions';
import { DemosView } from '@src/app/scenes/demos/component';

const NLPDialogScrollContainer = connect(
  (state: IState) => ({
    ...selectNLPDialogState(state)
  }),
  (dispatch): INLPDialogScrollActionsProps => ({
    addNlpMessage: bindActionCreators(nlpDialogActions.addNlpMessage, dispatch)
  })
)(NLPDialogScroll);

const getDemosContainer = (apiService: GdmnApi) => <any>compose(
    connect(
      null,
      dispatch => ({
        signOut: bindActionCreators(authActions.signOut, dispatch)
      })
    ),
    withProps({
      renderHome: withProps<IHomeProps, IHomeProps>({ renderNlpDialogScrollContainer: NLPDialogScrollContainer })(Home),
      renderSemanticsBoxContainer: getSemanticsBoxContainer(apiService)
    })
  )(DemosView);

export { getDemosContainer };

// if (isDevMode()) {
//   const { whyDidYouUpdate } = require('why-did-you-update');
//   whyDidYouUpdate(React, {exclude: [/^TableCell/, /^Rect/, /^Edge/]});
// }
