import React, { ReactChild, ReactType } from 'react';

interface TableFootProps {
  children?: ReactChild | ReactChild[];
  renderComponent: ReactType;
}

class TableFoot extends React.Component<TableFootProps, any> {
  public render(): JSX.Element {
    const { renderComponent: Component, children, ...componentProps } = this.props;

    return <Component {...componentProps}>{children}</Component>;
  }
}

export { TableFoot, TableFootProps };
