import React, { Component } from 'react';
import { connect } from 'react-redux'
import {List } from 'antd-mobile'
class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }


    // 跳转到聊天页面
    redirectChat= (userid)=>{
        this.props.history.push(`/chat/${userid}`)
    }
    render() { 
        const {user,chatMsgList,userList } = this.props
        const { users,chatMsg} = chatMsgList


        let lastChatObjs = {}
        // 遍历所有消息列表，取出chatid的最后一项
        chatMsg.map(chat=>{
            const chatid = chat.chat_id
            //  如果存在，则比较create_time的大小
            if(chat.to === user._id){
                if(lastChatObjs[chatid]){
                    if(lastChatObjs[chatid]['create_time'] < chat['create_time'] ){
                        lastChatObjs[chatid]  = chat
                    }
                }else {
                     lastChatObjs[chatid]  =chat
                }
            }
        })

        // 取出之后，进行排序
        let messages = Object.values(lastChatObjs)
        
        messages.sort((m,n)=>{
            return m.create_time>n.create_time
        })


        return ( 
            <List>
                
                {messages.map(message=>{
                    const userinfo = userList.find(user=>user._id === message.from)
                    return <List.Item key={message._id} onClick={this.redirectChat.bind(null,message.from)}>
                        <img src={userinfo.header.icon} alt="" className='mr-2'/>
                        { message.content}
                    </List.Item>
                })}
            </List>
         );
    }
}
 
export default connect(
    state=>({
        user:state.user,
        userList:state.userList,
        chatMsgList:state.chatMsgList
    })
)(Message)