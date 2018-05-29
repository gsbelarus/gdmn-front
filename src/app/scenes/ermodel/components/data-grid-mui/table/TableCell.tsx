import React from 'react';
import classNames from 'classnames';
import MuiTableCell, { TableCellProps as MuiTableCellProps } from '@material-ui/core/TableCell';
import withStyles, { StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import { WithStyles } from '@material-ui/core/styles';

import {
  TableCell as CoreTableCell,
  ITableCellProps as ICoreTableCellProps,
  ITableColumn
} from '@src/app/scenes/ermodel/components/data-grid-core';
import TextSkeleton from '@src/app/scenes/ermodel/components/TextSkeleton';

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

class _TableCell extends React.Component<ITableCellProps, any> {
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

export { TableCell, ITableCellProps };
