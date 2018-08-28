import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GdmnApi } from '@src/app/services/GdmnApi';
import {
  BackupsView,
  IBackupsViewActionsProps,
  TBackupsViewProps,
  IBackupsViewStateProps,
  IBackupsViewState
} from '@src/app/scenes/backups/component';
import { IState } from '@src/app/store/reducer';
import { selectBackupsState } from '@src/app/store/selectors';
import { backupActions, TBackupActions } from '@src/app/scenes/backups/actions';

interface IDispatchToProps extends IBackupsViewActionsProps {
  dispatch: any;
}

const getBackupsContainer = (apiService: GdmnApi) =>
  compose<TBackupsViewProps, TBackupsViewProps>(
    connect(
      (state: IState, ownProps: TBackupsViewProps): IBackupsViewStateProps => {
        const { appId, ...props } = selectBackupsState(state); // !! exclude do not remove
        return {
          ...props
        };
      },
      (dispatch: Dispatch<TBackupActions>, ownProps): IDispatchToProps => {
        return {
          getDownloadBackupUri(backupUid: string) {
            const appId = ownProps.match.params.appId;

            return apiService.apiEndpoints.downloadBackup
              .replace(/\/(:uid)/, appId ? `/${appId}` : '')
              .replace(/\/(:backupUid)/, backupUid ? `/${backupUid}` : '');
          },
          async getAccessToken() {
            const accessToken = await apiService.getAccessToken();
            if (!!accessToken) dispatch(backupActions.setAccessToken(accessToken));
          },
          loadBackups() {
            dispatch(backupActions.loadBackups(ownProps.match.params.appId));
          },
          async createBackup(alias) {
            dispatch(backupActions.createBackupAsync.request());
            try {
              await apiService.createBackup(ownProps.match.params.appId, alias);
              dispatch(backupActions.createBackupAsync.success());
            } catch (err) {
              dispatch(backupActions.createBackupAsync.failure(err));
            }
            // reload
            this.loadBackups();
          },
          async deleteBackup(uid: string) {
            dispatch(backupActions.deleteBackupAsync.request());
            try {
              await apiService.deleteBackup(ownProps.match.params.appId, uid);
              dispatch(backupActions.deleteBackupAsync.success());
            } catch (err) {
              dispatch(backupActions.deleteBackupAsync.failure(err));
            }
            // reload
            this.loadBackups();
          },
          async uploadBackup(alias: string, file: File) {
            dispatch(backupActions.uploadBackupAsync.request());
            try {
              await apiService.uploadBackup(ownProps.match.params.appId, alias, file);
              dispatch(backupActions.uploadBackupAsync.success());
            } catch (err) {
              dispatch(backupActions.uploadBackupAsync.failure(err));
            }
            // reload // todo test
            this.loadBackups();
          },
          async restoreBackup(uid: string, alias: string) {
            dispatch(backupActions.restoreBackupAsync.request());
            try {
              await apiService.restoreBackup(ownProps.match.params.appId, uid, alias);
              dispatch(backupActions.restoreBackupAsync.success());
            } catch (err) {
              dispatch(backupActions.restoreBackupAsync.failure(err));
            }
          },
          dispatch
        };
      }
    ),
    lifecycle<TBackupsViewProps, IBackupsViewState>({
      async componentDidMount() {
        await this.props.loadBackups();
        // TODO tmp -> persist state
        await this.props.getAccessToken();
      }
    })
  )(BackupsView);

export { getBackupsContainer };
