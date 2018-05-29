import { ParsedText } from 'gdmn-nlp';
import { ActionType, createAction } from 'typesafe-actions';

export const actions = {
  setSemText: createAction('SET_SEM_TEXT', resolve => {
    return (text: string) => resolve(text);
  }),
  setParsedText: createAction('SET_SEM_PARSED_TEXT', resolve => {
    return (parsedText: ParsedText) => resolve(parsedText);
  })
};

export type Actions = ActionType<typeof actions>;
