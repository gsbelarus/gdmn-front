import { Dispatch as ReduxDispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../reducers';
import { SemanticsBox } from './components/semanticsBox';
import { parsePhrase } from 'gdmn-nlp';
import { SemAction } from './reducer';
import * as actions from './actions';

type Dispatch = ReduxDispatch<SemAction>;

export default connect(
  (state: State) => ({
    text: state.semantics.text,
    parsedText: state.semantics.parsedText,
    phrase: state.semantics.phrase
  }),
  (dispatch: Dispatch) => ({
    onSetText: (text: string) => dispatch(actions.setSemText(text)),
    onClearText: () => dispatch(actions.setSemText('')),
    onParse: (text: string) => {
      dispatch(actions.setParsedText(parsePhrase(text)));
    },
  })
)(SemanticsBox);