import { ERModel } from 'gdmn-orm';

export enum ActionTypes {
  LOAD_ERMODEL_OK = 'app/ermodel/LOAD_ERMODEL_OK',
  LOAD_ERMODEL_ERROR = 'app/ermodel/LOAD_ERMODEL_ERROR'
  // todo LOAD_ERRMODEL_REQUEST
}

export interface ILoadErModelOkAction {
  payload: ERModel;
  type: ActionTypes.LOAD_ERMODEL_OK;
}

export interface ILoadErModelErrorAction {
  error: true;
  payload: string; // TODO  toString
  type: ActionTypes.LOAD_ERMODEL_ERROR;
}

export type TActions = ILoadErModelOkAction | ILoadErModelErrorAction;
