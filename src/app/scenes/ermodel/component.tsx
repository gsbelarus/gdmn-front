import React from 'react';
import Button from '@material-ui/core/Button';
import { ERModel } from 'gdmn-orm';
import Paper from '@material-ui/core/Paper/Paper';

import { Table, TableBody, TableCell, TableHead, TableLayout, TableRow } from './components/data-grid-mui';
import { TableColumn, TableRowData } from './components/data-grid-core';
// import CSSModules from 'react-css-modules';

// const commonStyle = require('../../../styles/common.css'); // todo fix extract modules style dir

export interface ERModelBoxProps {
  erModel: ERModel;
  err?: string | null;
  // entities table
  columns: TableColumn[];
  headRows: TableRowData[];
  bodyRows: TableRowData[];
  footRows: TableRowData[];
  // entity data table
  dataTableColumns?: TableColumn[];
  dataTableHeadRows?: TableRowData[];
  dataTableBodyRows?: TableRowData[];
  dataTableFootRows?: TableRowData[];
  // actions
  loadErModel: () => any;
  loadEntityData: () => any;
}

// @CSSModules(commonStyle)
export class ERModelBox extends React.Component<ERModelBoxProps, {}> {
  private static renderBodyCellContent: React.SFC<any> = ({ column, rowData }) => {
    // TODO types
    return <React.Fragment>{rowData[column.id]}</React.Fragment>;
  };

  private static renderHeadCellContent: React.SFC<any> = ({ column, rowData }) => {
    // TODO types
    return <React.Fragment>{rowData[column.id].title}</React.Fragment>;
  };

  public render(): JSX.Element {
    const { erModel, err, loadErModel, loadEntityData } = this.props;

    const { columns, headRows, bodyRows } = this.props;
    const { renderHeadCellContent: HeadCellContent, renderBodyCellContent: BodyCellContent } = ERModelBox;

    return (
      <div>
        <div>{err}</div>
        <div>{`загружено сущностей: ${Object.entries(erModel.entities).length}`}</div>
        <Button style={{ margin: 60 }} onClick={loadErModel}>
          Load ER-Model
        </Button>
        <Button style={{ margin: 60 }} onClick={loadEntityData}>
          Load Entity Data
        </Button>
        {/* TODO <DataGrid />  */}

        <div className="row-flex">
          <TableLayout
            headRows={headRows}
            columns={columns}
            bodyRows={bodyRows}
            renderContainer={({ style, ...props }) => <Paper style={{ flex: 1, ...style }} {...props} />}
            renderHead={TableHead}
            renderHeadCell={({ column, rowData, ...props }) => (
              <TableCell
                renderContent={contentProps => <HeadCellContent column={column} rowData={rowData} {...contentProps} />}
                column={column}
                {...props}
              />
            )}
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

          <TableLayout
            headRows={headRows}
            columns={columns}
            bodyRows={bodyRows}
            renderContainer={({ style, ...props }) => (
              <Paper style={{ marginLeft: 16, flex: 2, ...style }} {...props} />
            )}
            renderHead={TableHead}
            renderHeadCell={({ column, rowData, ...props }) => (
              <TableCell
                renderContent={contentProps => <HeadCellContent column={column} rowData={rowData} {...contentProps} />}
                column={column}
                {...props}
              />
            )}
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
      </div>
    );
  }
}

// TODO

// footRows={footRows}
// renderFoot={TableFoot}
// renderFootCell={({ column, rowData, ...props }) => (
//   <TableCell
//     renderContent={contentProps => <HeadCellContent column={column} rowData={rowData} {...contentProps} />}
//     column={column}
//     {...props}
//   />
// )}
//
