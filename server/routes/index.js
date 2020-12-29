/*
 * @Author: your name
 * @Date: 2020-11-09 21:57:09
 * @LastEditTime: 2020-12-29 22:47:17
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \my-app\server\routes\index.js
 */
var express = require('express');
const md5 = require('md5')
var router = express.Router();
const UserName = require('../models/user.js')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;