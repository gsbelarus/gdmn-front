import { ERModel } from 'gdmn-orm';
import { Key } from 'react';

enum ActionTypes {
  TOGGLE_ENTITITES_ROW = 'app/ermodel/TOGGLE_ENTITITES_ROW',
  TOGGLE_FIELD_ROW = 'app/ermodel/TOGGLE_FIELD_ROW',
  // todo LOAD_ERRMODEL_REQUEST
  LOAD_ERMODEL_OK = 'app/ermodel/LOAD_ERMODEL_OK',
  LOAD_ENTITY_DATA_OK = 'app/ermodel/LOAD_ENTITY_DATA_OK',
  LOAD_ERROR = 'app/ermodel/LOAD_ERROR'
}

interface IToggleEntitiesRowAction {
  payload: {
    entitiesSelectedRowId: Key;
  };
  type: ActionTypes.TOGGLE_ENTITITES_ROW;
}

interface IToggleFieldsRowAction {
  payload: Key;
  type: ActionTypes.TOGGLE_FIELD_ROW;
}

interface ILoadErModelOkAction {
  payload: ERModel;
  type: ActionTypes.LOAD_ERMODEL_OK;
}

interface ILoadEntityDataOkAction {
  payload: object;
  type: ActionTypes.LOAD_ENTITY_DATA_OK;
}

interface ILoadErrorAction {
  error: true;
  payload: string;
  type: ActionTypes.LOAD_ERROR;
}

type TErModelActions =
  | IToggleEntitiesRowAction
  | IToggleFieldsRowAction
  | ILoadErModelOkAction
  | ILoadEntityDataOkAction
  | ILoadErrorAction;

export {
  ActionTypes,
  IToggleEntitiesRowAction,
  IToggleFieldsRowAction,
  ILoadErModelOkAction,
  ILoadEntityDataOkAction,
  ILoadErrorAction,
  TErModelActions
};
