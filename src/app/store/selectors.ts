import { IRootState } from './rootReducer';

// TODO reselect

const selectMorphologyState = ({ morphologyState }: IRootState) => morphologyState;
const selectSemanticsState = ({ semanticsState }: IRootState) => semanticsState;
const selectErmodelState = ({ ermodelState }: IRootState) => ermodelState;
const selectNLPDialogState = ({ nlpDialogState }: IRootState) => nlpDialogState;

export { selectMorphologyState, selectSemanticsState, selectErmodelState, selectNLPDialogState };
