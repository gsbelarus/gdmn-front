import {
  RusAdjectiveLexemes,
  RusCase,
  RusConjunctionLexemes,
  RusGender,
  RusNounLexemes,
  rusPrepositions,
  RusPronounLexemes,
  RusVerbLexemes
} from 'gdmn-nlp';
import { connect } from 'react-redux';
import { Dispatch as ReduxDispatch } from 'redux';

import { State } from '@src/app/rootReducer';
import * as actions from './actions';
import { MorphBox } from './component';
import { MorphAction } from './reducer';

type Dispatch = ReduxDispatch<MorphAction>; // TODO test THUNK <_, State>

export default connect(
  (state: State) => ({
    text: state.morphology.text,
    tokens: state.morphology.tokens,
    selectedToken: state.morphology.selectedToken,
    words: state.morphology.words
  }),
  (dispatch: Dispatch) => ({
    onSetText: (text: string) => dispatch(actions.setMorphText(text)),
    onClickToken: (selectedToken: number) => dispatch(actions.setSelectedToken(selectedToken)),
    onClearText: () => dispatch(actions.setMorphText('')),
    onSetVerbs: () =>
      dispatch(actions.setMorphText(RusVerbLexemes.reduce((p, l) => p + l.getWordForm({ infn: true }).word + ',', ''))),
    onSetNouns: () =>
      dispatch(
        actions.setMorphText(
          RusNounLexemes.reduce((p, l) => p + l.getWordForm({ c: RusCase.Nomn, singular: true }).word + ',', '')
        )
      ),
    onSetAdjectives: () =>
      dispatch(
        actions.setMorphText(
          RusAdjectiveLexemes.reduce(
            (p, l) => p + l.getWordForm({ c: RusCase.Nomn, singular: true, gender: RusGender.Masc }).word + ',',
            ''
          )
        )
      ),
    onSetPrepositions: () =>
      dispatch(
        actions.setMorphText(
          rusPrepositions.reduce((prev, p) => prev + p.words.reduce((prevWords, w) => prevWords + w + ',', ''), '')
        )
      ),
    onSetPronouns: () => dispatch(actions.setMorphText(RusPronounLexemes.reduce((p, l) => p + l.stem + ',', ''))),
    onSetConjunctions: () =>
      dispatch(actions.setMorphText(RusConjunctionLexemes.reduce((p, l) => p + l.stem + ',', '')))
  })
)(MorphBox);
