import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';

import { TBackupGetResponse } from '@core/gdmn-api/backup/TBackupGetResponse';

const backupActions = {
  setAccessToken: createAction('gdmn/datastores/backups/SET_ACCESS_TOKEN', resolve => {
    return (accessToken: string) => resolve(accessToken);
  }),
  loadBackups: createAction('gdmn/datastores/backups/LOAD_BACKUPS', resolve => {
    return (appId: string) => resolve(appId);
  }),
  loadBackupsAsync: createAsyncAction(
    'gdmn/datastores/backups/LOAD_BACKUPS_REQUEST',
    'gdmn/datastores/backups/LOAD_BACKUPS_REQUEST_OK',
    'gdmn/datastores/backups/LOAD_BACKUPS_REQUEST_ERROR'
  )<void, { backups: TBackupGetResponse; appId: string }, Error>(),
  createBackupAsync: createAsyncAction(
    'gdmn/datastores/backups/CREATE_BACKUP_REQUEST',
    'gdmn/datastores/backups/CREATE_BACKUP_REQUEST_OK',
    'gdmn/datastores/backups/CREATE_BACKUP_REQUEST_ERROR'
  )<void, void, Error>(),
  uploadBackupAsync: createAsyncAction(
    'gdmn/datastores/backups/UPLOAD_BACKUP_REQUEST',
    'gdmn/datastores/backups/UPLOAD_BACKUP_REQUEST_OK',
    'gdmn/datastores/backups/UPLOAD_BACKUP_REQUEST_ERROR'
  )<void, void, Error>(),
  // downloadBackupAsync: createAsyncAction(
  //   'gdmn/datastores/backups/DOWNLOAD_BACKUP_REQUEST',
  //   'gdmn/datastores/backups/DOWNLOAD_BACKUP_REQUEST_OK',
  //   'gdmn/datastores/backups/DOWNLOAD_BACKUP_REQUEST_ERROR'
  // )<void, void, Error>(),
  restoreBackupAsync: createAsyncAction(
    'gdmn/datastores/backups/RESTORE_BACKUP_REQUEST',
    'gdmn/datastores/backups/RESTORE_BACKUP_REQUEST_OK',
    'gdmn/datastores/backups/RESTORE_BACKUP_REQUEST_ERROR'
  )<void, void, Error>(),
  deleteBackupAsync: createAsyncAction(
    'gdmn/datastores/backups/DELETE_BACKUP_REQUEST',
    'gdmn/datastores/backups/DELETE_BACKUP_REQUEST_OK',
    'gdmn/datastores/backups/DELETE_BACKUP_REQUEST_ERROR'
  )<void, void, Error>()
};

type TBackupActions = ActionType<typeof backupActions>;

// FIXME
// backupActions.loadBackupsRequestError = (error: Error) => ({
//   type: 'gdmn/datastores/backups/LOAD_BACKUPS_REQUEST_ERROR',
//   payload: error,
//   error: true
// });
// backupActions.createBackupRequestError = (error: Error) => ({
//   type: 'gdmn/datastores/backups/CREATE_BACKUP_REQUEST_ERROR',
//   payload: error,
//   error: true
// });
// backupActions.uploadBackupRequestError = (error: Error) => ({
//   type: 'gdmn/datastores/backups/UPLOAD_BACKUP_REQUEST_ERROR',
//   payload: error,
//   error: true
// });
// backupActions.downloadBackupRequestError = (error: Error) => ({
//   type: 'gdmn/datastores/backups/DOWNLOAD_BACKUP_REQUEST_ERROR',
//   payload: error,
//   error: true
// });
// backupActions.restoreBackupRequestError = (error: Error) => ({
//   type: 'gdmn/datastores/backups/RESTORE_BACKUP_REQUEST_ERROR',
//   payload: error,
//   error: true
// });
// backupActions.deleteBackupRequestError = (error: Error) => ({
//   type: 'gdmn/datastores/backups/RESTORE_BACKUP_REQUEST_ERROR',
//   payload: error,
//   error: true
// });

export { backupActions, TBackupActions };
