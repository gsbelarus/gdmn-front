import React, { Component } from 'react';
import classNames from 'classnames';
import MuiTable, { TableProps as MuiTableProps } from '@material-ui/core/Table';
import { StyleRulesCallback } from '@material-ui/core/styles/withStyles';

import { ITableProps as ICoreTableProps, Table as CoreTable } from '@src/app/scenes/ermodel/components/data-grid-core';
import { IWithStyles, withStyles } from '@src/app/components/withStyles';

type TTableClassKey = 'table';
const styles: StyleRulesCallback<TTableClassKey> = theme => ({
  table: {
    tableLayout: 'fixed'
  }
});

type TTableProps = ICoreTableProps & MuiTableProps & IWithStyles<TTableClassKey>;

@withStyles(styles)
class Table extends Component<TTableProps, any> {
  public render(): JSX.Element {
    const { children, classes, className, ...muiTableProps } = this.props; // FIXME classname

    return (
      <CoreTable renderComponent={MuiTable} className={classNames(classes!.table, className)} {...muiTableProps}>
        {children}
      </CoreTable>
    );
  }
}

export { Table, TTableProps };
