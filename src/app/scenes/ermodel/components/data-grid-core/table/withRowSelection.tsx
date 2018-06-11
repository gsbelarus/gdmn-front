import React, { Component, ComponentType, ReactType } from 'react';

import { getHOCDisplayName } from '@src/app/utils';
import { ITableRowProps } from '@src/app/scenes/ermodel/components/data-grid-core';

interface IWithRowSelectionProps {
  selected: boolean;
  selectable?: boolean;
  // todo selectableByClick
  onSelectionToggle: () => void;
  renderSelectorCell: any; // FIXME

  // todo on onClick select, onDrag select
  // todo selectionMode: ['row', 'miltipleCells', 'singleCell']
}

function withRowSelection<TProps extends ITableRowProps = ITableRowProps>(WrappedRowComponent: ComponentType<TProps>) {
  return class extends Component<TProps & IWithRowSelectionProps, any> {
    public static readonly displayName = getHOCDisplayName('withRowSelection', WrappedRowComponent);
    public static readonly WrappedComponent = WrappedRowComponent;

    public static defaultProps = {
      selectable: true
    };

    public render(): JSX.Element {
      const { selected, selectable, onSelectionToggle, renderSelectorCell: SelectorCell, ...rowProps } = this
        .props as IWithRowSelectionProps;

      const { children } = rowProps as TProps;
      (rowProps as any).children = undefined;

      return (
        <WrappedRowComponent {...rowProps as TProps} onClick={selectable && onSelectionToggle} selected={selected}>
          {SelectorCell && (
            <SelectorCell
              selectorDisabled={!selectable}
              selectorChecked={selected}
              onSelectorToggle={onSelectionToggle}
            />
          )}
          {children}
        </WrappedRowComponent>
      );
    }
  };

  // type Props = Omit<TProps, keyof ITableRowProps>;
  // return hoistStatics<Props, TProps>(WithRowSelection, WrappedRowComponent);
}

export { withRowSelection, IWithRowSelectionProps };
