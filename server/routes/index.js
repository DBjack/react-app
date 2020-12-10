var express = require('express');
const md5 = require('md5')
var router = express.Router();
const UserName = require('../models/user.js')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// 注册
router.post('/register', function(req, res, next) {
        const { userName, password, type } = req.body
        UserName.findOne({ userName }, (err, data) => {
            if (data) {
                res.send({
                    code: 1001,
                    msg: '存在相同账户',
                })
            } else {
                req.body.password = md5(password)
                UserName(req.body).save((err, user) => {
                    if (err) {
                        res.send({
                            code: 1001,
                            msg: err
                        })
                    } else {
                        console.log(user, 111)
                        res.cookie('userid', user._id, {
                            maxAge: 24 * 60 * 60 * 1000
                        })
                        res.send({
                            code: 1000,
                            data: user,
                            msg: '注册成功'
                        })
                    }
                })
            }
        })
    })
    // 登录
router.post('/login', function(req, res, next) {
        const { userName, password } = req.body
        UserName.findOne({ userName }, (err, user) => {

            if (user) {
                if (md5(password) === user.password) {
                    res.cookie('userid', user._id, {
                        maxAge: 24 * 60 * 60 * 1000
                    })
                    res.send({
                        code: 1000,
                        msg: '登录成功',
                        data: user
                    })
                } else {
                    res.send({
                        code: 1001,
                        msg: '密码错误',
                    })

                }
            } else {
                res.send({
                    code: 1001,
                    msg: '账号不存在'
                })
            }
        })
    })
    // 更新
router.post('/update', function(req, res, next) {

        const { userid } = req.cookies
        UserName.findByIdAndUpdate({ _id: userid }, req.body, (err, user) => {

            if (user) {
                const newUser = Object.assign(user, req.body)
                res.send({
                    code: 1000,
                    data: newUser,
                    msg: '保存成功'
                })
            } else {
                res.send({
                    code: 1001,
                    msg: '账号不存在'
                })
            }
        })
    })
    // 查找单个
router.get('/getUser', function(req, res, next) {

        const { userid } = req.cookies
        UserName.findOne({ _id: userid }, req.body, (err, user) => {

            if (user) {
                res.send({
                    code: 1000,
                    data: user,
                    msg: '查找成功'
                })
            } else {
                res.send({
                    code: 1001,
                    msg: err
                })
            }
        })
    })
    // 查找所的用户
router.get('/getUserList', function(req, res, next) {


    UserName.find((err, user) => {
        if (user) {
            res.send({
                code: 1000,
                data: user,
                msg: '查找成功'
            })
        } else {
            res.send({
                code: 1001,
                msg: err
            })
        }
    })
})

module.exports = router;