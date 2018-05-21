import { combineReducers } from 'redux';
import morphology, { State as MorphologyState } from '../morphology/reducer';
import semantics, { State as SemanticState } from '../semantics/reducer';
import ermodel, { State as ERModelState } from '../ermodel/reducer';

export type State = {
  morphology: MorphologyState;
  semantics: SemanticState;
  ermodel: ERModelState;
};

const rootReducer = combineReducers<State>({
  morphology,
  semantics,
  ermodel
});

export default rootReducer;
