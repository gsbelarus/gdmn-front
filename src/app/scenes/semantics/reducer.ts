import { Phrase } from 'gdmn-nlp';
import { getType } from 'typesafe-actions';
import { ICommand, ERTranslatorRU } from 'gdmn-nlp-agent';

import { actions } from './actions';
import { TRootActions } from '@src/app/store/RootActions';
import { ActionTypes } from '@src/app/scenes/ermodel/actions';

interface IState {
  readonly text: string;
  readonly wordsSignatures: string[];
  readonly phrase?: Phrase;
  readonly command?: ICommand;
  readonly err?: string;
  readonly erTranslatorRU?: ERTranslatorRU;
}

const initialText = 'покажи все организации из минска';

const initialState: IState = {
  text: initialText,
  wordsSignatures: []
};

function reducer(state: IState = initialState, action: TRootActions): IState {
  switch (action.type) {
    case getType(actions.setSemText): {
      return {
        ...state,
        text: action.payload,
        err: undefined
      };
    }

    case getType(actions.setParsedText): {
      return {
        ...state,
        wordsSignatures: action.payload.wordsSignatures,
        phrase: action.payload.phrase,
        command: undefined,
        err: undefined
      };
    }

    case getType(actions.setCommand): {
      return {
        ...state,
        err: undefined,
        command: action.payload
      };
    }

    case getType(actions.setError): {
      return {
        ...state,
        wordsSignatures: [],
        phrase: undefined,
        command: undefined,
        err: action.payload
      };
    }

    case ActionTypes.LOAD_ERMODEL_OK: {
      return {
        ...state,
        erTranslatorRU: new ERTranslatorRU(action.payload)
      };
    }

    default:
      return state;
  }
}

export { reducer, IState, initialState };
