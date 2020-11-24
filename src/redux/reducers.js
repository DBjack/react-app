import { AUTHSUCESS, ERRORMSG, RECEIVEUSER, RESETUSER, RECEIVEWORK, RECEIVEMSG, RECEIVEMSGLIST } from './action-types'
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

const initChat = {
    users: {},
    chatMsg: []
}

// 获取消息reducer
function msgList(state = initChat, action) {
    switch (action.type) {
        case RECEIVEMSGLIST:
            var { users, chatMsg } = action.data
            return {
                users,
                chatMsg: [...state.chatMsg, ...chatMsg]
            }
        case RECEIVEMSG:
            console.log(action, 112233)
            var { users, chatMsg } = action.data
            return {
                users,
                chatMsg: [...state.chatMsg, ...chatMsg]
            }
        default:
            return state
    }
}



export default combineReducers({
    user,
    workList
})