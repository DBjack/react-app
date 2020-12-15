import { AUTHSUCESS, ERRORMSG, RECEIVEUSER, RESETUSER, RECEIVEWORK, RECEIVEMSG, RECEIVEMSGLIST, RECEIVEUSERLIST, READMSG } from './action-types'
import { combineReducers } from 'redux'
import { getRedirectTo } from '../utils/index.js'

let initState = {
    userName: '',
    password: '',
    type: '',
}

function user(state = initState, action = {}) {
    switch (action.type) {
        case AUTHSUCESS:
            return {...action.data, redirectTo: getRedirectTo(action.data.type, action.data.header) }
        case ERRORMSG:
            return {...state, msg: action.data }
        case RECEIVEUSER:
            return {...action.data, redirectTo: getRedirectTo(action.data.type, action.data.header) }
            // 重置redux中user中的状态
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
            // 读取消息更新
        case READMSG:
            var { count, from, to } = action.data
            return {
                users: state.users,
                chatMsg: state.chatMsg.map(chat => {
                    // 如果读取消息， 修改read的状态，不能直接修改chat.read = true 
                    if (chat.from === from && chat.to === to && !chat.read) {
                        return {...chat, read: true }
                    } else {
                        return chat
                    }
                }),
                unReadCount: state.unReadCount - count
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