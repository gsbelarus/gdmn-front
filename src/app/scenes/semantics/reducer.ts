import { Phrase } from 'gdmn-nlp';
import { getType } from 'typesafe-actions';
import { Command } from 'gdmn-nlp-agent';

import { actions, TActions } from './actions';

export interface IState {
  readonly text: string;
  readonly wordsSignatures: string[];
  readonly phrase?: Phrase;
  readonly command?: Command;
}

const initialText = 'покажи все организации из минска';

export const initialState: IState = {
  text: initialText,
  wordsSignatures: []
};

export default function reducer(state: IState = initialState, action: TActions): IState {
  switch (action.type) {
    case getType(actions.setSemText): {
      return {
        ...state,
        text: action.payload
      };
    }

    case getType(actions.setParsedText): {
      return {
        ...state,
        wordsSignatures: action.payload.wordsSignatures,
        phrase: action.payload.phrase
      };
    }

    default:
      return state;
  }
}
