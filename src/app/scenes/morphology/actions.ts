import { ActionType, createAction } from 'typesafe-actions';

const actions = {
  setMorphText: createAction('app/morphology/SET_MORPH_TEXT', resolve => {
    return (text: string) => resolve(text);
  }),
  setSelectedToken: createAction('app/morphology/SET_SELECTED_TOKEN', resolve => {
    return (selectedToken: number) => resolve(selectedToken);
  })
};

type TMorphologyActions = ActionType<typeof actions>;

export { actions, TMorphologyActions };
