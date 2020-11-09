module.exports = (app) => {

    const assert = require('http-assert')

    const mongoose = require('mongoose')

    const url = 'mongodb://119.45.43.3:27017/react'

    // 连接数据库
    mongoose.connect(url)

    // 拿到数据库实例
    const conn = mongoose.connection

    conn.on('connected', (err, data) => {
        console.log('连接数据库成功')
    })

}