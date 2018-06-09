import { configureStore } from './configureStore';
import rootReducer from './rootReducer';

const store = configureStore(rootReducer);

export { store };
