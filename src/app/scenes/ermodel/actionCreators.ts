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

function singleselectToggleEntitiesRow(
  entitiesSelectedRowId: Key
  // , entitiesSelectedName: string
): IToggleEntitiesRowAction {
  return {
    payload: {
      entitiesSelectedRowId
      // entitiesSelectedName
    },
    type: ActionTypes.TOGGLE_ENTITITES_ROW
  };
}

function multiselectToggleFieldsRow(id: Key): IToggleFieldsRowAction {
  return {
    payload: id,
    type: ActionTypes.TOGGLE_FIELD_ROW
  };
}

export { loadERModelOk, loadEntityDataOk, loadError, singleselectToggleEntitiesRow, multiselectToggleFieldsRow };
