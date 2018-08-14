import React, { Component, Fragment, Key, PureComponent, SFC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  IconButton,
  Paper,
  Table,
  TextField,
  Tooltip
} from '@material-ui/core';
import { TableProps } from '@material-ui/core/Table';
import Dropzone from 'react-dropzone';

import { ITableHeadColumn, TableHead } from '@src/app/scenes/backups/components/TableHead';
import { ITableBodyColumn, TableBody } from '@src/app/scenes/backups/components/TableBody';
import { TBackupGetResponse } from '@core/gdmn-api/backup/TBackupGetResponse';
import { withEmpty } from '@core/components/withEmpty';
import { IconEmptyView } from '@src/app/components/IconEmptyView';
import { bytesToMb, formatDateToLocalLong } from '@core/utils/utils';
import { DataGridToolbar } from '@src/app/scenes/backups/components/DataGridToolbar';

function humanDateDiff(dateBegin: Date, dateEnd: Date) {
  if (dateBegin > dateEnd) {
    const buff = dateBegin;
    dateBegin = dateEnd;
    dateEnd = buff;
  }
  const timeDiff = new Date(dateEnd.getTime() - dateBegin.getTime());
  const hours = Math.floor((timeDiff as any) / 3600 / 1000);
  const minutes = Math.floor((timeDiff as any) / 60 / 1000 - 60 * hours);
  const seconds = Math.floor(((timeDiff as any) / 1000) % 60);

  if (hours > 24) return '~'; // todo

  return hours + minutes + seconds > 0
    ? `${hours > 0 ? hours + 'h' : ''} ${minutes > 0 ? minutes + ' min' : ''} ${
        minutes === 0 && seconds > 0 ? seconds + ' sec' : ''
      }`
    : 'now';
}

function createTableColumn(
  id: Key,
  title: string,
  renderBodyCellContent: SFC<{ rowIndex: number; selected?: boolean }>,
  alignRight = false
) {
  return {
    id,
    textual: true,
    numeric: alignRight,
    compact: false,
    renderHeadCellContent: () => <span>{title}</span>,
    renderBodyCellContent
  };
}

interface IBackupsViewStateProps {
  backups: TBackupGetResponse;
  accessToken: string | null;
}

interface IBackupsViewActionsProps {
  getDownloadBackupUri: (backupUid: string) => string;
  getAccessToken: () => void;
  loadBackups: () => void;
  createBackup: (alias: string) => void;
  uploadBackup: (alias: string, uploadFile: File) => void;
  restoreBackup: (uid: string, alias: string) => void;
  deleteBackup: (uid: string) => void;
}

type TBackupsViewProps = IBackupsViewStateProps & IBackupsViewActionsProps & RouteComponentProps<any>;

interface IBackupsViewState {
  uploadDlgOpen: boolean;
  createDlgOpen: boolean;
  restoreDlgOpen: boolean;
  restoreBackupUid: string | null;

  uploadFile?: File;
}

const EmptyTable = withEmpty<TableProps>(Table);

class BackupsView extends PureComponent<TBackupsViewProps, IBackupsViewState> {
  public state: IBackupsViewState = {
    uploadDlgOpen: false,
    createDlgOpen: false,
    restoreDlgOpen: false,
    restoreBackupUid: null
    // uploadFile: null
  };

  public static defaultProps: Partial<TBackupsViewProps> = {
    backups: []
  };

  private createDlgAliasInputRef: HTMLInputElement | null = null;
  private restoreDlgAliasInputRef: HTMLInputElement | null = null;
  private uploadDlgAliasInputRef: HTMLInputElement | null = null;

  constructor(props: TBackupsViewProps) {
    super(props);

    this.createDlgToggle = this.createDlgToggle.bind(this);
    this.handleCreateBackup = this.handleCreateBackup.bind(this);
    this.restoreDlgToggle = this.restoreDlgToggle.bind(this);
    this.handleRestore = this.handleRestore.bind(this);
    this.uploadDlgToggle = this.uploadDlgToggle.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  private handleUpload() {
    if (!this.state.uploadFile) return;

    const alias = this.uploadDlgAliasInputRef!.value;
    this.uploadDlgToggle();
    this.props.uploadBackup(alias, this.state.uploadFile);
  }

  private uploadDlgToggle() {
    this.setState({ uploadDlgOpen: !this.state.uploadDlgOpen, uploadFile: undefined });
  }

  private handleCreateBackup() {
    const alias = this.createDlgAliasInputRef!.value;
    this.createDlgToggle();
    this.props.createBackup(alias);
  }

  private createDlgToggle() {
    this.setState({ createDlgOpen: !this.state.createDlgOpen });
  }

  private handleRestore() {
    const { restoreBackupUid } = this.state;
    const alias = this.restoreDlgAliasInputRef!.value;
    this.restoreDlgToggle();

    this.props.restoreBackup(restoreBackupUid!, alias);
  }

  private restoreDlgToggle(restoreBackupUid?: string) {
    this.setState({
      restoreDlgOpen: !this.state.restoreDlgOpen,
      restoreBackupUid: !this.state.restoreDlgOpen && restoreBackupUid ? restoreBackupUid : null
    });
  }

  public render() {
    const { accessToken, backups, getDownloadBackupUri, deleteBackup } = this.props;
    const { uploadFile } = this.state;

    const backupsTableColumns = [
      createTableColumn('alias', 'Name', ({ rowIndex }) => <span>{backups[rowIndex].alias}</span>),
      createTableColumn('created', 'Created at', ({ rowIndex }) => (
        <span>{formatDateToLocalLong(new Date(backups[rowIndex].creationDate))}</span>
      )),
      createTableColumn('ago', 'Time ago', ({ rowIndex }) => (
        <span>{humanDateDiff(new Date(backups[rowIndex].creationDate), new Date())}</span>
      )),
      createTableColumn('bytes', 'File size', ({ rowIndex }) => {
        const backupBytes = backups[rowIndex].size;
        const backupMB = bytesToMb(backupBytes);
        return (
          <span>{`${backupBytes.toLocaleString()} bytes ${backupBytes >= 10000 ? '(~' + backupMB + ' MB)' : ''}`}</span>
        );
      }),
      createTableColumn(
        'actions',
        '',
        ({ rowIndex }) => (
          <form action={getDownloadBackupUri(backups[rowIndex].uid)} method="POST">
            <input id="access_token" name="access_token" type="hidden" value={accessToken || ''} />
            <Tooltip title="Restore">
              <IconButton onClick={() => this.restoreDlgToggle(backups[rowIndex].uid)}>
                <Icon>unarchive</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Download">
              <IconButton type="submit" disabled={!accessToken}>
                <Icon>cloud_download</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={() => deleteBackup(backups[rowIndex].uid)} disabled={true}>
                <Icon>delete_forever</Icon>
              </IconButton>
            </Tooltip>
          </form>
        ),
        true
      )
    ];

    return (
      <div>
        <Paper>
          <DataGridToolbar title="Backups">
            <Button color={'primary'} onClick={this.createDlgToggle}>
              Create
              <Icon style={{ marginLeft: 8 }}>add_circle</Icon>
            </Button>
            <Button color={'primary'} onClick={this.uploadDlgToggle}>
              Upload
              <Icon style={{ marginLeft: 8 }}>cloud_upload</Icon>
            </Button>
          </DataGridToolbar>
          <div style={{ overflow: 'auto', maxHeight: '80vh' }}>
            <EmptyTable
              empty={backups.length === 0}
              emptySlot={<IconEmptyView muiIconName="cloud_queue" title="No backups" />}
            >
              <TableHead columns={backupsTableColumns} bodyRowsCount={backups.length} />
              <TableBody columns={backupsTableColumns} rowsCount={backups.length} />
            </EmptyTable>
          </div>
        </Paper>

        <Paper style={{ marginTop: 16 }}>
          <DataGridToolbar title="Jobs monitor" />
          <IconEmptyView muiIconName="track_changes" title="No running jobs" />
        </Paper>

        <Dialog open={this.state.createDlgOpen} onClose={this.createDlgToggle} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create datastore backup</DialogTitle>
          <DialogContent>
            <DialogContentText>Fill out the form to create a new backup:</DialogContentText>
            <TextField
              inputRef={(ref: HTMLInputElement) => {
                this.createDlgAliasInputRef = ref;
              }}
              autoFocus={true}
              margin="dense"
              id="alias"
              label="Backup Name"
              type="text"
              fullWidth={true}
              required={true}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.createDlgToggle} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleCreateBackup} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.restoreDlgOpen}
          onClose={() => this.restoreDlgToggle()}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Restore datastore backup</DialogTitle>
          <DialogContent>
            <DialogContentText>Fill out the form to restore backup in new datastore:</DialogContentText>
            <TextField
              inputRef={(ref: HTMLInputElement) => {
                this.restoreDlgAliasInputRef = ref;
              }}
              autoFocus={true}
              margin="dense"
              id="alias"
              label="Datastore Name"
              type="text"
              fullWidth={true}
              required={true}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.restoreDlgToggle()} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleRestore} color="primary">
              Restore
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={this.state.uploadDlgOpen} onClose={this.uploadDlgToggle} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Upload datastore backup</DialogTitle>
          <DialogContent>
            <DialogContentText>Fill out the form to upload backup file:</DialogContentText>
            <TextField
              inputRef={(ref: HTMLInputElement) => {
                this.uploadDlgAliasInputRef = ref;
              }}
              autoFocus={true}
              margin="dense"
              id="alias"
              label="Backup Name"
              type="text"
              fullWidth={true}
              required={true}
            />

            <Dropzone
              accept={'.fbk'}
              // onDropAccepted={}
              onDrop={files => {
                this.setState({ uploadFile: files[0] });
              }}
              className="dropzone"
              activeClassName="dropzone-active"
              multiple={false}
            >
              {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }: any) => {
                // if (isDragActive) {
                //   return "This file is authorized";
                // }
                // if (isDragReject) {
                //   return "This file is not authorized";
                // }
                return (
                  <Fragment>
                    <IconEmptyView
                      style={{ marginTop: 18 }}
                      muiIconName="cloud_upload"
                      subtitle="Drag and drop file here or click"
                    />
                    {!!uploadFile && (
                      <Chip
                        style={{ margin: 8 }}
                        avatar={
                          <Avatar>
                            <Icon>cloud_done</Icon>
                          </Avatar>
                        }
                        label={`${uploadFile.name}  (${uploadFile.size} bytes)`}
                        color="primary"
                        onDelete={() => {
                          // window.URL.revokeObjectURL(file.preview);
                          this.setState({ uploadFile: undefined });
                        }}
                      />
                    )}
                  </Fragment>
                );
              }}
            </Dropzone>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.uploadDlgToggle} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.handleUpload}
              color="primary"
              disabled={!this.state.uploadFile || !this.uploadDlgAliasInputRef || !this.uploadDlgAliasInputRef.value}
            >
              Upload
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export { BackupsView, IBackupsViewStateProps, IBackupsViewActionsProps, TBackupsViewProps, IBackupsViewState };
