import React, { ReactChild, ReactType } from 'react';

interface ITableRowProps {
  children?: ReactChild | ReactChild[];
  renderComponent: ReactType;
  [t: string]: any;
}

class TableRow extends React.Component<ITableRowProps, any> {
  public render(): JSX.Element {
    const { renderComponent: Component, children, ...componentProps } = this.props;

    return <Component {...componentProps}>{children}</Component>;
  }
}

export { TableRow, ITableRowProps };
