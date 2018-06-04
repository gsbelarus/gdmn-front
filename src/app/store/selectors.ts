import { IRootState } from './rootReducer';

const selectMorphology = ({ morphology }: IRootState) => morphology;
const selectSemantics = ({ semantics }: IRootState) => semantics;
const selectErmodelState = ({ ermodelState }: IRootState) => ermodelState;

export { selectMorphology, selectSemantics, selectErmodelState };
