import ajax from './axios'


const api = {
    getMsgList: '/chat/chatList',
    redMsg: '/chat/readMsg',

}

export function getMsgList(paramter) {
    return ajax({
        type: 'get',
        url: api.getMsgList,
        data: paramter
    })
}

export function redMsg(paramter) {
    return ajax({
        type: 'post',
        url: api.redMsg,
        data: paramter
    })
}