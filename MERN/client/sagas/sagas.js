import initAPI from '../actions/init.actions'
import {call, takeEvery, put} from 'redux-saga/effects';
import * as appService from '../services/app.service'
import {delay} from 'redux-saga';

function* laodNavigationSaga() {
    //yield call(delay, 1000)        
    const response = yield call(initAPI.fetch, 'http://localhost:3000/api/navigation');
    yield put({type: 'LOAD_NAVIGATION', payload:response})
}
function* laodCategorySaga() {
    //yield call(delay, 1000)        
    const response = yield call(initAPI.fetch, 'http://localhost:3000/api/category');
    yield put({type: 'LOAD_CATEGORY', payload:response})
}
function* laodProductsSaga(payload) {
    //yield call(delay, 1000)        
    const response = yield call(initAPI.fetch, 'http://localhost:3000/api/products',payload.payload.category);
    yield put({type: 'LOAD_PRODUCTS', payload:response})
}
function* loginSaga(payload) {
    //yield call(delay, 1000)        
    const response = yield call(initAPI.post, 'http://localhost:3000/api/login', payload);
    yield put({type: 'USER_LOGIN', payload:response})
}
function* registrationSaga(payload) {
    const response = yield call(initAPI.post, 'http://localhost:3000/api/register', payload);
    yield put({type: 'USER_REGISTER', payload:response})
}
function* updateProfileSaga(payload) {
    const token = appService.getAccessToken();
    const response = yield call(initAPI.put, 'http://localhost:3000/api/profile', payload, token);
    yield put({type: 'UPDATE_PROFILE', payload:response})
}
function* orderSaga(payload) {
    const token = appService.getAccessToken();
    const response = yield call(initAPI.post, 'http://localhost:3000/api/order', payload, token);
    yield put({type: 'ORDER_MAP', payload:response})
    yield put({type: 'LOAD_CART_ASYNC', payload:{uniqid:appService.getUniqid(), userid: appService.getLoginedID()}})

}

function* updateCartSaga(payload) {
    const response = yield call(initAPI.put, 'http://localhost:3000/api/cart', payload);
    yield put({type: 'LOAD_CART_ASYNC', payload:{uniqid:appService.getUniqid(), userid: appService.getLoginedID()}})
}
function* addToCartSaga(payload) {
    const response = yield call(initAPI.post, 'http://localhost:3000/api/cart', payload);
    yield put({type: 'LOAD_CART_ASYNC', payload:{uniqid:appService.getUniqid(), userid: appService.getLoginedID()}})
}
function* loadCartSaga(payload) {
    const response = yield call(initAPI.fetch, 'http://localhost:3000/api/cart',payload.payload);
    yield put({type: 'LOAD_CART', payload:response})
}
function* removeCartSaga(payload) {
    const response = yield call(initAPI.deleteRecord, 'http://localhost:3000/api/cart', payload);
    yield put({type: 'LOAD_CART_ASYNC', payload:{uniqid:appService.getUniqid(), userid: appService.getLoginedID()}})
}



function* watchAsyncTakeEvery(){ 
    yield takeEvery('LOAD_NAVIGATION_ASYNC',laodNavigationSaga)
    yield takeEvery('LOAD_CATEGORIES_ASYNC',laodCategorySaga)
    yield takeEvery('LOAD_PRODUCTS_ASYNC',laodProductsSaga)
    yield takeEvery('USER_LOGIN_ASYNC',  loginSaga)
    yield takeEvery('USER_REGISTER_ASYNC',  registrationSaga) 
    yield takeEvery('UPDATE_PROFILE_ASYNC',  updateProfileSaga)
    yield takeEvery('ADD_TO_CART_ASYNC',  addToCartSaga)
    yield takeEvery('UPDATE_CART_ASYNC',  updateCartSaga)
    yield takeEvery('LOAD_CART_ASYNC',  loadCartSaga)
    yield takeEvery('REMOVE_CART_ASYNC',  removeCartSaga)
    yield takeEvery('ORDER_ASYNC',  orderSaga)

}

export default function* rootSaga(){
    yield watchAsyncTakeEvery()
}