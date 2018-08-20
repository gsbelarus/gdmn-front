import React, { Fragment, PureComponent, SFC } from 'react';
import { Button, Paper } from '@material-ui/core';
import { ERModel } from 'gdmn-orm';
import CSSModules from 'react-css-modules';
import { pure, withProps } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ITableColumn, ITableRow, withSelectorSelection } from '@core/components/data-grid-core';
import {
  InfiniteTableLayout,
  TableCell,
  TableRow,
  TableSelectorCell,
  TTableRowProps
} from '@core/components/data-grid-mui';
import { ermodelActions } from '@src/app/scenes/ermodel/actions';
import { entitiesSelectedRowSelector, fieldsSelectedRowSelector } from '@src/app/scenes/ermodel/selectors';
import { RouteComponentProps } from 'react-router-dom';

// const commonStyle = require('@src/styles/common.css');
const styles = require('./styles.css');

interface IERModelBoxStateProps {
  readonly erModel: ERModel;
  readonly entitiesTableColumns: ITableColumn[];
  readonly entitiesTableHeadRows?: ITableRow[];
  // readonly entitiesTableFootRows?: ITableRow[];
  readonly fieldsTableColumns?: ITableColumn[];
  readonly fieldsTableHeadRows?: ITableRow[];
  // readonly fieldsTableFootRows?: ITableRow[];
}

interface IERModelBoxSelectorProps {
  entitiesTableBodyRows?: ITableRow[];
  fieldsTableBodyRows?: ITableRow[];
  dataTableColumns?: ITableColumn[];
  dataTableHeadRows?: ITableRow[];
  dataTableBodyRows?: ITableRow[];
  dataTableFootRows?: ITableRow[];
}

interface IERModelBoxActionsProps {
  loadErModel: (appId: string) => void;
  loadData?: (appId: string) => void;
}

type TERModelBoxProps = IERModelBoxStateProps & IERModelBoxSelectorProps & IERModelBoxActionsProps;

// @CSSModules(commonStyle)
@CSSModules(styles)
class ERModelBox extends PureComponent<TERModelBoxProps & RouteComponentProps<any>> {
  public componentDidMount() {
    this.props.loadErModel(this.props.match.params.appId);
  }

  public render(): JSX.Element {
    console.log('render ERModelBox');

    const {
      erModel,
      loadErModel,
      loadData,
      entitiesTableColumns,
      entitiesTableHeadRows,
      entitiesTableBodyRows,
      // entitiesTableFootRows,
      fieldsTableColumns,
      fieldsTableHeadRows,
      fieldsTableBodyRows,
      // fieldsTableFootRows,
      dataTableColumns,
      dataTableHeadRows,
      dataTableBodyRows
      // dataTableFootRows
    } = this.props;

    return (
      <Fragment>
        <Button style={{ margin: 60 }} onClick={() => loadErModel(this.props.match.params.appId)}>
          Reload ER-Model
        </Button>
        <Button
          style={{ margin: 60 }}
          onClick={!loadData ? () => ({}) : () => loadData(this.props.match.params.appId)}
          disabled={!loadData}
        >
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
          selected: entitiesSelectedRowSelector(state, props),
          'aria-checked': entitiesSelectedRowSelector(state, props)
        };
      },
      (dispatch, props) => ({
        onSelectionToggle: bindActionCreators(ermodelActions.singleselectToggleEntitiesRow, dispatch)
      })
    )(ERModelBox.SelectableRow)
  );

  private static renderFieldsTableRow = pure(
    connect(
      (state, props) => {
        return {
          selected: fieldsSelectedRowSelector(state, props),
          'aria-checked': fieldsSelectedRowSelector(state, props)
        };
      },
      (dispatch, props) => ({
        onSelectionToggle: bindActionCreators(ermodelActions.multiselectToggleFieldsRow, dispatch)
      })
    )(ERModelBox.SelectableRow)
  );

  public static renderDataTableRow = pure(TableRow);
}

export { ERModelBox, TERModelBoxProps, IERModelBoxStateProps, IERModelBoxSelectorProps, IERModelBoxActionsProps };
