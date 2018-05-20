import { ERModel } from 'gdmn-orm';
import { createAction } from 'typesafe-actions';

export const loadERModel = createAction('LOAD_ERMODEL', resolve => {
  return (erModel: ERModel) => resolve(erModel);
});

export const loadERModelError = createAction('LOAD_ERMODEL_ERROR', resolve => {
  return (err: string) => resolve(err);
});
