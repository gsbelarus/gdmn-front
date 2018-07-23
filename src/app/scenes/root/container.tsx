import { withProps } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Snackbar } from '@material-ui/core';

import { selectAppState } from '@src/app/store/selectors';
import { IRootState } from '@src/app/store/rootReducer';
import { Root } from '@src/app/scenes/root/component';
import { actions } from '@src/app/scenes/app/actions';

const staticSnackbarProps = {
  style: { alignItems: 'flex-end', height: 'auto' },
  anchorOrigin: { vertical: 'bottom', horizontal: 'center' }
};

const SnackbarContainer = connect(
  (state: IRootState) => ({
    message: selectAppState(state).errorMessage,
    open: !!selectAppState(state).errorMessage,
    ...staticSnackbarProps
  }),
  dispatch => ({
    onClose: bindActionCreators(actions.hideError, dispatch)
  })
)(Snackbar as any); // FIXME

const RootContainer = withProps({
  renderSnackbarContainer: SnackbarContainer
})(Root as any); // FIXME

export { RootContainer };
