import { ParsedText } from 'gdmn-nlp';
import { ActionType, createAction } from 'typesafe-actions';
import { ICommand } from 'gdmn-nlp-agent';

const actions = {
  setSemText: createAction('SET_SEM_TEXT', resolve => {
    return (text: string) => resolve(text);
  }),
  setParsedText: createAction('SET_SEM_PARSED_TEXT', resolve => {
    return (parsedText: ParsedText) => resolve(parsedText);
  }),
  setCommand: createAction('SET_SEM_COMMAND', resolve => {
    return (command: ICommand) => resolve(command);
  }),
  setError: createAction('SET_SEM_ERROR', resolve => {
    return (err: string) => resolve(err);
  })
};

type TActions = ActionType<typeof actions>;

export { actions, TActions };
