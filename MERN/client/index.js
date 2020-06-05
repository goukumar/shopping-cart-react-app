import './bootstrap.min.css';
import './app.css';
import uniqid from 'uniqid';  
import cookie from 'react-cookies'

import React from 'react';
import {hydrate} from 'react-dom';
import App from '../common/app';
import {Provider} from 'react-redux';
import {BrowserRouter, NavLink, Route, Switch, Redirect} from 'react-router-dom'

//import store from './store'
import {createStore, applyMiddleware, compose} from 'redux'
import rootReducers from './reducers/rootreducer'
import {devToolsEnhancer} from 'redux-devtools-extension'

import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/sagas';

const sagaMiddleware = createSagaMiddleware();

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

delete window.__PRELOADED_STATE__

const store = createStore(rootReducers, preloadedState, compose(applyMiddleware(sagaMiddleware), devToolsEnhancer()));

sagaMiddleware.run(rootSaga);

hydrate(
 <Provider store={store}>
     <BrowserRouter>
      <App navigation={preloadedState}/>
    </BrowserRouter>
  </Provider>
 , document.getElementById('app'));
if(!cookie.load('uniqid')) {
 cookie.save('uniqid', uniqid(), { path: '/' })
}