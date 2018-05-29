import React from 'react';
import MuiTableHead, { TableHeadProps as MuiTableHeadProps } from '@material-ui/core/TableHead';

import {
  TableHead as CoreTableHead,
  ITableHeadProps as ICoreTableHeadProps
} from '@src/app/scenes/ermodel/components/data-grid-core';

type TTableHeadProps = ICoreTableHeadProps & MuiTableHeadProps;

class TableHead extends React.Component<TTableHeadProps, any> {
  public render(): JSX.Element {
    const { children, ...muiTableHeadProps } = this.props;

    return (
      <CoreTableHead renderComponent={MuiTableHead} {...muiTableHeadProps}>
        {children}
      </CoreTableHead>
    );
  }
}

export { TableHead, TTableHeadProps };
