// import { ReactType } from 'react';
// import { Theme } from '@material-ui/core/styles/createMuiTheme'
import muiWithStyles, { StyleRules, StyleRulesCallback, WithStylesOptions } from '@material-ui/core/styles/withStyles';
// ClassNameMap,

// // 'classes' is optional
// export interface IWithStyles<ClassKey extends string = string> {
//   classes?: ClassNameMap<ClassKey>,
//   theme?: Theme
// }
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

export { withStyles };
