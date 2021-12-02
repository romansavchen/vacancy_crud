import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './actions';

let middlewares = [
    thunk,
].filter(Boolean);

const Store = createStore(rootReducer, applyMiddleware(...middlewares));

export default Store;