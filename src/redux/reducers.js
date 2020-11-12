import { AUTHSUCESS, ERRORMSG } from './action-types'
import { combineReducers } from 'redux'

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
            return {...state, ...action.data }
        case ERRORMSG:
            return {...state, msg: action.data }
        default:
            return state;
    }

}



export default combineReducers({
    user
})