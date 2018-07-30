import { combineReducers, Reducer } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { getType } from 'typesafe-actions';

import { TActions } from '@src/app/store/TActions';
import { TNLPDialogState, nlpDialogReducer } from '@src/app/scenes/app/reducer';
import { IErmodelState, reducer as ermodelReducer } from '@src/app/scenes/ermodel/reducer';
import { IMorphologyState, reducer as morphologyReducer } from '@src/app/scenes/morphology/reducer';
import { ISemanticsState, reducer as semanticsReducer } from '@src/app/scenes/semantics/reducer';
import { actions as authActions } from '@src/app/scenes/auth/actions';
import { IAuthState, getReducer as getAuthReducer } from '@src/app/scenes/auth/reducer';
import { IRootState, reducer as rootReducer } from '@src/app/scenes/root/reducer';
import { TAppsState, applicationReducer } from '@src/app/scenes/applications/reducer';

interface IState {
  readonly rootState: IRootState;
  readonly morphologyState: IMorphologyState;
  readonly semanticsState: ISemanticsState;
  readonly ermodelState: IErmodelState;
  readonly nlpDialogState: TNLPDialogState;
  readonly authState: IAuthState;
  readonly form: any;
  readonly applicationsState: TAppsState;
}

const getReducer = (authInitialState: IAuthState) => {
  const reducer = combineReducers<IState>({
    rootState: rootReducer,
    morphologyState: morphologyReducer,
    semanticsState: semanticsReducer,
    ermodelState: ermodelReducer,
    nlpDialogState: nlpDialogReducer,
    authState: getAuthReducer(authInitialState),
    form: formReducer, // TODO move to auth
    applicationsState: applicationReducer
  });

  // reset state to initial
  const enhacedReducer = (state: IState | undefined, action: TActions) =>
    reducer(action.type === getType(authActions.signOut) ? undefined : state, action);

  return enhacedReducer;
};

type TReducer = Reducer<IState, TActions>;

// tslint:disable-next-line no-default-export
export default getReducer; // TODO test hmr require without default
export { TReducer, IState };
