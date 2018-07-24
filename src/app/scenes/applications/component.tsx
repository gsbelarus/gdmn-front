import React, { Fragment, PureComponent } from 'react';
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button
} from '@material-ui/core';

interface IApplicationBoxState {
  aliasValue: string;
}

interface IApplicationsBoxStateProps {
  readonly applications?: Array<{ uid: string; alias: string }>;
}

interface IApplicationsBoxActionsProps {
  loadApps: () => void;
  deleteApp: (uid: string) => void;
  createApp: (alias: string) => void;
}

type TApplicationsBoxProps = IApplicationsBoxStateProps & IApplicationsBoxActionsProps;

class ApplicationsBox extends PureComponent<TApplicationsBoxProps, IApplicationBoxState> {
  public state: IApplicationBoxState = {
    aliasValue: ''
  };

  constructor(props: TApplicationsBoxProps) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.createApp = this.createApp.bind(this);
  }

  public componentDidMount() {
    // TODO extract
    this.props.loadApps();
  }

  private handleChange(evt: any) {
    this.setState({
      aliasValue: evt.target.value
    });
  }

  private createApp() {
    this.props.createApp(this.state.aliasValue);
    this.setState({ aliasValue: '' });
  }

  public render(): JSX.Element {
    const { applications } = this.props;

    return (
      <Fragment>
        <form noValidate={true} autoComplete="off">
          <TextField
            id="alias"
            label="Alias"
            value={this.state.aliasValue}
            onChange={this.handleChange}
            margin="normal"
          />
          <Button variant="fab" mini={true} color="secondary" aria-label="Add" onClick={this.createApp}>
            <AddIcon />
          </Button>
        </form>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Alias</TableCell>
                <TableCell>Uid</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {applications &&
                applications.map(app => (
                  <TableRow key={app.uid}>
                    <TableCell component="th" scope="row">
                      {app.alias}
                    </TableCell>
                    <TableCell>{app.uid}</TableCell>
                    <TableCell>
                      <IconButton aria-label="Delete" onClick={() => this.props.deleteApp(app.uid)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>
      </Fragment>
    );
  }
}

export { ApplicationsBox, TApplicationsBoxProps, IApplicationsBoxStateProps, IApplicationsBoxActionsProps };
