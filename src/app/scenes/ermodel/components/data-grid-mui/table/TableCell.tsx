import React, { Component } from 'react';
import classNames from 'classnames';
import MuiTableCell, { TableCellProps as MuiTableCellProps } from '@material-ui/core/TableCell';
import { StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import { WithStyles } from '@material-ui/core/styles';

import { withStyles } from '@src/app/components/withStyles';
import {
  ITableCellProps as ICoreTableCellProps,
  ITableColumn,
  TableCell as CoreTableCell
} from '@src/app/scenes/ermodel/components/data-grid-core';
import { TextSkeleton } from '@src/app/scenes/ermodel/components/TextSkeleton';

type TTableCellClassKey = 'cell' | 'cellRightAlign' | 'cellCenterAlign' | 'cellNoWrap';
const styles: StyleRulesCallback<TTableCellClassKey> = theme => ({
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

type TBaseTableCellProps = ICoreTableCellProps & MuiTableCellProps & WithStyles<TTableCellClassKey>;
interface ITableCellProps extends TBaseTableCellProps {
  column: ITableColumn;
}

@withStyles(styles)
class TableCell extends Component<ITableCellProps, any> {
  public static defaultProps = {
    renderContentSkeleton: TextSkeleton // TODO from column
  };

  public render(): JSX.Element {
    // FIXME  className
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

export { TableCell, ITableCellProps };
