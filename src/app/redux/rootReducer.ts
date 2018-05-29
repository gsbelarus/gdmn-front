import { Reducer as ReduxReducer, combineReducers } from 'redux';

import { reducer as ermodelReducer, IState as ErmodelState } from '@src/app/scenes/ermodel/reducer';
import morphology, { State as MorphologyState } from '@src/app/scenes/morphology/reducer';
import semantics, { State as SemanticState } from '@src/app/scenes/semantics/reducer';

interface IRootState {
  readonly morphology: MorphologyState;
  readonly semantics: SemanticState;
  readonly ermodelState: ErmodelState;
}

const rootReducer = combineReducers<IRootState>({
  // TODO combineReducers<IRootState, RootActions>
  morphology,
  semantics,
  ermodelState: ermodelReducer
});

type RootReducer = ReduxReducer<IRootState>; // TODO ReduxReducer<IRootState, RootActions>

export default rootReducer;
export { RootReducer, IRootState };
