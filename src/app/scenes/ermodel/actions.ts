import { ERModel } from 'gdmn-orm';
import { Key } from 'react';
import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';

const ermodelActions = {
  loadErModelAsync: createAsyncAction(
    'demos/ermodel/LOAD_ERMODEL_REQUEST',
    'demos/ermodel/LOAD_ERMODEL_REQUEST_OK',
    'demos/ermodel/LOAD_ERMODEL_REQUEST_ERROR'
  )<void, ERModel, Error>(),
  loadEntityDataAsync: createAsyncAction(
    'demos/ermodel/LOAD_ENTITY_DATA_REQUEST',
    'demos/ermodel/LOAD_ENTITY_DATA_REQUEST_OK',
    'demos/ermodel/LOAD_ENTITY_DATA_REQUEST_ERROR'
  )<void, object, Error>(),
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
// ermodelActions.loadERModelRequestError = (error: Error) => ({
//   type: 'demos/ermodel/LOAD_ERMODEL_REQUEST_ERROR',
//   payload: error,
//   error: true
// });
// ermodelActions.loadEntityDataRequestError = (error: Error) => ({
//   type: 'demos/ermodel/LOAD_ENTITY_DATA_REQUEST_ERROR',
//   payload: error,
//   error: true
// });

export { ermodelActions, TErModelActions };
