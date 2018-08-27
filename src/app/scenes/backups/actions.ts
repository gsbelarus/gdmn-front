import { ActionType, createAction } from 'typesafe-actions';

import { TBackupGetResponse } from '@core/gdmn-api/backup/TBackupGetResponse';

const backupActions = {
  setAccessToken: createAction('gdmn/datastores/backups/SET_ACCESS_TOKEN', resolve => {
    return (accessToken: string) => resolve(accessToken);
  }),
  loadBackups: createAction('gdmn/datastores/backups/LOAD_BACKUPS', resolve => {
    return (appId: string) => resolve(appId);
  }),
  // load
  loadBackupsRequest: createAction('gdmn/datastores/backups/LOAD_BACKUPS_REQUEST', resolve => {
    return () => resolve();
  }),
  loadBackupsRequestOk: createAction('gdmn/datastores/backups/LOAD_BACKUPS_REQUEST_OK', resolve => {
    return (backups: TBackupGetResponse, appId) => resolve({ appId, backups });
  }),
  loadBackupsRequestError: createAction('gdmn/datastores/backups/LOAD_BACKUPS_REQUEST_ERROR', resolve => {
    return (error: Error) => resolve(error);
  }),
  // create
  createBackupRequest: createAction('gdmn/datastores/backups/CREATE_BACKUP_REQUEST', resolve => {
    return () => resolve();
  }),
  createBackupRequestOk: createAction('gdmn/datastores/backups/CREATE_BACKUP_REQUEST_OK', resolve => {
    return () => resolve();
  }),
  createBackupRequestError: createAction('gdmn/datastores/backups/CREATE_BACKUP_REQUEST_ERROR', resolve => {
    return (error: Error) => resolve(error);
  }),
  // upload
  uploadBackupRequest: createAction('gdmn/datastores/backups/UPLOAD_BACKUP_REQUEST', resolve => {
    return () => resolve();
  }),
  uploadBackupRequestOk: createAction('gdmn/datastores/backups/UPLOAD_BACKUP_REQUEST_OK', resolve => {
    return () => resolve();
  }),
  uploadBackupRequestError: createAction('gdmn/datastores/backups/UPLOAD_BACKUP_REQUEST_ERROR', resolve => {
    return (error: Error) => resolve(error);
  }),
  // download
  downloadBackupRequest: createAction('gdmn/datastores/backups/DOWNLOAD_BACKUP_REQUEST', resolve => {
    return () => resolve();
  }),
  downloadBackupRequestOk: createAction('gdmn/datastores/backups/DOWNLOAD_BACKUP_REQUEST_OK', resolve => {
    return () => resolve();
  }),
  downloadBackupRequestError: createAction('gdmn/datastores/backups/DOWNLOAD_BACKUP_REQUEST_ERROR', resolve => {
    return (error: Error) => resolve(error);
  }),
  // restore
  restoreBackupRequest: createAction('gdmn/datastores/backups/RESTORE_BACKUP_REQUEST', resolve => {
    return () => resolve();
  }),
  restoreBackupRequestOk: createAction('gdmn/datastores/backups/RESTORE_BACKUP_REQUEST_OK', resolve => {
    return () => resolve();
  }),
  restoreBackupRequestError: createAction('gdmn/datastores/backups/RESTORE_BACKUP_REQUEST_ERROR', resolve => {
    return (error: Error) => resolve(error);
  }),
  deleteBackupRequest: createAction('gdmn/datastores/backups/RESTORE_BACKUP_REQUEST', resolve => {
    return () => resolve();
  }),
  deleteBackupRequestOk: createAction('gdmn/datastores/backups/RESTORE_BACKUP_REQUEST_OK', resolve => {
    return () => resolve();
  }),
  deleteBackupRequestError: createAction('gdmn/datastores/backups/RESTORE_BACKUP_REQUEST_ERROR', resolve => {
    return (error: Error) => resolve(error);
  })
};

type TBackupActions = ActionType<typeof backupActions>;

// FIXME
backupActions.loadBackupsRequestError = (error: Error) => ({
  type: 'gdmn/datastores/backups/LOAD_BACKUPS_REQUEST_ERROR',
  payload: error,
  error: true
});
backupActions.createBackupRequestError = (error: Error) => ({
  type: 'gdmn/datastores/backups/CREATE_BACKUP_REQUEST_ERROR',
  payload: error,
  error: true
});
backupActions.uploadBackupRequestError = (error: Error) => ({
  type: 'gdmn/datastores/backups/UPLOAD_BACKUP_REQUEST_ERROR',
  payload: error,
  error: true
});
backupActions.downloadBackupRequestError = (error: Error) => ({
  type: 'gdmn/datastores/backups/DOWNLOAD_BACKUP_REQUEST_ERROR',
  payload: error,
  error: true
});
backupActions.restoreBackupRequestError = (error: Error) => ({
  type: 'gdmn/datastores/backups/RESTORE_BACKUP_REQUEST_ERROR',
  payload: error,
  error: true
});
backupActions.deleteBackupRequestError = (error: Error) => ({
  type: 'gdmn/datastores/backups/RESTORE_BACKUP_REQUEST_ERROR',
  payload: error,
  error: true
});

export { backupActions, TBackupActions };
