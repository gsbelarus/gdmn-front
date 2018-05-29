import { parsePhrase } from 'gdmn-nlp';
import { connect } from 'react-redux';
import { Dispatch as ReduxDispatch } from 'redux';

import { IRootState } from '@src/app/redux/rootReducer';
import { selectSemantics } from '@src/app/redux/selectors';
import { actions, Actions } from './actions';
import { SemanticsBox } from './component';

type SemActionDispatch = ReduxDispatch<Actions>;

export default connect(
  (state: IRootState) => ({
    text: selectSemantics(state).text,
    wordsSignatures: selectSemantics(state).wordsSignatures,
    phrase: selectSemantics(state).phrase
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
