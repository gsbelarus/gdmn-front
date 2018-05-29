import { deserializeERModel, IERModel } from 'gdmn-orm';
import { connect } from 'react-redux';
import { Dispatch as ReduxDispatch } from 'redux';

import { IRootState } from '@src/app/redux/rootReducer';
import { selectErmodelState } from '@src/app/redux/selectors';
import { loadERModelError, loadERModelOk } from '@src/app/scenes/ermodel/actionCreators';
import { Actions } from './actions';
import { ERModelBox } from './component';

type Dispatch = ReduxDispatch<Actions>;

export default connect(
  (state: IRootState) => ({
    ...selectErmodelState(state)
  }),
  (dispatch: Dispatch) => ({
    onLoad: () => {
      fetch('http://localhost:4000/er') // TODO config
        .then(res => {
          return res.text();
        })
        .then(res => JSON.parse(res))
        .then(res => {
          return dispatch(loadERModelOk(deserializeERModel(res as IERModel)));
        })
        .catch(err => dispatch(loadERModelError(JSON.stringify(err))));
    }
  })
)(ERModelBox);
