import React, { PureComponent } from 'react';
import classNames from 'classnames';
import MuiTable, { TableProps as MuiTableProps } from '@material-ui/core/Table';
import { StyleRulesCallback } from '@material-ui/core/styles/withStyles';

import { IWithStyles, withStyles } from '@core/components/withStyles';
import { ITableProps as ICoreTableProps, Table as CoreTable } from '@core/components/data-grid-core';

type TTableClassKey = 'table';
const styles: StyleRulesCallback<TTableClassKey> = theme => ({
  table: {
    tableLayout: 'fixed'
  }
});

type TTableProps = ICoreTableProps & MuiTableProps & IWithStyles<TTableClassKey>;

@withStyles(styles)
class Table extends PureComponent<TTableProps, any> {
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
