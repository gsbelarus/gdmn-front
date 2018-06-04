import { TActions as TErModelActions } from '@src/app/scenes/ermodel/actions';
import { TActions as TMorphologyActions } from '@src/app/scenes/morphology/actions';
import { TActions as TSemanticsActions } from '@src/app/scenes/semantics/actions';

type TRootActions = TErModelActions | TMorphologyActions | TSemanticsActions;

export { TRootActions };
