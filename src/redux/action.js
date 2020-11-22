import { Toast } from 'antd-mobile'
import { AUTHSUCESS, ERRORMSG, RECEIVEUSER, RESETUSER } from './action-types'
import { doRegister, doLogin, updateInfo, getUser } from '../api/user'

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