/*
 * @Author: your name
 * @Date: 2020-11-23 20:43:38
 * @LastEditTime: 2021-01-03 23:26:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-app\server\routes\work.js
 */
const express = require('express')
const router = express.Router()
const assert = require('http-assert')
const WorkModel = require('../models/work')

// 添加工作列表
router.post('/add', (req, res, next) => {
        const { userid } = req.cookies
        const date = new Date()
        console.log({...req.body, update_time: date, creator: userid })
        new WorkModel({...req.body, update_time: date, creator: userid }).save((err, work) => {
            assert(work, 500, err)
            res.send({
                code: 1000,
                msg: '添加成功',
                data: work

            })
        })

    })
    // 查询工作列表
router.post('/list', (req, res, next) => {
    const pageNum = Number(req.body.pageNum)
    const queryDict = JSON.parse(req.body.queryDict)

    let skipNum = (pageNum - 1) * 10
    WorkModel.find(queryDict).populate({ path: 'creator', select: 'name header profession company' }).skip(skipNum).limit(10).exec((err, work) => {

        res.send({
            code: 1000,
            msg: '查询成功',
            data: [
                ...work
            ],
            pagination: {
                pageNum,
                total: skipNum + work.length
            }
        })

    })
})


module.exports = router