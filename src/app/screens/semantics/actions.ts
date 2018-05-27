import { ParsedText } from 'gdmn-nlp';
import { createAction } from 'typesafe-actions';

export const setSemText = createAction('SET_SEM_TEXT', resolve => {
  return (text: string) => resolve(text);
});

export const setParsedText = createAction('SET_SEM_PARSED_TEXT', resolve => {
  return (parsedText: ParsedText) => resolve(parsedText);
});
