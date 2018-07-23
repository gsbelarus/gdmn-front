import React, { Component, ReactType } from 'react';
import CSSModules from 'react-css-modules';
import { Grid } from 'gdmn-grid';

const homeStyles = require('./Home.css');

interface IHomeProps {
  renderNlpDialogScrollContainer: ReactType;
}

@CSSModules(homeStyles)
class Home extends Component<IHomeProps, {}> {
  public render() {
    const { renderNlpDialogScrollContainer: NlpDialogScrollContainer } = this.props;

    return (
      <div styleName="TheScreen">
        <div styleName="NLPDialogColumn">
          <NlpDialogScrollContainer />
        </div>
        <div styleName="WorkArea">
          <Grid />
        </div>
      </div>
    );
  }
}

export { Home, IHomeProps };
