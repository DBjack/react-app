const express = require('express')
const { use } = require('.')
const router = express.Router()

const ChatModel = require('../models/chat')
const UserModel = require('../models/user')


// 查找聊天记录
router.get('/chatList', function(req, res, next) {
    const userid = Cookies.get('userid')
        // 查询所有用户记录
    UserModel.find((err, userDocs) => {
        const users = {}
            // 生成一个对象，储存key值是id.val是userMame和header
        userDocs.forEach(doc => {
                users[doc_id] = {
                    userName: doc.userName,
                    header: doc.header,
                }
            })
            // 查询和userid相关莲的聊天
            // 1.查询条件 2. 过滤条件 3.回调函数
        ChatModel.find({ '$or': [{ from: userid }, { to: userid }] }, filter, function(err, chatMsg) {
            res.send({
                code: 1000,
                data: {
                    users,
                    chatMsg
                }
            })
        })
    })
})


// 修改消息为已读
router.post('/readmsg', function(req, res, next) {
    const from = req.body.from
    const to = req.body.to

    // 更新消息
    ChatModel.update({ from, to, read: false }, { read: true }, { multi: true }, function(err, doc) {
        res.send({
            code: 1000,
            // 更新数量
            data: doc.nModified
        })
    })
})