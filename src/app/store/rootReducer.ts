import { combineReducers, Reducer as ReduxReducer } from 'redux';

import { IState as IErmodelState, reducer as ermodelReducer } from '@src/app/scenes/ermodel/reducer';
import { reducer as morphologyReducer, IState as IMorphologyState } from '@src/app/scenes/morphology/reducer';
import { reducer as semanticsReducer, IState as ISemanticState } from '@src/app/scenes/semantics/reducer';

interface IRootState {
  readonly morphology: IMorphologyState;
  readonly semantics: ISemanticState;
  readonly ermodelState: IErmodelState;
}

const rootReducer = combineReducers<IRootState>({
  // TODO combineReducers<IRootState, RootActions>
  morphology: morphologyReducer,
  semantics: semanticsReducer,
  ermodelState: ermodelReducer
});

type TRootReducer = ReduxReducer<IRootState>; // TODO ReduxReducer<IRootState, RootActions>

// tslint:disable-next-line no-default-export
export default rootReducer; // TODO test hmr require without default
export { TRootReducer, IRootState };
