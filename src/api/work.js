/*
 * @Author: your name
 * @Date: 2020-11-23 21:45:48
 * @LastEditTime: 2020-12-29 21:30:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-app\src\api\work.js
 */
import ajax from './axios'


const api = {
    getWork: '/works/list',
    addWork: '/works/add',
}

export function getWork(paramter) {
    return ajax({
        type: 'post',
        url: api.getWork,
        data: paramter
    })
}

export function addWork(paramter) {
    return ajax({
        type: 'post',
        url: api.addWork,
        data: paramter
    })
}