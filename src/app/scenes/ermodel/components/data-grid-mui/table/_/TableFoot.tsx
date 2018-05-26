import React from 'react';
import MuiTableFoot, { TableFooterProps as MuiTableFootProps } from '@material-ui/core/TableFooter';

import { TableFoot as CoreTableFoot, TableFootProps as CoreTableFootProps } from '../../../data-grid-core';

type TableFootProps = CoreTableFootProps & MuiTableFootProps;

class TableFoot extends React.Component<TableFootProps, any> {

  public render(): JSX.Element {
    const { children, ...muiTableFootProps } = this.props;

    return (
      <CoreTableFoot renderComponent={MuiTableFoot} {...muiTableFootProps}>
        {children}
      </CoreTableFoot>
    );
  }
}

export { TableFoot, TableFootProps };
