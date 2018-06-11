import React from 'react';
import { defaultProps } from 'recompose';

import { withCellSelection, withRowSelection } from '@src/app/scenes/ermodel/components/data-grid-core';
import { TTableRowProps, ITableCellProps, TableCell, TableRow, TableSelectorCell } from '@src/app/scenes/ermodel/components/data-grid-mui';
import { IWithRowSelectionProps } from '@src/app/scenes/ermodel/components/data-grid-core/table/withRowSelection';

// TODO props types
// TODO state

const withLayoutSelection = (LayoutComponent: any) =>
  defaultProps({
    renderBodyCell: withCellSelection<ITableCellProps>(TableCell),
    renderRow: defaultProps({ renderSelectorCell: TableSelectorCell })(withRowSelection(TableRow))
  })(LayoutComponent);

export { withLayoutSelection };
