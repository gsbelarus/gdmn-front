import { ERModel } from 'gdmn-orm';
import { Key } from 'react';
import { ActionType, createAction } from 'typesafe-actions';

// todo LOAD_ERRMODEL_REQUEST

const actions = {
  loadERModelOk: createAction('app/ermodel/LOAD_ERMODEL_OK', resolve => {
    return (erModel: ERModel) => resolve(erModel);
  }),
  loadEntityDataOk: createAction('app/ermodel/LOAD_ENTITY_DATA_OK', resolve => {
    return (data: object) => resolve(data); // TODO data type
  }),
  loadError: createAction('app/ermodel/LOAD_ERROR', resolve => {
    return (error: string) => resolve(error);
  }),
  singleselectToggleEntitiesRow: createAction('app/ermodel/TOGGLE_ENTITITES_ROW', resolve => {
    return (entitiesSelectedRowId: Key) => resolve({ entitiesSelectedRowId });
  }),
  multiselectToggleFieldsRow: createAction('app/ermodel/TOGGLE_FIELD_ROW', resolve => {
    return (fieldsSelectedRowId: Key) => resolve(fieldsSelectedRowId);
  })
};

type TErModelActions = ActionType<typeof actions>;

export { actions, TErModelActions };
