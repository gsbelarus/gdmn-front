import React from 'react';
import Button from '@material-ui/core/Button';
import { Field, Form } from 'redux-form';
import CSSModules from 'react-css-modules';

import { TextField } from '@src/app/scenes/web/components/form/TextField';
import { PasswordField } from '@src/app/scenes/web/components/form/PasswordField';
import { requiredValidate } from '@src/app/scenes/web/utils/inputValidators';

const styles = require('./SignInForm.css');

interface ISignInFormProps {
  onSubmit: (values: any) => void;
  // TODO extends ReduxForm
  handleSubmit: (values: any) => void;
  pristine: boolean;
  submitting: boolean;
}

@CSSModules(styles)
class SignInForm extends React.Component<any, {}> {
  public render(): JSX.Element {
    const { handleSubmit, onSubmit, pristine, submitting } = this.props;

    return (
      <Form onSubmit={this.props.handleSubmit((values: any) => this.props.onSubmit(values))}>
        <Field name="username" component={TextField as any} label="Пользователь" validate={requiredValidate} />
        <Field
          name="password"
          component={PasswordField as any}
          label="Пароль"
          type="password"
          validate={requiredValidate}
        />

        <div className="form-actions">
          <Button
            variant="raised"
            color="secondary"
            disabled={this.props.pristine || this.props.submitting}
            type="submit"
          >
            <span>Войти</span>
          </Button>
        </div>
      </Form>
    );
  }
}

export { SignInForm, ISignInFormProps };
