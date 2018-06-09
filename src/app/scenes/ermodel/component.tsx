import React, { Fragment, Component, SFC } from 'react';
import Button from '@material-ui/core/Button';
import { ERModel } from 'gdmn-orm';
import CSSModules from 'react-css-modules';

import { ITableColumn, ITableRow } from './components/data-grid-core';

// const commonStyle = require('@src/styles/common.css');
const styles = require('./styles.css');

interface IERModelBoxProps {
  selectedFields?: string[];
  selectedEntityName?: string;
  erModel: ERModel;
  err?: string | null;
  // er model table
  columns: ITableColumn[];
  headRows?: ITableRow[];
  bodyRows?: ITableRow[];
  footRows?: ITableRow[];
  // entity fields table
  fieldsTableColumns?: ITableColumn[];
  fieldsTableHeadRows?: ITableRow[];
  fieldsTableBodyRows?: ITableRow[];
  fieldsTableFootRows?: ITableRow[];
  // entity data table
  dataTableColumns?: ITableColumn[];
  dataTableHeadRows?: ITableRow[];
  dataTableBodyRows?: ITableRow[];
  dataTableFootRows?: ITableRow[];
  // actions
  selectEntity: (name: string) => any;
  selectFields: (fieldNames: string[], entityName: string, erModel: ERModel) => any;
  loadErModel: () => any;
}

// @CSSModules(commonStyle) FIXME webpack modules in styles
@CSSModules(styles)
class ERModelBox extends Component<IERModelBoxProps, {}> {
  private static renderBodyCellContent: SFC<any> = ({ column, rowData }) => {
    // TODO types
    return <Fragment>{rowData[column.id]}</Fragment>;
  };

  private static renderHeadCellContent: SFC<any> = ({ column, rowData }) => {
    // TODO types
    return <Fragment>{rowData[column.id].title}</Fragment>;
  };

  public render(): JSX.Element {
    const { erModel, err, loadErModel, selectEntity, selectFields } = this.props;

    const {
      columns,
      headRows,
      bodyRows,
      dataTableColumns,
      dataTableHeadRows,
      dataTableBodyRows,
      fieldsTableColumns,
      fieldsTableHeadRows,
      fieldsTableBodyRows
    } = this.props;
    const { renderHeadCellContent: HeadCellContent, renderBodyCellContent: BodyCellContent } = ERModelBox;

    return (
      <Fragment>
        <div>{err && `ERROR: ${err}`}</div>
        <div>{`загружено сущностей: ${Object.entries(erModel.entities).length}`}</div>
        <Button style={{ margin: 60 }} onClick={loadErModel}>
          Load ER-Model
        </Button>
        <Button
          style={{ margin: 60 }}
          onClick={() => {
            selectEntity('GD_USER');
            selectFields(['NAME'], 'GD_USER', erModel);
          }}
        >
          Load Entity-Data
        </Button>

        {/* TODO <DataGrid />  */}

        <table styleName="EntitiesTable">
          <thead>
            <tr>
              <th>Entity</th>
              <th>Наименование</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(erModel.entities).map((e, idx) => (
              <tr key={idx}>
                <td>{e[1].name}</td>
                <td>{e[1].lName.ru!.name}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/*<div className="row-flex">*/}
        {/*<TableLayout*/}
        {/*tableHeightPx={200}*/}
        {/*headRows={headRows}*/}
        {/*columns={columns}*/}
        {/*bodyRows={bodyRows}*/}
        {/*renderScrollContainer={({ style, ...props }) => <Paper style={{ flex: 1, ...style }} {...props} />}*/}
        {/*renderHeadCell={({ column, rowData, ...props }) => (*/}
        {/*<TableCell*/}
        {/*renderContent={contentProps => <HeadCellContent column={column} rowData={rowData} {...contentProps} />}*/}
        {/*column={column}*/}
        {/*{...props}*/}
        {/*/>*/}
        {/*)}*/}
        {/*renderBodyCell={({ column, rowData, ...props }) => (*/}
        {/*<TableCell*/}
        {/*renderContent={contentProps => <BodyCellContent column={column} rowData={rowData} {...contentProps} />}*/}
        {/*column={column}*/}
        {/*{...props}*/}
        {/*/>*/}
        {/*)}*/}
        {/*/>*/}
        {/*<TableLayout*/}
        {/*tableHeightPx={200}*/}
        {/*headRows={fieldsTableHeadRows}*/}
        {/*columns={fieldsTableColumns}*/}
        {/*bodyRows={fieldsTableBodyRows}*/}
        {/*renderScrollContainer={({ style, ...props }) => (*/}
        {/*<Paper style={{ marginLeft: 16, flex: 1, ...style }} {...props} />*/}
        {/*)}*/}
        {/*renderHeadCell={({ column, rowData, ...props }) => (*/}
        {/*<TableCell*/}
        {/*renderContent={contentProps => <HeadCellContent column={column} rowData={rowData} {...contentProps} />}*/}
        {/*column={column}*/}
        {/*{...props}*/}
        {/*/>*/}
        {/*)}*/}
        {/*renderBodyCell={({ column, rowData, ...props }) => (*/}
        {/*<TableCell*/}
        {/*renderContent={contentProps => <BodyCellContent column={column} rowData={rowData} {...contentProps} />}*/}
        {/*column={column}*/}
        {/*{...props}*/}
        {/*/>*/}
        {/*)}*/}
        {/*/>*/}
        {/*<TableLayout*/}
        {/*tableHeightPx={200}*/}
        {/*headRows={dataTableHeadRows}*/}
        {/*columns={dataTableColumns}*/}
        {/*bodyRows={dataTableBodyRows}*/}
        {/*renderScrollContainer={({ style, ...props }) => (*/}
        {/*<Paper style={{ marginLeft: 16, flex: 2, ...style }} {...props} />*/}
        {/*)}*/}
        {/*renderHeadCell={({ column, rowData, ...props }) => (*/}
        {/*<TableCell*/}
        {/*renderContent={contentProps => <HeadCellContent column={column} rowData={rowData} {...contentProps} />}*/}
        {/*column={column}*/}
        {/*{...props}*/}
        {/*/>*/}
        {/*)}*/}
        {/*renderBodyCell={({ column, rowData, ...props }) => (*/}
        {/*<TableCell*/}
        {/*renderContent={contentProps => <BodyCellContent column={column} rowData={rowData} {...contentProps} />}*/}
        {/*column={column}*/}
        {/*{...props}*/}
        {/*/>*/}
        {/*)}*/}
        {/*/>*/}
        {/*</div>*/}
      </Fragment>
    );
  }
}

export { IERModelBoxProps, ERModelBox };
