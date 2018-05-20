import { Phrase } from 'gdmn-nlp';
import { ActionType, getType } from 'typesafe-actions';
import * as semActions from './actions';

export type SemAction = ActionType<typeof semActions>;

export type State = {
  readonly text: string;
  readonly parsedText: string[];
  readonly phrase: Phrase | undefined;
};

const initialText = 'покажи всех клиентов из минска';

export const initialState: State = {
  text: initialText,
  parsedText: [],
  phrase: undefined
};

export default function reducer(state: State = initialState, action: SemAction): State {
  switch (action.type) {
    case getType(semActions.setSemText): {
      return (
        {
          ...state,
          text: action.payload,
        }
      );
    }

    case getType(semActions.setParsedText): {
      return (
        {
          ...state,
          parsedText: action.payload.parsedText,
          phrase: action.payload.phrase
        }
      );
    }

    default:
      return state;
  }
}
