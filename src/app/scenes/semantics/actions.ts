import { ParsedText } from 'gdmn-nlp';
import { ActionType, createAction } from 'typesafe-actions';

const actions = {
  setSemText: createAction('demos/semantics/SET_SEM_TEXT', resolve => {
    return (text: string) => resolve(text);
  }),
  setParsedText: createAction('demos/semantics/SET_SEM_PARSED_TEXT', resolve => {
    return (parsedText: ParsedText) => resolve(parsedText);
  }),
  // load nlp-query data
  loadNlpDataRequest: createAction('demos/semantics/LOAD_NLP_DATA_REQUEST', resolve => {
    return () => resolve();
  }),
  loadNlpDataRequestOk: createAction('demos/semantics/LOAD_NLP_DATA_REQUEST_OK', resolve => {
    return (tableData: object) => resolve(tableData);
  }),
  loadNlpDataRequestError: createAction('demos/semantics/LOAD_NLP_DATA_REQUEST_ERROR', resolve => {
    return (error: Error) => resolve(error);
  })
};

type TSemanticsActions = ActionType<typeof actions>;

export { actions, TSemanticsActions };
