import { ParsedText } from 'gdmn-nlp';
import { ActionType, createAction } from 'typesafe-actions';

const actions = {
  setSemText: createAction('SET_SEM_TEXT', resolve => {
    return (text: string) => resolve(text);
  }),
  setParsedText: createAction('SET_SEM_PARSED_TEXT', resolve => {
    return (parsedText: ParsedText) => resolve(parsedText);
  }),
  // setCommand: createAction('SET_SEM_COMMAND', resolve => {
  //   return (command: ICommand) => resolve(command);
  // }),
  setError: createAction('SET_SEM_ERROR', resolve => {
    return (err: string) => resolve(err);
  }),
  setTableData: createAction('SET_TABLE_DATA', resolve => (tableData: object) => resolve(tableData)),
  tableDataLoadStart: createAction('tableDataLoadStart')
};

type TSemanticsActions = ActionType<typeof actions>;

export { actions, TSemanticsActions };
