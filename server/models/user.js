const mongoose = require('mongoose')

const userSchame = mongoose.Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
    name: { type: String },
    header: { type: Object },
    profession: { type: Array },
    age: { type: Array },
    sex: { type: Array },
    company: { type: String },
    education: { type: Array },
    workTime: { type: Array },
    salary: { type: Array },
    description: { type: String },

})

const UserModel = mongoose.model('user', userSchame)

module.exports = UserModel