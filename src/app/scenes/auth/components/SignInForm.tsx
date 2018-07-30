import React from 'react';
import { Button } from '@material-ui/core';
import { Field, Form, InjectedFormProps } from 'redux-form';
import CSSModules from 'react-css-modules';

import { TextField } from '@core/components/form/TextField';
import { PasswordField } from '@core/components/form/PasswordField';
import { requiredValidate } from '@core/utils/inputValidators';

const styles = require('./SignInForm.css');

interface ISignInFormProps extends InjectedFormProps<ISignInFormData> {
  onSubmit: (values: Partial<ISignInFormData>) => void;
}

interface ISignInFormData {
  username: string;
  password: string;
}

@CSSModules(styles)
class SignInForm extends React.Component<ISignInFormProps> {
  public render(): JSX.Element {
    const { handleSubmit, onSubmit, pristine, submitting, initialized } = this.props;
    return (
      <Form onSubmit={handleSubmit((values: Partial<ISignInFormData>) => onSubmit(values))}>
        <Field name="username" component={TextField as any} label="Пользователь" validate={requiredValidate} />
        <Field
          name="password"
          component={PasswordField as any}
          label="Пароль"
          type="password"
          validate={requiredValidate}
        />
        <div styleName="form-actions">
          <Button variant="raised" color="secondary" disabled={(!initialized && pristine) || submitting} type="submit">
            <span>Войти</span>
          </Button>
        </div>
      </Form>
    );
  }
}

export { SignInForm, ISignInFormProps, ISignInFormData };
