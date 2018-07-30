import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { Auth, UserRoleType } from '@core/services/Auth';
import { Api } from '@core/services/Api';
import { IState } from '@src/app/store/reducer';
import { actions } from '@src/app/scenes/auth/actions';
import { ISignInFormData, ISignInFormProps, SignInForm } from '@src/app/scenes/auth/components/SignInForm';
import { AuthView, IAuthViewProps, IAuthViewStateProps } from '@src/app/scenes/auth/component';
import { IAccountLoginRequest } from '@core/gdmn-api/account/IAccountLoginRequest';
import { IAccountLoginResponse } from '@core/gdmn-api/account/IAccountLoginResponse';
import { IEndpoints } from '@core/gdmn-api/IEndpoints';
import { GdmnApi } from '@src/app/services/GdmnApi';

const parseSignInResponse = (payload: any) => {
  payload.userRole = UserRoleType.USER; // decodeToken(payload.token).role // TODO tmp
  if (payload.token) {
    payload.accessToken = payload.token;
    // TODO extract
    const tokenPayload: any = Auth.decodeToken(payload.accessToken);
    payload.accessTokenExpireTime = tokenPayload.exp;
    payload.accessTokenIssuedAt = tokenPayload.iat;
    payload.userId = tokenPayload.id;
  }

  return payload;
};

const initialValues: ISignInFormData = { username: 'Administrator', password: 'Administrator' };
const getSignInFormContainer = (apiService: GdmnApi) =>
  compose<ISignInFormProps, ISignInFormProps>(
    connect(
      state => ({
        initialValues
      }),
      (dispatch, ownProps) => ({
        onSubmit: async (formData: Partial<ISignInFormData>) => {
          // TODO async action

          dispatch(actions.signInRequest());

          try {
            const responseBody = <IAccountLoginResponse>await apiService.fetchSignIn({ login: formData.username || '', password: formData.password || '' });
            const payload = parseSignInResponse(responseBody);

            dispatch(actions.signInRequestOk(payload.accessToken, payload.userRole));
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

const getAuthContainer = (apiService: GdmnApi) =>
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
