import { isDevMode } from '@core/utils/utils';
import { configureStore as configureStoreDev } from '@src/app/store/configureStore/configureStore-develop';
import { configureStore as configureStoreProd } from '@src/app/store/configureStore/configureStore-production';

// TODO test require
const configureStore = isDevMode() ? configureStoreDev : configureStoreProd;

export { configureStore };
