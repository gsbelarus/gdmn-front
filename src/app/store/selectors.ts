import { IRootState } from './rootReducer';

// TODO reselect

const selectMorphologyState = ({ morphologyState }: IRootState) => morphologyState;
const selectSemanticsState = ({ semanticsState }: IRootState) => semanticsState;
const selectErmodelState = ({ ermodelState }: IRootState) => ermodelState;
const selectNLPDialogState = ({ nlpDialogState }: IRootState) => nlpDialogState;
const selectAppState = ({ appState }: IRootState) => appState;
const selectAuthState = ({ authState }: IRootState) => authState;

export {
  selectAuthState,
  selectMorphologyState,
  selectSemanticsState,
  selectErmodelState,
  selectNLPDialogState,
  selectAppState
};
