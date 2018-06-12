import React, { ComponentType } from 'react';
import { compose, defaultProps, setDisplayName, setStatic, withProps, wrapDisplayName } from 'recompose';

import { ITableLayoutProps, withSelectorSelection } from '@src/app/scenes/ermodel/components/data-grid-core';
import { TTableRowProps, TableRow, TableSelectorCell } from '@src/app/scenes/ermodel/components/data-grid-mui';

// TODO props types
// TODO state

// todo on onClick select, onDrag select
// todo selectionMode: ['row', 'miltipleCells', 'singleCell']
// todo selectableByRowClick

// FIXME

function withLayoutSelection<P extends ITableLayoutProps>(LayoutComponent: ComponentType<P>) {
  const enhanced = compose<P, P>(
    setDisplayName(wrapDisplayName(LayoutComponent, 'withLayoutSelection')),
    setStatic('WrappedComponent', LayoutComponent),
    defaultProps({ // TODO -> static
      // renderBodyCell: withSelection<ITableCellProps>(TableCell),
      renderRow: compose(
        withProps( {renderSelectorCell: TableSelectorCell, role: 'checkbox', hover: true, tabIndex: -1} )
      )(withSelectorSelection<TTableRowProps>(TableRow))
    })
  )(LayoutComponent);

  return enhanced;// hoistStatics(enhanced as any)(LayoutComponent);
}


export { withLayoutSelection };
