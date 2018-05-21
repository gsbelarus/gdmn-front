import 'styles/global.css';

import * as React from 'react';
import { connect } from 'react-redux';
import { withStyles, StyleRulesCallback, WithStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import withRoot from './withRoot';
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import { ErrorBoundary } from './components/errorBoundary/index';
import MorphBoxContainer from './morphology/container';
import SemanticsBoxContainer from './semantics/container';
import ERModelContainer from './ermodel/container';

const styles: StyleRulesCallback<'root' | 'button'> = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20
  },
  button: {
    margin: theme.spacing.unit,
    color: 'white'
  }
});

class App extends React.Component<WithStyles<'root' | 'button'>, {}> {
  render() {
    const { root, button } = this.props.classes;
    return (
      <BrowserRouter>
        <div className={root}>
          <AppBar>
            <Toolbar>
              <Link to="/morphology">
                <Button className={button}>Morphology</Button>
              </Link>
              <Link to="/semantics">
                <Button className={button}>Semantics</Button>
              </Link>
              <Link to="/ermodel">
                <Button className={button}>ERModel</Button>
              </Link>
            </Toolbar>
          </AppBar>
          <ErrorBoundary>
            <Switch>
              <Route exact={true} path="/morphology" render={() => <MorphBoxContainer />} />
              <Route exact={true} path="/semantics" render={() => <SemanticsBoxContainer />} />
              <Route exact={true} path="/ermodel" render={() => <ERModelContainer />} />
            </Switch>
          </ErrorBoundary>
        </div>
      </BrowserRouter>
    );
  }
}

export default withRoot(withStyles(styles)<{}>(connect()(App)));
