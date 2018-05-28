import React from 'react';
import classNames from 'classnames';
import MuiTable, { TableProps as MuiTableProps } from '@material-ui/core/Table';
import withStyles, { StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { WithStyles } from '@material-ui/core/styles';

import { Table as CoreTable, TableProps as CoreTableProps } from '../../data-grid-core';

type TableClassKey = 'table';
const styles: StyleRulesCallback<TableClassKey> = (theme: Theme) => ({
  table: {
    tableLayout: 'fixed'
  }
});

type TableProps = CoreTableProps & MuiTableProps & WithStyles<TableClassKey>;

class _Table extends React.Component<TableProps, any> {
  public render(): JSX.Element {
    const { children, classes, className, ...muiTableProps } = this.props;

    return (
      <CoreTable
        renderComponent={MuiTable}
        className={classNames(
          {
            [classes.table]: true
          },
          className
        )}
        {...muiTableProps}
      >
        {children}
      </CoreTable>
    );
  }
}

const Table = withStyles(styles, { name: 'Table' })(_Table);

export { Table, TableProps };
