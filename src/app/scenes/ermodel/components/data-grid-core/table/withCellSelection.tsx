import React, { Component } from 'react';

import { getDisplayName, getHOCDisplayName } from '@src/app/utils';
import { ITableCellProps } from '@src/app/scenes/ermodel/components/data-grid-core';

interface IWithCellSelectionProps {
  selected: boolean;
  selectable?: boolean;
  onSelectionToggle: () => void;
}

function withCellSelection<TProps extends ITableCellProps>(WrappedCellComponent: React.ComponentType<TProps>) {
  return class extends Component<TProps & IWithCellSelectionProps, any> {
    public static readonly displayName = getHOCDisplayName('withCellSelection', WrappedCellComponent);
    public static readonly WrappedComponent = WrappedCellComponent;

    public static defaultProps = {
      selectable: false
    };

    public render(): JSX.Element {
      const { selectable, selected, onSelectionToggle, ...cellProps } = this.props as IWithCellSelectionProps;

      const { children } = cellProps as TProps;
      (cellProps as any).children = undefined;

      return (
        <WrappedCellComponent {...cellProps as TProps} onClick={selectable && onSelectionToggle} selected={selected}>
          {children}
        </WrappedCellComponent>
      );
    }
  };
}

export { withCellSelection, IWithCellSelectionProps };
