import { combineReducers } from 'redux';
import morphology, { State as MorphologyState } from './screens/morphology/reducer';
import semantics, { State as SemanticState } from './screens/semantics/reducer';
import ermodel, { State as ERModelState } from './screens/ermodel/reducer';

export type State = {
  morphology: MorphologyState;
  semantics: SemanticState;
  ermodel: ERModelState;
};

export default combineReducers<State>({
  morphology,
  semantics,
  ermodel
});
