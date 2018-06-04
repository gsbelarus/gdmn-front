import { isDevMode } from '@src/app/utils';
import { configureStore as configureStoreDev } from './configureStore-develop';
import { configureStore as configureStoreProd } from './configureStore-production';

// TODO test require
const configureStore = isDevMode() ? configureStoreDev : configureStoreProd;

export { configureStore };
