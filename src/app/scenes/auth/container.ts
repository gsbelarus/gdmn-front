import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { Auth, UserRoleType } from '@core/services/Auth';
import { IState } from '@src/app/store/reducer';
import { actions } from '@src/app/scenes/auth/actions';
import { ISignInFormData, ISignInFormProps, SignInForm } from '@src/app/scenes/auth/components/SignInForm';
import { AuthView, IAuthViewProps, IAuthViewStateProps } from '@src/app/scenes/auth/component';
import { IAccountLoginResponse } from '@core/gdmn-api/account/IAccountLoginResponse';
import { GdmnApi } from '@src/app/services/GdmnApi';
import { ISignUpFormData, ISignUpFormProps, SignUpForm } from '@src/app/scenes/auth/components/SignUpForm';
import { TAccountCreateResponse } from '@core/gdmn-api/account/TAccountCreateResponse';

const parseSignInResponse = (payload: any) => {
  payload.userRole = UserRoleType.USER; // decodeToken(payload.token).role // TODO tmp
  // if (payload.token) {
  //   payload.accessToken = payload.;
  //   // TODO extract
  //   const tokenPayload: any = Auth.decodeToken(payload.accessToken);
  //   payload.accessTokenExpireTime = tokenPayload.exp;
  //   payload.accessTokenIssuedAt = tokenPayload.iat;
  //   payload.userId = tokenPayload.id;
  // }

  return payload;
};

const signInFormInitialValues: ISignInFormData = { username: 'Administrator', password: 'Administrator' };
const getSignInFormContainer = (apiService: GdmnApi) =>
  compose<ISignInFormProps, ISignInFormProps>(
    connect(
      state => ({
        initialValues: signInFormInitialValues
      }),
      (dispatch, ownProps) => ({
        onSubmit: async (formData: Partial<ISignInFormData>) => {
          // TODO async action

          dispatch(actions.signInRequest());

          try {
            const responseBody = <IAccountLoginResponse>(
              await apiService.fetchSignIn({ login: formData.username || '', password: formData.password || '' })
            );

            const payload = parseSignInResponse(responseBody);

            dispatch(actions.signInRequestOk(payload.userRole));
            console.log(payload);
          } catch (error) {
            console.log('[GDMN] ', error);

            dispatch(actions.signInRequestError(error));
          }
        }
      })
    ),
    reduxForm<ISignInFormData>({
      form: 'SignInForm'
    })
  )(SignInForm);

const getSignUpFormContainer = (apiService: GdmnApi) =>
  compose<ISignUpFormProps, ISignUpFormProps>(
    connect(
      null,
      (dispatch, ownProps) => ({
        onSubmit: async (formData: Partial<ISignUpFormData>) => {
          // TODO async action

          dispatch(actions.signUpRequest());

          try {
            const responseBody = <TAccountCreateResponse>(
              await apiService.fetchSignUp({ login: formData.username || '', password: formData.password || '' })
            );

            dispatch(actions.signUpRequestOk());

            const payload = parseSignInResponse(responseBody);
            dispatch(actions.signInRequestOk(payload.userRole));

            console.log(payload);
          } catch (error) {
            console.log('[GDMN] ', error);

            dispatch(actions.signUpRequestError(error));
          }
        }
      })
    ),
    reduxForm<ISignUpFormData>({
      form: 'SignUpForm'
    })
  )(SignUpForm);

const getAuthContainer = (apiService: GdmnApi) =>
  compose<IAuthViewProps, IAuthViewProps>(
    connect(
      (state: IState, ownProps: IAuthViewProps): IAuthViewStateProps => ({
        signInFormSubmitting: state.form && state.form.SignInForm ? state.form.SignInForm.submitting : false,
        signUpFormSubmitting: state.form && state.form.SignUpForm ? state.form.SignUpForm.submitting : false
      })
    ),
    withProps({
      renderSignInFormContainer: getSignInFormContainer(apiService),
      renderSignUpFormContainer: getSignUpFormContainer(apiService)
    })
  )(AuthView);

export { getAuthContainer };
