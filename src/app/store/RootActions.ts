import { TActions as TErMOdelActions } from '@src/app/scenes/ermodel/actions';
import { TActions as TMorphologyActions } from '@src/app/scenes/morphology/actions';
import { TActions as TSemanticsActions } from '@src/app/scenes/semantics/actions';

export type TRootActions = TErMOdelActions | TMorphologyActions | TSemanticsActions;
