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
        console.log(req.body, 'body')
        const { userName, password, type } = req.body
        UserName.findOne({ userName }, (err, data) => {
            if (data) {
                res.send({
                    code: 1001,
                    msg: '存在相同账户',
                })
            } else {
                req.body.password = md5(password)
                new UserName(req.body).save((err, user) => {
                    res.cookie('userid', user._id, {
                        maxAge: 24 * 60 * 60 * 1000
                    })
                    res.send({
                        code: 1000,
                        data: user,
                        msg: '注册成功'
                    })
                })
            }
        })
    })
    // 登录
router.post('/login', function(req, res, next) {
        const { userName, password } = req.body
        UserName.findOne({ userName }, (err, user) => {
            console.log(user, err);
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
    console.log(res.cookies)
    const { userid } = res.cookies
    UserName.findByIdAndUpdate({ id: userid }, req.body, (err, user) => {
        console.log(user, err);
        if (user) {

        } else {
            res.send({
                code: 1001,
                msg: '账号不存在'
            })
        }
    })
})

module.exports = router;