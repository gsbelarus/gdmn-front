import { ActionType, createAction } from 'typesafe-actions';

export const actions = {
  setMorphText: createAction('SET_MORPH_TEXT', resolve => {
    return (text: string) => resolve(text);
  }),
  setSelectedToken: createAction('SET_SELECTED_TOKEN', resolve => {
    return (selectedToken: number) => resolve(selectedToken);
  })
};

export type TActions = ActionType<typeof actions>;
