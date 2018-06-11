import muiWithStyles, { ClassNameMap, StyleRules, StyleRulesCallback, WithStylesOptions } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core';

// 'classes' is optional
interface IWithStyles<ClassKey extends string = string> {
  classes?: ClassNameMap<ClassKey>,
  theme?: Theme
}
//
// type StyleDecorator = <T extends ReactType>(target: T) =>  T;
//
// export function withStyles2<ClassKey extends string>(
//   style: StyleRules<ClassKey> | StyleRulesCallback<ClassKey>,
//   options?: WithStylesOptions
// ): StyleDecorator {
//   // override the type
//   return muiWithStyles(style, options) as any as StyleDecorator;
// }

// TODO fixme prev decorators

/**
 * decorator
 */
function withStyles(style: StyleRules<any> | StyleRulesCallback<any>, options?: WithStylesOptions) {
  return <T>(target: T): T => <any>muiWithStyles(style, options)(<any>target);
}

export { withStyles, IWithStyles };
