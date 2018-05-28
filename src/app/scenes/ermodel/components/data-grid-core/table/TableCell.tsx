import React, { ReactChild, ReactType } from 'react';

interface TableCellProps {
  children?: ReactChild | ReactChild[];
  loading?: boolean; // content = fixed-height skeleton
  renderComponent: ReactType; // 'td' // TODO func({key, rowData, column})
  renderContent: ReactType;
  renderContentSkeleton?: ReactType;
  [t: string]: any;
  // ...componentProps:
  // tabIndex: number, // browser-focusable
  // onDoubleClick: ()=>void
}

class TableCell extends React.Component<TableCellProps, any> {
  public static defaultProps = {
    loading: false
  };

  public render(): JSX.Element {
    const {
      renderComponent: Component,
      renderContent: Content,
      renderContentSkeleton: Skeleton,
      loading,
      ...componentProps
    } = this.props;

    return <Component {...componentProps}>{loading && Skeleton ? <Skeleton /> : <Content />}</Component>;
  }
}

export { TableCell, TableCellProps };
