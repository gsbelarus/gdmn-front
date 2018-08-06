import { ERModel } from 'gdmn-orm';
import { Key } from 'react';
import { ActionType, createAction } from 'typesafe-actions';

const ermodelActions = {
  // load er-model
  loadERModelRequest: createAction('demos/ermodel/LOAD_ERMODEL_REQUEST', resolve => {
    return () => resolve();
  }),
  loadERModelRequestOk: createAction('demos/ermodel/LOAD_ERMODEL_REQUEST_OK', resolve => {
    return (erModel: ERModel) => resolve(erModel);
  }),
  loadERModelRequestError: createAction('demos/ermodel/LOAD_ERMODEL_REQUEST_ERROR', resolve => {
    return (error: Error) => resolve(error);
  }),
  // load entity-data
  loadEntityDataRequest: createAction('demos/ermodel/LOAD_ENTITY_DATA_REQUEST', resolve => {
    return () => resolve();
  }),
  loadEntityDataRequestOk: createAction('demos/ermodel/LOAD_ENTITY_DATA_REQUEST_OK', resolve => {
    return (data: object) => resolve(data);
  }),
  loadEntityDataRequestError: createAction('demos/ermodel/LOAD_ENTITY_DATA_REQUEST_ERROR', resolve => {
    return (error: Error) => resolve(error);
  }),
  // select
  singleselectToggleEntitiesRow: createAction('demos/ermodel/TOGGLE_ENTITITES_ROW', resolve => {
    return (entitiesSelectedRowId: Key) => resolve({ entitiesSelectedRowId });
  }),
  multiselectToggleFieldsRow: createAction('demos/ermodel/TOGGLE_FIELD_ROW', resolve => {
    return (fieldsSelectedRowId: Key) => resolve(fieldsSelectedRowId);
  })
};

type TErModelActions = ActionType<typeof ermodelActions>;

// FIXME
ermodelActions.loadERModelRequestError = (error: Error) => ({
  type: 'demos/ermodel/LOAD_ERMODEL_REQUEST_ERROR',
  payload: error,
  error: true
});
ermodelActions.loadEntityDataRequestError = (error: Error) => ({
  type: 'demos/ermodel/LOAD_ENTITY_DATA_REQUEST_ERROR',
  payload: error,
  error: true
});

export { ermodelActions, TErModelActions };
