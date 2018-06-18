import { deserializeERModel, EntityLink, EntityQuery, EntityQueryField, ERModel, IERModel } from 'gdmn-orm';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createSelector } from 'reselect';

import { Api } from '@src/app/services/Api';
import { IRootState } from '@src/app/store/rootReducer';
import { selectErmodelState } from '@src/app/store/selectors';
import { ITableColumn, ITableRow } from '@src/app/scenes/ermodel/components/data-grid-core';
import { loadEntityDataOk, loadERModelOk, loadError } from './actionCreators';
import { TErModelActions } from './actions';
import { ERModelBox } from './component';

const ermodelSelector = (state: any, props: any) => selectErmodelState(state).erModel;

function createBodyRows(erModel: ERModel): ITableRow[] {
  if (!erModel) return [];

  const bodyRows = Object.keys(erModel.entities).map(
    (key, index) => ({ id: index, name: erModel.entities[key].name }) // TODO gen uid
  );

  return bodyRows;
}
const bodyRowsSelector = createSelector([ermodelSelector], createBodyRows);

function createFieldsBodyRows(erModel?: ERModel, selectedEntityId?: number) {
  if (!erModel || selectedEntityId === undefined) return [];

  console.log(selectedEntityId);

  const entity = erModel.entities[selectedEntityId];

  // const bodyRows = Object.keys(entity.attributes).map(
  //   (key, index) => ({ id: index, name: entity.attributes[key].name }) // TODO gen uid
  // );

  return [];
}

function loadEntityData(
  fieldNames: string[],
  entityName: string,
  erModel: ERModel,
  dispatch: Dispatch<TErModelActions>
) {
  const entity = erModel.entity(entityName);
  const query = new EntityQuery(
    new EntityLink(entity, 'U', [new EntityQueryField(Object.values(entity.attributes)[0])])
  );

  Api.fetchQuery(query, 'er')
    .then(res => dispatch(loadEntityDataOk(res)))
    .catch((err: Error) => dispatch(loadError(err.message)));
}

interface IDispatchToProps {
  loadErModel: () => any;
  loadData: () => any;
}

interface IOwnProps {
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
}

const ERModelBoxContainer = connect(
  (state: IRootState, ownProps: IOwnProps): IOwnProps => {
    const { entitiesSelectedRowIds, fieldsSelectedRowIds, ...props } = selectErmodelState(state);

    return {
      ...props,
      entitiesTableBodyRows: bodyRowsSelector(state, ownProps),
      fieldsTableBodyRows: createFieldsBodyRows(
        selectErmodelState(state).erModel,
        !!entitiesSelectedRowIds ? <number>entitiesSelectedRowIds[0] : undefined
      ),
      dataTableBodyRows: [] // createBodyRows(selectErmodelState(state).erModel)
    };
  },
  (dispatch: Dispatch<TErModelActions>, ownProps: IOwnProps): IDispatchToProps => ({
    loadErModel: () => {
      Api.fetchEr()
        .then(res => {
          return dispatch(loadERModelOk(deserializeERModel(<IERModel>res)));
        })
        .catch((err: Error) => dispatch(loadError(err.message)));
    },
    loadData: () => {
      // TODO
      // loadEntityData(fieldNames, entityName, erModel, dispatch);
    }
  })
)(ERModelBox);

export { ERModelBoxContainer };
