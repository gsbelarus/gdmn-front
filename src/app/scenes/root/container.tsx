import { withProps } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Snackbar } from '@material-ui/core';

import { selectRootState } from '@src/app/store/selectors';
import { IState } from '@src/app/store/reducer';
import { Root } from '@src/app/scenes/root/component';
import { rootActions } from '@src/app/scenes/root/actions';

const staticSnackbarProps = {
  style: { alignItems: 'flex-end', height: 'auto' },
  anchorOrigin: { vertical: 'bottom', horizontal: 'center' }
};

const SnackbarContainer = connect(
  (state: IState) => ({
    message: selectRootState(state).errorMessage,
    open: !!selectRootState(state).errorMessage,
    ...staticSnackbarProps
  }),
  dispatch => ({
    onClose: bindActionCreators(rootActions.hideError, dispatch)
  })
)(Snackbar as any); // FIXME

const RootContainer = withProps({
  renderSnackbarContainer: SnackbarContainer
})(Root as any); // FIXME

export { RootContainer };
