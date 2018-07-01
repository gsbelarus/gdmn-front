import React, { Component, Fragment } from 'react';
import CSSModules from 'react-css-modules';

const styles = require('./NLPDialogScroll.css');

@CSSModules(styles)
export class NLPDialogScroll extends Component<{}, {}> {
  public render() {
    return (
      <div styleName="NLPDialog">
        hi!
        <div styleName="NLPInput">
          <textarea rows={2} spellCheck={false} />
        </div>
      </div>
    );
  }
}