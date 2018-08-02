import React from 'react';
import { Button } from '@material-ui/core';
import { Field, Form, InjectedFormProps } from 'redux-form';
import CSSModules from 'react-css-modules';

import { TextField } from '@core/components/form/TextField';
import { emailValidate, passwordValidate, requiredValidate } from '@core/utils/inputValidators';

import styles from './SignInForm.css';

interface ISignUpFormData {
  username: string;
  email: string;
  password: string;
}

interface ISignUpFormProps extends InjectedFormProps<ISignUpFormData> {
  onSubmit: (values: Partial<ISignUpFormData>) => void;
}

@CSSModules(styles)
class SignUpForm extends React.Component<ISignUpFormProps> {
  public render(): JSX.Element {
    const { handleSubmit, onSubmit, pristine, submitting, initialized } = this.props;
    return (
      <Form onSubmit={handleSubmit((values: Partial<ISignUpFormData>) => onSubmit(values))}>
        <Field name="username" component={TextField as any} label="Пользователь" validate={requiredValidate} />
        <Field name="email" component={TextField as any} label="Email" validate={[requiredValidate, emailValidate]} />
        <Field
          name="password"
          component={TextField as any}
          label="Пароль"
          validate={[requiredValidate, passwordValidate]}
        />
        <div styleName="form-actions">
          <Button variant="raised" color="secondary" disabled={(!initialized && pristine) || submitting} type="submit">
            <span>Cоздать</span>
          </Button>
        </div>
      </Form>
    );
  }
}

export { SignUpForm, ISignUpFormProps, ISignUpFormData };
