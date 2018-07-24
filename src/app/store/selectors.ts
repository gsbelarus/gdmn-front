import { IState } from '@src/app/store/reducer';

// TODO reselect
const selectRootState = ({ rootState }: IState) => rootState;
const selectMorphologyState = ({ morphologyState }: IState) => morphologyState;
const selectSemanticsState = ({ semanticsState }: IState) => semanticsState;
const selectErmodelState = ({ ermodelState }: IState) => ermodelState;
const selectNLPDialogState = ({ nlpDialogState }: IState) => nlpDialogState;
const selectApplicationsState = ({ applicationsState }: IState) => applicationsState;
const selectAuthState = ({ authState }: IState) => authState;

export {
  selectRootState,
  selectAuthState,
  selectMorphologyState,
  selectSemanticsState,
  selectErmodelState,
  selectNLPDialogState,
  selectApplicationsState
};
