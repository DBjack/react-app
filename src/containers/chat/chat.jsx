import React, { Component } from 'react';
import {  Button,TextareaItem,WhiteSpace,List,WingBlank} from 'antd-mobile'
import { sendMsg } from '../../redux/action'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import WorkerCard from '../../components/workerCard/workerCard'
import './index.scss'
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            content:''
         }
    }

    sendMsg=()=>{
        const { userid:to } = this.props.match.params
        const userid = Cookies.get('userid')
        const from =userid.slice(3).slice(0,-1)
        const { content } = this.state

        this.props.sendMsg({
            from,
            to,
            content
        })
    }

    // 获取input的值
    changeInput=(content)=>{
        this.setState({
            content
        })
    }

    render() {
        

         const toid = this.props.match.params.userid
        const { userList,chatMsgList,user }  = this.props
        const { users,chatMsg } = chatMsgList
        // 获取card信息
        const card = userList.find(user=>user._id === toid)


            console.log(users,chatMsg,111)
        
        return (
            <div>
                <div className="chat-top">
                <WorkerCard card ={card}></WorkerCard>
                </div>
                <WhiteSpace></WhiteSpace>
                <div className="chat-body">
                {chatMsg.map(chat=>{
                    // 我发送的消息
                    if(chat.from === user._id){
                        return  <div className='chat-content mychat'>
                            <img src={user.header.icon} alt=""/>
                            <span>{chat.content}</span>
                            </div>
                    }else{
                        return  <div className='chat-content'>
                            <img src={card.header.icon} alt=""/>
                            <span>{chat.content}</span>
                            </div>
                    }
                })}
                </div>
                <div className='chat-footer'>
                <TextareaItem autoHeight className='footer-input' placeholder='请输入...' onChange={val=>this.changeInput(val)}>
                </TextareaItem>
                <Button onClick={this.sendMsg} className='chat-button'  type='primary'>发送</Button>
                </div>

                
            </div>
          );
    }
}
 
export default connect(
    state=>({
        user:state.user,
        userList:state.userList,
        workList: state.workList,
        chatMsgList:state.chatMsgList
    }),
    {
        sendMsg
    }
)(Chat);