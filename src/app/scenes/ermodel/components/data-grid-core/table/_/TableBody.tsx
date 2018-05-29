import React, { ReactChild, ReactType } from 'react';

interface ITableBodyProps {
  children?: ReactChild | ReactChild[];
  renderComponent: ReactType;
}

class TableBody extends React.Component<ITableBodyProps, any> {
  public render(): JSX.Element {
    const { renderComponent: Component, children, ...componentProps } = this.props;

    return <Component {...componentProps}>{children}</Component>;
  }
}

export { TableBody, ITableBodyProps };
