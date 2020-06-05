
import cookie from 'react-cookies'

export const isAuth = ()=> {
    const isAuthed = cookie.load('isAuthed')
    return (isAuthed =='true' ) ? true : false
}
export const getLoginedID = () =>{
   return (cookie.load('useremail') !=='undefined') ? cookie.load('useremail') : ''
}
export const getUserName = () => {
    return (cookie.load('username') !=='undefined') ? cookie.load('username') : ''
}
export const getAccessToken = () => {
    return (cookie.load('accesstoken') !=='undefined') ? cookie.load('accesstoken') : null
}
export const getUniqid = () => {
    return (cookie.load('uniqid') !=='undefined') ? cookie.load('uniqid') : null
}
