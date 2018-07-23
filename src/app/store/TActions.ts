import { TErModelActions } from '@src/app/scenes/ermodel/actions';
import { TMorphologyActions } from '@src/app/scenes/morphology/actions';
import { TSemanticsActions } from '@src/app/scenes/semantics/actions';
import { TRootActions } from '@src/app/scenes/root/actions';
import { TAuthActions } from '@src/app/scenes/auth/actions';

type TActions = TAuthActions | TRootActions | TErModelActions | TMorphologyActions | TSemanticsActions;

export { TActions };
