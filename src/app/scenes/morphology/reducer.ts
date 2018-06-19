import { IToken } from 'chevrotain';
import {
  morphAnalyzer,
  RusWord,
  tokenize
  // Words
} from 'gdmn-nlp';
import { getType } from 'typesafe-actions';

import { actions, TMorphologyActions } from './actions';

interface IMorphologyState {
  readonly text: string;
  readonly tokens: IToken[];
  readonly selectedToken: number;
  readonly words: any; // FIXME Words;
}

const initialText = '';

const initialState: IMorphologyState = {
  text: initialText,
  tokens: tokenize(initialText),
  selectedToken: -1,
  words: []
};

function reducer(state: IMorphologyState = initialState, action: TMorphologyActions): IMorphologyState {
  switch (action.type) {
    case getType(actions.setMorphText): {
      const tokens = tokenize(action.payload);
      let selectedToken = state.selectedToken;
      if (selectedToken === -1 && tokens.length) {
        selectedToken = 0;
      } else if (selectedToken >= tokens.length) {
        selectedToken = tokens.length - 1;
      }
      let words: any = []; // FIXME Words = [];
      if (
        selectedToken > -1 &&
        true // FIXME tokens[selectedToken].tokenType === RusWord
      ) {
        words = morphAnalyzer(tokens[selectedToken].image);
      }
      return {
        text: action.payload,
        tokens,
        selectedToken,
        words
      };
    }

    case getType(actions.setSelectedToken): {
      let selectedToken = action.payload;
      if (selectedToken >= state.tokens.length) selectedToken = state.tokens.length - 1;
      let words: any = []; // FIXME Words = [];
      if (
        selectedToken > -1 &&
        true // FIXME state.tokens[selectedToken].tokenType === RusWord
      ) {
        words = morphAnalyzer(state.tokens[selectedToken].image);
      }
      return {
        ...state,
        selectedToken,
        words
      };
    }

    default:
      return state;
  }
}

export { reducer, IMorphologyState };
