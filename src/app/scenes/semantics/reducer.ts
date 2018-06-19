import { Phrase } from 'gdmn-nlp';
import { getType } from 'typesafe-actions';
import { ERTranslatorRU, ICommand } from 'gdmn-nlp-agent';

import { TRootActions } from '@src/app/store/RootActions';
import { ActionTypes } from '@src/app/scenes/ermodel/actions';
import { actions } from './actions';
import { ITableColumn, ITableRow } from '@src/app/scenes/ermodel/components/data-grid-core';
import { ERModel } from 'gdmn-orm';

interface ISemanticsState {
  readonly text: string;
  readonly wordsSignatures: string[];
  readonly phrase?: any; // FIXME Phrase;
  // readonly command?: ICommand;
  readonly err?: string;
  readonly erTranslatorRU?: ERTranslatorRU;
  readonly tableData?: object;
  readonly dataLoading?: boolean;
  // entity data table
  // readonly dataTableColumns?: ITableColumn[];
  // readonly dataTableHeadRows?: ITableRow[];
  // readonly dataTableBodyRows?: ITableRow[];
  // readonly dataTableFootRows?: ITableRow[];
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
        // command: undefined,
        err: undefined
      };
    }

    // case getType(actions.setCommand): {
    //   return {
    //     ...state,
    //     err: undefined,
    //     command: action.payload
    //   };
    // }

    case getType(actions.setError): {
      return {
        ...state,
        wordsSignatures: [],
        phrase: undefined,
        // command: undefined,
        dataLoading: false,
        err: action.payload
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
