import { Middleware } from 'redux';
import Socket = SocketIOClient.Socket;

import { Auth } from '@core/services/Auth';
import { getMiddlewares as getAuthMiddlewares } from '@src/app/scenes/auth/middlewares';
import { rootMiddlewares } from '@src/app/scenes/root/middlewares';
import { getGdmnMiddlewares } from '@src/app/scenes/gdmn/middlewares';
import { getDatastoresMiddlewares } from '@src/app/scenes/datastores/middlewares';
import { GdmnApi } from '@src/app/services/GdmnApi';
import { getBackupsMiddlewares } from '@src/app/scenes/backups/middlewares';

const getMiddlewares = (authStore: Auth, socket: Socket, apiService: GdmnApi): Middleware[] => [
  ...rootMiddlewares,
  ...getAuthMiddlewares(authStore),
  ...getGdmnMiddlewares(socket),
  ...getDatastoresMiddlewares(apiService),
  ...getBackupsMiddlewares(apiService)
];

export { getMiddlewares };
