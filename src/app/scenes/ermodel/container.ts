import { Key } from 'react';
import {
  Attribute,
  deserializeERModel,
  Entity,
  EntityLink,
  EntityQuery,
  EntityQueryField,
  ERModel,
  IERModel
} from 'gdmn-orm';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createSelector } from 'reselect';

import { Api } from '@src/app/services/Api';
import { IRootState } from '@src/app/store/rootReducer';
import { selectErmodelState } from '@src/app/store/selectors';
import { ITableColumn, ITableRow } from '@src/app/scenes/ermodel/components/data-grid-core';
import { loadEntityDataOk, loadERModelOk, loadError } from './actionCreators';
import { TErModelActions } from './actions';
import { ERModelBox, IERModelBoxProps } from './component';

const ermodelSelector = (state: any, props: any) => selectErmodelState(state).erModel;

function createEntityBodyRows(erModel: ERModel): ITableRow[] {
  if (!erModel) return [];

  return Object.keys(erModel.entities).map(
    (key, index) => ({ id: index, name: erModel.entities[key].name }) // TODO gen uid
  );
}
const entitiesTableBodyRowsSelector = createSelector([ermodelSelector], createEntityBodyRows);

function createFieldsBodyRows(erModel?: ERModel, selectedEntity?: Entity) {
  if (!erModel || !selectedEntity) return [];

  return Object.keys(selectedEntity.attributes).map(
    (key, index) => ({ id: index, name: selectedEntity.attributes[key].name }) // TODO gen uid
  );
}

const selectedEntitySelector = (state: any, props: any) => {
  // TODO selectors
  const erModel = selectErmodelState(state).erModel;
  const entitiesSelectedRowId = selectErmodelState(state).entitiesSelectedRowId;

  if (!erModel || entitiesSelectedRowId === undefined) return;

  const entitiesSelectedName = Object.keys(erModel.entities)[<number>entitiesSelectedRowId];
  return erModel.entities[entitiesSelectedName];
};

const fieldsTableBodyRowsSelector = createSelector([ermodelSelector, selectedEntitySelector], createFieldsBodyRows);

const selectedFieldsSelector = (state: any, props: any) => {
  // TODO selectors
  const selectedEntity = selectedEntitySelector(state, props);
  const fieldsSelectedRowIds = selectErmodelState(state).fieldsSelectedRowIds;

  if (!selectedEntity || !fieldsSelectedRowIds) return;

  const selectedFields: Attribute[] = [];

  Object.keys(selectedEntity.attributes).forEach((key, index) => {
    if (fieldsSelectedRowIds.findIndex(i => i === index) !== -1) selectedFields.push(selectedEntity.attributes[key]);
  });

  console.log(selectedFields);

  return selectedFields;
};

const tableDataSelector = (state: any, props: any) => selectErmodelState(state).tableData;

function createDataBodyRows(data?: any): ITableRow[] {
  if (!data || !data.data) return [];

  return data.data.map((dataItem: any, index: number) => ({ id: index, ...dataItem }));
}
const dataTableBodyRowsSelector = createSelector([tableDataSelector], createDataBodyRows);

function createTableMeta(data?: any) {
  if (!data || !data.aliases) return { dataTableHeadRows: [], dataTableColumns: [] };

  const headrow: { [t: string]: any } = {};
  const dataTableColumns: ITableColumn[] = [];

  data.aliases.forEach((item: any) => {
    addHeadRowCell(item, headrow);
    dataTableColumns.push(createColumn(item));
  });
  const dataTableHeadRows = [{ id: 1, ...headrow }];

  return {
    dataTableHeadRows,
    dataTableColumns
  };
}

function addHeadRowCell(itemAlias: any, headrow: any) {
  headrow[itemAlias.values[itemAlias.attribute]] = { title: `${itemAlias.alias}.${itemAlias.attribute}` };
}

function createColumn(itemAlias: any) {
  return _createTableColumn(itemAlias.values[itemAlias.attribute], 200);
}
function _createTableColumn(key: Key, widthPx?: number, align?: string): ITableColumn {
  return { id: key, widthPx, align };
}
const dataTableMetaSelector = createSelector([tableDataSelector], createTableMeta);

interface IDispatchToProps {
  loadErModel: () => any;
  loadData?: () => void;
  dispatch: any;
}

interface IStateToProps {
  fieldsSelectedRowIds?: Key[];
  selectedEntity?: Entity;
  selectedFields?: Attribute[];
  // entity data table
  dataTableColumns?: ITableColumn[];
  dataTableHeadRows?: ITableRow[];
  dataTableBodyRows?: ITableRow[];
  dataTableFootRows?: ITableRow[];

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
}

const ERModelBoxContainer = connect(
  (state: IRootState, ownProps: IERModelBoxProps): IStateToProps => {
    const { entitiesSelectedRowId, tableData, ...props } = selectErmodelState(state); // exclude, do not remove!

    return {
      ...props,
      ...dataTableMetaSelector(state, ownProps),
      dataTableBodyRows: dataTableBodyRowsSelector(state, ownProps),
      entitiesTableBodyRows: entitiesTableBodyRowsSelector(state, ownProps),
      //
      fieldsTableBodyRows: fieldsTableBodyRowsSelector(state, ownProps),
      selectedEntity: selectedEntitySelector(state, ownProps),
      selectedFields: selectedFieldsSelector(state, ownProps)
    };
  },
  (dispatch: Dispatch<TErModelActions>, ownProps: IERModelBoxProps): IDispatchToProps => ({
    loadErModel: () => {
      Api.fetchEr()
        .then(res => {
          return dispatch(loadERModelOk(deserializeERModel(<IERModel>res)));
        })
        .catch((err: Error) => dispatch(loadError(err.message)));
    },
    dispatch // TODO
  }),
  (
    { fieldsSelectedRowIds, selectedEntity, selectedFields, ...stateProps }, // exclude, do not remove!
    { loadData, dispatch, ...dispatchProps },
    ownProps
  ) => ({
    ...stateProps,
    ...dispatchProps,
    loadData:
      fieldsSelectedRowIds && fieldsSelectedRowIds.length > 0
        ? () => {
            if (!selectedEntity || !selectedFields) return;

            const queryFields: EntityQueryField[] = selectedFields.map(item => new EntityQueryField(item));
            const query = new EntityQuery(new EntityLink(selectedEntity, 'alias', queryFields));

            Api.fetchQuery(query, 'er')
              .then(res => dispatch(loadEntityDataOk(res)))
              .catch((err: Error) => dispatch(loadError(err.message)));
          }
        : undefined
  })
)(ERModelBox);

export { ERModelBoxContainer };
