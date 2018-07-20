import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';

import { TNLPDialogActions, actions } from '../actions';
import { IRootState } from '../../../store/rootReducer';
import { selectNLPDialogState } from '../../../store/selectors';
import { NLPDialogScroll } from './NLPDialogScroll';
import { Grid } from 'gdmn-grid';

const homeStyles = require('./Home.css');

@CSSModules(homeStyles)
class Home extends Component<any, any> {
  private static nlpDialogScrollContainer = connect(
    (state: IRootState) => ({
      ...selectNLPDialogState(state)
    }),
    (dispatch: Dispatch<TNLPDialogActions>) => ({
      onSetText: (text: string) => dispatch(actions.addNLPDialogText(text))
    })
  )(NLPDialogScroll);

  public render() {
    return (
      <div styleName="TheScreen">
        <div styleName="NLPDialogColumn">
          <Home.nlpDialogScrollContainer />
        </div>
        <div styleName="WorkArea">
          <Grid />
        </div>
      </div>
    );
  }
}

export { Home };
