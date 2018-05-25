import { combineReducers } from 'redux';

import ermodel, { State as ERModelState } from './scenes/ermodel/reducer';
import morphology, { State as MorphologyState } from './scenes/morphology/reducer';
import semantics, { State as SemanticState } from './scenes/semantics/reducer';

export interface State {
  morphology: MorphologyState;
  semantics: SemanticState;
  ermodel: ERModelState;
}

export default combineReducers<State>({
  morphology,
  semantics,
  ermodel
});
