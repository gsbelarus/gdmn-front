import React, { Component } from 'react';

import {
  InfiniteTableLayout as CoreInfiniteTableLayout,
  IInfiniteTableLayoutProps as ICoreInfiniteTableLayoutProps
} from '@src/app/scenes/ermodel/components/data-grid-core';
import { Table, ITableLayoutProps, TableLayout } from '@src/app/scenes/ermodel/components/data-grid-mui';

type TInfiniteTableLayoutProps = ICoreInfiniteTableLayoutProps;

class InfiniteTableLayout extends Component<TInfiniteTableLayoutProps, any> {
  public static defaultProps = {
    ...TableLayout.defaultProps,
    // CoreInfiniteTableLayout:
    rowHeightPx: 48,
    tableHeightPx: 530,
    renderBodyTable: Table,
    renderHeadTable: Table // todo stiky
  };

  public render(): JSX.Element {
    const { ...coreInfiniteTableLayoutProps } = this.props;

    return <CoreInfiniteTableLayout {...coreInfiniteTableLayoutProps} />;
  }
}

export { InfiniteTableLayout, TInfiniteTableLayoutProps };

// StubRow = TableStubRow;
// StubCell = TableStubCell;
// StubHeaderCell = TableStubCell;
