import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { IRootState } from '@src/app/store/rootReducer';
import { ISignInFormProps, SignInForm } from '@src/app/scenes/auth/components/SignInForm';
import { AuthView, IAuthViewProps, IAuthViewStateProps } from '@src/app/scenes/auth/component';
import { actions } from '@src/app/scenes/auth/actions';
import { UserRoleType } from '@src/app/scenes/web/services/Auth';
import { Api } from '@src/app/scenes/web/services/Api';

const parseSignInResponse = (payload: any) => {
  payload.userRole = UserRoleType.USER; // decodeToken(payload.token).role // TODO tmp
  if (payload.token) payload.accessToken = payload.token;
  return payload;
};

const getSignInFormContainer = (apiService: Api) =>
  compose<ISignInFormProps, ISignInFormProps>(
    connect(
      state => ({}),
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
      (state: IRootState, ownProps: IAuthViewProps): IAuthViewStateProps => ({
        isSubmitting: state.form && state.form.SignInForm ? state.form.SignInForm.submitting : false
      })
    ),
    withProps({
      renderSignInFormContainer: getSignInFormContainer(apiService)
    })
  )(AuthView);

export { getAuthContainer };
