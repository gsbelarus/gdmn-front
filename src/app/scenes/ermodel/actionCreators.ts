import { ERModel } from 'gdmn-orm';

import {
  ActionTypes,
  ILoadEntityDataOkAction,
  ILoadErModelOkAction,
  ILoadErrorAction,
  IToggleEntitiesRowAction,
  IToggleFieldsRowAction
} from '@src/app/scenes/ermodel/actions';
import { Key } from 'react';

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

function toggleEntitiesRow(id: Key): IToggleEntitiesRowAction {
  return {
    payload: id,
    type: ActionTypes.TOGGLE_ENTITITES_ROW
  };
}

function toggleFieldsRow(id: Key): IToggleFieldsRowAction {
  return {
    payload: id,
    type: ActionTypes.TOGGLE_FIELD_ROW
  };
}

export { loadERModelOk, loadEntityDataOk, loadError, toggleEntitiesRow, toggleFieldsRow };
