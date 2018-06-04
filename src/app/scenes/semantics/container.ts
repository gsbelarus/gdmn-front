import { parsePhrase } from 'gdmn-nlp';
import { connect } from 'react-redux';
import { Dispatch as ReduxDispatch } from 'redux';

import { IRootState } from '@src/app/store/rootReducer';
import { selectSemantics } from '@src/app/store/selectors';
import { actions, TActions } from './actions';
import { SemanticsBox } from './component';

type TDispatch = ReduxDispatch<TActions>;

const SemanticsBoxContainer = connect(
  (state: IRootState) => ({
    text: selectSemantics(state).text,
    wordsSignatures: selectSemantics(state).wordsSignatures,
    phrase: selectSemantics(state).phrase,
    command: selectSemantics(state).command
  }),
  (dispatch: TDispatch) => ({
    onSetText: (text: string) => dispatch(actions.setSemText(text)),
    onClearText: () => dispatch(actions.setSemText('')),
    onParse: (text: string) => {
      const parsedText = parsePhrase(text);
      dispatch(actions.setParsedText(parsedText));
    }
  })
)(SemanticsBox);

export { SemanticsBoxContainer };
