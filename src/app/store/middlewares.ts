import { getMiddlewares as getAuthMiddlewares } from '@src/app/scenes/auth/middlewares';
import { getMiddlewares as getAppMiddlewares } from '@src/app/scenes/app/middlewares';
import { Middleware } from 'redux';
import { Auth } from '@src/app/scenes/web/services/Auth';

const getMiddlewares = (authStore: Auth): Middleware[] => [
  ...getAppMiddlewares(authStore),
  ...getAuthMiddlewares(authStore)
];

export { getMiddlewares }
