import React from 'react';
import classNames from 'classnames';
import MuiTable, { TableProps as MuiTableProps } from '@material-ui/core/Table';
import withStyles, { StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import { WithStyles } from '@material-ui/core/styles';

import { ITableProps as ICoreTableProps, Table as CoreTable } from '@src/app/scenes/ermodel/components/data-grid-core';

type TTableClassKey = 'table';
const styles: StyleRulesCallback<TTableClassKey> = theme => ({
  table: {
    tableLayout: 'fixed'
  }
});

type TTableProps = ICoreTableProps & MuiTableProps & WithStyles<TTableClassKey>;

class _Table extends React.Component<TTableProps, any> {
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

export { Table, TTableProps };
