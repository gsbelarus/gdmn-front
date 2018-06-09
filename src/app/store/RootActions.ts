import { TErModelActions } from '@src/app/scenes/ermodel/actions';
import { TMorphologyActions } from '@src/app/scenes/morphology/actions';
import { TSemanticsActions } from '@src/app/scenes/semantics/actions';

type TRootActions = TErModelActions | TMorphologyActions | TSemanticsActions;

export { TRootActions };
