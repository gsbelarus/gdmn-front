import { IToken } from 'chevrotain';
import { morphAnalyzer, RusWord, tokenize, Words } from 'gdmn-nlp';
import { ActionType, getType } from 'typesafe-actions';

import * as actions from './actions';

export type MorphAction = ActionType<typeof actions>;

export interface State {
  readonly text: string;
  readonly tokens: IToken[];
  readonly selectedToken: number;
  readonly words: Words;
}

const initialText = '';

export const initialState: State = {
  text: initialText,
  tokens: tokenize(initialText),
  selectedToken: -1,
  words: []
};

export default function reducer(state: State = initialState, action: MorphAction): State {
  switch (action.type) {
    case getType(actions.setMorphText): {
      const tokens = tokenize(action.payload);
      let selectedToken = state.selectedToken;
      if (selectedToken === -1 && tokens.length) {
        selectedToken = 0;
      } else if (selectedToken >= tokens.length) {
        selectedToken = tokens.length - 1;
      }
      let words: Words = [];
      if (selectedToken > -1 && tokens[selectedToken].tokenType === RusWord) {
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
      if (selectedToken >= state.tokens.length) {
        selectedToken = state.tokens.length - 1;
      }
      let words: Words = [];
      if (selectedToken > -1 && state.tokens[selectedToken].tokenType === RusWord) {
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
