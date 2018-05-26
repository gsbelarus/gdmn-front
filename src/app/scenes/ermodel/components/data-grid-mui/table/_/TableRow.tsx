import React from 'react';
import MuiTableRow, { TableRowProps as MuiTableRowProps } from '@material-ui/core/TableRow';

import { TableRow as CoreTableRow, TableRowProps as CoreTableRowProps } from '../../../data-grid-core';

type TableRowProps = CoreTableRowProps & MuiTableRowProps;

class TableRow extends React.Component<TableRowProps, any> {

  public render(): JSX.Element {
    const { children, ...muiTableRowProps } = this.props; //  props.row

    return (
      <CoreTableRow renderComponent={MuiTableRow} {...muiTableRowProps}>
        {children}
      </CoreTableRow>
    );
  }
}

export { TableRow, TableRowProps };
