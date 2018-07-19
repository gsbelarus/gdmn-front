import { IApplicationsBoxStateProps } from "@src/app/scenes/applications/component";
import { TAppsModelActions } from "@src/app/scenes/applications/actions";
import { actions } from "./actions";
import { getType } from "typesafe-actions";

interface IAppsState extends IApplicationsBoxStateProps {}

const initialState: IAppsState = {
  applications: [],
};

function reducer(state: IAppsState = initialState, action: TAppsModelActions): IAppsState {
  switch (action.type) {
    case getType(actions.loadApplicationsDataOk): {
      return {
        ...state,
        applications: action.payload,
        err: null
      };
    }

    case getType(actions.loadError): {
      return {
        ...state,
        err: action.payload,
      };
    }

    case getType(actions.deleteApplication): {
      return {
        ...state,
        err: null,
      };
    }

    default:
      return state;
  }
}

export { reducer, IAppsState };