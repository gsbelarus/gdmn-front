import { getType } from 'typesafe-actions';
import { ERTranslatorRU } from 'gdmn-nlp-agent';

import { TRootActions } from '@src/app/store/RootActions';
import { ActionTypes } from '@src/app/scenes/ermodel/actions';
import { actions } from './actions';

interface ISemanticsState {
  readonly text: string;
  readonly wordsSignatures: string[];
  readonly phrase?: any; // FIXME Phrase;
  readonly erTranslatorRU?: ERTranslatorRU;
  readonly tableData?: object;

  readonly err?: string;
  readonly dataLoading?: boolean;
}

const initialText = 'покажи все организации из минска';

const initialState: ISemanticsState = {
  text: initialText,
  wordsSignatures: [],
  dataLoading: false
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

        err: undefined
      };
    }
    case getType(actions.setError): {
      return {
        ...state,
        err: action.payload,

        wordsSignatures: [],
        phrase: undefined,
        dataLoading: false
      };
    }
    case ActionTypes.LOAD_ERMODEL_OK: {
      return {
        ...state,
        erTranslatorRU: new ERTranslatorRU(action.payload)
      };
    }
    case getType(actions.setTableData): {
      return {
        ...state,
        tableData: action.payload,

        dataLoading: false
      };
    }
    case getType(actions.tableDataLoadStart): {
      return {
        ...state,
        dataLoading: true
      };
    }
    default:
      return state;
  }
}

export { reducer, ISemanticsState };
