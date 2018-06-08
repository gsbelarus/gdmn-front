import React from 'react';
import classNames from 'classnames';
import withStyles, { StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import { WithStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

import {
  ITableLayoutProps as ICoreTableLayoutProps,
  TableLayout as CoreTableLayout
} from '@src/app/scenes/ermodel/components/data-grid-core';
import {
  TableCell,
  TableBody,
  TableFoot,
  TableHead,
  TableRow,
  Table
} from '@src/app/scenes/ermodel/components/data-grid-mui';

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

class _TableLayout extends React.Component<ITableLayoutProps & WithStyles<TTableLayoutClassKey>, any> {
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

    return (
      <CoreTableLayout
        className={classNames({
          [classes.stickyHeadCell]: headSticky,
          [classes.stickyFootCell]: footSticky
        })}
        {...coreTableLayoutProps}
      />
    );
  }
}

// TODO minWidth
// TODO headCellStyle (headSticky)

const TableLayout = withStyles(styles, { name: 'TableLayout' })<ITableLayoutProps>(_TableLayout);

export { TableLayout, ITableLayoutProps };

// NoDataCell = TableNoDataCell;
// NoDataRow = TableRow;
