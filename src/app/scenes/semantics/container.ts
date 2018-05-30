import { parsePhrase, ParsedText } from 'gdmn-nlp';
import { connect } from 'react-redux';
import { Dispatch as ReduxDispatch } from 'redux';

import { IRootState } from '@src/app/store/rootReducer';
import { selectSemantics, selectErmodelState } from '@src/app/store/selectors';
import { actions, TActions } from './actions';
import { SemanticsBox } from './component';

type TDispatch = ReduxDispatch<TActions>;

export default connect(
  (state: IRootState) => ({
    text: selectSemantics(state).text,
    wordsSignatures: selectSemantics(state).wordsSignatures,
    phrase: selectSemantics(state).phrase,
    command: selectSemantics(state).command,
    err: selectSemantics(state).err,
    erTranslatorRU: selectErmodelState(state).erTranslatorRU
  }),
  (dispatch: TDispatch) => ({
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
      if (erTranslatorRU && parsedText.phrase) {
        try {
          const command = erTranslatorRU.process(parsedText.phrase);
          console.log(command);
          events.dispatch(actions.setCommand(command));
        }
        catch (err) {
          events.dispatch(actions.setError(JSON.stringify(err)));
        }
      }
    }
  })
)(SemanticsBox);
