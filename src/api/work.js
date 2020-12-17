import ajax from './axios'


const api = {
    getWork: '/works/list',
    addWork: '/works/add',
}

export function getWork(paramter) {
    return ajax({
        type: 'get',
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