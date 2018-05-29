import React, { ReactChild, ReactType } from 'react';

interface ITableProps {
  children?: ReactChild | ReactChild[];
  renderComponent: ReactType; // TODO | ReactElement<any> | ReactNode;
  [t: string]: any;
}

class Table extends React.Component<ITableProps, any> {
  public render(): JSX.Element {
    const { renderComponent: Component, children, ...componentProps } = this.props;

    return <Component {...componentProps}>{children}</Component>;
  }
}

export { Table, ITableProps };
