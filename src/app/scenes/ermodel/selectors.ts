import { Attribute } from 'gdmn-orm';
import { createSelector } from 'reselect';

import { selectErmodelState } from '@src/app/store/selectors';
import { createDataBodyRows, createNameBodyRows, createTableMeta } from '@src/app/scenes/ermodel/utils';

const ermodelSelector = (state: any, props: any) => selectErmodelState(state).erModel;

const entitiesTableBodyRowsSelector = createSelector(
  [ermodelSelector],
  erModel => (!erModel ? [] : createNameBodyRows(erModel.entities))
);

const selectedEntitySelector = (state: any, props: any) => {
  // TODO selectors
  const erModel = selectErmodelState(state).erModel;
  const entitiesSelectedRowId = selectErmodelState(state).entitiesSelectedRowId;

  if (!erModel || entitiesSelectedRowId === undefined) return;

  const entitiesSelectedName = Object.keys(erModel.entities)[<number>entitiesSelectedRowId];
  return erModel.entities[entitiesSelectedName];
};

const fieldsTableBodyRowsSelector = createSelector(
  [ermodelSelector, selectedEntitySelector],
  (erModel, selectedEntity) => (!erModel ? [] : createNameBodyRows(!!selectedEntity ? selectedEntity.attributes : null))
);

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

const dataTableBodyRowsSelector = createSelector([tableDataSelector], createDataBodyRows);

const dataTableMetaSelector = createSelector([tableDataSelector], createTableMeta);

//

const fieldsSelectedRowSelector = createSelector(
  [(state: any, props: any) => selectErmodelState(state).fieldsSelectedRowIds, (state: any, props: any) => props.uid],
  (selectedRowIds, rowUid) => !!selectedRowIds && selectedRowIds.find((value: any) => value === rowUid) !== undefined
);

const entitiesSelectedRowSelector = createSelector(
  [(state: any, props: any) => selectErmodelState(state).entitiesSelectedRowId, (state: any, props: any) => props.uid],
  (selectedRowId, rowUid) => selectedRowId !== undefined && selectedRowId === rowUid
);

export {
  ermodelSelector,
  entitiesTableBodyRowsSelector,
  selectedEntitySelector,
  fieldsTableBodyRowsSelector,
  selectedFieldsSelector,
  tableDataSelector,
  dataTableBodyRowsSelector,
  dataTableMetaSelector,
  fieldsSelectedRowSelector,
  entitiesSelectedRowSelector
};
