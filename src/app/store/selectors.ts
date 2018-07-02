import { IRootState } from './rootReducer';

// TODO reselect

export const selectMorphologyState = ({ morphologyState }: IRootState) => morphologyState;
export const selectSemanticsState = ({ semanticsState }: IRootState) => semanticsState;
export const selectErmodelState = ({ ermodelState }: IRootState) => ermodelState;
export const selectNLPDialogState = ({ nlpDialogState }: IRootState) => nlpDialogState;