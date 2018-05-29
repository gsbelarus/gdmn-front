import { ParsedText } from 'gdmn-nlp';
import { ActionType, createAction } from 'typesafe-actions';
import { Command } from 'gdmn-nlp-agent';

export const actions = {
  setSemText: createAction('SET_SEM_TEXT', resolve => {
    return (text: string) => resolve(text);
  }),
  setParsedText: createAction('SET_SEM_PARSED_TEXT', resolve => {
    return (parsedText: ParsedText) => resolve(parsedText);
  }),
  setCommand: createAction('SET_SEM_COMMAND', resolve => {
    return (command: Command) => resolve(command)
  })
};

export type Actions = ActionType<typeof actions>;
