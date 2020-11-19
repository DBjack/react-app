import { AUTHSUCESS, ERRORMSG } from './action-types'
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
            debugger
            return {...action.data, redirectTo: getRedirectTo(action.data.type, action.data.header) }
        case ERRORMSG:
            return {...state, msg: action.data }
        default:
            return state;
    }

}



export default combineReducers({
    user
})