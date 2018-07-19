import { ActionType, createAction } from 'typesafe-actions';

const actions = {
  loadApplicationsData: createAction('app/applications/LOAD_APPLICATIONS_DATA', resolve => {
    return () => resolve();
  }),
  loadApplicationsDataOk: createAction(`app/applications/LOAD_APPLICATIONS_DATA_OK`, resolve => {
    return (data: object) => resolve(data); // TODO data type
  }),
  loadError: createAction('app/applications/LOAD_ERROR', resolve => {
    return (error: string) => resolve(error);
  }),

  deleteApplication: createAction(`app/applications/DELETE_APPLICATION`, resolve => {
    return (data: object) => resolve(data); // TODO data type
  }),
  deleteApplicationOk: createAction(`app/applications/DELETE_APPLICATION_OK`, resolve => {
    return (data: object) => resolve(data); // TODO data type
  }),
  deleteError: createAction('app/applications/DELETE_APPLICATION_ERROR', resolve => {
    return (error: string) => resolve(error);
  }),
  createApplication: createAction('app/applications/CREATE_APPLICATION', resolve => {
    return () => resolve();
  }),
  createApplicationOk: createAction('app/applications/CREATE_APPLICATION_OK', resolve => {
    return () => resolve();
  }),
};

type TAppsModelActions = ActionType<typeof actions>;

export { actions, TAppsModelActions };