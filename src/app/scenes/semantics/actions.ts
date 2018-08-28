import { ParsedText } from 'gdmn-nlp';
import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';

const semanticsActions = {
  setSemText: createAction('demos/semantics/SET_SEM_TEXT', resolve => {
    return (text: string) => resolve(text);
  }),
  setParsedText: createAction('demos/semantics/SET_SEM_PARSED_TEXT', resolve => {
    return (parsedText: ParsedText) => resolve(parsedText);
  }),
  // load nlp-query data
  loadNlpDataAsync: createAsyncAction(
    'demos/semantics/LOAD_NLP_DATA_REQUEST',
    'demos/semantics/LOAD_NLP_DATA_REQUEST_OK',
    'demos/semantics/LOAD_NLP_DATA_REQUEST_ERROR'
  )<void, object, Error>()
};

type TSemanticsActions = ActionType<typeof semanticsActions>;

export { semanticsActions, TSemanticsActions };
