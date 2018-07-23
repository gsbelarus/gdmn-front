import { combineReducers, Reducer } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { IAppState, INLPDialogState, reducer as appReducer, nlpDialogReducer } from '@src/app/scenes/app/reducer';
import { IErmodelState, reducer as ermodelReducer } from '@src/app/scenes/ermodel/reducer';
import { IMorphologyState, reducer as morphologyReducer } from '@src/app/scenes/morphology/reducer';
import { ISemanticsState, reducer as semanticsReducer } from '@src/app/scenes/semantics/reducer';
import { IAuthState, getReducer as getAuthReducer } from '@src/app/scenes/auth/reducer';

interface IRootState {
  readonly morphologyState: IMorphologyState;
  readonly semanticsState: ISemanticsState;
  readonly ermodelState: IErmodelState;
  readonly nlpDialogState: INLPDialogState;
  readonly appState: IAppState;
  readonly authState: IAuthState;
  readonly form: any;
}

const getRootReducer = (authInitialState: IAuthState) =>
  combineReducers<IRootState>({
    // TODO <IRootState, RootActions>
    morphologyState: morphologyReducer,
    semanticsState: semanticsReducer,
    ermodelState: ermodelReducer,
    nlpDialogState: nlpDialogReducer,
    appState: appReducer,
    authState: getAuthReducer(authInitialState),
    form: formReducer // TODO move in auth
  });

type TRootReducer = Reducer<IRootState>; // TODO <IRootState, RootActions>

// tslint:disable-next-line no-default-export
export default getRootReducer; // TODO test hmr require without default
export { TRootReducer, IRootState };
