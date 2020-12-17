const mongoose = require('mongoose')

const workSchame = mongoose.Schema({
    company: { type: String, required: true },
    update_time: { type: Date, required: true },
    workTime: { type: Array, required: true },
    profession: { type: String, required: true },
    age: { type: Array, required: true },
    education: { type: Array, required: true },
    description: { type: String, required: true },
    skills: { type: Array, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
})

const WorkModel = mongoose.model('work', workSchame)

module.exports = WorkModel