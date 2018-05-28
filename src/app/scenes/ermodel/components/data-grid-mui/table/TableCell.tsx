import React from 'react';
import classNames from 'classnames';
import MuiTableCell, { TableCellProps as MuiTableCellProps } from '@material-ui/core/TableCell';
import withStyles, { StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { WithStyles } from '@material-ui/core/styles';

import { TableCell as CoreTableCell, TableCellProps as CoreTableCellProps, TableColumn } from '../../data-grid-core';
import TextSkeleton from '../../TextSkeleton';

type TableCellClassKey = 'cell' | 'cellRightAlign' | 'cellCenterAlign' | 'cellNoWrap';
const styles: StyleRulesCallback<TableCellClassKey> = (theme: Theme) => ({
  cell: {
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    '&:first-child': {
      paddingLeft: theme.spacing.unit * 3
    },
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  cellRightAlign: {
    textAlign: 'right'
  },
  cellCenterAlign: {
    textAlign: 'center'
  },
  cellNoWrap: {
    whiteSpace: 'nowrap'
  }
});

type BaseTableCellProps = CoreTableCellProps & MuiTableCellProps & WithStyles<TableCellClassKey>;
interface TableCellProps extends BaseTableCellProps {
  column: TableColumn;
}

class _TableCell extends React.Component<TableCellProps, any> {
  public static defaultProps = {
    renderContentSkeleton: TextSkeleton // TODO from column
  };

  public render(): JSX.Element {
    const {
      loading,
      renderContentSkeleton,
      renderContent,
      classes,
      column,
      className,
      ...muiTableCellProps
    } = this.props;

    return (
      <CoreTableCell
        loading={loading}
        renderComponent={MuiTableCell}
        renderContent={renderContent}
        renderContentSkeleton={renderContentSkeleton}
        className={classNames(
          {
            [classes.cell]: true,
            [classes.cellRightAlign]: column && column.align === 'right',
            [classes.cellCenterAlign]: column && column.align === 'center',
            [classes.cellNoWrap]: true
          },
          className
        )}
        {...muiTableCellProps}
      />
    );
  }
}

const TableCell = withStyles(styles, { name: 'TableCell' })(_TableCell);

export { TableCell, TableCellProps };
