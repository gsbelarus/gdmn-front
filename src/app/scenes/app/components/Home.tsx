import React, { Component, ReactType } from 'react';
import CSSModules from 'react-css-modules';

const homeStyles = require('./Home.css');

interface IHomeProps  {
  renderNlpDialogScrollContainer: ReactType;

}

@CSSModules(homeStyles)
class Home extends Component<IHomeProps, any> {

  public render() {
    const { renderNlpDialogScrollContainer: NlpDialogScrollContainer } = this.props;

    return (
      <div styleName="TheScreen">
        <div styleName="NLPDialogColumn">
          <NlpDialogScrollContainer />
        </div>
        <div styleName="WorkArea">
          <div>Welcome to Home, homie!</div>
        </div>
      </div>
    );
  }
}

export { Home, IHomeProps };
