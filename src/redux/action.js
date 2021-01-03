import { Toast } from 'antd-mobile'
import { AUTHSUCESS, ERRORMSG, RECEIVEUSER, RESETUSER, RECEIVEWORK, RECEIVEWORKLIST, RECEIVEMSG, RECEIVEMSGLIST, RECEIVEUSERLIST, READMSG } from './action-types'
import { doRegister, doLogin, updateInfo, getUser, getUserList } from '../api/user'
import { getMsgList, redMsg } from '../api/chat'
import { getWork, addWork } from '../api/work'
import io from 'socket.io-client'


function authSuccess(data) {
    return {
        type: AUTHSUCESS,
        data
    }
}

export function errorMsg(data) {
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

export function receiveUserList(data) {
    return {
        type: RECEIVEUSERLIST,
        data
    }
}

export function receiveWork(data) {

    return {
        type: RECEIVEWORK,
        data
    }
}

export function receiveWorkList(data) {
    return {
        type: RECEIVEWORKLIST,
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
// 同步获取更新的消息
export function msgRead(data) {

    return {
        type: READMSG,
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

    const { name, age, profession, worktime, salary, description, header } = user
    return async(dispatch) => {

        if (name == '') {
            return dispatch(errorMsg('请输入名称'))
        } else if (profession == '') {
            return dispatch(errorMsg('请输入职业'))
        } else if (worktime == '') {
            return dispatch(errorMsg('请输入工作年限'))
        } else if (description == '') {
            return dispatch(errorMsg('请输入个人介绍'))
        } else if (age == '') {
            return dispatch(errorMsg('请选择年龄'))
        } else if (!header.text) {
            return dispatch(errorMsg('请选择头像'))
        } else if (salary && salary.length === 0) {
            return dispatch(errorMsg('请选择期望薪资'))
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
// 查找所有的user
export function getUserListInfo(params) {

    return async(dispatch) => {

        const { data, code, msg } = await getUserList(params)
        if (code === 1000) {
            dispatch(receiveUserList(data))
        }
    }
}

// 添加工作
export function addWorkInfo(workinfo) {
    return async(dispatch) => {
        const { data, code, msg } = await addWork(workinfo)
        if (code === 1000) {
            dispatch(receiveWork(data))
        }
    }
}
// 查找工作列表
export function getWorkInfo(params) {
    return async(dispatch) => {
        const { data, code, msg, pagination } = await getWork(params)
        if (code === 1000) {
            dispatch(receiveWorkList({ data, pagination }))
        }
    }
}

// 初始化IO
function initIO(dispatch, userid) {
    if (!io.socket) {
        io.socket = io(process.env.REACT_APP_IOURL)
        io.socket.on('receiveMsg', (chatMsg) => {

            const { from, to } = chatMsg
            if (from === userid || to === userid) {
                dispatch(receiveMsg({ chatMsg, userid }))
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
            dispatch(receiveMsgList({ data, userid }))
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

// 更新读取消息的异步方法
export function updateRedMsg(from, to) {
    return async dispatch => {
        const { code, data: count } = await redMsg({ from, to })
        if (code === 1000) {
            dispatch(msgRead({ from, to, count }))
        }
    }
}