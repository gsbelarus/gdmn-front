import { Reducer as ReduxReducer, combineReducers } from 'redux';

import { reducer as ermodelReducer, IState as IErmodelState } from '@src/app/scenes/ermodel/reducer';
import morphology, { IState as IMorphologyState } from '@src/app/scenes/morphology/reducer';
import semantics, { IState as ISemanticState } from '@src/app/scenes/semantics/reducer';

interface IRootState {
  readonly morphology: IMorphologyState;
  readonly semantics: ISemanticState;
  readonly ermodelState: IErmodelState;
}

const rootReducer = combineReducers<IRootState>({
  // TODO combineReducers<IRootState, RootActions>
  morphology,
  semantics,
  ermodelState: ermodelReducer
});

type TRootReducer = ReduxReducer<IRootState>; // TODO ReduxReducer<IRootState, RootActions>

export default rootReducer;
export { TRootReducer, IRootState };
