module.exports = function(server) {
        const ChatModel = require('./models/chat')
            // 挂载服务生成操作io的对象
        const io = require('socket.io')(server)

        io.on('connection', function(soket) { //soket代表连接
                    console.log('连接成功')
                        // 接受客户端发来的数据
                    soket.on('sendMessage', function({ from, to, content }) {
                        console.log('接受的数据', { from, id, content })

                        // 保存到数据库
                        const chat_id = [from, to].sort().join('_')
                        const create_time = Date.now()
                        const chatModel = new ChatModel({ chat_id, from, to, create_time, content })
                        chatModel.save(function(err, chatMsg) { // 保存完成后, 向所有连接的客户端发送消息 
                            io.emit('receiveMessage', chatMsg) // 全局发送, 所有连接的客户端都可以收到
                            console.log('向所有连接的客户端发送消息', chatMsg)
                        })
                    })


                }