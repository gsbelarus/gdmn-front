import React, { ReactType } from 'react';
import { Paper, LinearProgress, Typography } from '@material-ui/core';
import CSSModules from 'react-css-modules';

const styles = require('./styles.css');

interface IAuthViewStateProps {
  isSubmitting: boolean;
}

interface IAuthViewProps extends IAuthViewStateProps {
  renderSignInFormContainer: ReactType;
}

@CSSModules(styles, { allowMultiple: true })
class AuthView extends React.Component<IAuthViewProps, {}> {
  public render(): JSX.Element {
    const { isSubmitting, renderSignInFormContainer: SignInFormContaner } = this.props;
    return (
      <Paper styleName="auth-card row-flex">
        <div styleName="col auth-card-description-box" />
        <div styleName="col" style={{ marginTop: 5 }}>
          {isSubmitting && <LinearProgress style={{ marginTop: -5 }} />}
          <div styleName="auth-card-content">
            <Typography variant="headline">{'Вход'}</Typography>
            <Typography variant="body1">{'Используйте аккаунт Гедымин'}</Typography>
            <div style={{ paddingTop: '10px' }}>
              <SignInFormContaner />
            </div>
          </div>
        </div>
      </Paper>
    );
  }
}

export { AuthView, IAuthViewProps, IAuthViewStateProps };
