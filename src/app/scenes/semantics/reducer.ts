import { getType } from 'typesafe-actions';
import { ERTranslatorRU } from 'gdmn-nlp-agent';

import { TActions } from '@src/app/store/TActions';
import { ermodelActions } from '@src/app/scenes/ermodel/actions';
import { ISemanticsBoxStateProps } from '@src/app/scenes/semantics/component';
import { semanticsActions } from '@src/app/scenes/semantics/actions';

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
    case getType(ermodelActions.loadErModelAsync.request):
    case getType(semanticsActions.loadNlpDataAsync.request): {
      return {
        ...state,
        dataLoading: true
      };
    }
    case getType(ermodelActions.loadErModelAsync.success): {
      return {
        ...state,
        erTranslatorRU: new ERTranslatorRU(action.payload),
        dataLoading: false
      };
    }
    case getType(semanticsActions.loadNlpDataAsync.success): {
      return {
        ...state,
        tableData: action.payload,
        dataLoading: false
      };
    }
    case ermodelActions.loadErModelAsync.failure(new Error()).type: {
      // TODO tmp
      return {
        ...state,
        dataLoading: false
      };
    }
    case semanticsActions.loadNlpDataAsync.failure(new Error()).type: {
      // TODO tmp
      return {
        ...state,
        wordsSignatures: [],
        phrase: undefined,
        dataLoading: false
      };
    }
    case getType(semanticsActions.setSemText): {
      return {
        ...state,
        text: action.payload
      };
    }
    case getType(semanticsActions.setParsedText): {
      return {
        ...state,
        wordsSignatures: action.payload.wordsSignatures,
        phrase: action.payload.phrase
      };
    }
    case getType(semanticsActions.onSelectDatastore): {
      return {
        ...state,
        erTranslatorRU: undefined,
        tableData: [],
        dataLoading: false
      };
    }
    default:
      return state;
  }
}

export { reducer, ISemanticsState };
