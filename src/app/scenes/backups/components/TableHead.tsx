import React, { Component, Key, SFC } from 'react';
import { SortDirection } from '@material-ui/core/TableCell';
import { TableSortLabel, TableHead as MuiTableHead, TableRow, TableCell, Checkbox, Tooltip } from '@material-ui/core';

interface ITableHeadColumn {
  id: Key;
  numeric?: boolean;
  renderHeadCellContent: SFC<{ sortActive?: boolean; sortDirection?: SortDirection }>; // todo
}

interface ITableColumnSort {
  direction: SortDirection;
  columnId: string;
}

interface ITableHeadProps {
  columns: ITableHeadColumn[];
  currentSort?: ITableColumnSort;
  onChangeSort?: () => void;
  bodyRowsCount?: number;
  bodyRowsSelectedCount?: number;
  displaySelectAll?: boolean;
  onSelectAllClick?: () => void;
}

class TableHead extends Component<ITableHeadProps> {
  public static defaultProps: Partial<ITableHeadProps> = {
    columns: [],
    currentSort: {
      direction: 'desc',
      columnId: ''
    },
    bodyRowsCount: 0,
    bodyRowsSelectedCount: 0,
    displaySelectAll: false,
    onSelectAllClick: () => ({})
  };

  private static renderTableSortLabel({ children, active, direction, columnId, onChangeSort }: any) {
    function onSortLabelClick(event: any) {
      return onChangeSort(columnId);
    }
    return (
      <TableSortLabel active={active} direction={direction} onClick={onSortLabelClick}>
        {children}
      </TableSortLabel>
    );
  }

  public render() {
    const {
      columns,
      currentSort,
      bodyRowsCount,
      bodyRowsSelectedCount,
      displaySelectAll,
      onSelectAllClick,
      onChangeSort
    } = this.props;

    const TableHeadSortLabel = TableHead.renderTableSortLabel;

    return (
      <MuiTableHead>
        <TableRow>
          {displaySelectAll && (
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                indeterminate={bodyRowsSelectedCount! > 0 && bodyRowsSelectedCount! < bodyRowsCount!}
                checked={bodyRowsSelectedCount === bodyRowsCount}
                onChange={onSelectAllClick}
              />
            </TableCell>
          )}

          {columns.map((column, index) => {
            const sortActive = currentSort!.columnId === column.id;

            function getCellContent() {
              return column.renderHeadCellContent({
                sortActive,
                sortDirection: currentSort!.direction
              });
            }

            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={index === 0 && displaySelectAll ? 'none' : 'default'}
              >
                {!!onChangeSort ? (
                  <Tooltip title="Sort" placement="bottom-end" enterDelay={300}>
                    <TableHeadSortLabel
                      active={sortActive}
                      direction={currentSort!.direction}
                      columnId={column.id}
                      onChangeSort={onChangeSort}
                    >
                      {getCellContent()}
                    </TableHeadSortLabel>
                  </Tooltip>
                ) : (
                  getCellContent()
                )}
              </TableCell>
            );
          })}
        </TableRow>
      </MuiTableHead>
    );
  }
}

export { TableHead, ITableHeadProps, ITableHeadColumn, ITableColumnSort };
