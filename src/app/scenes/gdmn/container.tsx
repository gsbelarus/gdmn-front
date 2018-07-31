import { withProps } from 'recompose';

import { getAppsContainer } from '@src/app/scenes/apps/container';
import { GdmnApi } from '@src/app/services/GdmnApi';
import { GdmnView, IGdmnViewProps } from '@src/app/scenes/gdmn/component';
import { getERModelBoxContainer } from '@src/app/scenes/ermodel/container';

const getGdmnContainer = (apiService: GdmnApi) =>
  withProps<any, IGdmnViewProps>({
    renderAppsViewContainer: getAppsContainer(apiService),
    renderERModelBoxContainer: getERModelBoxContainer(apiService)
  })(GdmnView);

export { getGdmnContainer };
