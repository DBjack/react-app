import ajax from './axios'


const api = {
    getWork: '/works/list',
}

export function getWork(paramter) {
    return ajax({
        type: 'get',
        url: api.getWork,
        data: paramter
    })
}