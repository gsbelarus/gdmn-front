import React, { Component } from 'react';
import MuiTableBody, { TableBodyProps as MuiTableBodyProps } from '@material-ui/core/TableBody';

import {
  ITableBodyProps as ICoreTableBodyProps,
  TableBody as CoreTableBody
} from '@src/app/scenes/ermodel/components/data-grid-core';

type TTableBodyProps = ICoreTableBodyProps & MuiTableBodyProps;

class TableBody extends Component<TTableBodyProps, any> {
  public render(): JSX.Element {
    const { children, ...muiTableBodyProps } = this.props;

    return (
      <CoreTableBody renderComponent={MuiTableBody} {...muiTableBodyProps}>
        {children}
      </CoreTableBody>
    );
  }
}

export { TableBody, TTableBodyProps };
