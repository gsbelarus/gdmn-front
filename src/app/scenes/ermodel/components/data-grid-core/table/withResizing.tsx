// TODO TableLayoutResizing

import React from 'react';
import { compose, setDisplayName, wrapDisplayName } from 'recompose';

// utils

const UNSET_COLUMN_WIDTH_ERROR = [
  'The "$1" column\'s width is not specified.',
  'The TableColumnResizing plugin requires that all columns have the specified width.'
].join('\n');

const specifyWidths = (tableColumns: any, widths: any, onAbsence: any) => {
  if (!widths.length) return tableColumns;
  return tableColumns.reduce((acc: any, tableColumn: any) => {
    if (tableColumn.type === 'data') {
      const columnName = tableColumn.column.name;
      const column = widths.find((el: any) => el.columnName === columnName);
      const width = column && column.width;
      if (width === undefined) {
        onAbsence(columnName);
        acc.push(tableColumn);
      } else {
        acc.push({ ...tableColumn, width });
      }
    } else {
      acc.push(tableColumn);
    }
    return acc;
  }, []);
};

const tableColumnsWithWidths = (tableColumns: any, columnWidths: any) =>
  specifyWidths(tableColumns, columnWidths, (columnName: any) => {
    throw new Error(UNSET_COLUMN_WIDTH_ERROR.replace('$1', columnName));
  });

const tableColumnsWithDraftWidths = (tableColumns: any, draftColumnWidths: any) =>
  specifyWidths(tableColumns, draftColumnWidths, () => ({}));

const changeTableColumnWidth = (state: any, { columnName, shift, minColumnWidth }: any) => {
  const { columnWidths } = state;
  const nextColumnWidth = columnWidths.slice();
  const index = nextColumnWidth.findIndex((elem: any) => elem.columnName === columnName);
  const updatedColumn = nextColumnWidth[index];
  const size = Math.max(minColumnWidth, updatedColumn.width + shift);
  nextColumnWidth.splice(index, 1, { columnName, width: size });

  return {
    columnWidths: nextColumnWidth
  };
};

const draftTableColumnWidth = (state: any, { columnName, shift, minColumnWidth }: any) => {
  const { columnWidths } = state;
  const updatedColumn = columnWidths.find((elem: any) => elem.columnName === columnName);
  const size = Math.max(minColumnWidth, updatedColumn.width + shift);

  return {
    draftColumnWidths: [{ columnName: updatedColumn.columnName, width: size }]
  };
};

const cancelTableColumnWidthDraft = () => ({
  draftColumnWidths: []
});

////////

class TableLayoutResizing extends React.PureComponent {
  // TODO TableColumnResizing

  public state = {
    draftColumnWidths: []
  };

  constructor(props: any) {
    super(props);
    //
    // this.state = {
    //   columnWidths: props.columnWidths || props.defaultColumnWidths
    // };

    // this.stateHelper = createStateHelper(this, { columnWidths: () => this.props.onColumnWidthsChange });
  }

  public componentWillReceiveProps(nextProps: any) {
    const { columnWidths } = nextProps;

    this.setState({
      ...(columnWidths !== undefined ? { columnWidths } : null)
    });
  }

  // private onColumnWidthChanged = (index: number, width: number) => {
  //   const columnWidths = Array.from(this.state.columnWidths);
  //   columnWidths[index] = Math.max(width, MINIMUM_COLUMN_WIDTH);
  //   this.setState({
  //     columnWidths,
  //   });
  // };
  //
  // private setDefaultColumnWidths(properties: IPropertyWithName[]) {
  //   const columnWidths = properties.map(property => {
  //     switch (property.type) {
  //       case 'int':
  //         return property.name === '#' ? 50 : 100;
  //       case 'bool':
  //         return 100;
  //       case 'string':
  //         return 300;
  //       case 'date':
  //         return 200;
  //       default:
  //         return 300;
  //     }
  //   });
  //   this.setState({ columnWidths });
  // }
  //
  // public componentWillMount() {
  //   if (this.props.focus) {
  //     const properties = this.props.focus.properties;
  //     this.setDefaultColumnWidths(properties);
  //   }
  // }
  //
  // public componentWillReceiveProps(props: ITableContainerProps) {
  //   if (props.focus && this.props.focus !== props.focus) {
  //     const properties = props.focus.properties;
  //     this.setDefaultColumnWidths(properties);
  //   }
  // }
  //
  // public componentDidUpdate(
  //   prevProps: ITableContainerProps,
  //   prevState: ITableContainerState,
  // ) {
  //
  //   if (this.state.columnWidths !== prevState.columnWidths) {
  //     if (this.gridContent && this.gridHeader) {
  //       this.gridContent.recomputeGridSize();
  //       this.gridHeader.recomputeGridSize();
  //     }
  //   }
  // }

  ///////////////////////////
}

/*

tableColumnResizingEnabled

// columnWidths: [{ columnName: 'a', width: 45 }, { columnName: 'b', width: 60 }],

// import { memoize } from '@devexpress/dx-core';
// import { createStateHelper } from '@devexpress/dx-react-core';

*/

// class TableColumnResizing extends React.PureComponent {
//
//   private tableColumnsComputed = memoize(columnWidths => ({ tableColumns }) => tableColumnsWithWidths(tableColumns, columnWidths));
//
//   private tableColumnsDraftComputed = memoize(draftColumnWidths => ({ tableColumns }) => tableColumnsWithDraftWidths(tableColumns, draftColumnWidths));
//
//   // ({columnName, shift}: { columnName: string, shift: number }): void
//   private changeTableColumnWidth = this.stateHelper.applyReducer.bind(this.stateHelper, (prevState, payload) => changeTableColumnWidth(prevState, { ...payload, minColumnWidth: this.props.minColumnWidth }));
//
//   // ({ columnName: string, shift: number }) => void
//   private draftTableColumnWidth = this.stateHelper.applyReducer.bind(this.stateHelper, (prevState, payload) => draftTableColumnWidth(prevState, { ...payload, minColumnWidth: this.props.minColumnWidth }));
//
//   // () => void
//   private cancelTableColumnWidthDraft = this.stateHelper.applyReducer.bind(this.stateHelper, cancelTableColumnWidthDraft);
//
//   //////
//
//   public render(): JSX.Element {
//     const { columnWidths, draftColumnWidths } = this.state;
//
//     const tableColumnsComputed      = this.tableColumnsComputed(columnWidths);
//     const tableColumnsDraftComputed = this.tableColumnsDraftComputed(draftColumnWidths);
//
//     tableLayout.tableColumns                = tableColumnsComputed; tableColumnsDraftComputed;
//     tableLayout.tableColumnResizingEnabled  = props.tableColumnResizingEnabled
//     tableLayout.changeTableColumnWidth      = this.changeTableColumnWidth
//     tableLayout.draftTableColumnWidth       = this.draftTableColumnWidth
//     tableLayout.cancelTableColumnWidthDraft = this.cancelTableColumnWidthDraft
//   }
//
// }

// TableColumnResizing.propTypes = {
//   defaultColumnWidths: PropTypes.array,
//   columnWidths: PropTypes.array,
//   onColumnWidthsChange: PropTypes.func,
//   minColumnWidth: PropTypes.number.isRequired,
// };
//
// TableColumnResizing.defaultProps = {
//   defaultColumnWidths: [],
//   columnWidths: undefined,
//   onColumnWidthsChange: undefined,
// };
