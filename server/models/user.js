const mongoose = require('mongoose')

const userSchame = mongoose.Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    rePassword: { type: String, required: true },
    type: { type: String, required: true },
})

const UserSchame = mongoose.model('user', userSchame)

module.exports = UserSchame