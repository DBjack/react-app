import ajax from './axios'


const api = {
    getMsgList: '/chat/chatList',

}

export function getMsgList(paramter) {
    return ajax({
        type: 'get',
        url: api.getMsgList,
        data: paramter
    })
}