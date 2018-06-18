import React, { PureComponent } from 'react';

import {
  IInfiniteTableLayoutProps2 as ICoreInfiniteTableLayoutProps,
  InfiniteTableLayout2 as CoreInfiniteTableLayout
} from '@src/app/scenes/ermodel/components/data-grid-core';
import { Table, TableLayout } from '@src/app/scenes/ermodel/components/data-grid-mui';

type TInfiniteTableLayoutProps = ICoreInfiniteTableLayoutProps;

class InfiniteTableLayout extends PureComponent<TInfiniteTableLayoutProps, any> {
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
