import { Actions as ErMOdelActions } from '@src/app/scenes/ermodel/actions';
import { Actions as MorphologyActions } from '@src/app/scenes/morphology/actions';
import { Actions as SemanticsActions } from '@src/app/scenes/semantics/actions';

export type RootActions = ErMOdelActions | MorphologyActions | SemanticsActions;
