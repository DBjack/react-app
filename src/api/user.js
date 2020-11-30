import ajax from './axios'


const api = {
    doRegister: '/register',
    doLogin: '/login',
    updateInfo: '/update',
    getUser: '/getUser',
    getUserList: '/getUserList',
}

export function doRegister(paramter) {
    return ajax({
        type: 'post',
        url: api.doRegister,
        data: paramter
    })
}
export function doLogin(paramter) {
    return ajax({
        type: 'post',
        url: api.doLogin,
        data: paramter
    })
}
export function updateInfo(paramter) {
    return ajax({
        type: 'post',
        url: api.updateInfo,
        data: paramter
    })
}

export function getUser(paramter) {
    return ajax({
        type: 'get',
        url: api.getUser,
    })
}
export function getUserList(paramter) {
    return ajax({
        type: 'get',
        url: api.getUserList,
    })
}