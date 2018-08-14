import React, { Component, Key, PureComponent, SFC } from 'react';
import { TableRow, TableBody as MuiTableBody, TableCell, Checkbox } from '@material-ui/core';

interface ITableBodyColumn {
  id: Key;
  textual?: boolean;
  numeric?: boolean;
  compact?: boolean;
  renderBodyCellContent: SFC<{ rowIndex: number; selected?: boolean }>; // todo
}

interface ITableBodyProps {
  columns: ITableBodyColumn[];
  rowsCount: number;
  selectable?: boolean;
  multiSelectable?: boolean;
  isSelectedRow?: (rowIndex: number) => boolean;
  onToggleRowSelect?: (rowIndex: number, selected: boolean) => void;
  onRowClick?: (rowIndex: number) => void;
  onRowKeyDown?: () => void;
}

class TableBody extends PureComponent<ITableBodyProps> {
  // todo
  public static defaultProps: Partial<ITableBodyProps> = {
    selectable: false,
    multiSelectable: false,
    onRowClick: () => ({}),
    onRowKeyDown: () => ({})
  };

  constructor(props: ITableBodyProps) {
    super(props);

    this.handleRowClick = this.handleRowClick.bind(this);
  }

  private handleRowClick(event: any, rowIndex: number, selected: boolean) {
    if (this.props.onToggleRowSelect && (this.props.selectable || this.props.multiSelectable)) {
      this.props.onToggleRowSelect(rowIndex, !selected);
    }

    if (!!this.props.onRowClick) this.props.onRowClick(rowIndex);
  }

  public static renderRow({ children, selected, rowIndex, onRowKeyDown, handleRowClick }: any) {
    function onRowClick(event: any) {
      handleRowClick(event, rowIndex, selected);
    }

    function handleRowKeyDown(event: any) {
      onRowKeyDown(event, rowIndex);
    }

    return (
      <TableRow
        hover={true}
        className="pointer"
        role="checkbox"
        selected={selected}
        aria-checked={selected}
        onClick={onRowClick}
        onKeyDown={handleRowKeyDown}
        tabIndex={-1}
      >
        {children}
      </TableRow>
    );
  }

  public render() {
    const { columns, rowsCount, selectable, multiSelectable, isSelectedRow, onRowKeyDown } = this.props;

    const Row = TableBody.renderRow;

    return (
      <MuiTableBody style={rowsCount <= 0 ? { display: 'inline-block', paddingBottom: 60 } : {}}>
        {Array.from({ length: rowsCount }).map((_, rowIndex) => {
          const selected = !!isSelectedRow ? isSelectedRow(rowIndex) : false;
          return (
            <Row
              selected={selected}
              rowIndex={rowIndex}
              onRowKeyDown={onRowKeyDown}
              handleRowClick={this.handleRowClick}
              key={rowIndex}
            >
              {selectable &&
                multiSelectable && (
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" checked={selected} />
                  </TableCell>
                )}
              {columns.map((column, colIndex) => (
                <TableCell
                  key={colIndex + 1}
                  {...(column.textual || column.numeric
                    ? {
                        padding:
                          colIndex === 0 && selectable && multiSelectable
                            ? 'none'
                            : column.compact
                              ? 'dense'
                              : 'default',
                        numeric: column.numeric
                      }
                    : {})}
                >
                  {column.renderBodyCellContent({
                    rowIndex,
                    selected
                  })}
                </TableCell>
              ))}
            </Row>
          );
        })}
      </MuiTableBody>
    );
  }
}

export { TableBody, ITableBodyProps, ITableBodyColumn };
