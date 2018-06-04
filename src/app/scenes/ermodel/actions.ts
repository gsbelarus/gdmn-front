import { ERModel } from 'gdmn-orm';

enum ActionTypes {
  SELECT_ENTITY = 'app/ermodel/SELECT_ENTITY',
  SELECT_FIELDS = 'app/ermodel/SELECT_FIELDS',
  // todo LOAD_ERRMODEL_REQUEST
  LOAD_ERMODEL_OK = 'app/ermodel/LOAD_ERMODEL_OK',
  LOAD_ENTITY_DATA_OK = 'app/ermodel/LOAD_ENTITY_DATA_OK',
  LOAD_ERROR = 'app/ermodel/LOAD_ERROR'
}

interface ISelectEntityAction {
  payload: string;
  type: ActionTypes.SELECT_ENTITY;
}

interface ISelectFieldsAction {
  payload: string[];
  type: ActionTypes.SELECT_FIELDS;
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

type TActions =
  | ISelectFieldsAction
  | ISelectEntityAction
  | ILoadErModelOkAction
  | ILoadEntityDataOkAction
  | ILoadErrorAction;

export {
  ActionTypes,
  ISelectEntityAction,
  ISelectFieldsAction,
  ILoadErModelOkAction,
  ILoadEntityDataOkAction,
  ILoadErrorAction,
  TActions
};
