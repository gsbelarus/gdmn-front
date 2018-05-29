import configureStore from './configureStore';
import rootReducer from './rootReducer';

const store = configureStore(rootReducer, []); // TODO middlewares

export default store;
