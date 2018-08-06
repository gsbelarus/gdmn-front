import React, { SFC, Fragment } from 'react';
import { Link, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { Button, ButtonBase, Card, Grid, Typography } from '@material-ui/core';

const HomeView: SFC<RouteComponentProps<any>> = ({
  match // todo
}) => (
  <Grid style={{ height: '100%' }} container={true} spacing={24} alignItems="center" justify="center">
    <Grid item={true}>
      <Card style={{ height: '30vh', width: '30vh' }}>
        <Link to={`${match.url}/gdmn`}>
          <ButtonBase
            focusRipple={true}
            style={{
              width: '100%',
              height: '100%'
            }}
          >
            <Typography component="span" variant="subheading" color="inherit">
              GDMN app
            </Typography>
          </ButtonBase>
        </Link>
      </Card>
    </Grid>

    <Grid item={true}>
      <Card style={{ height: '30vh', width: '30vh' }}>
        <Link to={`${match.url}/demos`}>
          <ButtonBase
            focusRipple={true}
            style={{
              width: '100%',
              height: '100%'
            }}
          >
            <Typography component="span" variant="subheading" color="inherit">
              Demos
            </Typography>
          </ButtonBase>
        </Link>
      </Card>
    </Grid>
  </Grid>
);

export { HomeView };
