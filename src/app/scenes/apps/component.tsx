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
  Grid, Card, CardActions, Icon, CardContent, Typography, Avatar, CardHeader
} from '@material-ui/core';

interface IAppsViewState {
  aliasValue: string;
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
    aliasValue: ''
  };

  constructor(props: TAppsViewProps) {
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
    const { apps } = this.props;

    return (
      <div style={{flexGrow: 1, textAlign: 'initial'}}>
        <Grid container={true} spacing={24}>
          {apps && apps.map(app => (
            <Grid item={true} xs={12} sm={6}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Application">
                      <Icon>storage</Icon>
                    </Avatar>
                  }
                  action={
                    <Fragment>
                      <IconButton>
                        <Icon>play_circle_filled</Icon>
                      </IconButton>
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
      </div>

      //   <form noValidate={true} autoComplete="off">
      //     <TextField
      //       id="alias"
      //       label="Alias"
      //       value={this.state.aliasValue}
      //       onChange={this.handleChange}
      //       margin="normal"
      //     />
      //     <Button variant="fab" mini={true} color="secondary" aria-label="Add" onClick={this.createApp}>
      //       <AddIcon />
      //     </Button>
      //   </form>
      //   <Paper>
      //     <Table>
      //       <TableHead>
      //         <TableRow>
      //           <TableCell>Alias</TableCell>
      //           <TableCell>Uid</TableCell>
      //           <TableCell />
      //         </TableRow>
      //       </TableHead>
      //       <TableBody>
      //         {apps &&
      //           apps.map(demos => (
      //             <TableRow key={demos.uid}>
      //               <TableCell component="th" scope="row">
      //                 {demos.alias}
      //               </TableCell>
      //               <TableCell>{demos.uid}</TableCell>
      //               <TableCell>
      //                 <IconButton aria-label="Delete" onClick={() => this.props.deleteApp(demos.uid)}>
      //                   <DeleteIcon />
      //                 </IconButton>
      //               </TableCell>
      //             </TableRow>
      //           ))}
      //       </TableBody>
      //     </Table>
      //   </Paper>
      // </Grid>
    );
  }
}

export { AppsView, TAppsViewProps, IAppsViewStateProps, IAppsViewActionsProps };
