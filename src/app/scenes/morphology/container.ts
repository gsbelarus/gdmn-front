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

import { IRootState } from '@src/app/store/rootReducer';
import { selectMorphology } from '@src/app/store/selectors';
import { actions, TActions } from './actions';
import { MorphBox } from './component';

type TDispatch = ReduxDispatch<TActions>;

export default connect(
  (state: IRootState) => ({
    ...selectMorphology(state)
  }),
  (dispatch: TDispatch) => ({
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
