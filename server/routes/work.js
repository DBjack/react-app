const express = require('express')
const router = express.Router()
const assert = require('http-assert')
const WorkModel = require('../models/work')

// 添加工作列表
router.post('/add', (req, res, next) => {
        new WorkModel(req.body).save((err, work) => {
            assert(work, 500, err)
            res.send({
                code: 1000,
                msg: '添加成功',
                data: work

            })

        })

    })
    // 查询工作列表
router.get('/list', (req, res, next) => {
    WorkModel.find().populate({ path: 'user', select: 'userName type name header job worktime' }).exec((err, work) => {
        // assert(work, 500, err)
        res.send({
            code: 1000,
            msg: '查询成功',
            data: work
        })

    })
})


module.exports = router