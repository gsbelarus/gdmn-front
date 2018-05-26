import React from 'react';
import MuiTableHead, { TableHeadProps as MuiTableHeadProps } from '@material-ui/core/TableHead';

import { TableHead as CoreTableHead, TableHeadProps as CoreTableHeadProps } from '../../../data-grid-core';

type TableHeadProps = CoreTableHeadProps & MuiTableHeadProps;

class TableHead extends React.Component<TableHeadProps, any> {

  public render(): JSX.Element {
    const { children, ...muiTableHeadProps } = this.props;

    return (
      <CoreTableHead renderComponent={MuiTableHead} {...muiTableHeadProps}>
        {children}
      </CoreTableHead>
    );
  }
}

export { TableHead, TableHeadProps };
