import { deserializeERModel, EntityLink, EntityQuery, EntityQueryField, ERModel, IERModel } from 'gdmn-orm';
import { connect } from 'react-redux';
import { Dispatch as ReduxDispatch } from 'redux';
import { ERTranslatorRU } from 'gdmn-nlp-agent';

import { IRootState } from '@src/app/store/rootReducer';
import { selectErmodelState } from '@src/app/store/selectors';
import {
  loadEntityDataOk,
  loadERModelOk,
  loadError,
  selectEntity,
  selectFields
} from '@src/app/scenes/ermodel/actionCreators';
import { TActions } from './actions';
import { ERModelBox } from './component';
import { ITableColumn, ITableRowData } from '@src/app/scenes/ermodel/components/data-grid-core';
import { Api } from '@src/app/services/Api';

type TDispatch = ReduxDispatch<TActions>;

const enum SortDirection {
  DESC,
  ASC
}
interface ISort {
  direction: SortDirection;
  fieldName: string;
}

function arraySort(sort: ISort, flatData: any[]) {
  // TODO async

  return flatData.sort((a, b) => {
    if (sort.direction === SortDirection.DESC) {
      if (b[sort.fieldName] > a[sort.fieldName]) return -1;
      if (a[sort.fieldName] > b[sort.fieldName]) return 1;
    } else {
      if (b[sort.fieldName] > a[sort.fieldName]) return 1;
      if (a[sort.fieldName] > b[sort.fieldName]) return -1;
    }
    return 0;
  });
}

function createBodyRows(erModel: ERModel): ITableRowData[] {
  if (!erModel) return [];

  const bodyRows = Object.keys(erModel.entities).map(
    (key, index) => ({ id: index, name: erModel.entities[key].name }) // TODO gen uid
  );

  const currentSort = { fieldName: 'name', direction: SortDirection.DESC }; // TODO -> state
  return arraySort(currentSort, bodyRows);
}

function createFieldsBodyRows(erModel: ERModel, entityName?: string) {
  if (!erModel || !entityName) return [];

  const entity = erModel.entity(entityName);

  const bodyRows = Object.keys(entity.attributes).map(
    (key, index) => ({ id: index, name: entity.attributes[key].name }) // TODO gen uid
  );

  return bodyRows;
}

function loadEntityData(fieldNames: string[], entityName: string, erModel: ERModel, dispatch: TDispatch) {
  // TODO async

  const entity = erModel.entity(entityName);
  const query = new EntityQuery(
    new EntityLink(entity, 'U', [new EntityQueryField(Object.values(entity.attributes)[0])])
  ).serialize();

  Api.fetchQuery(query)
    .then(res => dispatch(loadEntityDataOk(res)))
    .catch((err: Error) => dispatch(loadError(err.message)));
}

interface IDispatchToProps {
  selectEntity: (name: string) => any;
  selectFields: (fieldNames: string[], entityName: string, erModel: ERModel) => any;
  loadErModel: () => any;
}

interface IOwnProps {
  selectedFields?: string[];
  selectedEntityName?: string;
  erModel: ERModel;
  err?: string | null;
  // er model table
  columns: ITableColumn[];
  headRows?: ITableRowData[];
  bodyRows?: ITableRowData[];
  footRows?: ITableRowData[];
  // entity fields table
  fieldsTableColumns?: ITableColumn[];
  fieldsTableHeadRows?: ITableRowData[];
  fieldsTableBodyRows?: ITableRowData[];
  fieldsTableFootRows?: ITableRowData[];
  // entity data table
  dataTableColumns?: ITableColumn[];
  dataTableHeadRows?: ITableRowData[];
  dataTableBodyRows?: ITableRowData[];
  dataTableFootRows?: ITableRowData[];
}

interface IStateToProps extends IOwnProps {
  erTranslatorRU?: ERTranslatorRU;
}

const ERModelBoxContainer = connect(
  (state: IRootState, ownProps: IOwnProps): IStateToProps => ({
    ...selectErmodelState(state),
    bodyRows: createBodyRows(selectErmodelState(state).erModel),
    fieldsTableBodyRows: createFieldsBodyRows(
      selectErmodelState(state).erModel,
      selectErmodelState(state).selectedEntityName
    )
    // dataTableBodyRows: createBodyRows(selectErmodelState(state).erModel)
  }),
  (dispatch: TDispatch, ownProps: IOwnProps): IDispatchToProps => ({
    selectEntity: (name: string) => dispatch(selectEntity(name)),
    selectFields: (fieldNames: string[], entityName: string, erModel: ERModel) => {
      dispatch(selectFields(fieldNames));
      loadEntityData(fieldNames, entityName, erModel, dispatch);
    },
    loadErModel: () => {
      Api.fetchEr()
        .then(res => {
          return dispatch(loadERModelOk(deserializeERModel(<IERModel>res)));
        })
        .catch((err: Error) => dispatch(loadError(err.message)));
    }
  })
)(ERModelBox);

export { ERModelBoxContainer };
