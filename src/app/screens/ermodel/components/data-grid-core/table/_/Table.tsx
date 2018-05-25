import React, { ReactChild, ReactType } from 'react';

interface TableProps {
  children?: ReactChild | ReactChild[];
  renderComponent: ReactType; // TODO | ReactElement<any> | ReactNode;
}

class Table extends React.Component<TableProps, any> {
  public render(): JSX.Element {
    const { renderComponent: Component, children, ...componentProps } = this.props;

    return <Component {...componentProps}>{children}</Component>;
  }
}

export { Table, TableProps };
