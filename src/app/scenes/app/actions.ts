import { ActionType, createAction } from 'typesafe-actions';

const actions = {
  addNLPDialogText: createAction('ADD_NLPDIALOG_TEXT', resolve => {
    return (text: string) => resolve(text);
  })
};

type TNLPDialogActions = ActionType<typeof actions>;

export { actions, TNLPDialogActions };
