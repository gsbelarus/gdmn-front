import React, { ReactChild, ReactType } from 'react';

interface ITableFootProps {
  children?: ReactChild | ReactChild[];
  renderComponent: ReactType;
}

class TableFoot extends React.Component<ITableFootProps, any> {
  public render(): JSX.Element {
    const { renderComponent: Component, children, ...componentProps } = this.props;

    return <Component {...componentProps}>{children}</Component>;
  }
}

export { TableFoot, ITableFootProps };
