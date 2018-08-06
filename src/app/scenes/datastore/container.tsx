import { compose, withProps } from 'recompose';
import { DatastoreView, IDatastoreViewProps } from '@src/app/scenes/datastore/component';
import { GdmnApi } from '@src/app/services/GdmnApi';
import { getERModelBoxContainer } from '@src/app/scenes/ermodel/container';

const getDatastoreContainer = (apiService: GdmnApi) =>
  compose<IDatastoreViewProps, IDatastoreViewProps>(
    withProps({
      renderERModelBoxContainer: getERModelBoxContainer(apiService)
    })
  )(DatastoreView);

export { getDatastoreContainer };
