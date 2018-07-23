import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import { Paper } from '@material-ui/core';

import { IWithStyles } from '@core/components/withStyles';
import {
  ITableLayoutProps as ICoreTableLayoutProps,
  TableLayout as CoreTableLayout
} from '@core/components/data-grid-core';
import { Table, TableBody, TableCell, TableFoot, TableHead, TableRow } from '@core/components/data-grid-mui';

type TTableLayoutClassKey = 'stickyHeadCell' | 'stickyFootCell';
const styles: StyleRulesCallback<TTableLayoutClassKey> = theme => ({
  stickyHeadCell: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    overflow: 'visible',
    background: theme.palette.background.paper,
    fallbacks: {
      position: '-webkit-sticky'
    }
  },
  stickyFootCell: {
    position: 'sticky',
    bottom: 0,
    zIndex: 1,
    overflow: 'visible',
    background: theme.palette.background.paper,
    fallbacks: {
      position: '-webkit-sticky'
    }
  }
});

interface ITableLayoutProps extends ICoreTableLayoutProps {
  headSticky?: boolean;
  footSticky?: boolean;
}

// @withStyles(styles)
class TableLayout extends PureComponent<ITableLayoutProps & IWithStyles<TTableLayoutClassKey>, any> {
  public static defaultProps = {
    headSticky: true,
    footSticky: true,
    // CoreTableLayout:
    minColumnWidthPx: 120, // todo
    renderBody: TableBody,
    renderBodyCell: TableCell,
    renderColGroup: 'colgroup',
    renderColGroupCol: 'col',
    renderFoot: TableFoot,
    renderFootCell: TableCell,
    renderHead: TableHead,
    renderHeadCell: TableCell,
    renderRow: TableRow,
    renderScrollContainer: Paper,
    renderTable: Table,
    tableHeight: '60vh' // todo
  };

  public render(): JSX.Element {
    const { headSticky, footSticky, classes, ...coreTableLayoutProps } = this.props;

    // console.log('render TableLayout');

    return (
      <CoreTableLayout
        className={classNames({
          [classes!.stickyHeadCell]: headSticky,
          [classes!.stickyFootCell]: footSticky
        })}
        {...coreTableLayoutProps}
      />
    );
  }
}

// TODO minWidth
// TODO headCellStyle (headSticky)

export { TableLayout, ITableLayoutProps };

// NoDataCell = TableNoDataCell;
// NoDataRow = TableRow;
