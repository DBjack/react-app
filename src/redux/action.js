import { Toast } from 'antd-mobile'
import { AUTHSUCESS, ERRORMSG } from './action-types'
import { doRegister, doLogin } from '../api/user'

function authSuccess(data) {
    debugger
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
        debugger
        if (code === 1000) {
            dispatch(authSuccess(data))
        } else {
            dispatch(errorMsg(msg))
        }
    }
}