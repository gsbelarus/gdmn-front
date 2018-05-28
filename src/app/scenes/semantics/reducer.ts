import { Phrase } from 'gdmn-nlp';
import { ActionType, getType } from 'typesafe-actions';

import * as semActions from './actions';
import { Command } from 'gdmn-nlp-agent';

export type SemAction = ActionType<typeof semActions>;

export interface State {
  readonly text: string;
  readonly wordsSignatures: string[];
  readonly phrase?: Phrase;
  readonly command?: Command;
}

const initialText = 'покажи все организации из минска';

export const initialState: State = {
  text: initialText,
  wordsSignatures: []
};

export default function reducer(state: State = initialState, action: SemAction): State {
  switch (action.type) {
    case getType(semActions.setSemText): {
      return {
        ...state,
        text: action.payload
      };
    }

    case getType(semActions.setParsedText): {
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
