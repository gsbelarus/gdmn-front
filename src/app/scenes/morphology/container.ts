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
import { Dispatch } from 'redux';

import { IState } from '@src/app/store/reducer';
import { selectMorphologyState } from '@src/app/store/selectors';
import { morphologyActions, TMorphologyActions } from '@src/app/scenes/morphology/actions';
import { MorphBox } from '@src/app/scenes/morphology/component';

const MorphBoxContainer = connect(
  (state: IState) => ({
    ...selectMorphologyState(state)
  }),
  (dispatch: Dispatch<TMorphologyActions>) => ({
    onSetText: (text: string) => dispatch(morphologyActions.setMorphText(text)),
    onClickToken: (selectedToken: number) => dispatch(morphologyActions.setSelectedToken(selectedToken)),
    onClearText: () => dispatch(morphologyActions.setMorphText('')),
    onSetVerbs: () =>
      dispatch(
        morphologyActions.setMorphText(
          RusVerbLexemes.reduce((p, l) => p + l.getWordForm({ infn: true }).word + ',', '')
        )
      ),
    onSetNouns: () =>
      dispatch(
        morphologyActions.setMorphText(
          RusNounLexemes.reduce((p, l) => p + l.getWordForm({ c: RusCase.Nomn, singular: true }).word + ',', '')
        )
      ),
    onSetAdjectives: () =>
      dispatch(
        morphologyActions.setMorphText(
          RusAdjectiveLexemes.reduce(
            (p, l) => p + l.getWordForm({ c: RusCase.Nomn, singular: true, gender: RusGender.Masc }).word + ',',
            ''
          )
        )
      ),
    onSetPrepositions: () =>
      dispatch(
        morphologyActions.setMorphText(
          rusPrepositions.reduce((prev, p) => prev + p.words.reduce((prevWords, w) => prevWords + w + ',', ''), '')
        )
      ),
    onSetPronouns: () =>
      dispatch(morphologyActions.setMorphText(RusPronounLexemes.reduce((p, l) => p + l.stem + ',', ''))),
    onSetConjunctions: () =>
      dispatch(morphologyActions.setMorphText(RusConjunctionLexemes.reduce((p, l) => p + l.stem + ',', '')))
  })
)(MorphBox);

export { MorphBoxContainer };
