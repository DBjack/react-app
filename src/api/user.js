import ajax from './axios'


const api = {
    doRegister: '/register'
}

export function doRegister(paramter) {
    return ajax({
        type: 'post',
        url: api.doRegister,
        data: paramter
    })
}