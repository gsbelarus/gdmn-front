import { parsePhrase } from 'gdmn-nlp';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IRootState } from '@src/app/store/rootReducer';
import { selectSemanticsState } from '@src/app/store/selectors';
import { actions, TSemanticsActions } from './actions';
import { SemanticsBox } from './component';

const SemanticsBoxContainer = connect(
  (state: IRootState) => ({
    text: selectSemanticsState(state).text,
    wordsSignatures: selectSemanticsState(state).wordsSignatures,
    phrase: selectSemanticsState(state).phrase,
    command: selectSemanticsState(state).command,
    err: selectSemanticsState(state).err,
    erTranslatorRU: selectSemanticsState(state).erTranslatorRU
  }),
  (dispatch: Dispatch<TSemanticsActions>) => ({
    dispatch,
    onSetText: (text: string) => dispatch(actions.setSemText(text)),
    onClearText: () => dispatch(actions.setSemText(''))
  }),
  (state, events) => ({
    ...state,
    ...events,
    onParse: (text: string) => {
      const parsedText = parsePhrase(text);
      events.dispatch(actions.setParsedText(parsedText));
      const erTranslatorRU = state.erTranslatorRU;
      if (!erTranslatorRU || !parsedText.phrase) return;
      try {
        const command = erTranslatorRU.process(parsedText.phrase);
        events.dispatch(actions.setCommand(command));
      } catch (err) {
        if (err instanceof Error) {
          events.dispatch(actions.setError(err.message));
        }
      }
    }
  })
)(SemanticsBox);

export { SemanticsBoxContainer };
