import { isDevMode } from '../utils';
import configureStoreDev from './configureStore-develop';
import configureStoreProd from './configureStore-production';

const configureStore = isDevMode() ? configureStoreDev : configureStoreProd;

export default configureStore;
