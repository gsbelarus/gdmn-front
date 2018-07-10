import React, { Component, Fragment } from 'react';
import { NavLink, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import CSSModules from 'react-css-modules';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { ErrorBoundary } from '@src/app/components/ErrorBoundary';
import { ERModelBoxContainer } from '@src/app/scenes/ermodel/container';
import { MorphBoxContainer } from '@src/app/scenes/morphology/container';
import { SemanticsBoxContainer } from '@src/app/scenes/semantics/container';
import { NLPDialogScroll } from '@src/app/scenes/app/components/NLPDialogScroll';
import { TNLPDialogActions, actions } from '@src/app/scenes/app/actions';

import { IRootState } from '@src/app/store/rootReducer';
import { selectNLPDialogState } from '@src/app/store/selectors';

const styles = require('./styles.css');

const NLPDialogScrollContainer = connect(
  (state: IRootState) => ({
    ...selectNLPDialogState(state)
  }),
  (dispatch: Dispatch<TNLPDialogActions>) => ({
    onSetText: (text: string) => dispatch(actions.addNLPDialogText(text)),
  })
)(NLPDialogScroll);

type IAppProps = RouteComponentProps<any> & CSSModules.InjectedCSSModuleProps;

@CSSModules(styles)
class App extends Component<IAppProps, {}> {
  public render() {
    const { match } = this.props;

    return (
      <Fragment>
        {/* <div styleName="TheScreen">
          <div styleName="AppBar"> */}
        <AppBar position="static">
          <Toolbar>
            <NavLink styleName="nav-item" to={`${match.url}/morphology`} activeClassName="nav-item-selected">
              <Button color="inherit" component={'div'}>
                Morphology
              </Button>
            </NavLink>
            <NavLink styleName="nav-item" to={`${match.url}/semantics`} activeClassName="nav-item-selected">
              <Button color="inherit" component={'div'}>
                Semantics
              </Button>
            </NavLink>
            <NavLink styleName="nav-item" to={`${match.url}/ermodel`} activeClassName="nav-item-selected">
              <Button color="inherit" component={'div'}>
                ER-Model
              </Button>
            </NavLink>
          </Toolbar>
        </AppBar>
        <main styleName="main">
          <ErrorBoundary>
            <div styleName='NLPDialogColumn'>
              <NLPDialogScrollContainer />
            </div>
            <div styleName='WorkArea'>
              <Switch>
                <Route exact={true} path={`${match.path}/`} render={() => <div>Welcome to Home, homie!</div>} />
                <Route path={`${match.path}/morphology`} component={MorphBoxContainer} />
                <Route path={`${match.path}/semantics`} component={SemanticsBoxContainer} />
                <Route path={`${match.path}/ermodel`} component={ERModelBoxContainer} />
                <Redirect from={`${match.path}/*`} to={`${match.path}`} />
              </Switch>
            </div>
          </ErrorBoundary>
        </main>
      </Fragment>
    );
  }
}

// TODO switch -> children -> container

export { App, IAppProps };
