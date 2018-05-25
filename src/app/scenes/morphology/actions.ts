import { createAction } from 'typesafe-actions';

export const setMorphText = createAction('SET_MORPH_TEXT', resolve => {
  return (text: string) => resolve(text);
});

export const setSelectedToken = createAction('SET_SELECTED_TOKEN', resolve => {
  return (selectedToken: number) => resolve(selectedToken);
});
