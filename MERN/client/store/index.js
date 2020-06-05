import {createStore, applyMiddleware} from 'redux'
import rootReducers from '../reducers/rootreducer'
import {devToolsEnhancer} from 'redux-devtools-extension'

import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducers, devToolsEnhancer(), applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
export default store;