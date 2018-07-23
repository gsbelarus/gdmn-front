import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { UserRoleType } from '@core/services/Auth';
import { Api } from '@core/services/Api';
import { IState } from '@src/app/store/reducer';
import { actions } from '@src/app/scenes/auth/actions';
import { ISignInFormProps, SignInForm } from '@src/app/scenes/auth/components/SignInForm';
import { AuthView, IAuthViewProps, IAuthViewStateProps } from '@src/app/scenes/auth/component';

const parseSignInResponse = (payload: any) => {
  payload.userRole = UserRoleType.USER; // decodeToken(payload.token).role // TODO tmp
  if (payload.token) payload.accessToken = payload.token;
  return payload;
};

const initialValues = { username: 'Administrator', password: 'Administrator' };
const getSignInFormContainer = (apiService: Api) =>
  compose<ISignInFormProps, ISignInFormProps>(
    connect(
      state => ({
        initialValues
      }),
      (dispatch, ownProps) => ({
        onSubmit: (formData: { username: string; password: string }) => {
          // TODO async action

          dispatch(actions.signInRequest());

          return apiService
            .fetchSignIn(formData.username, formData.password)
            .then(parseSignInResponse)
            .then((data: { userRole: UserRoleType; accessToken: string }) => {
              dispatch(actions.signInRequestOk(data.accessToken, data.userRole));

              return data;
            })
            .catch((error: Error) => {
              console.log('[GDMN] ', error);

              dispatch(actions.signInRequestError(error));
            });
        }
      })
    ),
    reduxForm({
      form: 'SignInForm'
    })
  )(SignInForm);

const getAuthContainer = (apiService: Api) =>
  compose<IAuthViewProps, IAuthViewProps>(
    connect(
      (state: IState, ownProps: IAuthViewProps): IAuthViewStateProps => ({
        isSubmitting: state.form && state.form.SignInForm ? state.form.SignInForm.submitting : false
      })
    ),
    withProps({
      renderSignInFormContainer: getSignInFormContainer(apiService)
    })
  )(AuthView);

export { getAuthContainer };
