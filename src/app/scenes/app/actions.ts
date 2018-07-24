import { ActionType, createAction } from 'typesafe-actions';

const nlpDialogActions = {
  addNlpMessage: createAction('app/nlpDialog/ADD_NLP_MESSAGE', resolve => (text: string) => resolve(text))
};

type TNLPDialogActions = ActionType<typeof nlpDialogActions>;

export { nlpDialogActions, TNLPDialogActions };
