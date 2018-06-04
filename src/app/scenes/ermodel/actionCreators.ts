import { ERModel } from 'gdmn-orm';

import {
  ActionTypes,
  ILoadEntityDataOkAction,
  ILoadErModelOkAction,
  ILoadErrorAction,
  ISelectEntityAction,
  ISelectFieldsAction
} from '@src/app/scenes/ermodel/actions';

const loadERModelOk = (erModel: ERModel): ILoadErModelOkAction => ({
  payload: erModel,
  type: ActionTypes.LOAD_ERMODEL_OK
});

const loadEntityDataOk = (data: object): ILoadEntityDataOkAction => ({
  // TODO data type
  payload: data,
  type: ActionTypes.LOAD_ENTITY_DATA_OK
});

const loadError = (error: string): ILoadErrorAction => ({
  error: true,
  payload: error,
  type: ActionTypes.LOAD_ERROR
});

function selectEntity(name: string): ISelectEntityAction {
  return {
    payload: name,
    type: ActionTypes.SELECT_ENTITY
  };
}

function selectFields(names: string[]): ISelectFieldsAction {
  return {
    payload: names,
    type: ActionTypes.SELECT_FIELDS
  };
}

export { loadERModelOk, loadEntityDataOk, loadError, selectEntity, selectFields };
