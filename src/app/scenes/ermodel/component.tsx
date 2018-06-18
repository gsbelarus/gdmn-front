import React, { Fragment, Key, PureComponent, SFC } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper/Paper';
import { ERModel } from 'gdmn-orm';
import CSSModules from 'react-css-modules';
import { pure, withProps } from 'recompose';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';

import { ITableColumn, ITableRow, withSelectorSelection } from '@src/app/scenes/ermodel/components/data-grid-core';
import {
  InfiniteTableLayout,
  TableCell,
  TableRow,
  TableSelectorCell,
  TTableRowProps
} from '@src/app/scenes/ermodel/components/data-grid-mui';
import { toggleEntitiesRow, toggleFieldsRow } from '@src/app/scenes/ermodel/actionCreators';
import { selectErmodelState } from '@src/app/store/selectors';

// const commonStyle = require('@src/styles/common.css');
const styles = require('./styles.css');

interface IERModelBoxProps {
  erModel: ERModel;
  err?: string | null;
  // er model table
  entitiesTableColumns: ITableColumn[];
  entitiesTableHeadRows?: ITableRow[];
  entitiesTableBodyRows?: ITableRow[];
  entitiesTableFootRows?: ITableRow[];
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
  loadErModel: () => any;
  loadData: () => any;
}

// @CSSModules(commonStyle) FIXME webpack modules in styles
@CSSModules(styles)
class ERModelBox extends PureComponent<IERModelBoxProps, {}> {
  public render(): JSX.Element {
    const {} = this.props;

    const {
      erModel,
      err,
      loadErModel,
      loadData,
      entitiesTableColumns,
      entitiesTableHeadRows,
      entitiesTableBodyRows,
      entitiesTableFootRows,
      fieldsTableColumns,
      fieldsTableHeadRows,
      fieldsTableBodyRows,
      fieldsTableFootRows,
      dataTableColumns,
      dataTableHeadRows,
      dataTableBodyRows,
      dataTableFootRows
    } = this.props;
    // const { renderHeadCellContent: HeadCellContent, renderBodyCellContent: BodyCellContent } = ERModelBox;

    // console.log('render');

    return (
      <Fragment>
        <div>{err && `ERROR: ${err}`}</div>
        <div>{`загружено сущностей: ${Object.entries(erModel.entities).length}`}</div>

        <Button style={{ margin: 60 }} onClick={loadErModel}>
          Load ER-Model
        </Button>
        <Button style={{ margin: 60 }} onClick={loadData}>
          Load Entity-Data
        </Button>

        <div className="row-flex" style={{ display: 'flex' }}>
          <InfiniteTableLayout
            tableHeight={'60vh'}
            headRows={entitiesTableHeadRows}
            columns={entitiesTableColumns}
            bodyRows={entitiesTableBodyRows}
            renderScrollContainer={ERModelBox.renderScrollContainer}
            renderHeadCell={ERModelBox.renderHeadCell}
            renderBodyCell={ERModelBox.renderBodyCell}
            renderRow={ERModelBox.renderEntitiesTableRow}
            //
            tableHeightPx={0}
            tableMinWidthPx={0}
          />
          <InfiniteTableLayout
            tableHeight={'60vh'}
            headRows={fieldsTableHeadRows}
            columns={fieldsTableColumns}
            bodyRows={fieldsTableBodyRows}
            renderScrollContainer={ERModelBox.renderScrollContainer}
            renderHeadCell={ERModelBox.renderHeadCell}
            renderBodyCell={ERModelBox.renderBodyCell}
            renderRow={ERModelBox.renderFieldsTableRow}
            //
            tableHeightPx={0}
            tableMinWidthPx={0}
          />
          <InfiniteTableLayout
            tableHeight={'60vh'}
            headRows={dataTableHeadRows}
            columns={dataTableColumns}
            bodyRows={dataTableBodyRows}
            renderScrollContainer={ERModelBox.renderScrollContainer}
            renderHeadCell={ERModelBox.renderHeadCell}
            renderBodyCell={ERModelBox.renderBodyCell}
            renderRow={ERModelBox.renderDataTableRow}
            //
            tableHeightPx={0}
            tableMinWidthPx={0}
          />
        </div>
      </Fragment>
    );
  }

  private static renderBodyCellContent: SFC<any> = ({ column, rowData }) => {
    if (!rowData || !column || !rowData[column.id]) return <Fragment>{'[ null ]'}</Fragment>;

    return <Fragment>{`${rowData[column.id]}`}</Fragment>;
  };

  private static renderHeadCellContent: SFC<any> = ({ column, rowData }) => {
    if (!rowData || !column || !rowData[column.id]) return <Fragment>{'[ no-data ]'}</Fragment>;

    return <Fragment>{rowData[column.id].title}</Fragment>;
  };

  public static renderScrollContainer: SFC<any> = ({ style, ...props }) => (
    <Paper style={{ flex: 1, ...style }} {...props} />
  );

  public static renderHeadCell: SFC<any> = ({ column, rowData, ...props }) => (
    <TableCell
      renderContent={contentProps => (
        <ERModelBox.renderHeadCellContent column={column} rowData={rowData} {...contentProps} />
      )}
      column={column}
      {...props}
    />
  );

  public static renderBodyCell: SFC<any> = ({ column, rowData, ...props }) => {
    return (
      <TableCell
        renderContent={(contentProps: any) => (
          <ERModelBox.renderBodyCellContent column={column} rowData={rowData} {...contentProps} />
        )}
        column={column}
        {...props}
      />
    );
  };

  private static getSelectedRowSelector(selectSelectedRowIdsState: any) {
    return createSelector(
      [(state: any, props: any) => selectSelectedRowIdsState(state), (state: any, props: any) => props.uid],
      (selectedRowIds, rowUid) =>
        !!selectedRowIds && selectedRowIds.find((value: any) => value === rowUid) !== undefined
    );
  }

  private static entitiesSelectedRowSelector = ERModelBox.getSelectedRowSelector(
    (state: any) => selectErmodelState(state).entitiesSelectedRowIds
  );
  private static fieldsSelectedRowSelector = ERModelBox.getSelectedRowSelector(
    (state: any) => selectErmodelState(state).fieldsSelectedRowIds
  );

  private static SelectableRow = withProps({
    renderSelectorCell: TableSelectorCell,
    role: 'checkbox',
    hover: true,
    tabIndex: -1
  })(withSelectorSelection<TTableRowProps>(TableRow) as any);

  private static renderEntitiesTableRow = pure(
    connect(
      (state, props) => {
        return {
          selected: ERModelBox.entitiesSelectedRowSelector(state, props),
          'aria-checked': ERModelBox.entitiesSelectedRowSelector(state, props)
        };
      },
      (dispatch, props) => ({ onSelectionToggle: bindActionCreators(toggleEntitiesRow, dispatch) })
    )(ERModelBox.SelectableRow)
  );

  private static renderFieldsTableRow = pure(
    connect(
      (state, props) => {
        return {
          selected: ERModelBox.fieldsSelectedRowSelector(state, props),
          'aria-checked': ERModelBox.fieldsSelectedRowSelector(state, props)
        };
      },
      (dispatch, props) => ({ onSelectionToggle: bindActionCreators(toggleFieldsRow, dispatch) })
    )(ERModelBox.SelectableRow)
  );

  private static renderDataTableRow = pure(TableRow);
}

export { IERModelBoxProps, ERModelBox };
