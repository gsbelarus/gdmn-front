import { ERModel } from 'gdmn-orm';
import { Key } from 'react';
import { ActionType, createAction } from 'typesafe-actions';

const actions = {
  // load er-model
  loadERModelRequest: createAction('app/ermodel/LOAD_ERMODEL_REQUEST', resolve => {
    return () => resolve();
  }),
  loadERModelRequestOk: createAction('app/ermodel/LOAD_ERMODEL_REQUEST_OK', resolve => {
    return (erModel: ERModel) => resolve(erModel);
  }),
  loadERModelRequestError: createAction('app/ermodel/LOAD_ERMODEL_REQUEST_ERROR', resolve => {
    return (error: Error) => resolve(error);
  }),
  // load entity-data
  loadEntityDataRequest: createAction('app/ermodel/LOAD_ENTITY_DATA_REQUEST', resolve => {
    return () => resolve();
  }),
  loadEntityDataRequestOk: createAction('app/ermodel/LOAD_ENTITY_DATA_REQUEST_OK', resolve => {
    return (data: object) => resolve(data);
  }),
  loadEntityDataRequestError: createAction('app/ermodel/LOAD_ENTITY_DATA_REQUEST_ERROR', resolve => {
    return (error: Error) => resolve(error);
  }),
  // select
  singleselectToggleEntitiesRow: createAction('app/ermodel/TOGGLE_ENTITITES_ROW', resolve => {
    return (entitiesSelectedRowId: Key) => resolve({ entitiesSelectedRowId });
  }),
  multiselectToggleFieldsRow: createAction('app/ermodel/TOGGLE_FIELD_ROW', resolve => {
    return (fieldsSelectedRowId: Key) => resolve(fieldsSelectedRowId);
  })
};

type TErModelActions = ActionType<typeof actions>;

// FIXME
actions.loadERModelRequestError = (error: Error) => ({
  type: 'app/ermodel/LOAD_ERMODEL_REQUEST_ERROR',
  payload: error,
  error: true
});
actions.loadEntityDataRequestError = (error: Error) => ({
  type: 'app/ermodel/LOAD_ENTITY_DATA_REQUEST_ERROR',
  payload: error,
  error: true
});

export { actions, TErModelActions };
