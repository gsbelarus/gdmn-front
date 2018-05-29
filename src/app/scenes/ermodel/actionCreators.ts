import { ERModel } from 'gdmn-orm';

import { ActionTypes, ILoadErModelErrorAction, ILoadErModelOkAction } from '@src/app/scenes/ermodel/actions';

const loadERModelOk = (erModel: ERModel): ILoadErModelOkAction => ({
  payload: erModel,
  type: ActionTypes.LOAD_ERMODEL_OK
});

const loadERModelError = (error: string): ILoadErModelErrorAction => ({
  error: true,
  payload: error,
  type: ActionTypes.LOAD_ERMODEL_ERROR
});

export { loadERModelOk, loadERModelError };
