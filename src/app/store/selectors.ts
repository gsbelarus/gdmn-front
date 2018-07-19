import { IRootState } from './rootReducer';

// TODO reselect

const selectMorphologyState = ({ morphologyState }: IRootState) => morphologyState;
const selectSemanticsState = ({ semanticsState }: IRootState) => semanticsState;
const selectErmodelState = ({ ermodelState }: IRootState) => ermodelState;
const selectNLPDialogState = ({ nlpDialogState }: IRootState) => nlpDialogState;

const selectApplicationsState = ({ applicationsState }: IRootState) => applicationsState;

export { selectMorphologyState, selectSemanticsState, selectErmodelState, selectNLPDialogState, selectApplicationsState };
