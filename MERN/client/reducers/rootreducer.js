import { combineReducers } from 'redux'
import cookie from 'react-cookies'
const initialState = {
    navigation:[]
}

const headerReducer = (state = {'navigation':[]}, action) => {
    switch (action.type) {
        case 'LOAD_NAVIGATION':
            return {
                    ...state,
                    navigation : action.payload
                }
      
        default:
            return state;;
    }
}
const productReducer = (state = {'products':[],'categories':[],'cart':[],'cartItems':[]}, action) => {
    switch (action.type) {
        case 'LOAD_PRODUCTS':
            return {
                    ...state,
                    products : action.payload
                }
        case 'LOAD_CATEGORY':
            return {
                ...state,
                categories : action.payload
            }
        case 'LOAD_CART':
             //{cart: [...state, action.payload]}
             return {
                ...state,
                cart : action.payload.cart,
                cartItems: action.payload.products
            }
        case 'ADD_CART':
            //{cart: [...state, action.payload]}
            return {...state,
                cart:[...state.cart, action.payload]
            }
        default:
            return state;;
    }
}

const userReducer = (state = {isAuthed:false}, action) => {
    
    switch (action.type) {
        case 'USER_LOGIN':
        cookie.save('username', action.payload.user,{ path: '/' });
        cookie.save('accesstoken', action.payload.token,{ path: '/' });
        cookie.save('useremail', action.payload.email,{ path: '/' });
        cookie.save('isAuthed', action.payload.isAuthed,{ path: '/' });
        return action.payload
        
        case 'USER_LOGOUT':
            cookie.remove('username', { path: '/' })
            cookie.remove('isAuthed', { path: '/' })
            cookie.remove('useremail', { path: '/' })
            cookie.remove('accesstoken', { path: '/' })
        return {
                ...state,
                isAuthed : false
            }
        case 'USER_REGISTER':
         return action.payload
        
        case 'USER_PROFILE':
            return action.payload
        
        case 'UPDATE_PROFILE':
            return action.payload

        case 'ORDER_MAP':
             return action.payload

        default:
            return state;
    }
}

const rootReducers = combineReducers({
    headerReducer,
    userReducer,
    productReducer
}) 

export default rootReducers;