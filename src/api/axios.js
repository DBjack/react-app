import axios from 'axios'

let instance = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 60 * 60 * 1000
})


instance.interceptors.request.use(config => {
    return config
})

instance.interceptors.response.use(config => {
    return config.data
})

function ajax({ type = 'get', url = '', data = {} }) {

    if (type.toLowerCase() === 'get') {
        let str = ''
        Object.keys(data).map((key, i) => {
            str += '&' + key + '=' + data[key]
        })
        if (str != '') {
            str.replace(/\&{1}/, str)
        }
        return instance({
            method: type,
            url: url + str
        })
    } else {
        return instance({
            data,
            method: type,
            url
        })
    }
}


export default ajax