import { combineReducers, Reducer } from 'redux';

import { IErmodelState, reducer as ermodelReducer } from '@src/app/scenes/ermodel/reducer';
import { IMorphologyState, reducer as morphologyReducer } from '@src/app/scenes/morphology/reducer';
import { ISemanticsState, reducer as semanticsReducer } from '@src/app/scenes/semantics/reducer';
import { INLPDialogState, reducer as nlpDialogReducer } from '@src/app/scenes/app/reducer';
import { IAppsState, reducer as applicationReducer } from '@src/app/scenes/applications/reducer';

interface IRootState {
  readonly morphologyState: IMorphologyState;
  readonly semanticsState: ISemanticsState;
  readonly ermodelState: IErmodelState;
  readonly nlpDialogState: INLPDialogState;
  
  readonly applicationsState: IAppsState;
}

const rootReducer = combineReducers<IRootState>({
  // TODO <IRootState, RootActions>
  morphologyState: morphologyReducer,
  semanticsState: semanticsReducer,
  ermodelState: ermodelReducer,
  nlpDialogState: nlpDialogReducer,

  applicationsState: applicationReducer,
});

type TRootReducer = Reducer<IRootState>; // TODO <IRootState, RootActions>

// tslint:disable-next-line no-default-export
export default rootReducer; // TODO test hmr require without default
export { TRootReducer, IRootState };
