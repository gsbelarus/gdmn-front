import React, { Fragment, PureComponent, SFC} from 'react';

import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

interface IApplicationsBoxStateProps {
  readonly applications: any;
  readonly err?: string | null;
}

interface IApplicationBoxState {
  aliasValue: '';
}

interface IApplicationsBoxActionsProps {
  loadData: () => void;
  deleteApp: (uid: string) => void;
  createApp: (alias: string) => void;
}

type TApplicationsBoxProps = IApplicationsBoxStateProps & IApplicationsBoxActionsProps;

class ApplicationsBox extends React.Component<TApplicationsBoxProps, {}> {
  public state: IApplicationBoxState = {
    aliasValue: '',
  };

  componentDidMount() {
    this.props.loadData();
  }

  public render(): JSX.Element {
    console.log('render ApplicationsBox');

    const { applications } = this.props;

    console.log('applicatons data: ', applications);

    return (
      <Fragment>
        { this.renderApplications(applications) }
      </Fragment>
    );
  }

  private handleChange = (evt: any) => {
    this.setState({
      aliasValue: evt.target.value,
    });
  }

  private createApp = () => {
    this.props.createApp(this.state.aliasValue);
    this.setState({aliasValue: ''});
  }

  private renderApplications: SFC<any> = (applications) => {
    return (
      <Fragment>
        <form noValidate autoComplete="off">

          <TextField
            id="alias"
            label="Alias"
            value={this.state.aliasValue}
            onChange={this.handleChange}
            margin="normal"
          />

        <Button variant="fab" mini color="secondary" aria-label="Add" onClick={this.createApp}>
          <AddIcon />
        </Button>

        </form>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Alias
                </TableCell>
                <TableCell>
                  Uid
                </TableCell>
                <TableCell>

                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((a : {uid: string; alias: string;}) => {
                return (
                  <TableRow key={a.uid}>
                    <TableCell component="th" scope="row">
                      {a.alias}
                    </TableCell>
                    <TableCell>{a.uid}</TableCell>
                    <TableCell>
                      <IconButton aria-label="Delete" onClick={() => this.props.deleteApp(a.uid)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
              }
            </TableBody>
          </Table>
        </Paper>
      </Fragment>
    );
  };
}

export { TApplicationsBoxProps, ApplicationsBox, IApplicationsBoxStateProps, IApplicationsBoxActionsProps };