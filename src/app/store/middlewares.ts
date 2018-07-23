import { Middleware } from 'redux';

import { Auth } from '@core/services/Auth';
import { getMiddlewares as getAuthMiddlewares } from '@src/app/scenes/auth/middlewares';
import { middlewares } from '@src/app/scenes/root/middlewares';

const getMiddlewares = (authStore: Auth): Middleware[] => [...middlewares, ...getAuthMiddlewares(authStore)];

export { getMiddlewares };
