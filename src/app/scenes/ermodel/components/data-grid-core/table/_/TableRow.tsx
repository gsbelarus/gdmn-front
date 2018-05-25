import React, { ReactChild, ReactType } from 'react';

interface TableRowProps {
  children?: ReactChild | ReactChild[];
  renderComponent: ReactType;
}

class TableRow extends React.Component<TableRowProps, any> {
  public render(): JSX.Element {
    const { renderComponent: Component, children, ...componentProps } = this.props;

    return <Component {...componentProps}>{children}</Component>;
  }
}

export { TableRow, TableRowProps };
