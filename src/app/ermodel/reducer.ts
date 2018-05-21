import * as actions from './actions';
import { ActionType, getType } from 'typesafe-actions';
import { ERModel } from 'gdmn-orm';

export type ERMAction = ActionType<typeof actions>;

export type State = {
  readonly erModel: ERModel;
  readonly err: string;
};

export const initialState: State = {
  erModel: new ERModel(),
  err: ''
};

export default function reducer(state: State = initialState, action: ERMAction): State {
  switch (action.type) {
    case getType(actions.loadERModel): {
      return { erModel: action.payload, err: '' };
    }

    case getType(actions.loadERModelError): {
      return { erModel: new ERModel(), err: action.payload };
    }

    default:
      return state;
  }
}
