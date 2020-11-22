const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    content: { type: String, required: true },
    chat_id: { type: String, required: true },
    // 标识聊天是否已读
    read: { type: Boolean, default: false },
    create_time: { type: Number },
})

const ChatModel = mongoose.model('Chat', chatSchema)

module.exports = ChatModel