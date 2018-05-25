import React, { ReactChild, ReactType } from 'react';

interface TableHeadProps {
  children?: ReactChild | ReactChild[];
  renderComponent: ReactType;
}

class TableHead extends React.Component<TableHeadProps, any> {
  public render(): JSX.Element {
    const { renderComponent: Component, children, ...componentProps } = this.props;

    return <Component {...componentProps}>{children}</Component>;
  }
}

export { TableHead, TableHeadProps };
