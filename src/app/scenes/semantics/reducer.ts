import { Phrase } from 'gdmn-nlp';
import { getType } from 'typesafe-actions';
import { ICommand } from 'gdmn-nlp-agent';

import { actions, TActions } from './actions';

interface IState {
  readonly text: string;
  readonly wordsSignatures: string[];
  readonly phrase?: Phrase;
  readonly command?: ICommand;
}

const initialText = 'покажи все организации из минска';

const initialState: IState = {
  text: initialText,
  wordsSignatures: []
};

function reducer(state: IState = initialState, action: TActions): IState {
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
      };
    }

    default:
      return state;
  }
}

export { reducer, IState, initialState };
