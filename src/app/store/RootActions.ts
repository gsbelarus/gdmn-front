import { TErModelActions } from '@src/app/scenes/ermodel/actions';
import { TMorphologyActions } from '@src/app/scenes/morphology/actions';
import { TSemanticsActions } from '@src/app/scenes/semantics/actions';
import { TAppActions } from '@src/app/scenes/app/actions';
import { TAuthActions } from '@src/app/scenes/auth/actions';

type TRootActions = TAuthActions | TAppActions | TErModelActions | TMorphologyActions | TSemanticsActions;

export { TRootActions };
