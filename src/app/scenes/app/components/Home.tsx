import React, { Component, ReactType } from 'react';
import CSSModules, { InjectedCSSModuleProps } from 'react-css-modules';

import styles from './Home.css';

interface IHomeProps {
  renderNlpDialogScrollContainer: ReactType;
}

@CSSModules(styles)
class Home extends Component<IHomeProps & InjectedCSSModuleProps> {
  public render() {
    const { renderNlpDialogScrollContainer: NlpDialogScrollContainer } = this.props;

    return (
      <div styleName="scene-box">
        <div styleName="dialog">
          <NlpDialogScrollContainer />
        </div>
        <div styleName="space">grid...</div>
      </div>
    );
  }
}

export { Home, IHomeProps };
