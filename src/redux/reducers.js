import { AUTHSUCESS, ERRORMSG, RECEIVEUSER, RESETUSER, RECEIVEWORK } from './action-types'
import { combineReducers } from 'redux'
import { getRedirectTo } from '../utils/index.js'

let initState = {
    userName: '',
    password: '',
    type: '',
    msg: ''
}

function user(state = initState, action = {}) {
    switch (action.type) {
        case AUTHSUCESS:
            return {...action.data, redirectTo: getRedirectTo(action.data.type, action.data.header) }
        case ERRORMSG:
            return {...state, msg: action.data }
        case RECEIVEUSER:
            return {...action.data, redirectTo: getRedirectTo(action.data.type, action.data.header) }
            // 重组redux中user中的状态
        case RESETUSER:
            return {...initState }
        default:
            return state;
    }
}


function workList(state = [], action = []) {
    switch (action.type) {
        case RECEIVEWORK:
            return action.data
        default:
            return state
    }
}



export default combineReducers({
    user,
    workList
})