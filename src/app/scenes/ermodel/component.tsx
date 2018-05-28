import React from 'react';
import Button from '@material-ui/core/Button';
import { ERModel } from 'gdmn-orm';
import Paper from '@material-ui/core/Paper/Paper';

import { Table, TableBody, TableCell, TableLayout, TableRow } from './components/data-grid-mui';
import { TableColumn, TableRowData } from './components/data-grid-core';

export interface ERModelBoxProps {
  readonly erModel: ERModel;
  readonly err: string;
  readonly onLoad: () => any;

  readonly columns?: TableColumn[];
  readonly headRows?: TableRowData[];
  readonly bodyRows?: TableRowData[];
  readonly footRows?: TableRowData[];
}

export class ERModelBox extends React.Component<ERModelBoxProps, {}> {
  // public static defaultProps = {
  //   columns: [],
  //   headRows: [],
  //   bodyRows: [],
  //   footRows: []
  // };

  private static renderBodyCellContent: React.SFC<any> = ({ column, rowData }) => {
    // TODO types
    return <React.Fragment>{rowData[column.id]}</React.Fragment>;
  };

  private static renderHeadCellContent: React.SFC<any> = ({ column, rowData }) => {
    // TODO types
    return <React.Fragment>{rowData[column.id].title}</React.Fragment>;
  };

  public render() {
    const { erModel, err, onLoad } = this.props;

    const { columns, headRows, footRows, bodyRows } = this.props;
    const { renderHeadCellContent: HeadCellContent, renderBodyCellContent: BodyCellContent } = ERModelBox;

    return (
      <div>
        <div>{err}</div>
        <div>{`загружено сущностей: ${Object.entries(erModel.entities).length}`}</div>
        <Button style={{ margin: 60 }} onClick={onLoad}>Загрузить</Button>
        {/* TODO <DataGrid />  */}
        <TableLayout
          renderContainer={Paper}
          columns={columns}
          bodyRows={bodyRows}
          renderBody={TableBody}
          renderBodyCell={({ column, rowData, ...props }) => (
            <TableCell
              renderContent={contentProps => <BodyCellContent column={column} rowData={rowData} {...contentProps} />}
              column={column}
              {...props}
            />
          )}
          renderRow={TableRow}
          renderTable={Table}
          renderColGroup="colgroup"
          renderColGroupCol="col"
        />
      </div>
    );
  }
}

// TODO

// headRows={headRows}
// footRows={footRows}
// renderHead={TableHead}
// renderHeadCell={({ column, rowData, ...props }) => (
//   <TableCell
//     renderContent={contentProps => <HeadCellContent column={column} rowData={rowData} {...contentProps} />}
//     column={column}
//     {...props}
//   />
// )}
// renderFoot={TableFoot}
// renderFootCell={({ column, rowData, ...props }) => (
//   <TableCell
//     renderContent={contentProps => <HeadCellContent column={column} rowData={rowData} {...contentProps} />}
//     column={column}
//     {...props}
//   />
// )}
//
