const mongoose = require('mongoose')

const userSchame = mongoose.Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
    name: { type: String },
    header: { type: Object },
    job: { type: String },
    worktime: { type: String },
    introduction: { type: String },

})

const UserModel = mongoose.model('user', userSchame)

module.exports = UserModel