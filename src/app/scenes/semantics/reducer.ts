import { getType } from 'typesafe-actions';
import { ERTranslatorRU } from 'gdmn-nlp-agent';

import { TActions } from '@src/app/store/TActions';
import { ermodelActions } from '@src/app/scenes/ermodel/actions';
import { ISemanticsBoxStateProps } from '@src/app/scenes/semantics/component';
import { actions } from '@src/app/scenes/semantics/actions';

interface ISemanticsState extends ISemanticsBoxStateProps {
  readonly erTranslatorRU?: ERTranslatorRU;
  readonly tableData?: any;
}

const initialState: ISemanticsState = {
  text: 'покажи все организации из минска',
  wordsSignatures: [],
  dataLoading: false
};

function reducer(state: ISemanticsState = initialState, action: TActions): ISemanticsState {
  switch (action.type) {
    case getType(ermodelActions.loadERModelRequest):
    case getType(actions.loadNlpDataRequest): {
      return {
        ...state,
        dataLoading: true
      };
    }
    case getType(ermodelActions.loadERModelRequestOk): {
      return {
        ...state,
        erTranslatorRU: new ERTranslatorRU(action.payload),
        dataLoading: false
      };
    }
    case getType(actions.loadNlpDataRequestOk): {
      return {
        ...state,
        tableData: action.payload,
        dataLoading: false
      };
    }
    case ermodelActions.loadERModelRequestError(new Error()).type: {
      // TODO tmp
      return {
        ...state,
        dataLoading: false
      };
    }
    case actions.loadNlpDataRequestError(new Error()).type: {
      // TODO tmp
      return {
        ...state,
        wordsSignatures: [],
        phrase: undefined,
        dataLoading: false
      };
    }
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

export { reducer, ISemanticsState };
