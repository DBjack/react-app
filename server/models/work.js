const mongoose = require('mongoose')

const workSchame = mongoose.Schema({
    work: { type: String, required: true },
    update_time: { type: Date, required: true },
    creator: { type: String, required: true },
    content: { type: String, required: true },
    worktime: { type: Number, required: true },
    // icon: { type: Object, required: true },
    company: { type: String, required: true },
    city: { type: String, required: true },
    education: { type: String, required: true },
    salary: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
})

const WorkModel = mongoose.model('work', workSchame)

module.exports = WorkModel