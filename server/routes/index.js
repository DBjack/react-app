var express = require('express');
var router = express.Router();
const UserName = require('../models/user.js')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/register', function(req, res, next) {
    console.log(req.body, 'body')
    const { userName, password, rePassword, type } = req.body
    UserName.findOne({ userName }, (err, user) => {
        if (user) {
            res.send({
                code: 1001,
                msg: '有相同账户'
            })
        } else {
            new UserName(req.body).save((err, user) => {
                res.send({
                    code: 1000,
                    data: user,
                    msg: '注册成功'
                })
            })
        }
    })
})

module.exports = router;