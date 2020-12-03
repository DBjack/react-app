import { AUTHSUCESS, ERRORMSG, RECEIVEUSER, RESETUSER, RECEIVEWORK, RECEIVEMSG, RECEIVEMSGLIST, RECEIVEUSERLIST } from './action-types'
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

function userList(state = [], action = []) {
    switch (action.type) {
        case RECEIVEUSERLIST:
            return action.data
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
    chatMsg: [],
    unReadCount: 0
}

// 获取消息reducer
function chatMsgList(state = initChat, action) {
    switch (action.type) {
        case RECEIVEMSGLIST:
            var { data, userid } = action.data
            var { users, chatMsg } = data
            return {
                users,
                chatMsg: [...state.chatMsg, ...chatMsg],
                unReadCount: chatMsg.reduce((total, chat) => {
                    return total + (chat.to === userid && !chat.read) ? 1 : 0
                }, 0)
            }
            // 接收单条消息
        case RECEIVEMSG:
            var { userid, chatMsg } = action.data
            return {
                users: state.users,
                chatMsg: [...state.chatMsg, chatMsg],
                unReadCount: state.unReadCount + (chatMsg.to === userid && !chatMsg.read ? 1 : 0)
            }
        default:
            return state
    }
}



export default combineReducers({
    user,
    workList,
    userList,
    chatMsgList
})