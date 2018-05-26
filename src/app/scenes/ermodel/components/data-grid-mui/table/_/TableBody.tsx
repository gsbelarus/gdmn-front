import React from 'react';
import MuiTableBody, { TableBodyProps as MuiTableBodyProps } from '@material-ui/core/TableBody';

import { TableBody as CoreTableBody, TableBodyProps as CoreTableBodyProps } from '../../../data-grid-core';

type TableBodyProps = CoreTableBodyProps & MuiTableBodyProps;

class TableBody extends React.Component<TableBodyProps, any> {

  public render(): JSX.Element {
    const { children, ...muiTableBodyProps } = this.props;

    return (
      <CoreTableBody renderComponent={MuiTableBody} {...muiTableBodyProps}>
        {children}
      </CoreTableBody>
    );
  }
}

export { TableBody, TableBodyProps };
