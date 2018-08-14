import { compose, lifecycle, withProps } from 'recompose';

import { DatastoreView, IDatastoreViewProps } from '@src/app/scenes/datastore/component';
import { GdmnApi } from '@src/app/services/GdmnApi';
import { getERModelBoxContainer } from '@src/app/scenes/ermodel/container';
import { getBackupsContainer } from '@src/app/scenes/backups/container';

const getDatastoreContainer = (apiService: GdmnApi) =>
  compose<IDatastoreViewProps, IDatastoreViewProps>(
    withProps({
      renderBackupsContainer: getBackupsContainer(apiService),
      renderERModelBoxContainer: getERModelBoxContainer(apiService)
    })
  )(DatastoreView);

export { getDatastoreContainer };
