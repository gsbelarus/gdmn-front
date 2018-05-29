import React from 'react';
import Button from '@material-ui/core/Button';
import { ERModel } from 'gdmn-orm';
import Paper from '@material-ui/core/Paper/Paper';

import { Table, TableBody, TableCell, TableHead, TableLayout, TableRow } from './components/data-grid-mui';
import { ITableColumn, ITableRowData } from './components/data-grid-core';
// import CSSModules from 'react-css-modules';

// const commonStyle = require('../../../styles/common.css'); // todo fix extract modules style dir

export interface IERModelBoxProps {
  erModel: ERModel;
  err?: string | null;
  // entities table
  columns: ITableColumn[];
  headRows: ITableRowData[];
  bodyRows: ITableRowData[];
  footRows: ITableRowData[];
  // entity data table
  dataTableColumns?: ITableColumn[];
  dataTableHeadRows?: ITableRowData[];
  dataTableBodyRows?: ITableRowData[];
  dataTableFootRows?: ITableRowData[];
  // actions
  loadErModel: () => any;
  loadEntityData: () => any;
}

// @CSSModules(commonStyle)
export class ERModelBox extends React.Component<IERModelBoxProps, {}> {
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
        <div>{err && `ERROR: ${err}`}</div>
        <div>{`загружено сущностей: ${Object.entries(erModel.entities).length}`}</div>
        <Button style={{ margin: 60 }} onClick={loadErModel}>
          Load ER-Model
        </Button>
        <Button style={{ margin: 60 }} onClick={loadEntityData}>
          Load Entity-Data
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
