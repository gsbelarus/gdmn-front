import { Phrase } from 'gdmn-nlp';
import { getType } from 'typesafe-actions';
import { ERTranslatorRU, ICommand } from 'gdmn-nlp-agent';

import { TRootActions } from '@src/app/store/RootActions';
import { ActionTypes } from '@src/app/scenes/ermodel/actions';
import { actions } from './actions';

interface ISemanticsState {
  readonly text: string;
  readonly wordsSignatures: string[];
  readonly phrase?: Phrase;
  readonly command?: ICommand;
  readonly err?: string;
  readonly erTranslatorRU?: ERTranslatorRU;
}

const initialText = 'покажи все организации из минска';

const initialState: ISemanticsState = {
  text: initialText,
  wordsSignatures: []
};

function reducer(state: ISemanticsState = initialState, action: TRootActions): ISemanticsState {
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

export { reducer, ISemanticsState };
