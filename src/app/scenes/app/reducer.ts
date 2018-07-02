import { NLPDialog } from "gdmn-nlp-agent";
import { TNLPDialogActions, actions } from "@src/app/scenes/app/actions";
import { getType } from "typesafe-actions";

interface INLPDialogState {
  nlpDialog: NLPDialog;
}

const initialState: INLPDialogState = {
  nlpDialog: new NLPDialog()
}

function reducer(state: INLPDialogState = initialState, action: TNLPDialogActions): INLPDialogState {
  switch (action.type) {
    case getType(actions.addNLPDialogText): {
      state.nlpDialog.add('me', action.payload);
      return state;
    }

    default:
      return state;
  }
}

export { reducer, INLPDialogState };