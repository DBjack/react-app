/*
 * @Author: your name
 * @Date: 2020-11-11 22:26:55
 * @LastEditTime: 2020-12-29 22:51:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-app\src\api\user.js
 */
import ajax from './axios'


const api = {
    doRegister: 'user/register',
    doLogin: 'user/login',
    updateInfo: 'user/update',
    getUser: 'user/user',
    getUserList: 'user/list',
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
        type: 'post',
        url: api.getUserList,
        data: paramter
    })
}