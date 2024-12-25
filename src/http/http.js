import request from '../request/request.js'

const http = {
    // get请求
    get(url, headers) {
        return request({
            url: url,
            method: 'get',
            headers: headers
        })
    },
    // post请求
    post(url, data, headers) {
        return request({
            url: url,
            method: 'post',
            data: data,
            headers: headers
        })
    },
    // put请求
    put(url, data) {
        return request({
            url: url,
            method: 'put',
            data: data
        })
    },
    // delete请求
    delete(url, params) {
        return request({
            url: url,
            method: 'delete',
            params: params
        })
    }
}

export default http