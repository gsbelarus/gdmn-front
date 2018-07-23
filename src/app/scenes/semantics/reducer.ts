import { getType } from 'typesafe-actions';
import { ERTranslatorRU } from 'gdmn-nlp-agent';

import { TRootActions } from '@src/app/store/RootActions';
import { actions as ermodelActions } from '@src/app/scenes/ermodel/actions';
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

function reducer(state: ISemanticsState = initialState, action: TRootActions): ISemanticsState {
  switch (action.type) {
    case getType(ermodelActions.loadERModelOk): {
      return {
        ...state,
        erTranslatorRU: new ERTranslatorRU(action.payload)
      };
    }
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
    case getType(actions.setError): {
      return {
        ...state,
        err: action.payload,

        wordsSignatures: [],
        phrase: undefined,
        dataLoading: false
      };
    }
    default:
      return state;
  }
}

export { reducer, ISemanticsState };
