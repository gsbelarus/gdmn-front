import React from 'react';
import MuiTableRow, { TableRowProps as MuiTableRowProps } from '@material-ui/core/TableRow';

import {
  TableRow as CoreTableRow,
  ITableRowProps as ICoreTableRowProps
} from '@src/app/scenes/ermodel/components/data-grid-core';

type TTableRowProps = ICoreTableRowProps & MuiTableRowProps;

class TableRow extends React.Component<TTableRowProps, any> {
  public render(): JSX.Element {
    const { children, ...muiTableRowProps } = this.props; //  props.row

    return (
      <CoreTableRow renderComponent={MuiTableRow} {...muiTableRowProps}>
        {children}
      </CoreTableRow>
    );
  }
}

export { TableRow, TTableRowProps };
