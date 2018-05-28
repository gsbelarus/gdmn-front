import { parsePhrase } from 'gdmn-nlp';
import { connect } from 'react-redux';
import { Dispatch as ReduxDispatch } from 'redux';

import { State } from '../../rootReducer';
import * as actions from './actions';
import { SemanticsBox } from './component';
import { SemAction } from './reducer';

type SemActionDispatch = ReduxDispatch<SemAction>; // TODO test THUNK <_, State>

export default connect(
  (state: State) => ({
    text: state.semantics.text,
    parsedText: state.semantics.wordsSignatures,
    phrase: state.semantics.phrase
  }),
  (dispatch: SemActionDispatch) => ({
    onSetText: (text: string) => dispatch(actions.setSemText(text)),
    onClearText: () => dispatch(actions.setSemText('')),
    onParse: (text: string) => {
      const parsedText = parsePhrase(text);
      dispatch(actions.setParsedText(parsedText));
    }
  })
)(SemanticsBox);
