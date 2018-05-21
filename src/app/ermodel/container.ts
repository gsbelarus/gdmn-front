import { Dispatch as ReduxDispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../reducers';
import { ERModelBox } from './components/erModelBox';
import * as actions from './actions';
import { ERMAction } from './reducer';
import { deserializeERModel, IERModel } from 'gdmn-orm';

type Dispatch = ReduxDispatch<ERMAction>;

export default connect(
  (state: State) => ({ ...state.ermodel }),
  (dispatch: Dispatch) => ({
    onLoad: () => {
      fetch('http://localhost:4000/er')
        .then(res => {
          return res.text();
        })
        .then(res => JSON.parse(res))
        .then(res => {
          return dispatch(actions.loadERModel(deserializeERModel(res as IERModel)));
        })
        .catch(err => dispatch(actions.loadERModelError(JSON.stringify(err))));
    }
  })
)(ERModelBox);
