import { ActionType, createAction } from 'typesafe-actions';

const morphologyActions = {
  setMorphText: createAction('demos/morphology/SET_MORPH_TEXT', resolve => {
    return (text: string) => resolve(text);
  }),
  setSelectedToken: createAction('demos/morphology/SET_SELECTED_TOKEN', resolve => {
    return (selectedToken: number) => resolve(selectedToken);
  })
};

type TMorphologyActions = ActionType<typeof morphologyActions>;

export { morphologyActions, TMorphologyActions };
