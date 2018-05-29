import { Phrase } from 'gdmn-nlp';
import { getType } from 'typesafe-actions';
import { Command } from 'gdmn-nlp-agent';

import { actions, Actions } from './actions';

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

export default function reducer(state: State = initialState, action: Actions): State {
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

    case getType(actions.setCommand): {
      return {
        ...state,
        command: action.payload
      }
    }

    default:
      return state;
  }
}
