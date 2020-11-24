import { Toast } from 'antd-mobile'
import { AUTHSUCESS, ERRORMSG, RECEIVEUSER, RESETUSER, RECEIVEWORK, RECEIVEMSG, RECEIVEMSGLIST } from './action-types'
import { doRegister, doLogin, updateInfo, getUser } from '../api/user'
import { getMsgList } from '../api/chat'
import { getWork } from '../api/work'
import io from 'socket.io-client'


function authSuccess(data) {
    return {
        type: AUTHSUCESS,
        data
    }
}

function errorMsg(data) {
    return {
        type: ERRORMSG,
        data
    }
}


function receiveUser(data) {
    return {
        type: RECEIVEUSER,
        data
    }
}

export function resetUser(data) {
    return {
        type: RESETUSER,
        data
    }
}

export function receiveWork(data) {

    return {
        type: RECEIVEWORK,
        data
    }
}

// 同步获取单条消息
export function receiveMsg(data) {

    return {
        type: RECEIVEMSG,
        data
    }
}
// 同步获取消息列表
export function receiveMsgList(data) {

    return {
        type: RECEIVEMSGLIST,
        data
    }
}


// 注册
export function register(user) {
    const { password, rePassword, type, userName } = user
    return async(dispatch) => {

        if (userName == '') {
            return dispatch(errorMsg('请输入用户名'))
        } else if (password == '') {
            return dispatch(errorMsg('请输入密码'))
        } else if (rePassword == '') {
            return dispatch(errorMsg('请输入重复密码'))
        } else if (type == '') {
            return dispatch(errorMsg('请选择类型'))
        }

        if (password !== rePassword) {
            return dispatch(errorMsg('两次密码不一致'))
        }

        const { data, code, msg } = await doRegister(user)
        debugger
        if (code === 1000) {
            dispatch(authSuccess(data))
        } else {
            dispatch(errorMsg(msg))
        }
    }
}
// 登录
export function login(user) {

    const { password, userName } = user
    return async(dispatch) => {

        if (userName == '') {
            return dispatch(errorMsg('请输入用户名'))
        } else if (password == '') {
            return dispatch(errorMsg('请输入密码'))
        }
        const { data, code, msg } = await doLogin(user)
        if (code === 1000) {
            dispatch(authSuccess(data))
        } else {
            dispatch(errorMsg(msg))
        }
    }
}
// 更新
export function update(user) {

    const { name, job, worktime, intruduction } = user
    return async(dispatch) => {

        if (name == '') {
            return dispatch(errorMsg('请输入名称'))
        } else if (job == '') {
            return dispatch(errorMsg('请输入求职工作'))
        } else if (worktime == '') {
            return dispatch(errorMsg('请输入工作年限'))
        } else if (intruduction == '') {
            return dispatch(errorMsg('请输入个人介绍'))
        }
        const { data, code, msg } = await updateInfo(user)
        if (code === 1000) {
            dispatch(receiveUser(data))
        } else {
            dispatch(resetUser(msg))
        }
    }
}
// 查找
export function getUserInfo() {

    return async(dispatch) => {

        const { data, code, msg } = await getUser()
        if (code === 1000) {
            dispatch(receiveUser(data))
        }
    }
}
// 查找工作列表
export function getWorkInfo() {
    return async(dispatch) => {
        const { data, code, msg } = await getWork()
        if (code === 1000) {
            console.log(data, 123456)
            dispatch(receiveWork(data))
        }
    }
}

// 初始化IO
function initIO(dispatch, userid) {
    if (!io.socket) {
        io.socket = io('ws://localhost:4000')
        io.socket.on('receiveMsg', (chatMsgs) => {
            console.log('接收到服务端的数据')
            const { from, to } = chatMsgs

            if (from === userid || to === userid) {
                dispatch(receiveMsg(chatMsgs, to === userid))
            }
        })
    }
}


// 获取所有聊天信息列表
export function getChatMsg(userid) {
    return async dispatch => {
        initIO(dispatch, userid)
        const { code, data, msg } = await getMsgList()
        if (code === 1000) {

            dispatch(receiveMsgList(data))
        }

    }
}

// 发送单条消息
export function sendMsg({ from, to, content }) {
    return async dispatch => {
        // console.log(from, to, content)
        io.socket.emit('sendMsg', { from, to, content })

    }
}