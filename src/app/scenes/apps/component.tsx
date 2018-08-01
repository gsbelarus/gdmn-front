import React, { Fragment, PureComponent } from 'react';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Grid,
  Card,
  CardActions,
  Icon,
  CardContent,
  Typography,
  Avatar,
  CardHeader,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import { Link } from 'react-router-dom';

interface IAppsViewState {
  createDlgOpen: boolean;
}

interface IAppsViewStateProps {
  readonly apps?: Array<{ uid: string; alias: string }>;
}

interface IAppsViewActionsProps {
  loadApps: () => void;
  deleteApp: (uid: string) => void;
  createApp: (alias: string) => void;
}

type TAppsViewProps = IAppsViewStateProps & IAppsViewActionsProps;

class AppsView extends PureComponent<TAppsViewProps, IAppsViewState> {
  public state: IAppsViewState = {
    createDlgOpen: false
  };

  private createDlgAliasInputRef: HTMLInputElement | null = null;

  constructor(props: TAppsViewProps) {
    super(props);

    this.createDlgToggle = this.createDlgToggle.bind(this);
    this.handleCreateApp = this.handleCreateApp.bind(this);
  }

  public componentDidMount() {
    // TODO extract
    this.props.loadApps();
  }

  private handleCreateApp() {
    const alias = this.createDlgAliasInputRef!.value;
    this.createDlgToggle();
    this.props.createApp(alias);
  }

  private createDlgToggle() {
    this.setState({ createDlgOpen: !this.state.createDlgOpen });
  }

  public render(): JSX.Element {
    const { apps } = this.props;

    return (
      <div style={{ textAlign: 'initial' }}>
        <Grid container={true} spacing={24}>
          {apps &&
            apps.map(app => (
              <Grid item={true} xs={12} sm={6} key={app.uid}>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="Application">
                        <Icon>storage</Icon>
                      </Avatar>
                    }
                    action={
                      <Fragment>
                        <Link to={`/gdmn/apps/${app.uid}/ermodel`}>
                          <IconButton>
                            <Icon>play_circle_filled</Icon>
                          </IconButton>
                        </Link>
                        <IconButton onClick={() => this.props.deleteApp(app.uid)}>
                          <Icon>delete</Icon>
                        </IconButton>
                      </Fragment>
                    }
                    title={app.alias}
                    subheader={app.uid}
                  />
                </Card>
              </Grid>
            ))}
        </Grid>
        <Button
          onClick={this.createDlgToggle}
          variant="fab"
          style={{ position: 'absolute', bottom: 16, right: 16 }}
          color="secondary"
        >
          <Icon>add</Icon>
        </Button>
        <Dialog open={this.state.createDlgOpen} onClose={this.createDlgToggle} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create application</DialogTitle>
          <DialogContent>
            <DialogContentText>Fill out the form to create a new application:</DialogContentText>
            <TextField
              inputRef={(ref: HTMLInputElement) => {
                this.createDlgAliasInputRef = ref;
              }}
              autoFocus={true}
              margin="dense"
              id="alias"
              label="Application Name"
              type="text"
              fullWidth={true}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.createDlgToggle} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleCreateApp} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export { AppsView, TAppsViewProps, IAppsViewStateProps, IAppsViewActionsProps };
