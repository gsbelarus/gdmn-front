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
import { Link, RouteComponentProps } from 'react-router-dom';

interface IDataStoresViewState {
  createDlgOpen: boolean;
}

interface IDataStoresViewStateProps {
  readonly dataStores?: Array<{ uid: string; alias: string }>;
}

interface IDataStoresViewActionsProps {
  loadDataStores: () => void;
  deleteDataStore: (uid: string) => void;
  createDataStore: (alias: string) => void;
}

type TDataStoresViewProps = IDataStoresViewStateProps & IDataStoresViewActionsProps & RouteComponentProps<any>;

class DataStoresView extends PureComponent<TDataStoresViewProps, IDataStoresViewState> {
  public state: IDataStoresViewState = {
    createDlgOpen: false
  };

  private createDlgAliasInputRef: HTMLInputElement | null = null;

  constructor(props: TDataStoresViewProps) {
    super(props);

    this.createDlgToggle = this.createDlgToggle.bind(this);
    this.handleCreateApp = this.handleCreateApp.bind(this);
  }

  public componentDidMount() {
    // TODO extract
    this.props.loadDataStores();
  }

  private handleCreateApp() {
    const alias = this.createDlgAliasInputRef!.value;
    this.createDlgToggle();
    this.props.createDataStore(alias);
  }

  private createDlgToggle() {
    this.setState({ createDlgOpen: !this.state.createDlgOpen });
  }

  public render(): JSX.Element {
    const { dataStores, match } = this.props;

    return (
      <div style={{ textAlign: 'initial' }}>
        <Grid container={true} spacing={24}>
          {dataStores &&
            dataStores.map(app => (
              <Grid item={true} xs={12} sm={6} key={app.uid}>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="Datastore">
                        <Icon>storage</Icon>
                      </Avatar>
                    }
                    action={
                      <Fragment>
                        <Link to={`${match.url}/${app.uid}/ermodel`}>
                          <IconButton>
                            <Icon>play_circle_filled</Icon>
                          </IconButton>
                        </Link>
                        <IconButton onClick={() => this.props.deleteDataStore(app.uid)}>
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
          <DialogTitle id="form-dialog-title">Create datastore</DialogTitle>
          <DialogContent>
            <DialogContentText>Fill out the form to create a new datastore:</DialogContentText>
            <TextField
              inputRef={(ref: HTMLInputElement) => {
                this.createDlgAliasInputRef = ref;
              }}
              autoFocus={true}
              margin="dense"
              id="alias"
              label="Datastore Name"
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

export { DataStoresView, TDataStoresViewProps, IDataStoresViewStateProps, IDataStoresViewActionsProps };
