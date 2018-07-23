import { ActionType, createAction } from 'typesafe-actions';

const nlpDialogActions = {
  addNLPDialogText: createAction('app/nlpdialog/ADD_NLPDIALOG_TEXT', resolve => {
    return (text: string) => resolve(text);
  })
};

type TNLPDialogActions = ActionType<typeof nlpDialogActions>;

export { nlpDialogActions, TNLPDialogActions };
